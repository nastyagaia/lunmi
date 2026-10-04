// Импорт остальных разделов каталога (тело, волосы, загар, гаджеты, Glow-skin, антивозрастной уход)
// из папки с материалами по списку scripts/catalog.extra.mjs:
// 1) фото товаров → public/img/catalog/;
// 2) данные → src/data/catalog-extra.json (товары и разделы уже существующих товаров).
// Обложки разделов — из Figma (src/data/covers.json).
// «Уход для лица» импортируется отдельно: scripts/import-face-care.mjs.
// Запуск: node scripts/import-catalog.mjs
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, extraProducts, tags } from "./catalog.extra.mjs";
import { oldPrice, productPhoto, rub, shadeColor } from "./image-utils.mjs";

const OUT_IMG = "public/img/catalog";
// папки этого скрипта собираем заново (в именах — отпечаток содержимого, старые копии не нужны)
for (const dir of [OUT_IMG]) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

// ---- товары с оттенками: пары «флакон + модель» по названию оттенка ----
const PHOTO = /\.(png|jpe?g|webp)$/i;
const list = (dir) => readdirSync(path.join(ROOT, dir)).filter((f) => PHOTO.test(f)).sort();
/** «AMUSE_JelFitTint_01_BoksoongaJelly_Model_600x550.png» → «01_BoksoongaJelly» */
function shadePart(file, prefix) {
  let s = path.parse(file).name;
  if (s.startsWith(prefix)) s = s.slice(prefix.length);
  s = s.replace(/^_+/, "").replace(/_(m|model|swatch)?(_?600x550)?$/i, "").replace(/_(model|m|swatch)$/i, "");
  return s.replace(/(\D)\s*\d?\s*\d$/, "$1").replace(/[\s_]+$/, ""); // «Plum_Dew1 1», «Cherry_Soda 1» → без хвоста
}
/** ключ для сравнения: без номера оттенка, только буквы — «B01_Vanilla» и «Vanilla» совпадут */
const keyOf = (part) => part.replace(/^[A-Z]?\d+_/i, "").toLowerCase().replace(/[^a-zа-я]/g, "");
/** подпись оттенка: «01_BoksoongaJelly» → «01 Boksoonga Jelly» */
const labelOf = (part) => part.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();

async function discoverShades(spec) {
  // оттенки с файлами вручную
  if (spec.list) {
    const shades = spec.list.map((s) => ({ label: s.name, files: s.files, color: s.color }));
    // colorFrom: "second" — со второй картинки, число — по номеру (-1 — последняя, обычно свотч)
    const pick = (files) =>
      typeof spec.colorFrom === "number" ? files.at(spec.colorFrom) : files[spec.colorFrom === "second" ? 1 : 0];
    for (const s of shades)
      s.color ??= await shadeColor(path.join(ROOT, pick(s.files) ?? s.files[0]), spec.tone);
    return shades;
  }
  const prefix = path.basename(spec.dir.trim()) + "_";
  const pDir = spec.product ? `${spec.dir}/${spec.product}` : spec.dir;
  const productFiles = list(pDir).filter((f) => !spec.second || !f.includes(spec.second));
  const modelDir = spec.model ? `${spec.dir}/${spec.model}` : spec.dir;
  const modelFiles = spec.model === undefined ? [] : list(modelDir).filter((f) => !spec.second || f.includes(spec.second));
  const models = new Map(modelFiles.map((f) => [keyOf(shadePart(f, prefix)), f]));
  let shades = productFiles.map((f) => {
    const part = shadePart(f, prefix);
    const model = models.get(keyOf(part));
    return { label: labelOf(part), files: [`${pDir}/${f}`, ...(model ? [`${modelDir}/${model}`] : [])] };
  });
  if (spec.cover) {
    const i = shades.findIndex((s) => s.files[0].includes(spec.cover));
    if (i > 0) shades = [shades[i], ...shades.slice(0, i), ...shades.slice(i + 1)];
  }
  for (const s of shades) {
    // цвет: вручную (colors — по началу названия оттенка), со второй картинки (свотч) или с флакона
    const manual = spec.colors && Object.entries(spec.colors).find(([k]) => s.label.startsWith(k))?.[1];
    s.color = manual ?? (await shadeColor(path.join(ROOT, s.files[spec.colorFrom === "second" ? 1 : 0] ?? s.files[0])));
  }
  return shades;
}

let adjusted = 0;
const products = [];
for (const p of extraProducts) {
  const images = [];
  const thumbs = [];
  // у товара с оттенками список фото собирается сам: по паре на оттенок, номера фото — в shades[].images
  const found = p.shades ? await discoverShades(p.shades) : null;
  const files = found ? found.flatMap((s) => s.files) : p.files;
  let n = 0;
  const shades = found?.map((s) => ({ name: s.label, color: s.color, images: s.files.map(() => n++) }));
  for (const [i, file] of files.entries()) {
    const photo = await productPhoto(path.join(ROOT, file), OUT_IMG, `${p.id}-${i + 1}`);
    images.push(photo.large);
    thumbs.push(photo.small);
    if (photo.adjusted) adjusted++;
  }
  const old = oldPrice(p.price, p.discount);
  products.push({
    id: p.id,
    href: `/product/${p.id}`,
    category: p.category,
    type: p.type,
    ...(p.also ? { also: p.also } : {}),
    brand: p.brand,
    name: p.name,
    ...(p.title ? { title: p.title } : {}),
    description: p.description,
    price: rub(p.price),
    ...(old ? { oldPrice: rub(old) } : {}),
    ...(p.discount ? { discount: p.discount } : {}),
    ...(p.hit ? { hit: true } : {}),
    ...(p.rating ? { rating: p.rating } : {}),
    ...(shades ? { shades } : {}),
    // объёмы: своя цена (со скидкой товара) и номера фото; первый объём — основной, его цена в карточке
    ...(p.volumes
      ? {
          volumes: p.volumes.map((v) => {
            const vOld = oldPrice(v.price, p.discount);
            return { name: v.name, price: rub(v.price), ...(vOld ? { oldPrice: rub(vOld) } : {}), images: v.images };
          }),
        }
      : {}),
    image: thumbs[0],
    ...(thumbs[1] ? { hoverImage: thumbs[1] } : {}),
    images,
    thumbs,
  });
}

writeFileSync("src/data/catalog-extra.json", JSON.stringify({ products, tags }, null, 2) + "\n");
console.log(
  `товаров: ${products.length}, фото: ${products.reduce((n, p) => n + p.images.length, 0)}, фон подогнан: ${adjusted}`,
);
