"use client";

// Избранное: хранится в браузере (localStorage), как корзина. Позже, со входом по почте, — в аккаунте.
// Храним карточку товара целиком, чтобы страница «Избранное» показывала её без поиска по каталогу.
import { useCallback, useSyncExternalStore } from "react";
import type { Product } from "./ProductCard";

const STORAGE_KEY = "lunmi-favorites";
const EMPTY: Product[] = [];
let store: Product[] | null = null;
const listeners = new Set<() => void>();

function read(): Product[] {
  if (store) return store;
  try {
    store = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    store = []; // в приватном режиме хранилище может быть недоступно
  }
  return store ?? EMPTY;
}

function write(list: Product[]) {
  store = list;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* не страшно: избранное просто не переживёт перезагрузку */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useFavorites() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);
  const has = useCallback((id: string) => items.some((p) => p.id === id), [items]);
  const toggle = useCallback((product: Product) => {
    const list = read();
    // новые — в начало списка
    write(list.some((p) => p.id === product.id) ? list.filter((p) => p.id !== product.id) : [product, ...list]);
  }, []);
  return { items, count: items.length, has, toggle };
}
