// Базовые компоненты из UI KIT (buttons, tags, header секции)
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ChevronDown, CloseIcon, EditIcon } from "./icons";

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
      <Link href={href} className={cls} onClick={rest.onClick as ComponentProps<typeof Link>["onClick"]}>
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

/** tags — бейдж на карточке (скруглён только правый нижний угол, 2 px): Property 1=% (скидка, surface/neutral 7) или hit! (surface/accent, белый текст) */
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
      className={`flex h-5 shrink-0 items-center justify-center rounded-br-xs px-1.5 text-caps ${
        kind === "sale" ? "bg-primary text-white" : "bg-accent text-white"
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
export function Checkbox({
  checked,
  onChange,
  children,
  className = "py-1",
}: {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  /** высота и поля строки; в выпадающих фильтрах — строка 44 px на всю ширину */
  className?: string;
}) {
  return (
    <label className={`group flex cursor-pointer items-center gap-2.5 text-base-s ${className}`}>
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex size-6 shrink-0 items-center justify-center peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
        {checked ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 2.5H20C20.8284 2.5 21.5 3.17157 21.5 4V20C21.5 20.8284 20.8284 21.5 20 21.5H4C3.17157 21.5 2.5 20.8284 2.5 20V4C2.5 3.17157 3.17157 2.5 4 2.5Z"
              className="fill-accent stroke-accent"
            />
            <path
              d="M19.0833 7L9.91667 16.1667L5.75 12"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="white"
              className="stroke-line transition-colors group-hover:stroke-primary"
            />
          )}
        </svg>
      </span>
      {children}
    </label>
  );
}

/** input из UI KIT (2901:4102): поле 52 px, обводка border/secondary, тёмная при фокусе, красная при ошибке.
 *  Пока пусто — серая подсказка; когда заполнено — подпись уезжает вверх мелким текстом. */
export function TextField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  error,
  className = "",
  trailing,
  onClear,
  hint,
  onBlur,
  maxLength,
  floating = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: ComponentProps<"input">["inputMode"];
  error?: string;
  className?: string;
  /** кнопка справа внутри поля (например, «применить промокод») */
  trailing?: ReactNode;
  /** крестик очистки справа — виден, когда поле заполнено */
  onClear?: () => void;
  /** серая подсказка под полем: «Покажем пункты выдачи рядом» */
  hint?: string;
  onBlur?: () => void;
  maxLength?: number;
  /** false — подпись только подсказкой внутри поля, наверх не уезжает (поля «От / До» в фильтре цены) */
  floating?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label
        className={`flex h-[52px] items-center gap-2 rounded-xs border bg-white px-3 transition-colors focus-within:border-primary ${
          error ? "border-error" : "border-line"
        }`}
      >
        {/* подпись: пусто — крупная подсказка по центру; курсор в поле или есть текст — мелкая подпись сверху
            (состояния Default / Focus / Filled из UI KIT) */}
        <span
          className={`relative flex h-full min-w-0 flex-1 flex-col ${floating ? "justify-end pb-[7px]" : "justify-center"}`}
        >
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={autoComplete}
            inputMode={inputMode}
            onBlur={onBlur}
            maxLength={maxLength}
            aria-invalid={Boolean(error)}
            aria-label={label}
            placeholder={floating ? undefined : label}
            className={`peer min-w-0 bg-transparent text-base-s caret-accent outline-none placeholder:text-tertiary ${
              floating ? "" : "my-auto"
            }`}
          />
          {floating && (
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 text-tertiary transition-all duration-150 ${
                value
                  ? "top-2 text-base-xs"
                  : "top-1/2 -translate-y-1/2 text-base-s peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-base-xs"
              }`}
            >
              {label}
            </span>
          )}
        </span>
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Очистить поле «${label}»`}
            className="-mr-3 flex size-9 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
          >
            {/* close size=M из UI KIT: 24 × 24, в 6 px от края поля */}
            <CloseIcon className="size-6" />
          </button>
        )}
        {trailing}
      </label>
      {error && <p className="text-base-xs text-error">{error}</p>}
      {hint && !error && <p className="text-base-xs text-tertiary">{hint}</p>}
    </div>
  );
}

/** input с выбором (Город): как TextField, справа стрелка; сам список — системный, удобный и на телефоне */
export function SelectField({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label
      className={`relative flex h-[52px] items-center gap-2 rounded-xs border border-line bg-white px-3 transition-colors focus-within:border-primary ${className}`}
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-base-xs text-tertiary">{label}</span>
        <span className="truncate text-base-s">{value}</span>
      </span>
      <ChevronDown className="size-6 shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/** Логотип СДЭК в карточке пункта (avatar mini 30 px): зелёный кружок с белой надписью */
export function CdekLogo() {
  return (
    <span
      aria-label="СДЭК"
      className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#1ab248] text-[8px] leading-none font-extrabold tracking-tight text-white italic"
    >
      СДЭК
    </span>
  );
}

/** Tabs из UI KIT, мелкие (окно адреса): Unbounded 12, активная — тёмная с линией, остальные серые */
export function SmallTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; title: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div role="tablist" className="flex gap-8 self-start border-b border-line">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === value}
          onClick={() => onChange(t.id)}
          className={`-mb-px border-b pb-2 text-h4 transition-colors ${
            t.id === value ? "border-primary" : "border-transparent text-tertiary hover:text-primary"
          }`}
        >
          {t.title}
        </button>
      ))}
    </div>
  );
}

/** card из UI KIT (small card content): строка с заголовком и подписью серым, справа карандаш «изменить» */
export function InfoCard({
  title,
  subtitle,
  onEdit,
  editLabel = "Изменить",
  leading,
  extra,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
  leading?: ReactNode;
  /** строка под подписью — например, ссылка «Подробнее о пункте» */
  extra?: ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-sm border border-line-light bg-white p-4">
      <div className="flex min-w-0 items-center gap-2">
        {leading}
        <div className="min-w-0">
          <p className="truncate text-base-s">{title}</p>
          {subtitle && <p className="truncate text-base-xs text-secondary">{subtitle}</p>}
          {extra && <div className="mt-2">{extra}</div>}
        </div>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          className="flex size-9 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
        >
          <EditIcon />
        </button>
      )}
    </div>
  );
}

/** card с выбором (Ваши адреса, пункты выдачи, банковские карты): radio, логотип, текст и карандаш.
 *  Выбранная — розовая обводка */
export function RadioCard({
  name,
  checked,
  onChange,
  title,
  subtitle,
  leading,
  onEdit,
  editLabel = "Изменить",
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div
      className={`flex w-full items-center gap-2 rounded-sm border bg-white py-4 pr-4 pl-4 transition-colors ${
        checked ? "border-accent" : "border-line-light hover:border-line"
      }`}
    >
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
        <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {checked ? (
              <circle cx="12" cy="12" r="8" fill="white" className="stroke-accent" strokeWidth="4" />
            ) : (
              <circle cx="12" cy="12" r="9.5" fill="white" className="stroke-line" />
            )}
          </svg>
        </span>
        {leading}
        <span className="min-w-0">
          <span className="block truncate text-base-s">{title}</span>
          {subtitle && <span className="block truncate text-base-xs text-secondary">{subtitle}</span>}
        </span>
      </label>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          className="flex size-9 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
        >
          <EditIcon />
        </button>
      )}
    </div>
  );
}

/** Date picker из UI KIT: плашка-выбор; выбранная — розовая обводка 1.5 px (border/accent) */
export function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`h-9 shrink-0 rounded-sm bg-white px-2 text-base-s whitespace-nowrap transition-colors ${
        selected ? "border-[1.5px] border-accent" : "border border-line-light hover:border-primary"
      }`}
    >
      {children}
    </button>
  );
}
