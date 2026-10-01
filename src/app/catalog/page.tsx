// Страница каталога (макет catalog в Figma, 2936:6591)
import type { Metadata } from "next";
import Image from "next/image";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpCard } from "@/components/HelpCard";
import { catalogPage, catalogProducts, catalogTypes } from "@/data/catalog";

export const metadata: Metadata = {
  title: `${catalogPage.title} — Lunmi`,
  description: "Корейская косметика для ухода за лицом: очищение, тонеры, сыворотки, кремы, маски и патчи.",
};

export default async function CatalogPage({ searchParams }: PageProps<"/catalog">) {
  const { type } = await searchParams;
  const initialType = typeof type === "string" && catalogTypes.includes(type) ? type : undefined;

  return (
    <>
      <Header hideOnScroll />
      {/* overflow-x-clip: стеклянная подложка фильтров тянется на всю ширину экрана */}
      <main className="overflow-x-clip">
        {/* photo bg: фон surface 320 px, заголовок H1 слева снизу, фото 550 × 320 справа */}
        <section className="bg-surface">
          <div className="container-page flex h-[200px] items-end justify-between md:h-[320px]">
            <h1 className="pb-8 text-h1 max-md:text-[28px] max-md:leading-[36px] md:pb-[50px]">{initialType ?? catalogPage.title}</h1>
            <div className="relative hidden h-full w-[550px] shrink-0 md:block xl:mr-[66px]">
              <Image
                src={catalogPage.heroImage}
                alt=""
                fill
                priority
                sizes="550px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <div className="container-page pt-10 md:pt-[70px]">
          {/* key: при переходе из меню на другой раздел фильтры начинаются заново */}
          <CatalogGrid
            key={initialType ?? "all"}
            products={catalogProducts}
            types={catalogTypes}
            initialType={initialType}
            after={<HelpCard className="reveal col-span-2 self-start" />}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
