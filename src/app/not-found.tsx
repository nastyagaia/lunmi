// Страница 404 (Figma: 404 11254:14654, телефон — 404 mobile 11609:21937):
// заголовок H2 (на телефоне H3), через 12 текст, через 24 кнопка «на главную»; справа куколка с табличкой 404 и две звёздочки.
// На телефоне куколка под текстом (рамка 361, картинка 320 по центру), кнопка — под ней на всю ширину.
import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: `${t("Страница не найдена")} — Lunmi` };

const darkButton = "h-[52px] bg-primary px-8 text-white hover:bg-secondary";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-page pt-20 pb-12 md:grid md:grid-cols-12 md:gap-x-2 md:pt-[104px] md:pb-[144px]">
        <div className="flex flex-col items-start md:col-span-7">
          <h1 className="text-h3 md:text-h2">{t("Страница не найдена")}</h1>
          <p className="mt-3 text-base-s">{t("Похоже, такой страницы больше нет или её никогда не существовало.")}</p>
          <Button href="/" size="M" className={`mt-6 max-md:hidden ${darkButton}`}>
            {t("на главную")}
          </Button>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-[361px] p-5 md:col-span-5 md:col-start-8 md:mx-0 md:mt-[39px] md:max-w-[400px] md:p-0">
          <Image
            src="/img/not-found-doll-4babbb.webp"
            alt=""
            width={400}
            height={400}
            priority
            sizes="(min-width: 768px) 400px, 320px"
            className="h-auto w-full"
          />
          <Image
            src="/img/account/order-sparkle-right-f09d5c.webp"
            alt=""
            width={43}
            height={51}
            className="absolute top-10 right-1 h-auto w-[33px] xl:top-[47px] xl:-right-[72px] xl:w-[31px]"
          />
          <Image
            src="/img/account/order-sparkle-left-06ed5b.webp"
            alt=""
            width={39}
            height={46}
            className="absolute top-[230px] left-1 h-auto w-[31px] xl:top-[256px] xl:-left-[76px] xl:w-[33px]"
          />
        </div>

        <Button href="/" size="M" className={`mt-6 w-full md:hidden ${darkButton}`}>
          {t("на главную")}
        </Button>
      </main>
      <Footer />
    </>
  );
}
