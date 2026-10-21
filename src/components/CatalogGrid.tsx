"use client";

// Каталог: счётчик, ряд фильтров (Figma: Frame 21159, 3027:7559) и сетка товаров.
// Тип, бренд, цена и сортировка фильтруют по-настоящему. Эффект и компоненты пока только отмечаются —
// у товаров ещё нет этих данных, они появятся вместе с базой товаров.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { filterOptions } from "@/data/catalog";
import { MultiSelect, Popover, PriceSelect, SingleSelect, type PriceRange } from "./Dropdown";
import { ProductCard, type Product } from "./ProductCard";
import { DropdownButton, FilterChip } from "./ui";

type Key = "type" | "brand" | "price" | "effect" | "ingredient" | "sort";

/** «18 продуктов», «1 продукт», «3 продукта» */
export function productsCount(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  const word =
    mod10 === 1 && mod100 !== 11
      ? "продукт"
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? "продукта"
        : "продуктов";
  return `${n} ${word}`;
}

const toNumber = (price: string) => Number(price.replace(/\D/g, ""));

/** на странице — 10 рядов по 4 карточки (десктоп); больше — появляется пагинация */
const PAGE = 40;

/** номера страниц с пропусками, как в макете: «1 2 3 4 … 10», «1 … 5 6 7 … 10», «1 … 7 8 9 10» */
function pageList(page: number, pages: number): (number | "…")[] {
  if (pages <= 6) return Array.from({ length: pages }, (_, i) => i + 1);
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  if (page <= 3) return [...range(1, 4), "…", pages];
  if (page >= pages - 2) return [1, "…", ...range(pages - 3, pages)];
  return [1, "…", page - 1, page, page + 1, "…", pages];
}

export function CatalogGrid({
  products,
  types,
  initialType,
  initialTypes,
  initialBrand,
  after,
  hideBrand = false,
  countPrefix = "",
}: {
  products: Product[];
  /** варианты для фильтра «Тип продукта» */
  types: string[];
  /** тип, выбранный ссылкой из меню: /catalog?type=Кремы */
  initialType?: string;
  /** сразу отметить несколько типов (подраздел-группа «Для лица») */
  initialTypes?: string[];
  /** бренд, отмеченный ссылкой: /catalog/beauty-gadgets?brand=Medicube (баннер «Medicube девайсы») */
  initialBrand?: string;
  after?: ReactNode;
  /** на странице бренда фильтр «Бренд» не нужен */
  hideBrand?: boolean;
  /** слово перед счётчиком: в поиске — «Найдено» («Найдено 4 продукта») */
  countPrefix?: string;
}) {
  const [open, setOpen] = useState<Key | null>(null);
  const [type, setType] = useState<string[]>(initialTypes ?? (initialType ? [initialType] : []));
  const [brand, setBrand] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [effect, setEffect] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceRange>({ from: "", to: "" });
  const [sort, setSort] = useState(filterOptions.sort[0]);

  // фильтры «прилипли» к верху? Пока нет — фон белый, как у страницы; прилипли — появляется стекло
  const bar = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = bar.current;
      if (!el || getComputedStyle(el).position !== "sticky") return setStuck(false);
      const top = parseFloat(getComputedStyle(el).top) || 0;
      setStuck(el.getBoundingClientRect().top <= top + 1 && window.scrollY > 0);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean) as string[])].sort((a, b) =>
    a.localeCompare(b),
  );

  let shown = products.filter((p) => {
    if (type.length && !type.includes(p.type ?? "")) return false;
    if (brand.length && !brand.includes(p.brand ?? "")) return false;
    const n = toNumber(p.price);
    if (price.from && n < Number(price.from)) return false;
    if (price.to && n > Number(price.to)) return false;
    return true;
  });
  if (sort === "сначала дешевле") shown = [...shown].sort((a, b) => toNumber(a.price) - toNumber(b.price));
  if (sort === "сначала дороже") shown = [...shown].sort((a, b) => toNumber(b.price) - toNumber(a.price));
  if (sort === "по рейтингу") shown = [...shown].sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));

  // страница пагинации; при смене фильтров или сортировки — снова первая
  const sig = JSON.stringify([type, brand, price, sort]);
  const [pg, setPg] = useState({ sig, n: 1 });
  const pages = Math.max(1, Math.ceil(shown.length / PAGE));
  const page = pg.sig === sig ? Math.min(pg.n, pages) : 1;
  const goTo = (n: number) => {
    setPg({ sig, n });
    // к началу сетки, чтобы не остаться внизу страницы
    const top = (bar.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };
  const onPage = shown.slice((page - 1) * PAGE, page * PAGE);

  const close = () => setOpen(null);
  const toggle = (k: Key) => setOpen((o) => (o === k ? null : k));

  const multi = (
    k: Key,
    label: string,
    placeholder: string,
    options: string[],
    value: string[],
    set: (v: string[]) => void,
  ) => (
    <Popover
      key={k}
      open={open === k}
      onClose={close}
      trigger={
        <FilterChip
          label={label}
          count={value.length}
          expanded={open === k}
          onClick={() => toggle(k)}
          onClear={() => set([])}
        />
      }
    >
      <MultiSelect
        placeholder={placeholder}
        options={options}
        value={value}
        onApply={(v) => {
          set(v);
          close();
        }}
      />
    </Popover>
  );

  const priceCount = price.from || price.to ? 1 : 0;

  return (
    <>
      <p className="text-caps text-secondary">
        {countPrefix ? `${countPrefix} ` : ""}
        {productsCount(shown.length)}
      </p>

      {/* ряд фильтров «прилипает» под шапку (или к верху экрана, когда шапка спрятана).
          Стеклянная подложка — псевдоэлемент на всю ширину экрана, видна только когда ряд прилип. На телефоне не прилипает:
          фильтры там в несколько строк и заняли бы пол-экрана (ждём мобильный макет) */}
      <div
        ref={bar}
        data-stuck={stuck || undefined}
        className="relative z-40 mt-5 flex flex-wrap items-center justify-between gap-3 py-3 transition-[top] duration-300 before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-[100vw] before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 md:sticky md:top-[var(--header-h,54px)] md:before:glass data-stuck:before:opacity-100"
      >
        <div className="flex flex-wrap items-center gap-3">
          {multi("type", "Тип продукта", "Выберите тип продукта", types, type, setType)}
          {!hideBrand && multi("brand", "Бренд", "Выберите бренд", brands, brand, setBrand)}
          <Popover
            open={open === "price"}
            onClose={close}
            trigger={
              <FilterChip
                label="Цена"
                count={priceCount}
                expanded={open === "price"}
                onClick={() => toggle("price")}
                onClear={() => setPrice({ from: "", to: "" })}
              />
            }
          >
            <PriceSelect
              ranges={filterOptions.price}
              value={price}
              onApply={(v) => {
                setPrice(v);
                close();
              }}
            />
          </Popover>
          {multi("effect", "Эффект для лица", "Выберите эффект", filterOptions.effect, effect, setEffect)}
          {multi("ingredient", "Компоненты", "Выберите компонент", filterOptions.ingredient, ingredient, setIngredient)}
        </div>
        <Popover
          open={open === "sort"}
          onClose={close}
          align="right"
          trigger={
            <DropdownButton expanded={open === "sort"} onClick={() => toggle("sort")}>
              {sort[0].toUpperCase() + sort.slice(1)}
            </DropdownButton>
          }
        >
          <SingleSelect
            options={filterOptions.sort}
            value={sort}
            onSelect={(v) => {
              setSort(v);
              close();
            }}
          />
        </Popover>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-3 md:gap-y-20 lg:grid-cols-4">
        {onPage.map((p) => (
          <div key={p.id} className="reveal">
            <ProductCard product={p} />
          </div>
        ))}
        {shown.length === 0 && (
          <p className="col-span-full py-10 text-base-s text-secondary">
            С такими фильтрами пусто — слишком строгий отбор. Снимите один-два, и средства найдутся.
          </p>
        )}
        {page === pages && after}
      </div>

      {/* pagination из Figma (11341:16467): стрелки 36 × 36 и номера 30 × 36 в рамке через 12 px,
          текущая страница тёмная, недоступная стрелка полупрозрачная, пропуск — три точки */}
      {pages > 1 && (
        <nav aria-label="Страницы" className="mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:mt-20">
          <PageArrow dir="prev" disabled={page === 1} onClick={() => goTo(page - 1)} />
          {pageList(page, pages).map((n, i) =>
            n === "…" ? (
              <span key={`gap${i}`} aria-hidden className="flex size-9 items-center justify-center">
                <svg width="16" height="3.2" viewBox="0 0 16 3.2" fill="currentColor">
                  <circle cx="2" cy="1.6" r="1.5" />
                  <circle cx="8" cy="1.6" r="1.5" />
                  <circle cx="14" cy="1.6" r="1.5" />
                </svg>
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => goTo(n)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Страница ${n}`}
                className={`flex h-9 min-w-[30px] items-center justify-center rounded-sm px-2 text-base-s transition-colors ${
                  n === page ? "bg-primary text-white" : "border border-line-light hover:border-primary"
                }`}
              >
                {n}
              </button>
            ),
          )}
          <PageArrow dir="next" disabled={page === pages} onClick={() => goTo(page + 1)} />
        </nav>
      )}
    </>
  );
}

/** стрелка пагинации (Figma: Pagination / Navigation): белый квадрат 36 в рамке, шеврон 16 серый; недоступная — 40 % */
function PageArrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Предыдущая страница" : "Следующая страница"}
      className="flex size-9 items-center justify-center rounded-sm border border-line-light bg-white text-tertiary transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={dir === "prev" ? "M10 4L6 8L10 12" : "M6 12L10 8L6 4"} />
      </svg>
    </button>
  );
}
