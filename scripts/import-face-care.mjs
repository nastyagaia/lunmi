// Импорт «Ухода для лица» из папки с материалами:
// 1) фото → public/img/face/<id>-<n>.webp (на фоне surface, не больше 1200 px по ширине — это 2x для фото 600 px).
//    Если у фото однотонный светло-серый фон, но чуть другого оттенка, всё фото слегка подкручивается
//    по каналам, чтобы фон стал точно #f3f4f5 (surface) — без вырезания, товар меняется на ~1%.
//    Такие фото сохраняются в webp «почти без потерь», иначе сжатие снова сдвигает оттенок фона;
// 2) данные → src/data/face-care.json (их читает каталог).
// Запуск: node scripts/import-face-care.mjs
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SOURCE, products } from "./face-care.manifest.mjs";
import { titles } from "./face-care.titles.mjs";

const OUT_IMG = "public/img/face";
// папку собираем заново: в имени файла — отпечаток содержимого, поэтому изменённое фото
// получает новое имя и браузер / Next.js не покажут старую копию из кэша
rmSync(OUT_IMG, { recursive: true, force: true });
mkdirSync(OUT_IMG, { recursive: true });

const SURFACE = [0xf3, 0xf4, 0xf5];
let adjusted = 0;

/** Цвет фона по углам (квадраты 12 × 12). Берём только светло-серые углы: на фото с моделью
 *  нижние углы закрыты плечами, а верхние — это фон. Если таких углов хотя бы два и они совпадают —
 *  возвращаем множители по каналам, которые переводят этот цвет в surface. Иначе null. */
async function backgroundFix(buffer) {
  const { width, height } = await sharp(buffer).metadata();
  const s = 12;
  const corners = [
    [0, 0],
    [width - s, 0],
    [0, height - s],
    [width - s, height - s],
  ];
  const colors = [];
  for (const [left, top] of corners) {
    const { data } = await sharp(buffer).extract({ left, top, width: s, height: s }).raw().toBuffer({ resolveWithObject: true });
    const sum = [0, 0, 0];
    for (let i = 0; i < data.length; i += 3) for (let c = 0; c < 3; c++) sum[c] += data[i + c];
    colors.push(sum.map((v) => v / (data.length / 3)));
  }
  const light = colors.filter((col) => col.every((v) => v > 225) && Math.max(...col) - Math.min(...col) < 8);
  if (light.length < 2) return null;
  const avg = [0, 1, 2].map((c) => light.reduce((a, col) => a + col[c], 0) / light.length);
  if (!light.every((col) => col.every((v, c) => Math.abs(v - avg[c]) < 4))) return null;
  if (avg.every((v, c) => Math.abs(v - SURFACE[c]) < 1)) return [1, 1, 1];
  return avg.map((v, c) => SURFACE[c] / v);
}

const rub = (n) => `${n.toLocaleString("ru-RU").replace(/ /g, " ")} ₽`;
const missing = [];
const data = [];

for (const p of products) {
  const images = [];
  const small = [];
  for (const [i, file] of p.files.entries()) {
    const src = path.join(SOURCE, file);
    if (!existsSync(src)) {
      missing.push(file);
      continue;
    }
    const fix = await backgroundFix(
      await sharp(src).resize({ width: 600 }).flatten({ background: "#f3f4f5" }).removeAlpha().toBuffer(),
    );
    if (fix) adjusted++;
    // два готовых размера: 1200 px — галерея на странице товара, 600 px — карточки и превью.
    // Next.js отдаёт их как есть (unoptimized), иначе его сжатие снова сдвигает оттенок фона
    const names = [];
    for (const width of [1200, 600]) {
      const webp = await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .flatten({ background: "#f3f4f5" })
        .removeAlpha()
        .linear(fix ?? [1, 1, 1], [0, 0, 0])
        // обычное сжатие webp округляет почти белые цвета и сбивает фон на 1–4 единицы,
        // поэтому фото с подогнанным фоном сохраняем «почти без потерь» — фон получается ровно surface
        .webp(fix ? { nearLossless: true, quality: 60 } : { quality: 82 })
        .toBuffer();
      const hash = createHash("md5").update(webp).digest("hex").slice(0, 6);
      const out = `${OUT_IMG}/${p.id}-${i + 1}-${width}-${hash}.webp`;
      writeFileSync(out, webp);
      names.push("/" + out.replace(/^public\//, ""));
    }
    images.push(names[0]);
    small.push(names[1]);
  }
  const old = p.discount ? Math.round(p.price / (1 - parseInt(p.discount) / 100) / 10) * 10 : undefined;
  // линейка без бренда: «Anua Peach 70 Niacin Serum» → «Peach 70 Niacin Serum»
  const squash = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
  const words = p.name.split(" ");
  let cut = 0;
  while (cut < words.length && squash(words.slice(0, cut + 1).join("")).length <= squash(p.brand).length) cut++;
  const line = squash(words.slice(0, cut).join("")) === squash(p.brand) ? words.slice(cut).join(" ") : p.name;
  data.push({
    id: p.id,
    href: `/product/${p.id}`,
    type: p.type,
    brand: p.brand,
    name: p.name,
    ...(titles[p.id] ? { title: titles[p.id] } : {}),
    line,
    description: p.description,
    price: rub(p.price),
    ...(old ? { oldPrice: rub(old) } : {}),
    ...(p.discount ? { discount: p.discount } : {}),
    ...(p.hit ? { hit: true } : {}),
    ...(p.rating ? { rating: p.rating } : {}),
    image: small[0],
    ...(small[1] ? { hoverImage: small[1] } : {}),
    images,
    thumbs: small,
  });
}

writeFileSync("src/data/face-care.json", JSON.stringify(data, null, 2) + "\n");
console.log(`товаров: ${data.length}, фото: ${data.reduce((n, p) => n + p.images.length, 0)}, фон подогнан: ${adjusted}`);
if (missing.length) console.log("не найдены файлы:\n" + missing.join("\n"));
