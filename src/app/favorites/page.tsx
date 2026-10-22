// Избранное (Figma favorites, 4996:6196)
import type { Metadata } from "next";
import { FavoritesList } from "@/components/FavoritesList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: `${t("Избранное")} — Lunmi` };

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <main className="container-page pt-[106px] pb-6">
        <FavoritesList />
      </main>
      <Footer />
    </>
  );
}
