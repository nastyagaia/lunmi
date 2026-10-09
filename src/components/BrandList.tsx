"use client";

// Список брендов (Figma brands, 4124:17842): поле search, под ним бренды по алфавиту —
// буква серым (Unbounded 12), под ней бренды стилем cellbutton через 16 px. Колонки через 8 px (сетка обновлена 3 октября 2026), ряды через 32 px.
import Link from "next/link";
import { useState } from "react";
import { Search } from "./Search";

type Item = { slug: string; name: string; letter: string };

export function BrandList({ brands }: { brands: Item[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q ? brands.filter((b) => b.name.toLowerCase().includes(q)) : brands;
  // бренды на цифру («#», например 3CE) — в самом конце, после букв
  const letters = Object.entries(Object.groupBy(shown, (b) => b.letter)).sort(
    ([a], [b]) => Number(a === "#") - Number(b === "#"),
  );

  return (
    <>
      {/* search из UI KIT — тот же компонент, что в шапке, только уже и без стрелки: фильтрует список на месте */}
      <Search
        label="Поиск по брендам"
        placeholder="Найти бренд"
        value={query}
        onChange={setQuery}
        className="mt-4 max-w-[720px]"
      />

      {/* буквы идут по колонкам сверху вниз, как в газете: следующая буква встаёт сразу под предыдущей — без дырок */}
      <div className="mt-[34px] columns-2 gap-x-2 md:columns-3 lg:columns-4">
        {letters.map(([letter, items = []]) => (
          <section
            key={letter}
            aria-label={`Бренды на букву ${letter}`}
            className="mb-16 flex break-inside-avoid flex-col gap-4"
          >
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
          <p className="text-base-s text-secondary">
            Такого бренда у нас пока нет. Проверьте написание — или загляните в каталог: вдруг найдётся что-то не хуже.
          </p>
        )}
      </div>
    </>
  );
}
