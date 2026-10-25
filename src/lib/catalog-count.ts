// Сколько товаров сейчас в сетке каталога — его показывает шапка раздела («Найдено 45 продуктов»),
// а считает сетка с фильтрами. Маленькое общее хранилище между двумя клиентскими компонентами.
import { useSyncExternalStore } from "react";

let count: number | null = null;
const listeners = new Set<() => void>();

export function setCatalogCount(n: number) {
  if (n === count) return;
  count = n;
  listeners.forEach((l) => l());
}

export function useCatalogCount(fallback: number) {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => count ?? fallback,
    () => fallback,
  );
}
