// Личный кабинет — главная (Figma: account, 5137:7394)
import type { Metadata } from "next";
import { AccountHome } from "@/components/Account";
import { AccountShell } from "@/components/AccountShell";
import type { Product } from "@/components/ProductCard";
import { allProducts } from "@/data/sections";

export const metadata: Metadata = { title: "Личный кабинет — Lunmi", robots: { index: false } };

/** «Подобрали для вас» — пока хиты из каталога; позже — по покупкам и AI-подбору */
const picks: Product[] = allProducts
  .filter((p) => p.hit)
  .slice(0, 3)
  .map(({ id, href, name, title, description, price, oldPrice, discount, hit, rating, image, hoverImage }) => ({
    id,
    href,
    name,
    title,
    description,
    price,
    oldPrice,
    discount,
    hit,
    rating,
    image,
    hoverImage,
  }));

export default function AccountPage() {
  return (
    <AccountShell>
      <AccountHome picks={picks} />
    </AccountShell>
  );
}
