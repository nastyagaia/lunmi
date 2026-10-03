"use client";

// Боковая панель оформления (Figma: add contact, courier address, pick up point, saved addresses, payment method…):
// справа белая панель 717 px — сверху стрелка «назад» и крестик, заголовок H2, содержимое, кнопки прижаты к низу.
// Слева — затемнение, а в окне адреса вместо него карта (left).
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, CloseIcon } from "./icons";

export function Drawer({
  open,
  onClose,
  onBack,
  title,
  children,
  footer,
  left,
}: {
  open: boolean;
  onClose: () => void;
  /** стрелка «назад» слева сверху (к предыдущей панели) */
  onBack?: () => void;
  title: string;
  children: ReactNode;
  /** кнопки внизу панели */
  footer?: ReactNode;
  /** что показать слева вместо затемнения (карта) — только на широком экране */
  left?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* затемнение — клик закрывает панель */}
      <button
        type="button"
        aria-label="Закрыть"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
      />
      {left && <div className="relative hidden flex-1 animate-[fade-in_300ms_ease-out] lg:block">{left}</div>}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-[717px] animate-[drawer-in_300ms_ease-out] flex-col bg-white"
      >
        {/* верх 80 px: стрелка назад слева, крестик справа */}
        <div className="flex h-20 shrink-0 items-center justify-between px-5 md:px-8">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Назад"
              className="-ml-1 flex size-10 items-center justify-center transition-colors hover:text-accent"
            >
              <ArrowLeft />
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="-mr-2 flex size-10 items-center justify-center transition-colors hover:text-accent"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 md:px-8">
          <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">{title}</h2>
          <div className="flex flex-1 flex-col pt-6 pb-6">{children}</div>
        </div>

        {/* кнопки: поля 32 по бокам и снизу, 24 сверху, между кнопками 6 — как в дроере макета */}
        {footer && <div className="flex shrink-0 gap-1.5 px-5 pt-6 pb-8 md:px-8">{footer}</div>}
      </aside>
    </div>
  );
}

/** buttons из UI KIT: «Отменить» с обводкой и тёмная «Сохранить» (серая, пока нельзя) */
export function DrawerButton({
  children,
  onClick,
  outline = false,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  outline?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-[52px] flex-1 rounded-xs text-caps transition-colors ${
        outline
          ? "border border-primary hover:bg-primary hover:text-white"
          : "bg-primary text-white hover:bg-primary/85 disabled:bg-tertiary disabled:text-line-light"
      }`}
    >
      {children}
    </button>
  );
}
