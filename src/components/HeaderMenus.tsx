"use client";

// Выпадающие списки шапки (Figma над кадром home, 2570:929):
// город — dropdown 5097:7282: поиск по городу, строки 44 px, у выбранного серый фон surface и галочка;
// профиль — dropdown 5306:12746: строки 47 px с иконкой 24 px и текстом 14 px.
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { cities } from "@/data/cities";
import { createStore } from "@/lib/persist";
import { Popover } from "./Dropdown";
import { useFavorites } from "./Favorites";
import {
  BagIcon,
  CheckIcon,
  ChevronDown,
  HeartIcon,
  LogoutIcon,
  ProfileIcon,
  ReviewIcon,
  SparkleIcon,
  SupportIcon,
} from "./icons";
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

/** Пункты меню профиля — разделы личного кабинета. Входа по почте пока нет: «Выйти» ведёт на главную */
const profileItems: { title: string; href: string; icon: ReactNode }[] = [
  { title: "Главная", href: "/account", icon: <SparkleIcon /> },
  { title: "Заказы", href: "/account/orders", icon: <BagIcon /> },
  { title: "Избранное", href: "/favorites", icon: <HeartIcon /> },
  { title: "Отзывы", href: "/account/reviews", icon: <ReviewIcon /> },
  { title: "Мои данные", href: "/account/profile", icon: <ProfileIcon /> },
  { title: "Поддержка", href: "/account/help", icon: <SupportIcon /> },
  { title: "Выйти", href: "/", icon: <LogoutIcon /> },
];

export function ProfileMenu({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const favorites = useFavorites();

  return (
    <div className={className}>
      <Popover
        open={open}
        onClose={close}
        align="right"
        trigger={
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label="Личный кабинет"
            className={`flex size-9 items-center justify-center rounded-full transition-colors hover:text-accent ${
              open ? "text-accent" : "text-primary"
            }`}
          >
            <ProfileIcon />
          </button>
        }
      >
        <ul role="menu" className="flex flex-col gap-0.5">
          {profileItems.map((it) => (
            <li key={it.title} role="none">
              <Link
                role="menuitem"
                href={it.href}
                onClick={close}
                className="flex h-[47px] items-center gap-2 px-4 text-base-s transition-colors hover:bg-surface"
              >
                <span className="flex size-6 shrink-0 items-center justify-center">{it.icon}</span>
                {it.title}
                {it.title === "Избранное" && favorites.count > 0 && (
                  <span className="ml-auto text-base-xs text-tertiary">{favorites.count}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}
