// Результаты поиска (Figma search results, 6028:36265): запрос заголовком, «Найдено N продуктов», фильтры и сетка
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { catalogMenu } from "@/data/menu";
import { allProducts } from "@/data/sections";
import { searchProducts } from "@/lib/search";

export const metadata: Metadata = { title: "Поиск — Lunmi" };

const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const found = searchProducts(query, allProducts);
  const types = menuTypes.filter((t) => found.some((p) => p.type === t));

  return (
    <>
      <Header hideOnScroll />
      <main className="overflow-x-clip">
        {/* поля поиска здесь нет — ищут из шапки; вместо него заголовок с запросом, как у «Избранного» */}
        <div className="container-page pt-[106px]">
          {query && <h1 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">«{query}»</h1>}
        </div>
        <div className="container-page pt-6">
          {found.length ? (
            <CatalogGrid key={query} products={found} types={types} countPrefix="Найдено" />
          ) : (
            // как в панели поиска (Figma 11021:19490)
            <p aria-live="polite" className="pb-10 text-base-s">
              {query
                ? "Ничего не нашлось. Попробуйте написать иначе — например, название бренда или «сыворотка»."
                : "Что ищем? Например, Anua или сыворотку с витамином C."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
