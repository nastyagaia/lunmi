// Каталог: раздел «Уход для лица» (макет catalog в Figma, 2936:6591)
import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { catalogPage, catalogProducts, catalogTypes } from "@/data/catalog";

export const metadata: Metadata = {
  title: `${catalogPage.title} — Lunmi`,
  description: "Корейская косметика для ухода за лицом: очищение, тонеры, сыворотки, кремы, маски и патчи.",
};

export default async function CatalogPage({ searchParams }: PageProps<"/catalog">) {
  const { type } = await searchParams;
  const initialType = typeof type === "string" && catalogTypes.includes(type) ? type : undefined;

  return (
    <CatalogSection
      title={catalogPage.title}
      hero={catalogPage.heroImage}
      products={catalogProducts}
      types={catalogTypes}
      initialType={initialType}
    />
  );
}
