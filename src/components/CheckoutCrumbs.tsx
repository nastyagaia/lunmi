"use client";

// Хлебные крошки оформления: стрелка — назад, «Корзина» открывает корзину, «Оформление» — текущая страница
import { useRouter } from "next/navigation";
import { useCart } from "./Cart";
import { ArrowLeft } from "./icons";

export function CheckoutCrumbs() {
  const router = useRouter();
  const cart = useCart();
  return (
    <nav aria-label="Хлебные крошки" className="-ml-0.5 flex items-center gap-1 text-base-s text-secondary">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Назад"
        className="mr-3 flex h-7 w-8 items-center pr-3 text-primary transition-colors hover:text-accent"
      >
        <ArrowLeft />
      </button>
      <button type="button" onClick={() => cart.setOpen(true)} className="transition-colors hover:text-primary">
        Корзина
      </button>
      <span aria-hidden>/</span>
      <span aria-current="page">Оформление</span>
    </nav>
  );
}
