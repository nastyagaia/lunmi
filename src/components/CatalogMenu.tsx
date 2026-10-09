"use client";

// menu dropdown из Figma (catalog menu 1, 5697:28114): выпадает из шапки, когда открыт «Каталог».
// Слева — категории (Category Item: Base/S, отступы 12 px, шеврон ›), выбранная — розовая.
// Справа — подразделы выбранной категории. Колонки по 250 px, между ними 26 px.
import Link from "next/link";
import { useState } from "react";
import type { CatalogCategory } from "@/data/menu";
import { ChevronDown } from "./icons";

export function CatalogMenu({ categories, onNavigate }: { categories: CatalogCategory[]; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div className="flex h-[550px] gap-[26px] overflow-y-auto pt-4 pb-10">
      <ul className="w-[250px] shrink-0">
        {categories.map((c, i) => (
          <li key={c.title}>
            <Link
              href={c.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={onNavigate}
              className={`flex items-center justify-between gap-2 py-3 text-base-s transition-colors ${
                i === active ? "text-accent" : "hover:text-accent"
              }`}
            >
              {c.title}
              <ChevronDown className="size-4 shrink-0 -rotate-90" />
            </Link>
          </li>
        ))}
      </ul>

      <ul key={current.title} className="w-[250px] shrink-0 animate-[menu-in_200ms_ease-out]">
        {current.items.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block py-3 text-base-s transition-colors hover:text-accent"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
