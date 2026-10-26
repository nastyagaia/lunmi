"use client";

// Каталог: счётчик, ряд фильтров (Figma: Frame 21159, 3027:7559) и сетка товаров.
// Все фильтры работают: эффект и компоненты размечены по названию и текстам товара (sections.ts).
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { filterOptions } from "@/data/filter-options";
import { kindNames } from "@/data/kinds";
import { MultiSelect, Popover, PriceSelect, SingleSelect, type PriceRange } from "./Dropdown";
import { ProductCard, type Product } from "./ProductCard";
import { DropdownButton, FilterChip, Pill } from "./ui";
import { ChevronLeft, ChevronRight } from "./icons";
import { t, plural, isEn, RUB_PER_EUR, priceToNumber } from "@/lib/i18n";

type Key = "type" | "brand" | "price" | "effect" | "ingredient" | "sort";

/** «18 продуктов», «1 продукт», «3 продукта» */
export function productsCount(n: number) {
  return plural(n, ["продукт", "продукта", "продуктов"], ["product", "products"]);
}

const toNumber = priceToNumber;

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

type CatalogGridProps = {
  products: Product[];
  /** варианты для фильтра «Тип продукта» */
  types: string[];
  /** тип, выбранный ссылкой из меню: /catalog?type=Кремы */
  initialType?: string;
  /** сразу отметить несколько типов (подраздел-группа «Для лица») */
  initialTypes?: string[];
  /** бренд, отмеченный ссылкой: /catalog/beauty-gadgets?brand=Medicube (баннер «Medicube девайсы») */
  initialBrand?: string;
  /** вид, выбранный в третьей колонке меню: /catalog/makiyazh?type=Для глаз&kind=Тени */
  initialKind?: string;
  after?: ReactNode;
  /** на странице бренда фильтр «Бренд» не нужен */
  hideBrand?: boolean;
  /** слово перед счётчиком: в поиске — «Найдено» («Найдено 4 продукта») */
  countPrefix?: string;
  /** название группы из меню («Для лица» в макияже): в адресе ?type=Для лица — показываем её подразделы */
  groupTitle?: string;
  /** на странице раздела есть хлебные крошки — по ним и возвращаются из подраздела, кнопка «←» в ряду чипсов не нужна */
  crumbs?: boolean;
};

/** Подраздел и вид живут в адресе страницы (?type=…&kind=…): чипсы меняют адрес, крошки в шапке раздела читают его же,
 *  кнопка «Назад» в браузере возвращает к предыдущему подразделу */
export function CatalogGrid(props: CatalogGridProps) {
  return (
    <Suspense
      fallback={<CatalogGridView {...props} urlType={props.initialType ?? null} urlKind={props.initialKind ?? null} />}
    >
      <CatalogGridWithParams {...props} />
    </Suspense>
  );
}

function CatalogGridWithParams(props: CatalogGridProps) {
  const params = useSearchParams();
  return (
    <CatalogGridView
      {...props}
      urlType={params.get("type")}
      urlKind={params.get("kind")}
      chipLook={params.get("chips") === "text" ? "text" : CHIP_LOOK}
    />
  );
}

/** Вид чипсов подразделов и видов: «pill» — плашки с фоном (выбрала Настя, 25.10.2026), «text» — текстовые табы (пробовали, не понравились).
 *  Посмотреть табы: добавить к адресу ?chips=text */
const CHIP_LOOK: "pill" | "text" = "pill";

/** Поменять ?type / ?kind без перезагрузки страницы (Next синхронизирует useSearchParams с history) */
function setParams(next: Record<string, string | null>, push = false) {
  const sp = new URLSearchParams(window.location.search);
  for (const [k, v] of Object.entries(next)) {
    if (v) sp.set(k, v);
    else sp.delete(k);
  }
  const qs = sp.toString();
  window.history[push ? "pushState" : "replaceState"](null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

function CatalogGridView({
  products,
  types,
  initialTypes,
  initialBrand,
  after,
  hideBrand = false,
  countPrefix = "",
  groupTitle,
  crumbs = false,
  urlType,
  urlKind,
  chipLook = CHIP_LOOK,
}: CatalogGridProps & { urlType: string | null; urlKind: string | null; chipLook?: "pill" | "text" }) {
  const [open, setOpen] = useState<Key | null>(null);
  // выбранный подраздел — из адреса; группа из меню («Для лица») ограничивает список своими подразделами
  const selectedType = urlType && types.includes(urlType) ? urlType : null;
  const scope = !selectedType && groupTitle && urlType === groupTitle ? initialTypes : undefined;
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

  const passes = (p: Product) => {
    if (selectedType && p.type !== selectedType) return false;
    if (scope && !scope.includes(p.type ?? "")) return false;
    if (brand.length && !brand.includes(p.brand ?? "")) return false;
    if (effect.length && !effect.some((e) => p.effects?.includes(e))) return false;
    if (ingredient.length && !ingredient.some((i) => p.ingredients?.includes(i))) return false;
    const n = toNumber(p.price);
    // в английской версии цены в фильтре — в евро, в данных — в рублях
    const k = isEn ? RUB_PER_EUR : 1;
    if (price.from && n < Number(price.from) * k) return false;
    if (price.to && n > Number(price.to) * k) return false;
    return true;
  };
  const filtered = products.filter(passes);
  // виды показываем, когда выбран один тип и внутри него больше одного вида (у макияжа: тушь, подводка, тени…)
  const kinds = selectedType
    ? kindNames(selectedType)
          .map((name) => ({ name, count: filtered.filter((p) => p.kind === name).length }))
          .filter((k) => k.count)
    : [];
  const activeKind = kinds.length > 1 && kinds.some((k) => k.name === urlKind) ? urlKind : null;
  // чипсы: у выбранного подраздела с видами — виды, иначе — подразделы (выбранный подсвечен)
  const typeChips = (scope ?? types).filter((ty) => products.some((p) => p.type === ty));
  let shown = activeKind ? filtered.filter((p) => p.kind === activeKind) : filtered;
  if (sort === "сначала дешевле") shown = [...shown].sort((a, b) => toNumber(a.price) - toNumber(b.price));
  if (sort === "сначала дороже") shown = [...shown].sort((a, b) => toNumber(b.price) - toNumber(a.price));
  if (sort === "по рейтингу") shown = [...shown].sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));

  // страница пагинации; при смене фильтров или сортировки — снова первая
  const sig = JSON.stringify([selectedType, scope, brand, effect, ingredient, price, sort, activeKind]);
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

  // как у ЗЯ: чипсы — только пока есть куда «провалиться» дальше. Выбран конечный уровень
  // (вид или подраздел без видов) — ряд чипсов убираем, назад ведут хлебные крошки.
  // Без крошек (бренд, поиск, все товары) чипсы остаются переключателями, как раньше
  const showKinds = kinds.length > 1 && (!crumbs || !activeKind);
  const showTypes = !showKinds && (!crumbs || !selectedType) && typeChips.length > 1;
  const hasChips = showKinds || showTypes;
  // порядок по Figma (catalog 2936:6591): чипсы → через 52 px «Найдено 45 продуктов» → через 16 px фильтры → через 32 px карточки
  const chipsTop = "";

  return (
    <>

      {/* чипсы — Filter Chips из Figma (catalog 2936:6591): над фильтрами, между собой 12 px, до фильтров 16 px.
          Выбран подраздел с видами — показываем виды («Гидрофильное масло · Бальзам · Пенка…»), иначе — подразделы */}
      {showKinds ? (
        <ChipRow className={chipsTop} gap={chipLook === "text" ? "gap-6" : "gap-3"} label={t("Вид продукта")}>
          {!crumbs && selectedType && (
            <Pill look={chipLook} selected={false} onClick={() => setParams({ type: null, kind: null }, true)}>
              ← {t(selectedType)}
            </Pill>
          )}
          {kinds.map((k) => (
            <Pill
              look={chipLook}
              key={k.name}
              selected={activeKind === k.name}
              onClick={() => setParams({ kind: activeKind === k.name ? null : k.name }, true)}
            >
              {t(k.name)}
            </Pill>
          ))}
        </ChipRow>
      ) : (
        showTypes && (
          <ChipRow className={chipsTop} gap={chipLook === "text" ? "gap-6" : "gap-3"} label={t("Тип продукта")}>
            {typeChips.map((ty) => (
              <Pill
                look={chipLook}
                key={ty}
                selected={selectedType === ty}
                onClick={() => setParams({ type: selectedType === ty ? null : ty, kind: null }, true)}
              >
                {t(ty)}
              </Pill>
            ))}
          </ChipRow>
        )
      )}

      {/* от пилюль до карточек — 32 px, как от счётчика товаров до фильтров; без пилюль — тоже 32 (12 у ряда фильтров + 20) */}
      <p className={`${hasChips ? "mt-[52px]" : ""} text-caps text-secondary`}>
        {countPrefix || crumbs ? `${t(countPrefix || "Найдено")} ` : ""}
        {productsCount(shown.length)}
      </p>

      {/* ряд фильтров «прилипает» под шапку (или к верху экрана, когда шапка спрятана).
          Стеклянная подложка — псевдоэлемент на всю ширину экрана, видна только когда ряд прилип. На телефоне не прилипает:
          фильтры там в несколько строк и заняли бы пол-экрана (ждём мобильный макет) */}
      <div
        ref={bar}
        data-stuck={stuck || undefined}
        className={`relative z-40 mt-1 flex flex-wrap items-center justify-between gap-3 py-3 transition-[top] duration-300 before:pointer-events-none before:absolute before:inset-y-0 before:-inset-x-[100vw] before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 md:sticky md:top-[var(--header-h,54px)] md:before:glass data-stuck:before:opacity-100`}
      >
        <div className="flex flex-wrap items-center gap-3">
          {!hideBrand && multi("brand", t("Бренд"), t("Выберите бренд"), brands, brand, setBrand)}
          <Popover
            open={open === "price"}
            onClose={close}
            trigger={
              <FilterChip
                label={t("Цена")}
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
          {multi("effect", t("Эффект для лица"), t("Выберите эффект"), filterOptions.effect, effect, setEffect)}
          {multi("ingredient", t("Компоненты"), t("Выберите компонент"), filterOptions.ingredient, ingredient, setIngredient)}
        </div>
        <Popover
          open={open === "sort"}
          onClose={close}
          align="right"
          trigger={
            <DropdownButton expanded={open === "sort"} onClick={() => toggle("sort")}>
              {t(sort)[0].toUpperCase() + t(sort).slice(1)}
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
            {t("С такими фильтрами пусто — слишком строгий отбор. Снимите один-два, и средства найдутся.")}
          </p>
        )}
        {page === pages && after}
      </div>

      {/* pagination из Figma (11341:16467): стрелки 36 × 36 и номера 30 × 36 в рамке через 12 px,
          текущая страница тёмная, недоступная стрелка полупрозрачная, пропуск — три точки */}
      {pages > 1 && (
        <nav aria-label={t("Страницы")} className="mt-16 flex flex-wrap items-center gap-2 sm:gap-3 md:mt-20">
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
                aria-label={t("Страница {n}", { n })}
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
      aria-label={dir === "prev" ? t("Предыдущая страница") : t("Следующая страница")}
      className="flex size-9 items-center justify-center rounded-sm border border-line-light bg-white text-tertiary transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:opacity-40"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={dir === "prev" ? "M10 4L6 8L10 12" : "M6 12L10 8L6 4"} />
      </svg>
    </button>
  );
}

/** Ряд чипсов в одну строку, как у Ozon: не переносится, прокручивается вбок;
 *  стрелки по краям — те же, что у выбора даты в оформлении заказа, листают на 240 px */
function ChipRow({ children, label, gap, className = "" }: { children: ReactNode; label: string; gap: string; className?: string }) {
  const row = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  const update = () => {
    const el = row.current;
    if (el) setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    // выбранный чипс — в зоне видимости
    const selected = el.querySelector<HTMLElement>("[aria-pressed=true]");
    if (selected && selected.offsetLeft + selected.offsetWidth > el.clientWidth) el.scrollLeft = selected.offsetLeft - 40;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const arrow = "absolute top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm border border-line bg-white shadow-[1px_1px_2.5px_rgb(0_0_0/0.25)] transition-colors hover:border-primary";
  return (
    <div className={`relative ${className}`}>
      <div ref={row} onScroll={update} role="group" aria-label={label} className={`no-scrollbar flex overflow-x-auto [&>*]:shrink-0 [&>*]:whitespace-nowrap ${gap}`}>
        {children}
      </div>
      {!edge.start && (
        <>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <button type="button" onClick={() => row.current?.scrollBy({ left: -240, behavior: "smooth" })} aria-label={t("Назад")} className={`${arrow} left-0`}>
            <ChevronLeft className="size-4" />
          </button>
        </>
      )}
      {!edge.end && (
        <>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
          <button type="button" onClick={() => row.current?.scrollBy({ left: 240, behavior: "smooth" })} aria-label={t("Вперёд")} className={`${arrow} right-0`}>
            <ChevronRight className="size-4" />
          </button>
        </>
      )}
    </div>
  );
}
