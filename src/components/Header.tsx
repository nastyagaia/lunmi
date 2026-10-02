"use client";

// Navigation Menu из UI KIT: desktop — плашка с меню, mobile — бургер
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { catalogMenu } from "@/data/menu";
import { useCart } from "./Cart";
import { CatalogMenu } from "./CatalogMenu";
import { useFavorites } from "./Favorites";
import { SearchPanel } from "./SearchPanel";
import { BurgerIcon, CartIcon, ChevronDown, CloseIcon, HeartIcon, Logo, ProfileIcon, SearchIcon } from "./icons";

const nav = ["Каталог", "Скидки", "Бренды", "Подбор косметики", "Доставка"];
const navHref: Record<string, string> = { Каталог: "/catalog", Скидки: "/sale", Бренды: "/brands", "Подбор косметики": "/ai" };

function IconLink({
  label,
  href = "#",
  children,
  className = "",
}: {
  label: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent ${className}`}
    >
      {children}
    </Link>
  );
}

/** hideOnScroll — шапка уезжает вверх, когда листают вниз, и возвращается при прокрутке вверх.
 *  Видимую высоту шапки пишем в CSS-переменную --header-h: по ней «прилипают» фильтры каталога. */
export function Header({ hideOnScroll = false }: { hideOnScroll?: boolean }) {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const favorites = useFavorites();
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  // меню «Каталог» на десктопе: открывается наведением или кликом, закрывается, когда мышь ушла из шапки
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!hideOnScroll) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return; // мелкое дрожание прокрутки не считаем
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnScroll]);

  // пока открыто меню каталога или мобильное меню — шапку не прячем
  const isHidden = hidden && !catalogOpen && !open && !searchOpen;

  useEffect(() => {
    document.documentElement.style.setProperty("--header-h", isHidden ? "0px" : "54px");
  }, [isHidden]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setCatalogOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      onMouseLeave={() => setCatalogOpen(false)}
      className={`glass fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : ""
      }`}
    >
      {/* Menu/desktop из Figma: 1440 × 54, поля 96 px */}
      <div className="px-4 md:px-6 xl:px-[96px]">
        <div className="flex h-[54px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Lunmi, на главную" className="-ml-0.5 text-accent">
              <Logo className="h-5 w-auto md:h-6" />
            </Link>
            <button
              type="button"
              className="hidden items-center gap-1 p-2 text-base-s transition-colors hover:text-secondary lg:flex"
            >
              Санкт-Петербург
              <ChevronDown />
            </button>
          </div>

          <nav aria-label="Основное меню" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) =>
                item === "Каталог" ? (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseEnter={() => setCatalogOpen(true)}
                      onClick={() => setCatalogOpen((v) => !v)}
                      aria-expanded={catalogOpen}
                      aria-controls="catalog-menu"
                      className="flex h-11 items-center text-base-s transition-colors hover:text-accent"
                    >
                      {item}
                    </button>
                  </li>
                ) : (
                  <li key={item}>
                    <Link
                      href={navHref[item] ?? "#"}
                      onMouseEnter={() => setCatalogOpen(false)}
                      className="flex h-11 items-center text-base-s transition-colors hover:text-accent"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => {
                setCatalogOpen(false);
                setSearchOpen((v) => !v);
              }}
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Закрыть поиск" : "Поиск"}
              className="flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <Link
              href="/favorites"
              aria-label={favorites.count ? `Избранное, товаров: ${favorites.count}` : "Избранное"}
              className="relative hidden size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent sm:flex"
            >
              <HeartIcon />
              {favorites.count > 0 && (
                // как у корзины: розовая плашка поверх правого верхнего угла иконки
                <span className="absolute top-[7px] left-[11px] flex h-[14px] min-w-[19px] items-center justify-center rounded-full bg-accent px-1 text-[12px] leading-[11px] font-bold text-white">
                  {favorites.count}
                </span>
              )}
            </Link>
            <IconLink label="Личный кабинет" className="hidden sm:flex">
              <ProfileIcon />
            </IconLink>
            <button
              type="button"
              onClick={() => cart.setOpen(true)}
              aria-label={cart.count ? `Корзина, товаров: ${cart.count}` : "Корзина"}
              className="relative flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
            >
              <CartIcon />
              {cart.count > 0 && (
                // cart state3 из UI KIT: розовая плашка 19 × 14 поверх правого верхнего угла сумки, цифра 12 px bold
                <span className="absolute top-[7px] left-[11px] flex h-[14px] min-w-[19px] items-center justify-center rounded-full bg-accent px-1 text-[12px] leading-[11px] font-bold text-white">
                  {cart.count}
                </span>
              )}
            </button>
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

        {/* поиск выезжает под шапкой на всю ширину; -mx — чтобы серый фон шёл от края до края */}
        <div className="-mx-4 md:-mx-6 xl:-mx-[96px]">
          <SearchPanel open={searchOpen} onClose={closeSearch} />
        </div>

        {/* menu dropdown: шапка «вытягивается» вниз до 604 px — одно стекло, как у Gentle Monster */}
        <div
          id="catalog-menu"
          inert={!catalogOpen}
          className={`hidden transition-[grid-template-rows] duration-300 ease-out lg:grid ${
            catalogOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <CatalogMenu categories={catalogMenu} onNavigate={() => setCatalogOpen(false)} />
          </div>
        </div>
      </div>
        {open && (
          <nav
            id="mobile-menu"
            aria-label="Мобильное меню"
            className="glass-strong max-h-[calc(100dvh-54px)] overflow-y-auto border-t border-white/60 lg:hidden"
          >
            <div className="container-page py-4">
            <button type="button" className="mb-2 flex items-center gap-1 py-2 text-base-s text-secondary">
              Санкт-Петербург
              <ChevronDown />
            </button>
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item} className="border-b border-surface last:border-0">
                  <Link
                    href={navHref[item] ?? "#"}
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
            </div>
          </nav>
        )}
    </header>
  );
}
