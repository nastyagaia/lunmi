// Скидки: все товары с тегом скидки (−5 %, −10 % …), устроено как раздел каталога
import type { Metadata } from "next";
import { CatalogSection } from "@/components/CatalogSection";
import { catalogMenu } from "@/data/menu";
import { allProducts, sectionCovers } from "@/data/sections";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${t("Скидки")} — Lunmi`,
  description: t("Корейская косметика со скидкой в Lunmi."),
};

const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];

export default async function SalePage({ searchParams }: PageProps<"/sale">) {
  const products = allProducts.filter((p) => p.discount);
  const types = menuTypes.filter((t) => products.some((p) => p.type === t));
  const { type } = await searchParams;
  const initialType = typeof type === "string" && types.includes(type) ? type : undefined;
  return (
    <CatalogSection
      title="Скидки"
      href="/sale"
      hero={sectionCovers.sale}
      heroWide
      products={products}
      types={types}
      initialType={initialType}
    />
  );
}
