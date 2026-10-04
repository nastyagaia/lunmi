// Разделы каталога и все товары магазина.
// Товары: «Уход для лица» (face-care.json) + остальные разделы (catalog-extra.json, scripts/import-catalog.mjs).
// Один товар живёт в нескольких разделах без дублей: основной раздел — category/type,
// дополнительные — also: [раздел, подраздел]. Позже всё это переедет в базу товаров.
import type { Product } from "@/components/ProductCard";
import extra from "./catalog-extra.json";
import covers from "./covers.json";
import faceCare from "./face-care.json";
import { catalogMenu } from "./menu";

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

export const allProducts: CatalogProduct[] = [
  ...faceCare.map((p) => ({ ...p, category: FACE, ...(tags[p.id] ? { also: tags[p.id] } : {}) })),
  ...(extra.products as CatalogProduct[]),
];

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
