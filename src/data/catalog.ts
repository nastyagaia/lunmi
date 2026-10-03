// Страница каталога (Figma: catalog, 2936:6591). Разделы и товары — в sections.ts.
import type { Product } from "@/components/ProductCard";
import { sectionCovers, sectionProducts, sectionTypes } from "./sections";

export const catalogPage = {
  title: "Уход для лица",
  heroImage: sectionCovers.uhod,
};

/** Варианты в выпадающих списках фильтров (Figma: dropdown над макетом каталога) */
export const filterOptions = {
  effect: [
    "Антивозрастной эффект", "Восстановление барьера", "Выравнивание тона", "Гладкость кожи", "Защита кожи",
    "Контроль себума", "Лифтинг", "Матирование", "Сияние", "Увлажнение",
  ],
  ingredient: [
    "AHA кислоты", "Азелаиновая кислота", "Бакучиол", "Бензоил пероксид", "Витамин C", "Витамин E",
    "Гиалуроновая кислота", "Гликолевая кислота", "Ниацинамид", "Пептиды", "Ретинол", "Центелла",
  ],
  price: [
    { label: "до 500 ₽", from: "", to: "500" },
    { label: "500 ₽–1000 ₽", from: "500", to: "1000" },
    { label: "1000 ₽–2000 ₽", from: "1000", to: "2000" },
    { label: "2000 ₽–4000 ₽", from: "2000", to: "4000" },
    { label: "4000 ₽ и выше", from: "4000", to: "" },
  ],
  sort: ["по популярности", "сначала дешевле", "сначала дороже", "по рейтингу"],
};

/** Товары раздела «Уход для лица» (в том числе из других папок: SPF, тонеры из Glow-skin и т. п.) */
export const catalogProducts: Product[] = sectionProducts(catalogPage.title);

/** Типы в порядке меню каталога — только те, где есть товары */
export const catalogTypes = sectionTypes(catalogPage.title, catalogProducts);
