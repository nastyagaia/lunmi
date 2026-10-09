// Подбор средств (Figma: ai picker, 5891:31357)
import type { Metadata } from "next";
import { AiPicker } from "@/components/AiPicker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { catalogProducts } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Подбор средств — Lunmi",
  description: "Расскажи, что беспокоит, укажи бюджет — и мы подберём корейский уход из каталога Lunmi.",
};

export default function AiPage() {
  return (
    <>
      <Header />
      <main>
        <AiPicker products={catalogProducts} />
      </main>
      <Footer />
    </>
  );
}
