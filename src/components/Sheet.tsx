"use client";

// Шторка снизу для телефона (Figma ui kit: modal_base / sheet, мобильные макеты 393).
// Сверху «ручка» 36 × 5, заголовок H3 и крестик, содержимое прокручивается, кнопки (action bar) прижаты к низу.
// Затемнение — клик закрывает. Поля и отступы — по сетке mobile: 16.
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, CloseIcon } from "./icons";
import { t } from "@/lib/i18n";

export function Sheet({
  open,
  onClose,
  onBack,
  title,
  children,
  footer,
  tall,
  z = "z-[60]",
}: {
  open: boolean;
  onClose: () => void;
  /** стрелка «назад» над заголовком (к предыдущему уровню шторки) */
  onBack?: () => void;
  title: string;
  children: ReactNode;
  /** кнопки внизу (action bar) */
  footer?: ReactNode;
  /** высокая шторка — почти на весь экран (фильтры), иначе по содержимому (сортировка) */
  tall?: boolean;
  /** слой: шторка поверх полноэкранного меню (z-[70]) — выше */
  z?: string;
}) {
  useEffect(() => {
    if (!open) return;
    // запоминаем прежнее значение: шторка может открываться поверх меню, которое тоже держит прокрутку
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`fixed inset-0 ${z} flex items-end`}>
      <button
        type="button"
        aria-label={t("Закрыть")}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(title)}
        className={`relative flex w-full animate-[sheet-in_300ms_ease-out] flex-col rounded-t-lg bg-white ${
          tall ? "h-[calc(100dvh-56px)]" : "max-h-[calc(100dvh-56px)]"
        }`}
      >
        {/* ручка 36 × 5 */}
        <div className="flex shrink-0 justify-center py-2" aria-hidden>
          <span className="h-[5px] w-9 rounded-full bg-line-light" />
        </div>
        <div className="flex shrink-0 items-start justify-between gap-4 px-4 pt-4 pb-6">
          <div className="flex flex-col gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label={t("Назад")}
                className="-ml-2 flex size-10 items-center justify-center transition-colors hover:text-accent"
              >
                <ArrowLeft />
              </button>
            )}
            <h2 className="text-h3">{t(title)}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("Закрыть")}
            className="-mt-1.5 -mr-2 flex size-10 shrink-0 items-center justify-center transition-colors hover:text-accent"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
        {footer && <div className="flex shrink-0 flex-col gap-3 border-t border-line-light px-4 py-6">{footer}</div>}
      </div>
    </div>
  );
}
