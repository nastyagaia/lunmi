// Контент главной страницы. Тексты и картинки взяты из макета home в Figma.
import type { Product } from "@/components/ProductCard";

export const bestsellers: Product[] = [
  {
    id: "b1",
    name: "Dr.Ceuracle Tea Tree Purifine",
    description: "бустер-сыворотка с микроиглами, 100 ml",
    price: "2 993 ₽",
    image: "/img/b1.webp",
    discount: "5%",
    hit: true,
  },
  {
    id: "b2",
    name: "Petitfee Aura Quartz Hydrogel Eye Mask Pure Opal",
    description: "Охлаждающие патчи от морщин и отеков",
    price: "2 993 ₽",
    image: "/img/b2.webp",
    discount: "5%",
    hit: true,
    aspect: "402/478",
  },
  {
    id: "b3",
    name: "Dr.Ceuracle Tea Tree Purifine",
    description: "бустер-сыворотка с микроиглами, 50 ml",
    price: "2 993 ₽",
    image: "/img/b3.webp",
    discount: "5%",
    hit: true,
  },
];

export const weeklyDeals: Product[] = [
  {
    id: "s1",
    name: "Dr.Ceuracle Tea Tree Purifine крем",
    description: "бустер-сыворотка с микроиглами",
    price: "2 993 ₽",
    oldPrice: "4 393 ₽",
    image: "/img/s1.webp",
    discount: "15%",
  },
  {
    id: "s2",
    name: "Dr.Ceuracle Tea Tree Purifine крем",
    description: "Флюид несмываемый для уплотнения волос",
    price: "2 993 ₽",
    image: "/img/s2.webp",
    discount: "15%",
  },
  {
    id: "s3",
    name: "Dr.Ceuracle Tea Tree Purifine крем",
    description: "бустер-сыворотка с микроиглами",
    price: "2 993 ₽",
    oldPrice: "4 393 ₽",
    image: "/img/s3.webp",
    discount: "10%",
  },
  {
    id: "s4",
    name: "Dr.Ceuracle Tea Tree Purifine крем",
    description: "бустер-сыворотка с микроиглами",
    price: "2 993 ₽",
    oldPrice: "4 393 ₽",
    image: "/img/s4.webp",
    discount: "15%",
  },
];

/** Плитки каталога. wide = широкая плитка (606px в макете) */
export const catalog = [
  { title: "Для кожи лица", image: "/img/c1.webp" },
  { title: "Glow Skin", image: "/img/c2.webp" },
  { title: "Антивозрастной уход", image: "/img/c3.webp", wide: true },
  { title: "Хиты в Корее", image: "/img/c4.webp" },
  { title: "Макияж", image: "/img/c5.webp", wide: true },
  { title: "Для тела", image: "/img/c6.webp" },
  { title: "Для волос", image: "/img/c7.webp", wide: true },
  { title: "Бьюти-гаджеты", image: "/img/c8.webp" },
];

export const brands = [
  "A’Pieu", "Amorepacific", "Anua", "Axis-Y", "Banila Co", "By Wishtrend", "Clio", "COSRX", "Dr. Althea", "Dr. Jart+",
  "Hera", "Holika Holika", "Innisfree", "Klairs", "Laneige", "Lador", "Manyo Factory", "MediCube", "Missha", "Neogen",
  "Peripera", "Purito", "Pyunkang Yul", "Round Lab", "Sioris", "Skin Food", "Somang", "Son & Park", "Su:m37", "Sulwhasoo",
  "The Face Shop", "The Saem", "Tony Moly", "VT Cosmetics", "Whamisa", "W.Lab", "Yadah", "YesStyle", "Young Skin", "Zem",
];

export const reviews = [
  {
    name: "Алина",
    avatar: "/img/ava1.webp",
    text: "Заказываю уже второй раз, доставка по Питеру супер быстрая — всё пришло за день! Упаковка очень аккуратная, как подарок!",
  },
  {
    name: "Алина",
    avatar: "/img/ava2.webp",
    text: "Заказываю уже второй раз, доставка по Питеру супер быстрая — всё пришло за день! Упаковка очень аккуратная, как подарок!",
  },
];

// Ответов в макете нет — это временные тексты, их можно заменить
export const faq = [
  {
    q: "О нас",
    a: "Lunmi — магазин корейской косметики в Санкт-Петербурге. Мы сами отбираем бренды и возим средства напрямую.",
  },
  {
    q: "Доставка и оплата",
    a: "По Петербургу привезём курьером на следующий день, в другие города — через пункты выдачи. Оплата картой онлайн или при получении.",
  },
  {
    q: "Оригинальность продукции",
    a: "Работаем с официальными дистрибьюторами. На каждый товар есть сертификаты — покажем по запросу.",
  },
  {
    q: "Как отменить заказ или отредактировать",
    a: "Пока заказ собирается, его можно изменить или отменить в личном кабинете. Если он уже в пути — напишите в поддержку.",
  },
  {
    q: "Как использовать промокод",
    a: "Введите промокод в корзине в поле «Промокод» и нажмите «Применить». Скидка пересчитается сразу.",
  },
  {
    q: "Проконсультироваться перед покупкой",
    a: "Напишите нам в Telegram или WhatsApp — поможем подобрать уход под ваш тип кожи.",
  },
  {
    q: "Программа лояльности или бонусы для постоянных клиентов",
    a: "С каждой покупки начисляем баллы. Ими можно оплатить часть следующего заказа.",
  },
];
