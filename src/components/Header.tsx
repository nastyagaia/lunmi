"use client";

// Navigation Menu из UI KIT: desktop — плашка с меню, mobile — бургер
import Link from "next/link";
import { useEffect, useState } from "react";
import { BurgerIcon, CartIcon, ChevronDown, CloseIcon, HeartIcon, Logo, ProfileIcon, SearchIcon } from "./icons";

const nav = ["Каталог", "Скидки", "Бренды", "Подбор косметики", "Доставка"];

function IconLink({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href="#"
      aria-label={label}
      className={`flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent ${className}`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <div className="container-page">
        <div className="flex h-11 items-center justify-between rounded-sm border border-surface bg-white px-3 shadow-menu md:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Lunmi, на главную" className="text-accent">
              <Logo className="h-5 w-auto md:h-6" />
            </Link>
            <button
              type="button"
              className="hidden items-center gap-1 p-2 text-base-s transition-colors hover:text-accent lg:flex"
            >
              Санкт-Петербург
              <ChevronDown />
            </button>
          </div>

          <nav aria-label="Основное меню" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) => (
                <li key={item}>
                  <Link href="#" className="flex h-11 items-center text-base-s transition-colors hover:text-accent">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <IconLink label="Поиск">
              <SearchIcon />
            </IconLink>
            <IconLink label="Избранное" className="hidden sm:flex">
              <HeartIcon />
            </IconLink>
            <IconLink label="Личный кабинет" className="hidden sm:flex">
              <ProfileIcon />
            </IconLink>
            <IconLink label="Корзина">
              <CartIcon />
            </IconLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:text-accent lg:hidden"
            >
              {open ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Мобильное меню"
            className="mt-1.5 max-h-[calc(100dvh-72px)] overflow-y-auto rounded-sm border border-surface bg-white p-4 shadow-menu lg:hidden"
          >
            <button type="button" className="mb-2 flex items-center gap-1 py-2 text-base-s text-secondary">
              Санкт-Петербург
              <ChevronDown />
            </button>
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item} className="border-b border-surface last:border-0">
                  <Link
                    href="#"
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center text-h4 transition-colors hover:text-accent"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2 sm:hidden">
              <Link href="#" className="flex items-center gap-2 py-2 text-base-s">
                <HeartIcon /> Избранное
              </Link>
              <Link href="#" className="ml-4 flex items-center gap-2 py-2 text-base-s">
                <ProfileIcon /> Кабинет
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
