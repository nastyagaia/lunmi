"use client";

// Поле на странице результатов (Figma search results, 6028:36265): 616 px (6 колонок), иконка, текст 14 px, крестик очистки, линия снизу.
// Enter — новый поиск (запрос попадает в историю).
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CloseIcon, SearchIcon } from "./icons";
import { rememberSearch } from "./SearchPanel";

export function SearchField({ initial }: { initial: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initial);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const text = query.trim();
        if (!text) return;
        rememberSearch(text);
        router.push(`/search?q=${encodeURIComponent(text)}`);
      }}
      className="flex h-12 max-w-[616px] items-center gap-2 border-b border-tertiary"
    >
      <SearchIcon className="size-6 shrink-0 text-tertiary" />
      <label htmlFor="search-page" className="sr-only">
        Поиск по сайту
      </label>
      <input
        id="search-page"
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
          onClick={() => setQuery("")}
          aria-label="Очистить"
          className="flex size-10 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
        >
          <CloseIcon className="size-6" />
        </button>
      )}
    </form>
  );
}
