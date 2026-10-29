"use client";

// Телефон и планшет: меню каталога и бургер — шторки на весь экран (мобильные макеты: catalog menu mobile 1–3, burger menu mobile).
// Каталог: уровни как в iOS — раздел → подраздел → вид, стрелка «назад»; на 2-м и 3-м уровне внизу «Показать товары».
// Строки 44 px (Category Item), заголовок H3, поля 16 (сетка mobile).
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { kindNames } from "@/data/kinds";
import { catalogMenu } from "@/data/menu";
import { CityMenu } from "./HeaderMenus";
import { LangSwitch } from "./LangSwitch";
import { ArrowLeft, ChevronRight, CloseIcon } from "./icons";
import { t } from "@/lib/i18n";

const rowCls = "flex h-11 w-full items-center justify-between gap-2 text-left text-base-s transition-colors hover:text-accent";

function Panel({
  title,
  onBack,
  onClose,
  children,
  footer,
}: {
  title: string;
  onBack?: () => void;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  // в корень страницы: у шапки стекло (backdrop-filter), и fixed внутри неё считался бы от шапки, а не от экрана
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex animate-[fade-in_200ms_ease-out] flex-col bg-white lg:hidden"
    >
      {/* верх 80: «назад» слева, крестик справа (иконки по краю сетки 16) */}
      <div className="flex h-20 shrink-0 items-center justify-between px-2">
        {onBack ? (
          <button type="button" onClick={onBack} aria-label={t("Назад")} className="flex size-10 items-center justify-center transition-colors hover:text-accent">
            <ArrowLeft />
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={onClose} aria-label={t("Закрыть")} className="flex size-10 items-center justify-center transition-colors hover:text-accent">
          <CloseIcon />
        </button>
      </div>
      <h2 className="shrink-0 px-4 pb-6 text-h3">{title}</h2>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">{children}</div>
      {footer && <div className="shrink-0 border-t border-line-light px-4 py-6">{footer}</div>}
    </div>,
    document.body,
  );
}

export function MobileMenus({
  mode,
  onClose,
  links,
}: {
  mode: "catalog" | "burger" | null;
  onClose: () => void;
  /** пункты бургера: подпись → адрес */
  links: { label: string; href: string }[];
}) {
  // путь по каталогу: [] — разделы, [i] — подразделы раздела i, [i, j] — виды подраздела j
  const [path, setPath] = useState<number[]>([]);
  useEffect(() => {
    if (!mode) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mode, onClose]);

  if (mode === "burger") {
    return (
      <Panel title={t("Меню")} onClose={onClose}>
        <CityMenu className="-ml-2" />
        <hr className="my-3 border-line-light" />
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onClose} className={rowCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="my-3 border-line-light" />
        <LangSwitch className="-ml-1.5 h-11" />
      </Panel>
    );
  }

  if (mode !== "catalog") return null;

  const cat = path.length > 0 ? catalogMenu[path[0]] : undefined;
  const item = cat && path.length > 1 ? cat.items[path[1]] : undefined;
  const back = () => setPath((p) => p.slice(0, -1));
  const show = (href: string) => (
    <Link
      href={href}
      onClick={onClose}
      className="flex h-[52px] w-full items-center justify-center rounded-xs bg-primary text-caps text-white transition-colors hover:bg-secondary"
    >
      {t("Показать товары")}
    </Link>
  );

  if (item && cat) {
    return (
      <Panel title={t(item.title)} onBack={back} onClose={onClose} footer={show(item.href)}>
        <ul>
          {kindNames(item.title, cat.title).map((k) => (
            <li key={k}>
              <Link href={`${item.href}&kind=${encodeURIComponent(k)}`} onClick={onClose} className={rowCls}>
                {t(k)}
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  if (cat) {
    return (
      <Panel title={t(cat.title)} onBack={back} onClose={onClose} footer={show(cat.href)}>
        <ul>
          {cat.items.map((it, j) =>
            kindNames(it.title, cat.title).length > 0 ? (
              <li key={it.title}>
                <button type="button" onClick={() => setPath([path[0], j])} className={rowCls}>
                  {t(it.title)}
                  <ChevronRight className="size-4 shrink-0" />
                </button>
              </li>
            ) : (
              <li key={it.title}>
                <Link href={it.href} onClick={onClose} className={rowCls}>
                  {t(it.title)}
                </Link>
              </li>
            ),
          )}
        </ul>
      </Panel>
    );
  }

  return (
    <Panel title={t("Каталог")} onClose={onClose}>
      <ul>
        {catalogMenu.map((c, i) =>
          c.items.length > 0 ? (
            <li key={c.title}>
              <button type="button" onClick={() => setPath([i])} className={rowCls}>
                {t(c.title)}
                <ChevronRight className="size-4 shrink-0" />
              </button>
            </li>
          ) : (
            <li key={c.title}>
              <Link href={c.href} onClick={onClose} className={rowCls}>
                {t(c.title)}
              </Link>
            </li>
          ),
        )}
      </ul>
    </Panel>
  );
}
