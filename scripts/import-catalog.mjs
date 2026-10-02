// Импорт остальных разделов каталога (тело, волосы, загар, гаджеты, Glow-skin, антивозрастной уход)
// из папки с материалами по списку scripts/catalog.extra.mjs:
// 1) фото товаров → public/img/catalog/;
// 2) данные → src/data/catalog-extra.json (товары и разделы уже существующих товаров).
// Обложки разделов — из Figma (src/data/covers.json).
// «Уход для лица» импортируется отдельно: scripts/import-face-care.mjs.
// Запуск: node scripts/import-catalog.mjs
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, extraProducts, tags } from "./catalog.extra.mjs";
import { oldPrice, productPhoto, rub } from "./image-utils.mjs";

const OUT_IMG = "public/img/catalog";
// папки этого скрипта собираем заново (в именах — отпечаток содержимого, старые копии не нужны)
for (const dir of [OUT_IMG]) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

let adjusted = 0;
const products = [];
for (const p of extraProducts) {
  const images = [];
  const thumbs = [];
  for (const [i, file] of p.files.entries()) {
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
