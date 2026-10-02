"use client";

// Маленькое хранилище в браузере (localStorage) с подпиской для React — как у корзины и избранного.
// Пока нет входа по почте, контакты и адреса покупателя живут здесь; потом переедут в аккаунт.
import { useSyncExternalStore } from "react";

export function createStore<T>(key: string, initial: T) {
  let value: T | undefined;
  const listeners = new Set<() => void>();

  const read = (): T => {
    if (value !== undefined) return value;
    try {
      const raw = localStorage.getItem(key);
      value = raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      value = initial; // в приватном режиме хранилище может быть недоступно
    }
    return value;
  };

  const set = (next: T | ((prev: T) => T)) => {
    value = typeof next === "function" ? (next as (prev: T) => T)(read()) : next;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* не сохранится после перезагрузки — не страшно */
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };

  const useValue = () => useSyncExternalStore(subscribe, read, () => initial);
  return { useValue, set, read };
}
