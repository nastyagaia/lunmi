// Новинки: товары, добавленные последними (список — src/data/new-arrivals.ts), устроено как раздел каталога.
// Обложка — из Figma (photo, type=новинки, 7551:47354).
import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { catalogMenu } from "@/data/menu";
import { newArrivals } from "@/data/new-arrivals";
import { sectionCovers } from "@/data/sections";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${t("Новинки")} — Lunmi`,
  description: t("Новинки корейской косметики в Lunmi."),
};

const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];

export default async function NewPage({ searchParams }: PageProps<"/new">) {
  const types = menuTypes.filter((t) => newArrivals.some((p) => p.type === t));
  const { type } = await searchParams;
  const initialType = typeof type === "string" && types.includes(type) ? type : undefined;
  return (
    <CatalogSection
      title="Новинки"
      hero={sectionCovers.novinki}
      heroWide
      products={newArrivals}
      types={types}
      initialType={initialType}
    />
  );
}
