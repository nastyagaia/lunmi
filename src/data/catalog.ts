// Страница каталога (Figma: catalog, 2936:6591). Разделы и товары — в sections.ts.
import type { Product } from "@/components/ProductCard";
import { sectionCovers, sectionProducts, sectionTypes } from "./sections";

export const catalogPage = {
  title: "Уход для лица",
  heroImage: sectionCovers.uhod,
};

// варианты фильтров — в отдельном файле, чтобы фильтры каталога (клиентский компонент) не тянули в браузер все товары
export { filterOptions } from "./filter-options";

/** Товары раздела «Уход для лица» (в том числе из других папок: SPF, тонеры из Glow-skin и т. п.) */
export const catalogProducts: Product[] = sectionProducts(catalogPage.title);

/** Типы в порядке меню каталога — только те, где есть товары */
export const catalogTypes = sectionTypes(catalogPage.title, catalogProducts);
