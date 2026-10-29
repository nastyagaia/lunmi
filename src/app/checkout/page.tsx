// Оформление заказа (Figma: checkout 1–6)
import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";
import { CheckoutCrumbs } from "@/components/CheckoutCrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${t("Оформление")} — Lunmi`,
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-[80px]">
        <div className="px-4 md:px-6 xl:px-[96px]">
          <CheckoutCrumbs />
        </div>
        <div className="container-page">
          <h1 className="mt-6 text-h3 md:mt-8 md:text-h2">{t("Оформление")}</h1>
          <Checkout />
        </div>
      </main>
      <Footer />
      {/* телефон: место под закреплённую кнопку «Оплатить» */}
      <div className="h-[120px] md:hidden" aria-hidden />
    </>
  );
}
