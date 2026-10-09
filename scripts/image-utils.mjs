// Общая обработка фото товаров для скриптов импорта (import-face-care.mjs, import-catalog.mjs).
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const SURFACE = [0xf3, 0xf4, 0xf5];

/** Цвет фона по углам (квадраты 12 × 12). Берём только светло-серые углы: на фото с моделью
 *  нижние углы закрыты плечами, а верхние — это фон. Если таких углов хотя бы два и они совпадают —
 *  возвращаем множители по каналам, которые переводят этот цвет в surface. Иначе null. */
export async function backgroundFix(buffer) {
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
    const { data } = await sharp(buffer)
      .extract({ left, top, width: s, height: s })
      .raw()
      .toBuffer({ resolveWithObject: true });
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

/** Фото товара → два webp (1200 px для галереи и 600 px для карточек) на фоне surface.
 *  Возвращает пути для сайта и признак, подгонялся ли фон. В имени — отпечаток содержимого,
 *  поэтому изменённое фото получает новое имя и не берётся из кэша */
export async function productPhoto(src, outDir, base) {
  const fix = await backgroundFix(
    await sharp(src).resize({ width: 600 }).flatten({ background: "#f3f4f5" }).removeAlpha().toBuffer(),
  );
  const names = [];
  for (const width of [1200, 600]) {
    const webp = await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .flatten({ background: "#f3f4f5" })
      .removeAlpha()
      .linear(fix ?? [1, 1, 1], [0, 0, 0])
      // обычное сжатие webp сбивает почти белый фон на 1–4 единицы — фото с подогнанным фоном
      // сохраняем «почти без потерь», тогда фон ровно surface
      .webp(fix ? { nearLossless: true, quality: 60 } : { quality: 82 })
      .toBuffer();
    const hash = createHash("md5").update(webp).digest("hex").slice(0, 6);
    const out = `${outDir}/${base}-${width}-${hash}.webp`;
    writeFileSync(out, webp);
    names.push("/" + out.replace(/^public\//, ""));
  }
  return { large: names[0], small: names[1], adjusted: Boolean(fix) };
}

export const rub = (n) => `${n.toLocaleString("ru-RU").replace(/ /g, " ")} ₽`;

/** Цена до скидки, округлённая до 10 ₽ */
export const oldPrice = (price, discount) =>
  discount ? Math.round(price / (1 - parseInt(discount) / 100) / 10) * 10 : undefined;

/** Цвет оттенка для кружка на странице товара: самые насыщенные пиксели самого товара (без фона), по средним 20 % */
export async function shadeColor(src, tone) {
  const { data, info } = await sharp(src)
    .resize({ width: 300, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    if (mn > 222 && mx - mn < 14) continue; // фон: почти белый или серый surface
    // tone="skin" — только телесные оттенки (тональные средства): тёплые, без красной/фиолетовой упаковки
    if (tone === "skin" && !(r >= g && g >= b && g > r * 0.6 && r - b > 15 && r > 90)) continue;
    px.push([r, g, b, mx - mn]);
  }
  if (!px.length) return "#d9d9d9";
  px.sort((a, b) => b[3] - a[3]);
  const top = px.slice(Math.floor(px.length * 0.05), Math.max(1, Math.floor(px.length * 0.25)));
  const avg = [0, 1, 2].map((c) => Math.round(top.reduce((s, p) => s + p[c], 0) / top.length));
  return "#" + avg.map((v) => v.toString(16).padStart(2, "0")).join("");
}
