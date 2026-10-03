// Контент главной страницы. Тексты и картинки взяты из макета home в Figma.
import type { Product } from "@/components/ProductCard";

/** Слайды первого экрана (Figma: hero anua pdrn, hero korea trends и др.).
 *  tone: "light" — белый текст на тёмном фото, "dark" — тёмный текст на светлом фото.
 *  Первый слайд без image — на нём видео. */
export type HeroSlide = {
  title: string;
  text: string;
  image?: string;
  tone: "light" | "dark";
};

export const heroSlides: HeroSlide[] = [
  { title: "Anua PDRN", text: "Дополнительная скидка −10%\nтолько онлайн до 31 июля", tone: "light" },
  {
    title: "Тренды Кореи",
    text: "Корейские бьюти-хиты, которые уже покорили Сеул.\nОткройте новинки ухода для сияющей кожи.",
    image: "/img/hero-korea.webp",
    tone: "light",
  },
  {
    title: "−10% SPF",
    text: "Лёгкие корейские санскрины без белых следов\nи липкости. Скидка до 31 июля",
    image: "/img/hero-spf.webp",
    tone: "light",
  },
  {
    title: "−10% fwee",
    text: "Сочные бальзамы, румяна и тинты fwee\nв оттенках весеннего неба",
    image: "/img/hero-fwee.webp",
    tone: "dark",
  },
  {
    title: "Dr. Althea",
    text: "Мягкий уход для чувствительной кожи:\nуспокаивает и восстанавливает барьер",
    image: "/img/hero-althea.webp",
    tone: "dark",
  },
  {
    title: "Medicube девайсы",
    text: "Домашний уход как в салоне:\nлифтинг, микротоки и сияние кожи",
    image: "/img/hero-medicube.webp",
    tone: "light",
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

/** Плитки каталога. wide = широкая плитка (616px в макете); left = фото прижато к левому краю —
 *  на узких экранах обрезается справа, и светлое поле под подписью остаётся */
export const catalog = [
  { title: "Для кожи лица", image: "/img/c1.webp", href: "/catalog" },
  { title: "Glow Skin", image: "/img/c2.webp", href: "/catalog/glow-skin" },
  { title: "Антивозрастной уход", image: "/img/c3.webp", wide: true, href: "/catalog/antivozrastnoy-uhod" },
  { title: "Хиты в Корее", image: "/img/c4.webp", href: "/catalog/hity-korei" },
  { title: "Макияж", image: "/img/c-makeup-d6bce6.webp", wide: true, left: true, href: "/catalog/makiyazh" },
  { title: "Для тела", image: "/img/c6.webp", href: "/catalog/dlya-tela" },
  { title: "Для волос", image: "/img/c-hair-0e5ead.webp", wide: true, left: true, href: "/catalog/dlya-volos" },
  { title: "Бьюти-гаджеты", image: "/img/c8.webp", href: "/catalog/beauty-gadgets" },
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
