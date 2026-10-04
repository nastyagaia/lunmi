"use client";

// Корзина: общее состояние на весь сайт + выезжающая панель mini cart (Figma 5527:53127).
// Товары хранятся в браузере (localStorage), чтобы корзина не пропадала после перезагрузки.
// Позже, со входом по почте, корзина будет сохраняться в аккаунте.
import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { CloseIcon, MinusIcon, QuantityPlusIcon } from "./icons";
import { Button } from "./ui";
import { isPrepared } from "@/lib/images";

export type CartItem = {
  /** id товара + вариант (оттенок или объём), чтобы разные оттенки лежали отдельными строками */
  key: string;
  name: string;
  description: string;
  /** цена за штуку в рублях */
  price: number;
  image: string;
  href?: string;
  qty: number;
};

type Cart = {
  items: CartItem[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "qty">, opts?: { show?: boolean }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  /** вернуть удалённую строку на её прежнее место («Отменить» в корзине) */
  restore: (item: CartItem, index: number) => void;
  qtyOf: (key: string) => number;
};

const CartContext = createContext<Cart | null>(null);
const STORAGE_KEY = "lunmi-cart";

export const rub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;
export const priceToNumber = (price: string) => Number(price.replace(/\D/g, ""));

// Хранилище корзины вне React: читаем из localStorage один раз, пишем при каждом изменении.
// useSyncExternalStore подписывает компоненты на него; на сервере корзина всегда пустая.
const EMPTY: CartItem[] = [];
let store: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (store) return store;
  try {
    store = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    store = []; // в приватном режиме хранилище может быть недоступно — начинаем с пустой корзины
  }
  return store ?? EMPTY;
}

function write(update: (list: CartItem[]) => CartItem[]) {
  store = update(read());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* не страшно: корзина просто не переживёт перезагрузку */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const [open, setOpen] = useState(false);

  const add = useCallback<Cart["add"]>((item, opts) => {
    write((list) => {
      const found = list.find((i) => i.key === item.key);
      return found
        ? list.map((i) => (i.key === item.key ? { ...i, qty: i.qty + 1 } : i))
        : [...list, { ...item, qty: 1 }];
    });
    if (opts?.show !== false) setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    write((list) =>
      qty <= 0 ? list.filter((i) => i.key !== key) : list.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((key: string) => write((list) => list.filter((i) => i.key !== key)), []);
  const restore = useCallback(
    (item: CartItem, index: number) =>
      write((list) => (list.some((i) => i.key === item.key) ? list : list.toSpliced(index, 0, item))),
    [],
  );

  const value = useMemo<Cart>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      restore,
      qtyOf: (key) => items.find((i) => i.key === key)?.qty ?? 0,
    }),
    [items, open, add, setQty, remove, restore],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart: нужен CartProvider в layout");
  return cart;
}

/** drower из UI KIT: затемнение background/overlay, справа белая панель до 600 px (уже макета 717 — как у Золотого Яблока) */
function CartDrawer() {
  const { items, count, total, open, setOpen, setQty, remove, restore } = useCart();
  // удалённые строки остаются на месте с «Отменить», пока корзина открыта
  const [removed, setRemoved] = useState<{ item: CartItem; index: number }[]>([]);
  // закрыли корзину — удалённые строки больше не показываем (сброс во время отрисовки, как советует React)
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setRemoved([]);
  }
  const drop = (item: CartItem) => {
    setRemoved((r) => [...r, { item, index: items.findIndex((i) => i.key === item.key) }]);
    remove(item.key);
  };
  const undo = (key: string) => {
    const r = removed.find((x) => x.item.key === key);
    if (!r) return;
    restore(r.item, r.index);
    setRemoved((list) => list.filter((x) => x.item.key !== key));
  };
  // строки вперемешку: живые товары и удалённые — по их прежним местам
  const rows: { item: CartItem; gone: boolean }[] = items.map((item) => ({ item, gone: false }));
  for (const r of [...removed].sort((a, b) => a.index - b.index))
    rows.splice(Math.min(r.index, rows.length), 0, { item: r.item, gone: true });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex justify-end transition-[visibility] duration-300 ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
      inert={!open}
    >
      {/* затемнение: клик закрывает корзину */}
      <button
        type="button"
        aria-label="Закрыть корзину"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-primary/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={`relative flex h-full w-full max-w-[600px] flex-col bg-white transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть корзину"
            className="flex size-10 items-center justify-center transition-colors hover:text-accent"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-5 pb-6 md:px-8">
          <h2 className="text-h2">Корзина{count > 0 && <span className="ml-2 text-tertiary">{count}</span>}</h2>
          {rows.length > 0 && (
            <p className="text-base-s">Проверьте состав заказа, заполните детали и переходите к оплате. 🌸</p>
          )}
        </div>

        {rows.length === 0 ? (
          <div className="flex flex-1 flex-col items-start gap-6 px-5 md:px-8">
            <p className="text-base-s text-secondary">Пока здесь пусто. Загляни в каталог — там много хорошего.</p>
            <Button href="/catalog" size="M" onClick={() => setOpen(false)}>
              в каталог
            </Button>
          </div>
        ) : (
          <>
            {/* Slot: строки товаров через 20 px, длинный список прокручивается */}
            <ul className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 md:px-8">
              {rows.map(({ item, gone }) => (
                <li key={item.key} className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => (gone ? undo(item.key) : drop(item))}
                    aria-label={gone ? `Вернуть «${item.name}»` : `Удалить «${item.name}»`}
                    className="-m-2 flex size-10 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
                  >
                    {/* close size=M из UI KIT — 24 × 24 */}
                    <CloseIcon className="size-6" />
                  </button>
                  <Link
                    href={item.href ?? "#"}
                    onClick={() => setOpen(false)}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xs bg-surface"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="80px"
                      unoptimized={isPrepared(item.image)}
                      className="object-cover"
                    />
                  </Link>
                  {gone ? (
                    // товар удалили: красная подпись и «Отменить» вместо описания и количества
                    <>
                      <p className="min-w-0 flex-1 text-base-s text-error">Вы удалили этот товар из корзины.</p>
                      <button
                        type="button"
                        onClick={() => undo(item.key)}
                        className="shrink-0 text-caps underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        отменить
                      </button>
                    </>
                  ) : (
                    <>
                      {/* cell: название, описание серым, цена серым */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Link
                          href={item.href ?? "#"}
                          onClick={() => setOpen(false)}
                          className="truncate text-base-m transition-colors hover:text-secondary"
                        >
                          {item.name}
                        </Link>
                        <p className="truncate text-base-s text-secondary">{item.description}</p>
                        <p className="text-base-s text-secondary">{rub(item.price)}</p>
                      </div>
                      {/* количество: «−  1  +» */}
                      <div className="flex shrink-0 items-center gap-3 text-base-m">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          aria-label="Убрать одну штуку"
                          className="-m-1.5 flex size-7 items-center justify-center transition-colors hover:text-accent"
                        >
                          <MinusIcon className="size-4" />
                        </button>
                        <span aria-live="polite" className="min-w-3 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          aria-label="Добавить ещё одну"
                          className="-m-1.5 flex size-7 items-center justify-center transition-colors hover:text-accent"
                        >
                          <QuantityPlusIcon className="size-4" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* итог: «Сумма» + «к оформлению» */}
            <div className="flex items-center gap-1.5 bg-white px-5 pt-6 pb-10 md:px-8 md:pb-[60px]">
              {/* total из UI KIT: «Сумма» — H4, под ней сумма — H3 */}
              <p className="flex min-w-[145px] shrink-0 flex-col pr-2">
                <span className="text-h4">Сумма</span>
                <span className="text-h3 whitespace-nowrap">{rub(total)}</span>
              </p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="flex h-[52px] flex-1 items-center justify-center rounded-xs bg-primary px-8 text-caps text-white transition-colors hover:bg-primary/85"
              >
                к оформлению
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
