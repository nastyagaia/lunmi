// Страница бренда (Figma brand page 2, 7557:47423): крошки, название H1 и описание справа, затем сетка как в каталоге
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpCard } from "@/components/HelpCard";
import { ArrowLeft } from "@/components/icons";
import { brands, getBrand } from "@/data/brands";
import { catalogMenu } from "@/data/menu";

/** все подразделы меню по порядку — для фильтра «Тип продукта» */
const menuTypes = [...new Set(catalogMenu.flatMap((c) => c.items.map((i) => i.title)))];

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/brands/[slug]">): Promise<Metadata> {
  const brand = getBrand((await params).slug);
  if (!brand) return {};
  return { title: `${brand.name} — Lunmi`, description: brand.description };
}

export default async function BrandPage({ params }: PageProps<"/brands/[slug]">) {
  const brand = getBrand((await params).slug);
  if (!brand) notFound();
  const types = menuTypes.filter((t) => brand.products.some((p) => p.type === t));

  return (
    <>
      <Header hideOnScroll />
      {/* overflow-x-clip: стеклянная подложка фильтров тянется на всю ширину экрана */}
      <main className="overflow-x-clip">
        <div className="container-page pt-[70px] md:pt-[84px]">
          {/* breadcrumbs: стрелка назад (32 × 28), через 16 px путь серым */}
          <nav aria-label="Хлебные крошки" className="-ml-0.5 flex items-center gap-1 text-base-s text-secondary">
            <Link
              href="/brands"
              aria-label="Назад к брендам"
              className="mr-3 flex h-7 w-8 items-center pr-3 text-primary transition-colors hover:text-accent"
            >
              <ArrowLeft />
            </Link>
            <Link href="/brands" className="transition-colors hover:text-primary">
              Бренды
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{brand.name}</span>
          </nav>

          {/* название слева, описание — с третьей колонки сетки (6 колонок, 616 px) */}
          <div className="mt-8 grid gap-4 md:mt-8 lg:grid-cols-2 lg:gap-2">
            <h1 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">{brand.name}</h1>
            <p className="max-w-[616px] pt-0.5 text-base-s">{brand.description}</p>
          </div>
        </div>

        <div className="container-page pt-10 md:pt-[42px]">
          <CatalogGrid
            products={brand.products}
            types={types}
            hideBrand
            after={<HelpCard className="reveal col-span-2 self-start" />}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
