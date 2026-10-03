"use client";

// search из UI KIT (Figma search): лупа, текст 14 px с розовым курсором, подсказка text/tetriary, крестик очистки (M, 24 px),
// по желанию — тёмная круглая кнопка со стрелкой (icon button type=arrow); снизу линия border/secondary.
// Один компонент на всё: поиск в шапке (с отправкой и стрелкой), на странице «Бренды» и в выпадающих фильтрах (без стрелки).
import { useRef, type RefObject } from "react";
import { ArrowRight, CloseIcon, SearchIcon } from "./icons";

export function Search({
  value,
  onChange,
  label,
  placeholder = "Найти",
  onSubmit,
  submitDisabled = false,
  inputRef,
  id,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  /** подпись для экранного диктора: «Поиск по сайту», «Поиск по брендам» */
  label: string;
  placeholder?: string;
  /** есть — Enter и стрелка отправляют запрос; нет — поле просто фильтрует на месте, стрелки нет */
  onSubmit?: () => void;
  /** серая неактивная стрелка (например, «Ничего не найдено») */
  submitDisabled?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  id?: string;
  /** ширина и внешние отступы: max-w-[824px], max-w-[720px] … */
  className?: string;
}) {
  const own = useRef<HTMLInputElement>(null);
  const input = inputRef ?? own;

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit && !submitDisabled) onSubmit();
      }}
      className={`flex h-12 items-center gap-2 border-b border-line ${className}`}
    >
      <SearchIcon className="size-6 shrink-0 text-tertiary" />
      <input
        ref={input}
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        className="h-full min-w-0 flex-1 bg-transparent text-base-s caret-accent outline-none placeholder:text-tertiary [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            input.current?.focus();
          }}
          aria-label="Очистить"
          className="flex size-10 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
        >
          <CloseIcon className="size-6" />
        </button>
      )}
      {onSubmit && (
        <button
          type="submit"
          aria-label="Искать"
          disabled={submitDisabled}
          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-colors ${
            submitDisabled ? "bg-tertiary" : "bg-primary hover:bg-accent"
          }`}
        >
          <ArrowRight className="size-4" />
        </button>
      )}
    </form>
  );
}
