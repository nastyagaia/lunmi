// Бренды: собираются из товаров каталога, отдельно их вести не нужно.
// Описание — первая фраза вкладки «О бренде» у товаров бренда (тексты из product-texts.json).
// Позже, с базой товаров, у брендов появятся свои описания, как в макете brand page (7557:47423).
import type { Product } from "@/components/ProductCard";
import { allProducts } from "./sections";
import productTexts from "./product-texts.json";

export type Brand = { slug: string; name: string; description: string; products: Product[] };

export const brandSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const texts = productTexts as Record<string, Record<string, string | null>>;

function describe(name: string, products: Product[]) {
  for (const p of products) {
    const first = texts[p.id]?.["О бренде"]?.match(/^[^.]*бренд[^.]*\./)?.[0];
    if (first) return first;
  }
  return `${name} — корейский бренд косметики.`;
}

export const brands: Brand[] = Object.entries(
  Object.groupBy(
    allProducts.filter((p) => p.brand),
    (p) => p.brand!,
  ),
)
  .map(([name, products = []]) => ({ slug: brandSlug(name), name, description: describe(name, products), products }))
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);

/** Буква для алфавитного списка: A–Z, остальное (цифры) — под «#» */
export const brandLetter = (name: string) => {
  const c = name[0].toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
};
