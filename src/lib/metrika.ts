// Яндекс Метрика: номер счётчика и цели (события, которые видно в отчёте «Конверсии»).
// Номер счётчика — из кабинета metrika.yandex.ru (счётчик «Lunmi», создан 25.10.2026). Если поставить 0 — Метрика отключится.
export const YM_ID = 113772669;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

/** Отправить цель в Метрику: add_to_cart, begin_checkout, purchase, login, sign_up */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (YM_ID && typeof window !== "undefined") window.ym?.(YM_ID, "reachGoal", goal, params);
}
