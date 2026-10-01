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
function productsCount(n: number) {
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

export function CatalogGrid({
  products,
  types,
  initialType,
  after,
}: {
  products: Product[];
  /** варианты для фильтра «Тип продукта» */
  types: string[];
  /** тип, выбранный ссылкой из меню: /catalog?type=Кремы */
  initialType?: string;
  after?: ReactNode;
}) {
  const [open, setOpen] = useState<Key | null>(null);
  const [type, setType] = useState<string[]>(initialType ? [initialType] : []);
  const [brand, setBrand] = useState<string[]>([]);
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

  const close = () => setOpen(null);
  const toggle = (k: Key) => setOpen((o) => (o === k ? null : k));

  const multi = (k: Key, label: string, placeholder: string, options: string[], value: string[], set: (v: string[]) => void) => (
    <Popover
      key={k}
      open={open === k}
      onClose={close}
      trigger={
        <FilterChip label={label} count={value.length} expanded={open === k} onClick={() => toggle(k)} onClear={() => set([])} />
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
      <p className="text-caps text-secondary">{productsCount(shown.length)}</p>

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
          {multi("brand", "Бренд", "Выберите бренд", brands, brand, setBrand)}
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

      <div className="mt-5 grid grid-cols-2 gap-x-1.5 gap-y-10 md:grid-cols-3 md:gap-y-20 lg:grid-cols-4">
        {shown.map((p) => (
          <div key={p.id} className="reveal">
            <ProductCard product={p} />
          </div>
        ))}
        {shown.length === 0 && (
          <p className="col-span-full py-10 text-base-s text-secondary">
            По этим фильтрам ничего не нашлось — попробуйте сбросить один из них.
          </p>
        )}
        {after}
      </div>
    </>
  );
}
