"use client";

// dropdown из UI KIT (3036:7835): белая панель, обводка gray/200, радиус 4, мягкая тень.
// Внутрь собираем нужное: поиск, пункты с чекбоксами или радио, кнопки «Применить» / «Сбросить»,
// или пункты одиночного выбора с галочкой (сортировка).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckIcon, CloseIcon, SearchIcon } from "./icons";
import { Checkbox, Radio } from "./ui";

/** Обёртка: кнопка + панель под ней. Закрывается кликом мимо и по Esc. */
export function Popover({
  open,
  onClose,
  trigger,
  align = "left",
  children,
}: {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  align?: "left" | "right";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      {trigger}
      {open && (
        <div
          className={`absolute top-full z-30 mt-2 w-[300px] animate-[dropdown-in_160ms_ease-out] max-w-[calc(100vw-32px)] rounded-sm border border-surface bg-white py-2 shadow-[0_5px_15px_6px_rgb(41_41_41/0.05)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** Кнопки внизу списка: «Применить» (тёмная) и «Сбросить» (с обводкой) */
function Actions({ onApply, onReset }: { onApply: () => void; onReset: () => void }) {
  return (
    <div className="flex flex-col gap-2 px-4 pt-3 pb-2">
      <button
        type="button"
        onClick={onApply}
        className="h-10 rounded-xs bg-primary text-caps text-white transition-colors hover:bg-primary/85"
      >
        Применить
      </button>
      <button
        type="button"
        onClick={onReset}
        className="h-10 rounded-xs border border-primary text-caps transition-colors hover:bg-primary hover:text-white"
      >
        Сбросить
      </button>
    </div>
  );
}

/** Множественный выбор: поиск сверху, чекбоксы, кнопки. Больше 8 пунктов — список скроллится. */
export function MultiSelect({
  placeholder,
  options,
  value,
  onApply,
}: {
  placeholder: string;
  options: string[];
  value: string[];
  onApply: (value: string[]) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [query, setQuery] = useState("");
  const shown = options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()));
  const toggle = (o: string) => setDraft((d) => (d.includes(o) ? d.filter((x) => x !== o) : [...d, o]));

  return (
    <>
      {/* search: иконка, поле, крестик очистки, линия-разделитель */}
      <div className="mx-4 flex h-12 items-center gap-2 border-b border-line">
        <SearchIcon className="shrink-0 text-tertiary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 bg-transparent text-base-s outline-none placeholder:text-secondary"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Очистить поиск" className="text-tertiary hover:text-primary">
            <CloseIcon />
          </button>
        )}
      </div>
      <ul className="max-h-[352px] overflow-y-auto pt-1">
        {shown.map((o) => (
          <li key={o} className="px-4 py-2.5 transition-colors hover:bg-surface">
            <Checkbox checked={draft.includes(o)} onChange={() => toggle(o)}>
              {o}
            </Checkbox>
          </li>
        ))}
        {shown.length === 0 && <li className="px-4 py-3 text-base-s text-secondary">Ничего не нашлось</li>}
      </ul>
      <Actions onApply={() => onApply(draft)} onReset={() => onApply([])} />
    </>
  );
}

export type PriceRange = { from: string; to: string };

/** Цена: поля «от» / «до» и готовые диапазоны (radio) */
export function PriceSelect({
  ranges,
  value,
  onApply,
}: {
  ranges: { label: string; from: string; to: string }[];
  value: PriceRange;
  onApply: (value: PriceRange) => void;
}) {
  const [draft, setDraft] = useState(value);
  const field = (key: "from" | "to", label: string) => (
    <label className="flex h-[52px] min-w-0 flex-1 items-center rounded-xs border border-line bg-white pl-3 focus-within:border-primary">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base-xs text-tertiary">{label}</span>
        <input
          inputMode="numeric"
          value={draft[key]}
          onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value.replace(/\D/g, "") }))}
          className="min-w-0 bg-transparent text-base-s outline-none"
        />
      </span>
      {draft[key] && (
        <button
          type="button"
          onClick={() => setDraft((d) => ({ ...d, [key]: "" }))}
          aria-label={`Очистить «${label}»`}
          className="flex size-9 shrink-0 items-center justify-center text-tertiary hover:text-primary"
        >
          <CloseIcon />
        </button>
      )}
    </label>
  );

  return (
    <>
      <div className="flex gap-4 p-4">
        {field("from", "от")}
        {field("to", "до")}
      </div>
      <ul>
        {ranges.map((r) => (
          <li key={r.label} className="px-4 py-2.5 transition-colors hover:bg-surface">
            <Radio
              name="price"
              checked={draft.from === r.from && draft.to === r.to}
              onChange={() => setDraft({ from: r.from, to: r.to })}
            >
              {r.label}
            </Radio>
          </li>
        ))}
      </ul>
      <Actions onApply={() => onApply(draft)} onReset={() => onApply({ from: "", to: "" })} />
    </>
  );
}

/** Одиночный выбор (сортировка): клик сразу выбирает и закрывает, выбранный — с галочкой и фоном */
export function SingleSelect({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ul role="listbox">
      {options.map((o) => (
        <li key={o} role="option" aria-selected={o === value}>
          <button
            type="button"
            onClick={() => onSelect(o)}
            className={`flex h-11 w-full items-center justify-between px-4 text-left text-base-s transition-colors hover:bg-surface ${
              o === value ? "bg-surface" : ""
            }`}
          >
            {o}
            {o === value && <CheckIcon />}
          </button>
        </li>
      ))}
    </ul>
  );
}
