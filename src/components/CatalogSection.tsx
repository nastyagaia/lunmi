// Страница раздела каталога (макет catalog в Figma, 2936:6591): шапка с фото + фильтры и сетка товаров.
// Используется для /catalog («Уход для лица») и /catalog/<раздел>.
import Image from "next/image";
import { CatalogHeading } from "./CatalogHeading";
import { CatalogGrid } from "./CatalogGrid";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HelpCard } from "./HelpCard";
import type { Product } from "./ProductCard";
import { Button } from "./ui";
import { t } from "@/lib/i18n";

export function CatalogSection({
  title,
  href,
  hero,
  heroMobile,
  products,
  types,
  initialType,
  initialBrand,
  initialKind,
  group,
  heroWide = false,
}: {
  title: string;
  /** адрес раздела — для хлебных крошек («Главная / Уход для лица / Очищение») */
  href: string;
  hero: string;
  /** телефон: вырезанное фото из макета mobile banner, 344 × 200, растянуто на весь блок (как в макете) */
  heroMobile?: string;
  products: Product[];
  types: string[];
  initialType?: string;
  /** бренд из ссылки (?brand=Medicube): заголовок «Medicube» + название раздела, фильтр бренда отмечен */
  initialBrand?: string;
  /** вид из третьей колонки меню (?kind=Тени) */
  initialKind?: string;
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
        <section className="relative overflow-hidden bg-surface max-md:pt-12">
          <div className="container-page flex h-[200px] items-end justify-between md:h-[320px]">
            <CatalogHeading
              title={title}
              href={href}
              valid={group ? [...types, group.title] : types}
              initialType={group?.title ?? initialType}
            />
            {/* телефон (mobile banner из Figma): обложка 344 × 200 от x = 158, правый край уходит за экран */}
            <div
              className={`absolute top-12 left-[158px] h-[200px] w-[344px] md:relative md:left-auto md:block md:h-full md:shrink-0 xl:mr-[66px] ${heroWide ? "md:w-[min(692px,55%)]" : "md:w-[min(550px,60%)]"}`}
            >
              {heroMobile ? (
                <picture>
                  <source media="(min-width: 768px)" srcSet={hero} />
                  <img src={heroMobile} alt="" className="absolute inset-0 size-full object-fill" />
                </picture>
              ) : (
                <Image src={hero} alt="" fill priority sizes={heroWide ? "692px" : "550px"} className="object-cover" />
              )}
            </div>
          </div>
        </section>

        <div className="container-page pt-4">
          <div className="pb-6 md:hidden">
            <CatalogHeading
              title={title}
              href={href}
              valid={group ? [...types, group.title] : types}
              initialType={group?.title ?? initialType}
              only="crumbs"
            />
          </div>
          {products.length ? (
            // key: при переходе из меню на другой подраздел фильтры начинаются заново
            <CatalogGrid
              key={initialBrand ?? "all"}
              products={products}
              types={types}
              initialType={initialType}
              initialTypes={group?.types}
              groupTitle={group?.title}
              crumbs
              initialBrand={initialBrand}
              initialKind={initialKind}
              after={<HelpCard className="reveal col-span-2 self-start lg:col-span-1" />}
            />
          ) : (
            <div className="flex flex-col items-start gap-6 pb-10">
              <p className="text-base-s text-secondary">
                {t("Здесь пока пусто, но ненадолго: новинки уже летят к нам из Кореи.")}
              </p>
              <Button href="/catalog" size="M">
                {t("в каталог")}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
