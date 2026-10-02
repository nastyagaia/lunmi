"use client";

// Список брендов (Figma brands, 4124:17842): поле search, под ним бренды по алфавиту —
// буква серым (Unbounded 12), под ней бренды стилем cellbutton через 16 px. Колонки через 8 px (сетка обновлена 3 октября 2026), ряды через 32 px.
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, SearchIcon } from "./icons";

type Item = { slug: string; name: string; letter: string };

export function BrandList({ brands }: { brands: Item[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q ? brands.filter((b) => b.name.toLowerCase().includes(q)) : brands;
  const letters = Object.entries(Object.groupBy(shown, (b) => b.letter));

  return (
    <>
      {/* search из UI KIT: иконка, текст 14 px, розовый курсор, крестик очистки, снизу линия text/tetriary */}
      <label className="flex max-w-[720px] items-center gap-3 border-b border-tertiary pt-3 pb-3">
        <SearchIcon className="size-5 shrink-0 text-tertiary" />
        <span className="sr-only">Поиск по брендам</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти бренд"
          className="h-10 min-w-0 flex-1 bg-transparent text-base-s caret-accent outline-none placeholder:text-secondary [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Очистить поиск"
            className="flex size-6 shrink-0 items-center justify-center text-secondary transition-colors hover:text-primary"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
      </label>

      <div className="mt-[34px] grid grid-cols-2 items-start gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {letters.map(([letter, items = []]) => (
          <section key={letter} aria-label={`Бренды на букву ${letter}`} className="flex flex-col gap-4">
            <h2 className="text-cell text-tertiary">{letter}</h2>
            <ul className="flex flex-col gap-4">
              {items.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="text-cell transition-colors hover:text-accent">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {letters.length === 0 && (
          <p className="col-span-full text-base-s text-secondary">
            Такого бренда пока нет. Попробуйте другое название — или загляните в каталог.
          </p>
        )}
      </div>
    </>
  );
}
