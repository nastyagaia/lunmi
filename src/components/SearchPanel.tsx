"use client";

// Поиск (Figma search, 10978:15949 / 10978:15950): под шапкой выезжает серая панель surface —
// по центру поле 824 px (8 колонок) (иконка, текст 14 px, крестик очистки, тёмная круглая кнопка со стрелкой),
// под ним «История»: последние запросы через 20 px, у каждого крестик удаления.
// Пока вводят текст, ищем сразу: если ничего нет — «Ничего не найдено.» и серая стрелка (Figma 11021:19490).
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { searchProducts, type Searchable } from "@/lib/search";
import { ArrowRight, CloseIcon, SearchIcon } from "./icons";

const STORAGE_KEY = "lunmi-search-history";
const MAX_HISTORY = 6;
const EMPTY: string[] = [];
let store: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (store) return store;
  try {
    store = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    store = [];
  }
  return store ?? EMPTY;
}

function write(list: string[]) {
  store = list;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* история просто не сохранится */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Запомнить запрос: свежий — наверх, без повторов */
export function rememberSearch(q: string) {
  const list = read().filter((x) => x.toLowerCase() !== q.toLowerCase());
  write([q, ...list].slice(0, MAX_HISTORY));
}

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const history = useSyncExternalStore(subscribe, read, () => EMPTY);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  // список для живого поиска — скачиваем один раз, когда панель впервые открыли
  const [index, setIndex] = useState<Searchable[] | null>(null);
  useEffect(() => {
    if (!open || index) return;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex([]));
  }, [open, index]);
  const text = query.trim();
  // пока список не скачался — не пугаем «ничего не найдено»
  const nothing = Boolean(text && index?.length && searchProducts(text, index).length === 0);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (q: string) => {
    const value = q.trim();
    if (!value) return;
    rememberSearch(value);
    onClose();
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">
        <div className="bg-surface px-4 pt-6 pb-[60px] md:px-6">
          <div className="mx-auto max-w-[824px]">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (!nothing) go(query);
              }}
              className="flex h-12 items-center gap-2 border-b border-tertiary"
            >
              <SearchIcon className="size-6 shrink-0 text-tertiary" />
              <label htmlFor="site-search" className="sr-only">
                Поиск по сайту
              </label>
              <input
                ref={input}
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти"
                autoComplete="off"
                className="h-full min-w-0 flex-1 bg-transparent text-base-s caret-accent outline-none placeholder:text-secondary [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    input.current?.focus();
                  }}
                  aria-label="Очистить"
                  className="flex size-10 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
                >
                  <CloseIcon className="size-6" />
                </button>
              )}
              {/* icon button type=arrow: тёмный круг 32 px с белой стрелкой */}
              <button
                type="submit"
                aria-label="Искать"
                disabled={nothing}
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-colors ${
                  nothing ? "bg-tertiary" : "bg-primary hover:bg-accent"
                }`}
              >
                <ArrowRight className="size-4" />
              </button>
            </form>

            {nothing ? (
              <p aria-live="polite" className="mt-8 text-base-s">
                Ничего не найдено.
              </p>
            ) : history.length > 0 && (
              <div className="mt-8">
                <p className="text-caps text-secondary">История</p>
                <ul className="mt-5 flex flex-col gap-5">
                  {history.map((q) => (
                    <li key={q} className="group flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => go(q)}
                        className="py-2 text-left text-base-s transition-colors hover:text-accent"
                      >
                        {q}
                      </button>
                      {/* крестик виден при наведении на строку (и с клавиатуры) */}
                      <button
                        type="button"
                        onClick={() => write(history.filter((x) => x !== q))}
                        aria-label={`Удалить «${q}» из истории`}
                        className="flex size-10 items-center justify-center text-tertiary opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary focus-visible:opacity-100"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
