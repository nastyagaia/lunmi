// Разделы каталога и все товары магазина.
// Товары: «Уход для лица» (face-care.json) + остальные разделы (catalog-extra.json, scripts/import-catalog.mjs).
// Один товар живёт в нескольких разделах без дублей: основной раздел — category/type,
// дополнительные — also: [раздел, подраздел]. Позже всё это переедет в базу товаров.
import type { Product } from "@/components/ProductCard";
import extra from "./catalog-extra.json";
import covers from "./covers.json";
import faceCare from "./face-care.json";
import { catalogMenu } from "./menu";
import productTexts from "./product-texts.json";
import productsEn from "@/i18n/products-en.json";
import { isEn } from "@/lib/i18n";
import { kindOf } from "./kinds";

export type CatalogProduct = Product & {
  images: string[];
  thumbs: string[];
  category: string;
  also?: string[][];
  /** оттенки (scripts/import-catalog.mjs): images — номера фото этого оттенка в images */
  shades?: { name: string; color: string; images?: number[] }[];
  /** объёмы с ценой и номерами фото (Lador Hydro LPP: 530 и 150 мл) */
  volumes?: { name: string; price: string; oldPrice?: string; images?: number[] }[];
};

const FACE = "Уход для лица";
const tags = extra.tags as Record<string, string[][]>;

/** Фильтры «Эффект» и «Компоненты»: ищем признаки в названии, описании, разделах и вкладках товара */
const EFFECTS: [string, RegExp][] = [
  ["Антивозрастной эффект", /антивозраст|морщин|retin|ретин|peptide|пептид|bakuchiol|бакучиол|ginseng|женьшен/i],
  ["Восстановление барьера", /барьер|керамид|церамид|ceramid|пантенол|panthenol/i],
  ["Выравнивание тона", /тон(а)? кожи|выравнива|пигмент|пятн|осветл|arbutin|арбутин|txa|транексам|kojic|койев/i],
  ["Гладкость кожи", /гладк|рельеф|отшелуш|пилинг|peel|exfol/i],
  ["Защита кожи", /\bspf|\buv\b|солнцезащ|sun ?(cream|stick|serum|gel|screen|milk)/i],
  ["Контроль себума", /себум|жирн(ой|ая|ую) кож|чёрн(ые|ых) точ|bha|blackhead|pore|пор(ы|ах|ам)\b/i],
  ["Лифтинг", /лифтинг|подтяг|lift|овал|упругост|firming/i],
  ["Матирование", /матов|матир|matte|blur|размыт/i],
  ["Сияние", /сияни|сияющ|glow/i],
  ["Увлажнение", /увлажн|hydra|moist|гиалурон|hyalu|aqua|water/i],
];
const INGREDIENTS: [string, RegExp][] = [
  ["AHA кислоты", /\baha\b|гликолев|молочн(ая|ой) кислот|миндальн(ая|ой) кислот|фруктов(ые|ых) кислот/i],
  ["Азелаиновая кислота", /azelaic|азелаин/i],
  ["Бакучиол", /bakuchiol|бакучиол/i],
  ["Бензоил пероксид", /benzoyl|бензоил/i],
  ["Витамин C", /vitamin ?c|vita ?c\b|витамин(ом|а)? c\b|аскорбин|облепих/i],
  ["Витамин E", /vitamin ?e\b|витамин(ом|а)? e\b|токоферол/i],
  ["Гиалуроновая кислота", /hyalu|гиалурон/i],
  ["Гликолевая кислота", /glycolic|гликолев/i],
  ["Ниацинамид", /niacin|ниацинамид/i],
  ["Пептиды", /peptide|пептид/i],
  ["Ретинол", /retin|ретин/i],
  ["Центелла", /centella|cica|madeca|центелл|мадекасс/i],
];
const texts = productTexts as Record<string, Record<string, string | null>>;
function withFilterTags(p: CatalogProduct): CatalogProduct {
  // вид внутри подраздела (тушь, тени, пенка, стик…) — для пилюль и третьей колонки меню
  const kind = kindOf(p);
  if (kind) p = { ...p, kind };
  // макияж и гаджеты по уходовым фильтрам не размечаем — там это только путает
  if (p.category === "Макияж" || p.category === "Бьюти-гаджеты") return p;
  const t = texts[p.id] ?? {};
  const hay = [p.name, p.title, p.description, p.type, p.category, ...(p.also ?? []).flat(), t["Характеристики"], t["Состав"]]
    .filter(Boolean)
    .join(" ");
  // компоненты — только по названию и вкладке «Состав»: в советах бывает «не сочетайте с ретинолом»
  const formula = [p.name, p.title, p.description, t["Состав"]].filter(Boolean).join(" ");
  return {
    ...p,
    effects: EFFECTS.filter(([, re]) => re.test(hay)).map(([name]) => name),
    ingredients: INGREDIENTS.filter(([, re]) => re.test(formula)).map(([name]) => name),
  };
}

/** Английская версия: описание и название — из src/i18n/products-en.json, «мл» → «ml».
 *  Фильтры (effects, ingredients) уже посчитаны по русским текстам — их подписи переводятся при показе. */
function inEnglish(p: CatalogProduct): CatalogProduct {
  if (!isEn) return p;
  const e = (productsEn as Record<string, { description: string; title?: string }>)[p.id];
  return {
    ...p,
    ...(e && { description: e.description, ...(e.title && { title: e.title }) }),
    ...(p.volumes && { volumes: p.volumes.map((v) => ({ ...v, name: v.name.replace("мл", "ml") })) }),
  };
}

export const allProducts: CatalogProduct[] = [
  ...faceCare.map((p) => ({ ...p, category: FACE, ...(tags[p.id] ? { also: tags[p.id] } : {}) })),
  ...(extra.products as CatalogProduct[]),
].map(withFilterTags).map(inEnglish);

export type Section = { slug: string; title: string; href: string; hero: string };

/** Обложки разделов 550 × 320 — из Figma (photos, 7551:47401), подписаны по разделам */
export const sectionCovers = covers as Record<string, string>;

/** Разделы в порядке меню. У «Ухода для лица» адрес /catalog — так сложилось исторически */
export const sections: Section[] = catalogMenu.map((c) => ({
  slug: c.slug,
  title: c.title,
  href: c.href,
  hero: sectionCovers[c.slug || "uhod"] ?? "/img/catalog-hero.webp",
}));

/** Товары раздела; type у каждого — подраздел внутри этого раздела (для фильтра «Тип продукта») */
export function sectionProducts(title: string): Product[] {
  return allProducts.flatMap((p) => {
    if (p.category === title) return [p];
    const sub = p.also?.find(([s]) => s === title)?.[1];
    return sub ? [{ ...p, type: sub }] : [];
  });
}

/** Подразделы-группы в меню: «Для лица» в макияже объединяет несколько точных подразделов */
export const typeGroups: Record<string, string[]> = {
  "Для лица": ["Кушоны", "Тональные средства", "Румяна", "Хайлайтеры и контуринг", "Пудры и фиксаторы"],
};

/** Подразделы раздела в порядке меню — только те, где есть товары */
export function sectionTypes(title: string, products: Product[]) {
  const menu = catalogMenu.find((c) => c.title === title)?.items.map((i) => i.title) ?? [];
  return menu.filter((t) => products.some((p) => p.type === t));
}

/** Адрес подраздела: /catalog/dlya-tela?type=Скрабы */
export const sectionHref = (title: string, type?: string) => {
  const base = sections.find((s) => s.title === title)?.href ?? "/catalog";
  return type ? `${base}?type=${encodeURIComponent(type)}` : base;
};
