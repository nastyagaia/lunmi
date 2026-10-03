"use client";

// Данные покупателя для личного кабинета. Пока нет входа по почте, всё живёт в браузере (localStorage):
// контакты и адреса из оформления заказа, профиль, оформленные заказы, отзывы, недавно просмотренные товары.
// Когда появится вход — эти хранилища переедут в аккаунт на сервере, а страницы кабинета останутся теми же.
import type { Address, Contact } from "@/components/CheckoutDrawers";
import type { Product } from "@/components/ProductCard";
import { createStore } from "./persist";

export const contactStore = createStore<Contact | null>("lunmi-contact", null);
export const addressStore = createStore<{ list: Address[]; selected?: string }>("lunmi-addresses", { list: [] });

export type Profile = {
  firstName: string;
  lastName: string;
  gender?: "Женщина" | "Мужчина";
  birthday: string;
  email: string;
  news: boolean;
};
export const emptyProfile: Profile = { firstName: "", lastName: "", birthday: "", email: "", news: true };
export const profileStore = createStore<Profile>("lunmi-profile", emptyProfile);

/** Статусы заказа по порядку — как шкала в Figma «order assembling» */
export const ORDER_STEPS = ["Создан", "В сборке", "В пути", "Доставлен"] as const;
export type OrderStatus = (typeof ORDER_STEPS)[number] | "Отменён";

export type OrderItem = { key: string; name: string; description: string; price: number; image: string; href?: string; qty: number };
export type Order = {
  number: string;
  createdAt: string;
  status: OrderStatus;
  /** когда заказ перешёл в каждый статус (ISO-дата) */
  history: Partial<Record<OrderStatus, string>>;
  items: OrderItem[];
  recipient: string;
  delivery: { kind: Address["kind"]; address: string; date: string };
  payment: string;
  goods: number;
  discount: number;
  deliveryPrice: number;
  total: number;
};
export const ordersStore = createStore<Order[]>("lunmi-orders", []);

/** Номер нового заказа «LM-123456» и время оформления */
export function newOrderNumber() {
  return { number: `LM-${Math.floor(100000 + Math.random() * 900000)}`, now: new Date().toISOString() };
}

export type Review = { key: string; productId: string; name: string; image: string; rating: number; text: string; date: string };
export const reviewsStore = createStore<Review[]>("lunmi-reviews", []);

/** Недавно просмотренные товары — карточки целиком, последние 12 */
export const viewedStore = createStore<Product[]>("lunmi-viewed", []);
export function rememberViewed(card: Product) {
  viewedStore.set((list) => [card, ...list.filter((p) => p.id !== card.id)].slice(0, 12));
}

/** Имя для шапки кабинета: из профиля, иначе из контактов заказа */
export function displayName(profile: Profile, contact: Contact | null) {
  const full = `${profile.firstName} ${profile.lastName}`.trim();
  return full || contact?.name || "";
}

/** id товара из ключа корзины («anua-pdrn-cream:30 мл» → «anua-pdrn-cream») */
export const productIdOf = (key: string) => key.split(":")[0];

/** «20 апреля, 15:15» */
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  return `${date} ${time}`;
}

/** Удалить все данные покупателя с этого устройства («Удалить аккаунт») */
export function forgetEverything() {
  contactStore.set(null);
  addressStore.set({ list: [] });
  profileStore.set(emptyProfile);
  ordersStore.set([]);
  reviewsStore.set([]);
  viewedStore.set([]);
}
