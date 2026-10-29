"use client";

// Navigation Menu из UI KIT: desktop — плашка с меню, mobile — бургер
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { catalogMenu } from "@/data/menu";
import { useCart } from "./Cart";
import { CatalogMenu } from "./CatalogMenu";
import { CityMenu, ProfileMenu } from "./HeaderMenus";
import { LangSwitch } from "./LangSwitch";
import { MobileMenus } from "./MobileMenus";
import { SearchPanel } from "./SearchPanel";
import { BurgerIcon, CartIcon, CloseIcon, HeartIcon, Logo, SearchIcon } from "./icons";
import { t } from "@/lib/i18n";

// «Доставка» — в футере и в «Частых вопросах», как у крупных магазинов (25.10.2026)
const nav = ["Каталог", "Скидки", "Новинки", "Бренды", "Подбор косметики"];
const navHref: Record<string, string> = {
  Каталог: "/catalog",
  Скидки: "/sale",
  Новинки: "/new",
  Бренды: "/brands",
  "Подбор косметики": "/ai",
  Доставка: "/delivery",
};

/** hideOnScroll — шапка уезжает вверх, когда листают вниз, и возвращается при прокрутке вверх.
 *  Видимую высоту шапки пишем в CSS-переменную --header-h: по ней «прилипают» фильтры каталога. */
export function Header({ hideOnScroll = false }: { hideOnScroll?: boolean }) {
  const [open, setOpen] = useState(false);
  // в мобильном меню «Каталог» открывает список разделов вместо перехода
  const [mobileCatalog, setMobileCatalog] = useState(false);
  const cart = useCart();
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

  const closeMobile = useCallback(() => setOpen(false), []);

  // пока открыто меню каталога или мобильное меню — шапку не прячем
  const isHidden = hidden && !catalogOpen && !open && !searchOpen;

  useEffect(() => {
    // на телефоне шапка 48 px (Figma Menu / size=mobile), с md — 54
    const full = window.matchMedia("(min-width: 768px)").matches ? "54px" : "48px";
    document.documentElement.style.setProperty("--header-h", isHidden ? "0px" : full);
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
        {/* на десктопе — три колонки 1fr / auto / 1fr: меню всегда ровно по центру и не сдвигается от длины города */}
        <div className="flex h-12 items-center md:h-[54px] justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" aria-label={t("Lunmi, на главную")} className="-ml-0.5 text-accent">
              <Logo className="h-5 w-auto md:h-6" />
            </Link>
            {/* на телефоне и планшете «Каталог» — словом рядом с логотипом: сразу открывает разделы, без бургера */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false);
                const show = !(open && mobileCatalog);
                setOpen(show);
                setMobileCatalog(show);
              }}
              aria-expanded={open && mobileCatalog}
              aria-controls="mobile-menu"
              className={`flex h-9 items-center px-1.5 text-base-s transition-colors hover:text-accent lg:hidden ${
                open && mobileCatalog ? "text-accent" : ""
              }`}
            >
              {t("Каталог")}
            </button>
            <CityMenu className="hidden lg:block" />
          </div>

          <nav aria-label={t("Основное меню")} className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) =>
                item === "Каталог" ? (
                  <li key={item}>
                    <button
                      type="button"
                      onMouseEnter={() => {
                        setSearchOpen(false);
                        setCatalogOpen(true);
                      }}
                      onClick={() => {
                        setSearchOpen(false);
                        setCatalogOpen((v) => !v);
                      }}
                      aria-expanded={catalogOpen}
                      aria-controls="catalog-menu"
                      className="flex h-11 items-center text-base-s transition-colors hover:text-accent"
                    >
                      {t(item)}
                    </button>
                  </li>
                ) : (
                  <li key={item}>
                    <Link
                      href={navHref[item] ?? "#"}
                      onMouseEnter={() => setCatalogOpen(false)}
                      className="flex h-11 items-center text-base-s transition-colors hover:text-accent"
                    >
                      {t(item)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:gap-2 lg:justify-self-end">
            <LangSwitch className="max-lg:hidden" />
            <button
              type="button"
              onClick={() => {
                // открываем поиск — меню и каталог закрываются, чтобы не было двух крестиков
                setCatalogOpen(false);
                setOpen(false);
                setSearchOpen((v) => !v);
              }}
              aria-expanded={searchOpen}
              aria-label={searchOpen ? t("Закрыть поиск") : t("Поиск")}
              className="flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <Link
              href="/favorites"
              aria-label={t("Избранное")}
              className="relative flex size-9 max-md:hidden items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
            >
              {/* без счётчика — по просьбе Насти; на телефоне сердечка нет — «Избранное» в бургер-меню */}
              <HeartIcon />
            </Link>
            <ProfileMenu />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(false);
                cart.setOpen(true);
              }}
              aria-label={cart.count ? t("Корзина, товаров: {n}", { n: cart.count }) : t("Корзина")}
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
              onClick={() => {
                // открываем меню — поиск закрывается
                setSearchOpen(false);
                setOpen((v) => !v);
                setMobileCatalog(false);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("Закрыть меню") : t("Открыть меню")}
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
      {/* телефон и планшет: «Каталог» и бургер — шторки на весь экран (мобильные макеты) */}
      {/* key — при каждом открытии каталог начинается с первого уровня */}
      <MobileMenus
        key={open ? (mobileCatalog ? "catalog" : "burger") : "closed"}
        mode={open ? (mobileCatalog ? "catalog" : "burger") : null}
        onClose={closeMobile}
        links={[
          ...nav.filter((n) => n !== "Каталог").map((n) => ({ label: t(n), href: navHref[n] ?? "#" })),
          { label: t("Избранное"), href: "/favorites" },
        ]}
      />
    </header>
  );
}
