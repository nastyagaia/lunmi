// Базовые компоненты из UI KIT (buttons, tags, header секции)
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  /** outline-кнопка: светлая на фото (inverse) или тёмная на светлом фоне */
  tone?: "dark" | "inverse";
  size?: "L" | "M";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

/** buttons / Type=secondary — прозрачная кнопка с обводкой, текст капсом */
export function Button({ href, tone = "dark", size = "L", children, className = "", ...rest }: ButtonProps) {
  const cls = [
    "inline-flex items-center justify-center rounded-xs border text-caps text-center transition-colors",
    size === "L" ? "h-[52px] px-8" : "h-10 px-6",
    tone === "inverse"
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

/** tags — бейдж на карточке: скидка (тёмный) или HIT (розовый) */
export function Tag({ kind = "sale", children }: { kind?: "sale" | "hit"; children: ReactNode }) {
  return (
    <span
      className={`inline-flex h-5 items-center rounded-r-xs px-1.5 text-caps ${
        kind === "sale" ? "bg-primary text-white" : "bg-accent-soft text-primary"
      }`}
    >
      {children}
    </span>
  );
}
