// «Все товары» — весь ассортимент одной сеткой с фильтрами и пагинацией (плитка «Смотреть весь каталог» на главной).
// Устроено как раздел каталога; обложка — из Figma (photo, type=весь каталог, 11468:17700).
import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { catalogMenu } from "@/data/menu";
import { allProducts, sectionCovers } from "@/data/sections";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: `${t("Все товары")} — Lunmi` };

const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];
const types = menuTypes.filter((t) => allProducts.some((p) => p.type === t));

export default async function AllProductsPage({ searchParams }: PageProps<"/catalog/all">) {
  const { type } = await searchParams;
  const initialType = typeof type === "string" && types.includes(type) ? type : undefined;
  return (
    <CatalogSection
      title="Все товары"
      href="/catalog/all"
      hero={sectionCovers["vse-tovary"]}
      products={allProducts}
      types={types}
      initialType={initialType}
    />
  );
}
