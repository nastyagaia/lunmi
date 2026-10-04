// Страница раздела каталога (макет catalog в Figma, 2936:6591): шапка с фото + фильтры и сетка товаров.
// Используется для /catalog («Уход для лица») и /catalog/<раздел>.
import Image from "next/image";
import { CatalogGrid } from "./CatalogGrid";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HelpCard } from "./HelpCard";
import type { Product } from "./ProductCard";
import { Button } from "./ui";

export function CatalogSection({
  title,
  hero,
  products,
  types,
  initialType,
  group,
  heroWide = false,
}: {
  title: string;
  hero: string;
  products: Product[];
  types: string[];
  initialType?: string;
  /** подраздел-группа из меню («Для лица»): её название и подразделы */
  group?: { title: string; types: string[] };
  /** обложка «Скидок» в макете шире — 692 × 320 */
  heroWide?: boolean;
}) {
  return (
    <>
      <Header hideOnScroll />
      {/* overflow-x-clip: стеклянная подложка фильтров тянется на всю ширину экрана */}
      <main className="overflow-x-clip">
        {/* photo bg: фон surface 320 px, заголовок H1 слева снизу, фото 550 × 320 справа */}
        <section className="bg-surface">
          <div className="container-page flex h-[200px] items-end justify-between md:h-[320px]">
            <h1 className="pb-8 text-h1 max-md:text-[28px] max-md:leading-[36px] md:pb-[50px]">
              {group?.title ?? initialType ?? title}
            </h1>
            <div
              className={`relative hidden h-full shrink-0 md:block xl:mr-[66px] ${heroWide ? "w-[min(692px,55%)]" : "w-[min(550px,60%)]"}`}
            >
              <Image src={hero} alt="" fill priority sizes={heroWide ? "692px" : "550px"} className="object-cover" />
            </div>
          </div>
        </section>

        <div className="container-page pt-10 md:pt-[70px]">
          {products.length ? (
            // key: при переходе из меню на другой подраздел фильтры начинаются заново
            <CatalogGrid
              key={group?.title ?? initialType ?? "all"}
              products={products}
              types={types}
              initialType={initialType}
              initialTypes={group?.types}
              after={<HelpCard className="reveal col-span-2 self-start" />}
            />
          ) : (
            <div className="flex flex-col items-start gap-6 pb-10">
              <p className="text-base-s text-secondary">Раздел скоро наполнится — мы уже везём новинки из Кореи.</p>
              <Button href="/catalog" size="M">
                в каталог
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
