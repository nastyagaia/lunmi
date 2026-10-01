// Страница товара (Figma: product 1 / Frame 21289 / product 3)
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpCard } from "@/components/HelpCard";
import { ArrowLeft } from "@/components/icons";
import { ProductBuy } from "@/components/ProductBuy";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductTabs } from "@/components/ProductTabs";
import { SectionHeader } from "@/components/ui";
import { getProduct, productSlugs } from "@/data/products";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} — Lunmi`, description: `${product.subtitle}. ${product.price}` };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main>
        {/* верх страницы на фоне surface: хлебные крошки, фото, информация и покупка */}
        <section className="bg-surface pt-[70px] pb-10 md:pt-20 lg:min-h-[680px]">
          {/* хлебные крошки — по линии логотипа: те же поля, что у шапки */}
          <div className="px-4 md:px-6 xl:px-[96px]">
            {/* breadcrumbs: стрелка назад, путь серым, последний пункт не кликается */}
            <nav aria-label="Хлебные крошки" className="-ml-0.5 flex items-center gap-1 text-base-s text-secondary">
              <Link
                href={product.category.href}
                aria-label="Назад"
                className="flex w-8 items-center py-1 pr-3 text-tertiary transition-colors hover:text-primary"
              >
                <ArrowLeft />
              </Link>
              <Link href="/catalog" className="transition-colors hover:text-primary">
                Каталог
              </Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{product.category.title}</span>
            </nav>
          </div>

          <div className="container-page">
            <div className="mt-6 grid gap-8 lg:mt-[26px] lg:grid-cols-[600px_minmax(0,504px)] lg:justify-between">
              <ProductGallery images={product.images} thumbs={product.thumbs} alt={product.name} />

              <div className="flex flex-col gap-10 lg:min-h-[510px] lg:gap-[100px] lg:pt-[58px]">
                <ProductBuy product={product} />
                {/* доставка и активные компоненты: подпись 96 px серым, значение справа */}
                <dl className="grid grid-cols-[96px_1fr] gap-x-8 gap-y-6 text-base-s">
                  <dt className="text-secondary">Доставка:</dt>
                  <dd>
                    {product.delivery.map((d) => (
                      <span key={d} className="block">
                        {d}
                      </span>
                    ))}
                  </dd>
                  {product.ingredients && (
                    <>
                      <dt className="text-secondary">Активные компоненты:</dt>
                      <dd>{product.ingredients}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* описание, отзывы и помощь — колонка 708 px */}
        <div className="container-page mt-20">
          <div className="flex max-w-[708px] flex-col gap-[60px]">
            {product.tabs && <ProductTabs tabs={product.tabs} />}
            {product.reviews.length > 0 && <ProductReviews reviews={product.reviews} />}
            <HelpCard layout="wide" />
          </div>
        </div>

        {product.similar.length > 0 && (
          <section className="container-page mt-[70px]">
            <SectionHeader title="Похожие товары" href="/catalog" />
            <Carousel label="Похожие товары" arrowTop={119} className="items-start">
              {product.similar.map((p) => (
                <div
                  key={p.id}
                  className="w-[70%] shrink-0 snap-start xs:w-[calc((100%-6px)/2)] md:w-[calc((100%-12px)/3)] lg:w-[calc((100%-18px)/4)]"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </Carousel>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
