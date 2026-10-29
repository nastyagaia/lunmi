"use client";

// Боковая панель оформления (Figma: add contact, courier address, pick up point, saved addresses, payment method…):
// справа белая панель 717 px — сверху стрелка «назад» и крестик, заголовок H2, содержимое, кнопки прижаты к низу.
// Слева — затемнение, а в окне адреса вместо него карта (left).
// Телефон (checkout mobile, 11574:19335): шторка снизу от y = 56 с ручкой, заголовок H3, крестик справа,
// «Отменить» спрятана (её роль — крестик), «Сохранить» — action bar на всю ширину с линией сверху.
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, CloseIcon } from "./icons";
import { t } from "@/lib/i18n";

export function Drawer({
  open,
  onClose,
  onBack,
  title,
  children,
  footer,
  left,
  fit = false,
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
  /** телефон: шторка по высоте содержимого (способ оплаты), иначе — от y = 56 до низа */
  fit?: boolean;
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
        aria-label={t("Закрыть")}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
      />
      {left && <div className="relative hidden flex-1 animate-[fade-in_300ms_ease-out] lg:block">{left}</div>}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t(title)}
        className={`relative flex h-full w-full max-w-[717px] flex-col bg-white ${fit ? "max-md:mt-auto max-md:h-auto max-md:max-h-[calc(100%-56px)]" : "max-md:mt-14 max-md:h-[calc(100%-56px)]"} max-md:animate-[sheet-in_300ms_ease-out] max-md:rounded-t-lg md:animate-[drawer-in_300ms_ease-out]`}
      >
        {/* ручка шторки 36 × 5 — только телефон */}
        <div className="flex shrink-0 justify-center py-2 md:hidden" aria-hidden>
          <span className="h-[5px] w-9 rounded-full bg-line-light" />
        </div>
        {/* верх 80 px: стрелка назад слева, крестик справа; телефон: без «назад» крестик стоит справа на уровне заголовка, со стрелкой — отдельной строкой над ним */}
        <div
          className={`flex shrink-0 items-center justify-between px-4 md:h-20 md:px-8 ${
            onBack ? "max-md:h-12" : "max-md:absolute max-md:top-[28px] max-md:right-0 max-md:z-10"
          }`}
        >
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label={t("Назад")}
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
            aria-label={t("Закрыть")}
            className="-mr-2 flex size-10 items-center justify-center transition-colors hover:text-accent"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={`flex min-h-0 flex-1 flex-col overflow-y-auto px-4 ${onBack ? "" : "max-md:pt-4"} md:px-8`}>
          <h2 className="text-h3 max-md:pr-12 md:text-h2">{t(title)}</h2>
          <div className="flex flex-1 flex-col pt-6 pb-6">{children}</div>
        </div>

        {/* кнопки: поля 32 по бокам и снизу, 24 сверху, между кнопками 6 — как в дроере макета */}
        {footer && (
          <div className="flex shrink-0 gap-1.5 px-4 max-md:border-t max-md:border-line-light max-md:py-6 md:px-8 md:pt-6 md:pb-8">
            {footer}
          </div>
        )}
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
          ? "max-md:hidden " : ""
      }${
        outline
          ? "border border-primary hover:border-line hover:text-secondary disabled:border-line disabled:bg-surface disabled:text-tertiary"
          : "bg-primary text-white hover:bg-secondary disabled:bg-tertiary disabled:text-line-light"
      }`}
    >
      {children}
    </button>
  );
}
