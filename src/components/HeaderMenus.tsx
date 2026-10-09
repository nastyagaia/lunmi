"use client";

// Шапка: выбор города — dropdown 5097:7282 (поиск по городу, строки 44 px, у выбранного серый фон surface и галочка);
// иконка профиля — сразу в личный кабинет (выпадающее меню 5306:12746 убрано по просьбе Насти).
import Link from "next/link";
import { useCallback, useState } from "react";
import { cities } from "@/data/cities";
import { authStore } from "@/lib/account";
import { createStore } from "@/lib/persist";
import { Popover } from "./Dropdown";
import { openLogin } from "./Login";
import { CheckIcon, ChevronDown, ProfileIcon } from "./icons";
import { Search } from "./Search";

/** выбранный город запоминается в браузере */
export const cityStore = createStore<string>("lunmi-city", "Санкт-Петербург");

export function CityMenu({ className = "" }: { className?: string }) {
  const city = cityStore.useValue();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  const q = query.trim().toLowerCase().replace(/ё/g, "е");
  const shown = q ? cities.filter((c) => c.toLowerCase().replace(/ё/g, "е").includes(q)) : cities;

  return (
    <div className={className}>
      <Popover
        open={open}
        onClose={close}
        trigger={
          <button
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="flex items-center gap-1 p-2 text-base-s transition-colors hover:text-secondary"
          >
            {city}
            <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        }
      >
        <Search
          label="Поиск по городу"
          placeholder="Поиск по городу"
          value={query}
          onChange={setQuery}
          className="mx-4"
        />
        <ul role="listbox" aria-label="Город" className="max-h-[396px] overflow-y-auto">
          {shown.map((c) => (
            <li key={c} role="option" aria-selected={c === city}>
              <button
                type="button"
                onClick={() => {
                  cityStore.set(c);
                  close();
                }}
                className={`flex h-11 w-full items-center justify-between px-4 text-left text-base-s transition-colors hover:bg-surface ${
                  c === city ? "bg-surface" : ""
                }`}
              >
                {c}
                {c === city && <CheckIcon />}
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="px-4 py-3 text-base-s text-tertiary">Такого города пока нет</li>}
        </ul>
      </Popover>
    </div>
  );
}

/** Иконка профиля: вошли — сразу «Главная» личного кабинета, не вошли — окно входа. Выпадающего меню нет */
export function ProfileMenu({ className = "" }: { className?: string }) {
  const email = authStore.useValue().email;
  const cls = "flex size-9 items-center justify-center rounded-full text-primary transition-colors hover:text-accent";

  return (
    <div className={className}>
      {email ? (
        <Link href="/account" aria-label="Личный кабинет" className={cls}>
          <ProfileIcon />
        </Link>
      ) : (
        <button type="button" onClick={openLogin} aria-label="Войти в личный кабинет" className={cls}>
          <ProfileIcon />
        </button>
      )}
    </div>
  );
}
