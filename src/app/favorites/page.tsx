// Избранное (Figma favorites, 4996:6196)
import type { Metadata } from "next";
import { FavoritesList } from "@/components/FavoritesList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = { title: "Избранное — Lunmi" };

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
