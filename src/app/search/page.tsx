// Результаты поиска (Figma search results, 6028:36265): поле поиска, «Найдено N продуктов», фильтры и сетка
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SearchField } from "@/components/SearchField";
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
        <div className="container-page pt-[96px]">
          {/* key: новый запрос — поле начинается с него */}
          <SearchField key={query} initial={query} />
        </div>
        <div className="container-page pt-10">
          {found.length ? (
            <CatalogGrid
              key={query}
              products={found}
              types={types}
              countPrefix="Найдено"
            />
          ) : (
            // как в панели поиска (Figma 11021:19490)
            <p aria-live="polite" className="pb-10 text-base-s">
              {query ? "Ничего не найдено." : "Введите запрос — например, Anua или сыворотка с витамином C."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
