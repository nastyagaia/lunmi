// Страница «Бренды» (Figma brands, 4124:17842)
import type { Metadata } from "next";
import Image from "next/image";
import { BrandList } from "@/components/BrandList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { brandLetter, brands } from "@/data/brands";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${t("Бренды")} — Lunmi`,
  description: t("Корейские бренды косметики в Lunmi: от COSRX и Anua до Round Lab и Torriden."),
};

export default function BrandsPage() {
  const items = brands.map((b) => ({ slug: b.slug, name: b.name, letter: brandLetter(b.name) }));

  return (
    <>
      <Header />
      <main>
        {/* photo bg — как в каталоге: фон surface 320 px, заголовок H1 слева снизу, фото 550 × 320 справа.
            Телефон (brands mobile 11572:18350): шапка 200, фото 344 × 200 от x = 158, заголовок H3 */}
        <section className="relative overflow-hidden bg-surface max-md:pt-12">
          <div className="container-page flex h-[200px] items-end justify-between md:h-[320px]">
            <h1 className="relative z-10 pb-[38px] text-h3 md:pb-[50px] md:text-h1">{t("Бренды")}</h1>
            <div className="absolute top-12 left-[158px] h-[200px] w-[344px] md:relative md:top-auto md:left-auto md:h-full md:w-[min(550px,60%)] md:shrink-0 xl:mr-[66px]">
              <Image src="/img/brands-hero.webp" alt="" fill priority sizes="550px" className="object-cover" />
            </div>
          </div>
        </section>

        <div className="container-page pt-4 pb-[17px] md:pt-5">
          <BrandList brands={items} />
        </div>
      </main>
      <Footer />
    </>
  );
}
