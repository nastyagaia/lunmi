// Страница «Бренды» (Figma brands, 4124:17842)
import type { Metadata } from "next";
import Image from "next/image";
import { BrandList } from "@/components/BrandList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { brandLetter, brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Бренды — Lunmi",
  description: "Корейские бренды косметики в Lunmi: от COSRX и Anua до Round Lab и Torriden.",
};

export default function BrandsPage() {
  const items = brands.map((b) => ({ slug: b.slug, name: b.name, letter: brandLetter(b.name) }));

  return (
    <>
      <Header />
      <main>
        {/* photo bg — как в каталоге: фон surface 320 px, заголовок H1 слева снизу, фото 550 × 320 справа */}
        <section className="bg-surface">
          <div className="container-page flex h-[200px] items-end justify-between md:h-[320px]">
            <h1 className="pb-8 text-h1 max-md:text-[28px] max-md:leading-[36px] md:pb-[50px]">Бренды</h1>
            <div className="relative hidden h-full w-[min(550px,60%)] shrink-0 md:block xl:mr-[66px]">
              <Image src="/img/brands-hero.webp" alt="" fill priority sizes="550px" className="object-cover" />
            </div>
          </div>
        </section>

        <div className="container-page pt-5 pb-[17px]">
          <BrandList brands={items} />
        </div>
      </main>
      <Footer />
    </>
  );
}
