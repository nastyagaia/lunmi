"use client";

// menu dropdown из Figma (catalog menu 1, 5697:28114): выпадает из шапки, когда открыт «Каталог».
// Слева — категории (Category Item: Base/S, отступы 12 px, шеврон ›), выбранная — розовая.
// Дальше — подразделы выбранной категории, а у подразделов с видами (src/data/kinds.ts) — третья колонка:
// «Тушь · Подводка · Тени…», клик ведёт в раздел с выбранной пилюлей (весь подраздел — клик по нему самому). Колонки по 250 px, через 26 px.
import Link from "next/link";
import { useState } from "react";
import type { CatalogCategory } from "@/data/menu";
import { kindNames } from "@/data/kinds";
import { ChevronDown } from "./icons";
import { t } from "@/lib/i18n";

export function CatalogMenu({ categories, onNavigate }: { categories: CatalogCategory[]; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const current = categories[active];
  const item = activeItem === null ? undefined : current.items[activeItem];
  const kinds = item ? kindNames(item.title, current.title) : [];
  const pick = (i: number) => {
    setActive(i);
    setActiveItem(null);
  };

  return (
    <div className="flex h-[550px] gap-[26px] overflow-y-auto pt-4 pb-10">
      <ul className="w-[250px] shrink-0">
        {categories.map((c, i) => (
          <li key={c.title}>
            <Link
              href={c.href}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={onNavigate}
              className={`flex items-center justify-between gap-2 py-3 text-base-s transition-colors ${
                i === active ? "text-accent" : "hover:text-accent"
              }`}
            >
              {t(c.title)}
              {/* «Тренды Кореи» без подразделов — без стрелки */}
              {c.items.length > 0 && <ChevronDown className="size-4 shrink-0 -rotate-90" />}
            </Link>
          </li>
        ))}
      </ul>

      <ul key={current.title} className="w-[250px] shrink-0 animate-[menu-in_200ms_ease-out]">
        {current.items.map((it, i) => {
          const hasKinds = kindNames(it.title, current.title).length > 0;
          return (
            <li key={it.title}>
              <Link
                href={it.href}
                onMouseEnter={() => setActiveItem(i)}
                onFocus={() => setActiveItem(i)}
                onClick={onNavigate}
                className={`flex items-center justify-between gap-2 py-3 text-base-s transition-colors ${
                  hasKinds && i === activeItem ? "text-accent" : "hover:text-accent"
                }`}
              >
                {it.note ? (
                  <span className="flex flex-col gap-0.5">
                    {t(it.title)}
                    <span className="text-base-xs text-secondary">{t(it.note)}</span>
                  </span>
                ) : (
                  t(it.title)
                )}
                {hasKinds && <ChevronDown className="size-4 shrink-0 -rotate-90" />}
              </Link>
            </li>
          );
        })}
      </ul>

      {item && kinds.length > 0 && (
        <ul key={`${current.title}-${item.title}`} className="w-[250px] shrink-0 animate-[menu-in_200ms_ease-out]">
          {kinds.map((k) => (
            <li key={k}>
              <Link
                href={`${item.href}&kind=${encodeURIComponent(k)}`}
                onClick={onNavigate}
                className="block py-3 text-base-s transition-colors hover:text-accent"
              >
                {t(k)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
