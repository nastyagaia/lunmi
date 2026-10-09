// Оформление заказа (Figma: checkout 1–6)
import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";
import { CheckoutCrumbs } from "@/components/CheckoutCrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Оформление — Lunmi",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-[80px]">
        <div className="px-4 md:px-6 xl:px-[96px]">
          <CheckoutCrumbs />
        </div>
        <div className="container-page">
          <h1 className="mt-8 text-h2 max-md:text-[20px] max-md:leading-[26px]">Оформление</h1>
          <Checkout />
        </div>
      </main>
      <Footer />
    </>
  );
}
