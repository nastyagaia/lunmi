// Страница заказа (Figma: order assembling, 5042:6748) — без меню кабинета, на всю ширину
import type { Metadata } from "next";
import { AccountOrder } from "@/components/AccountOrder";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = { title: "Заказ — Lunmi", robots: { index: false } };

export default async function OrderPage({ params }: PageProps<"/account/orders/[number]">) {
  const { number } = await params;
  return (
    <>
      <Header />
      <main className="container-page pt-[86px] pb-6">
        <AccountOrder number={decodeURIComponent(number)} />
      </main>
      <Footer />
    </>
  );
}
