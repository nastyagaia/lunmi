"use client";

// Шапка: выбор города — dropdown 5097:7282 (поиск по городу, строки 44 px, у выбранного серый фон surface и галочка);
// на телефоне (в бургер-меню) — шторка «Изменить город» (change city mobile 11535:14755): поиск, список, «Подтвердить».
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
import { Sheet } from "./Sheet";
import { t } from "@/lib/i18n";

/** выбранный город запоминается в браузере */
export const cityStore = createStore<string>("lunmi-city", "Санкт-Петербург");

export function CityMenu({ className = "", sheet = false }: { className?: string; sheet?: boolean }) {
  const city = cityStore.useValue();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  const q = query.trim().toLowerCase().replace(/ё/g, "е");
  // ищем и по-русски, и по переводу (в английской версии — «Moscow»)
  const shown = q ? cities.filter((c) => `${c} ${t(c)}`.toLowerCase().replace(/ё/g, "е").includes(q)) : cities;

  const [picked, setPicked] = useState<string>();
  const trigger = (
    <button
      type="button"
      onClick={() => (open ? close() : setOpen(true))}
      aria-expanded={open}
      aria-haspopup="listbox"
      className="flex items-center gap-1 p-2 text-base-s transition-colors hover:text-secondary"
    >
      {t(city)}
      <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
    </button>
  );

  if (sheet) {
    const current = picked ?? city;
    const closeSheet = () => {
      close();
      setPicked(undefined);
    };
    return (
      <div className={className}>
        {trigger}
        <Sheet
          open={open}
          onClose={closeSheet}
          title="Изменить город"
          tall
          z="z-[80]"
          footer={
            <button
              type="button"
              onClick={() => {
                cityStore.set(current);
                closeSheet();
              }}
              className="h-[52px] bg-primary text-caps text-white transition-colors hover:bg-secondary"
            >
              {t("подтвердить")}
            </button>
          }
        >
          <Search label={t("Поиск по городу")} placeholder={t("Поиск по городу")} value={query} onChange={setQuery} />
          <ul role="listbox" aria-label={t("Город")} className="mt-2">
            {shown.map((c) => (
              <li key={c} role="option" aria-selected={c === current}>
                <button
                  type="button"
                  onClick={() => setPicked(c)}
                  className="flex h-[54px] w-full items-center justify-between text-left text-base-s"
                >
                  {t(c)}
                  {c === current && <CheckIcon />}
                </button>
              </li>
            ))}
            {shown.length === 0 && <li className="py-3 text-base-s text-tertiary">{t("Такого города пока нет")}</li>}
          </ul>
        </Sheet>
      </div>
    );
  }

  return (
    <div className={className}>
      <Popover
        open={open}
        onClose={close}
        trigger={trigger}
      >
        <Search
          label={t("Поиск по городу")}
          placeholder={t("Поиск по городу")}
          value={query}
          onChange={setQuery}
          className="mx-4"
        />
        <ul role="listbox" aria-label={t("Город")} className="max-h-[396px] overflow-y-auto">
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
                {t(c)}
                {c === city && <CheckIcon />}
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="px-4 py-3 text-base-s text-tertiary">{t("Такого города пока нет")}</li>}
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
        <Link href="/account" aria-label={t("Личный кабинет")} className={cls}>
          <ProfileIcon />
        </Link>
      ) : (
        <button type="button" onClick={openLogin} aria-label={t("Войти в личный кабинет")} className={cls}>
          <ProfileIcon />
        </button>
      )}
    </div>
  );
}
