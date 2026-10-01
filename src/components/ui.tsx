// Базовые компоненты из UI KIT (buttons, tags, header секции)
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ChevronDown, CloseIcon } from "./icons";

type ButtonProps = {
  href?: string;
  /** outline-кнопка: тёмная на светлом фоне, светлая на фото (inverse)
   *  или «стекло» на фото/видео (glass — эффект Glass из Figma) */
  tone?: "dark" | "inverse" | "glass";
  size?: "L" | "M";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

/** buttons / Type=secondary — прозрачная кнопка с обводкой, текст капсом */
export function Button({ href, tone = "dark", size = "L", children, className = "", ...rest }: ButtonProps) {
  const cls = [
    "inline-flex items-center justify-center rounded-xs border text-caps text-center transition-colors",
    size === "L" ? "h-[52px] px-8" : "h-10 px-6",
    tone === "glass"
      ? // Figma Glass (buttons Type=tetriary): frost 11, свет сверху-слева (-45°), обводка border/inverse, заливка white 10%.
        "border-white bg-white/10 text-white backdrop-blur-[11px] shadow-[inset_1px_1px_0_rgb(255_255_255/0.55),inset_-1px_-1px_0_rgb(255_255_255/0.15)] hover:bg-white/25"
      : tone === "inverse"
        ? "border-white text-white hover:bg-white hover:text-primary"
        : "border-primary text-primary hover:bg-primary hover:text-white",
    className,
  ].join(" ");
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Заголовок секции: H2 слева, «показать все» справа */
export function SectionHeader({ title, href = "#" }: { title: ReactNode; href?: string | null }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">{title}</h2>
      {href !== null && (
        <Link
          href={href}
          className="shrink-0 text-caps underline underline-offset-2 transition-colors hover:text-accent"
        >
          показать все
        </Link>
      )}
    </div>
  );
}

/** tags — бейдж на карточке: Property 1=% (скидка, тёмный) или hit! (розовый) */
export function Tag({
  kind = "sale",
  className = "",
  children,
}: {
  kind?: "sale" | "hit";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`flex h-5 shrink-0 items-center justify-center rounded-r-xs px-1.5 text-caps ${
        kind === "sale" ? "bg-primary text-white" : "bg-accent-soft text-primary"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Filter Chips из UI KIT (3076:1822).
 *  Default — обводка border/tetriary (так попросила Настя, в ките border/secondary), стрелка вниз; Hover — фон surface и тёмная обводка.
 *  Selected — тёмный, рядом число выбранных значений (accent-2) и крестик: он сбрасывает только этот фильтр.
 *  У «число + крестик» своя увеличенная зона нажатия — на всю высоту чипса. */
export function FilterChip({
  label,
  count = 0,
  expanded,
  onClick,
  onClear,
}: {
  label: string;
  count?: number;
  expanded?: boolean;
  onClick?: () => void;
  onClear?: () => void;
}) {
  const selected = count > 0;
  return (
    <div
      className={`inline-flex h-9 items-stretch rounded-sm text-base-s transition-colors ${
        selected ? "bg-primary text-white" : "border border-line-light hover:border-primary hover:bg-surface"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        className={`flex cursor-pointer items-center gap-1 pl-3 ${selected ? "pr-1" : "pr-2"}`}
      >
        {label}
        <ChevronDown className="size-4" />
      </button>
      {selected && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Сбросить фильтр «${label}»`}
          className="flex cursor-pointer items-center gap-0.5 rounded-r-sm pr-2 pl-3 text-accent-soft transition-colors hover:text-white"
        >
          {count}
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

/** Dropdown Button из UI KIT: текст + стрелка вниз (сортировка, выбор города) */
export function DropdownButton({
  children,
  expanded,
  onClick,
}: {
  children: ReactNode;
  expanded?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className="flex items-center gap-1 p-2 text-base-s transition-colors hover:text-accent"
    >
      {children}
      <ChevronDown className="size-4" />
    </button>
  );
}

/** Checkbox icon, size=m из UI KIT: квадрат 20 px; selected — розовый с белой галочкой.
 *  Настоящий чекбокс спрятан для экранных дикторов и клавиатуры, видна только картинка. */
export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 py-1 text-base-s">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex size-6 shrink-0 items-center justify-center peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
        {checked ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 2.5H20C20.8284 2.5 21.5 3.17157 21.5 4V20C21.5 20.8284 20.8284 21.5 20 21.5H4C3.17157 21.5 2.5 20.8284 2.5 20V4C2.5 3.17157 3.17157 2.5 4 2.5Z" className="fill-accent stroke-accent" />
            <path d="M19.0833 7L9.91667 16.1667L5.75 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span className="size-5 rounded-xs border border-line bg-white transition-colors group-hover:border-primary" />
        )}
      </span>
      {children}
    </label>
  );
}

/** radio, size=M из UI KIT: круг 24 px; selected — толстое розовое кольцо */
export function Radio({
  name,
  checked,
  onChange,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 py-1 text-base-s">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          {checked ? (
            <circle cx="12" cy="12" r="8" fill="white" className="stroke-accent" strokeWidth="4" />
          ) : (
            <circle cx="12" cy="12" r="9.5" fill="white" className="stroke-line transition-colors group-hover:stroke-primary" />
          )}
        </svg>
      </span>
      {children}
    </label>
  );
}
