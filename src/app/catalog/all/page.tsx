// «Все товары» — весь ассортимент одной сеткой с фильтрами и пагинацией (плитка «Смотреть весь каталог» на главной).
// Своей вёрстки нет: та же сетка, что в разделах и на поиске
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { catalogMenu } from "@/data/menu";
import { allProducts } from "@/data/sections";

export const metadata: Metadata = { title: "Все товары — Lunmi" };

const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];
const types = menuTypes.filter((t) => allProducts.some((p) => p.type === t));

export default function AllProductsPage() {
  return (
    <>
      <Header hideOnScroll />
      <main className="overflow-x-clip">
        <div className="container-page pt-[106px]">
          <h1 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">Все товары</h1>
        </div>
        <div className="container-page pt-6 pb-10">
          <CatalogGrid products={allProducts} types={types} />
        </div>
      </main>
      <Footer />
    </>
  );
}
