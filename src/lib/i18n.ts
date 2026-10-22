// Два языка сайта: русский (основной) и английский (для презентаций иностранным компаниям).
// Язык выбирается при сборке переменной NEXT_PUBLIC_LOCALE=en — так из одного кода получаются два сайта
// (на Vercel — два проекта из одного репозитория). Внутри всё хранится по-русски и в рублях,
// а при показе переводим строки словарём src/i18n/en.ts и пересчитываем цены в евро.
import { en } from "@/i18n/en";

export const LOCALE: "ru" | "en" = process.env.NEXT_PUBLIC_LOCALE === "en" ? "en" : "ru";
export const isEn = LOCALE === "en";

/** Адрес другой языковой версии — для переключателя RU / EN в шапке */
export const OTHER_LOCALE_URL = isEn
  ? (process.env.NEXT_PUBLIC_RU_URL ?? "https://lunmi.vercel.app")
  : (process.env.NEXT_PUBLIC_EN_URL ?? "https://lunmi-en.vercel.app");

/** Перевод строки интерфейса: ключ — русский текст. Переменные — {n}, {name}… */
export function t(ru: string, vars?: Record<string, string | number>) {
  let s = isEn ? (en[ru] ?? ru) : ru;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/** Курс для пересчёта рублёвых цен в евро в английской версии */
export const RUB_PER_EUR = 95;

/** В английской версии цена товара — «красивая» в евро (…,90). Чтобы суммы в корзине сходились копейка в копейку,
 *  считаем внутри всё равно «в рублях», но в рублях, ровно соответствующих красивой цене в евро: 1 990 ₽ → €20.90 → 1985,5. */
export const niceRub = (rub: number) =>
  isEn && rub > 0 ? (Math.max(1, Math.round(rub / RUB_PER_EUR)) - 0.1) * RUB_PER_EUR : rub;

/** Число из цены-строки («1 990 ₽» → 1990; «€20.90» → 1985,5) — для корзины, сортировки и фильтров */
export function priceToNumber(price: string) {
  if (price.includes("€")) return Number(price.replace(/[^\d.]/g, "")) * RUB_PER_EUR;
  return niceRub(Number(price.replace(/\D/g, "")));
}

/** Сумма из рублей: «1 990 ₽» или «€20.90» */
export function money(rub: number) {
  if (!isEn) return `${rub.toLocaleString("ru-RU")} ₽`;
  return `€${(rub / RUB_PER_EUR).toFixed(2)}`;
}

/** Цена-строка из данных («1 990 ₽»): в русской версии как есть, в английской — в евро */
export const priceLabel = (price: string) => (isEn ? money(priceToNumber(price)) : price);

/** Выбор формы слова: ru — «1 отзыв / 3 отзыва / 5 отзывов», en — «1 review / 3 reviews» */
export function plural(n: number, ru: [string, string, string], en: [string, string]) {
  if (isEn) return `${n} ${n === 1 ? en[0] : en[1]}`;
  const m10 = n % 10;
  const m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? ru[0] : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? ru[1] : ru[2];
  return `${n} ${word}`;
}
