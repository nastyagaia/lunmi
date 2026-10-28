// Контент главной страницы. Тексты и картинки взяты из макета home в Figma.
import { delivery } from "./delivery";
import { loyalty } from "./loyalty";
import { isEn, money } from "@/lib/i18n";

/** Слайды первого экрана (Figma: hero anua pdrn, hero korea trends и др.).
 *  tone: "light" — белый текст на тёмном фото, "dark" — тёмный текст на светлом фото.
 *  Первый слайд без image — на нём видео. */
export type HeroSlide = {
  title: string;
  text: string;
  image?: string;
  /** картинка для телефона 393 × 700 (Figma: iPhone 16 - 2…6, 11316:15910 и правее) */
  mobileImage?: string;
  tone: "light" | "dark";
  /** куда ведёт «за покупками»; без href — к бестселлерам ниже на странице */
  href?: string;
};

export const heroSlides: HeroSlide[] = [
  { title: "Anua PDRN", text: "Дополнительная скидка −10%\nтолько онлайн до 31 июля", tone: "light", href: "/brands/anua" },
  {
    title: "Тренды Кореи",
    text: "Корейские бьюти-хиты, которые уже покорили Сеул.\nОткройте новинки ухода для сияющей кожи.",
    image: "/img/hero-korea.webp",
    href: "/catalog/hity-korei",
    mobileImage: "/img/hero-korea-mobile-f36a55.webp",
    tone: "light",
  },
  {
    title: "−10% SPF",
    text: "Лёгкие корейские санскрины без белых следов\nи липкости. Скидка до 31 июля",
    image: "/img/hero-spf.webp",
    href: `/catalog?type=${encodeURIComponent("SPF для лица")}`,
    mobileImage: "/img/hero-spf-mobile-fb1923.webp",
    tone: "light",
  },
  {
    title: "−10% fwee",
    text: "Сочные бальзамы, румяна и тинты fwee\nв оттенках весеннего неба",
    image: "/img/hero-fwee.webp",
    href: "/brands/fwee",
    mobileImage: "/img/hero-fwee-mobile-cf5f1b.webp",
    tone: "dark",
  },
  {
    title: "Dr. Althea",
    text: "Мягкий уход для чувствительной кожи:\nуспокаивает и восстанавливает барьер",
    image: "/img/hero-althea-62353f.webp",
    href: "/brands/dr-althea",
    mobileImage: "/img/hero-althea-mobile-9545cc.webp",
    tone: "dark",
  },
  {
    title: "Medicube девайсы",
    text: "Домашний уход как в салоне:\nлифтинг, микротоки и сияние кожи",
    image: "/img/hero-medicube.webp",
    href: "/catalog/beauty-gadgets?brand=Medicube",
    mobileImage: "/img/hero-medicube-mobile-5d0602.webp",
    tone: "light",
  },
];

/** Плитки каталога. wide = широкая плитка (616px в макете); left = фото прижато к левому краю —
 *  на узких экранах обрезается справа, и светлое поле под подписью остаётся */
export const catalog = [
  { title: "Для кожи лица", image: "/img/c-face-af880b.webp", href: "/catalog" },
  { title: "Glow Skin", image: "/img/c-glow-ea90a9.webp", href: "/catalog/glow-skin" },
  { title: "Антивозрастной уход", image: "/img/c3.webp", wide: true, href: "/catalog/antivozrastnoy-uhod" },
  { title: "Тренды Кореи", image: "/img/c4.webp", href: "/catalog/hity-korei" },
  { title: "Макияж", image: "/img/covers/makiyazh-077f49.webp", wide: true, href: "/catalog/makiyazh" },
  { title: "Для тела", image: "/img/c6.webp", href: "/catalog/dlya-tela" },
  { title: "Для волос", image: "/img/c-hair-0e5ead.webp", wide: true, left: true, href: "/catalog/dlya-volos" },
  { title: "Бьюти-гаджеты", image: "/img/c8.webp", href: "/catalog/beauty-gadgets" },
];

// Частые вопросы (главная и «Поддержка» в кабинете). Цифры доставки — из src/data/delivery.ts, как на странице «Доставка»,
// скидка и бонусы — из src/data/loyalty.ts: поменяются там — поменяются и здесь.
const rub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const faqRu = [
  {
    q: "О нас",
    a: "Lunmi — интернет-магазин корейской косметики для тех, кто давно смотрит на полки Olive Young с тихой завистью. Уход для лица, макияж, тело, волосы, SPF и бьюти-гаджеты — от проверенных хитов до новинок, о которых в Сеуле уже говорят, а у нас ещё нет. К каждой баночке пишем по-человечески: что внутри, как наносить и кому зайдёт.",
  },
  {
    q: "Оригинальность продукции",
    a: "Только оригинал, никаких «почти как». Закупаем у официальных дистрибьюторов брендов, а сертификаты и декларации покажем по первой просьбе — напишите в поддержку. Если что-то в посылке смутило, сфотографируйте упаковку и пришлите нам: разберёмся, не отправляя вас в бесконечную переписку.",
  },
  {
    q: "Доставка и оплата",
    a: `Москва и Петербург, курьером до двери — ${rub(delivery.courier.price)}, ${delivery.courier.days}. Те же города, но в пункт выдачи СДЭК — ${rub(delivery.pickup.price)}, ${delivery.pickup.days}. Все остальные города — тоже возим, курьером или в СДЭК: от ${rub(delivery.regions.priceFrom)}, ${delivery.regions.days}. Точную цену и срок посчитает сам СДЭК, как только вы укажете адрес, — без сюрпризов на кассе. В пункте выдачи посылка терпеливо ждёт ${delivery.storageDays} дней, а когда приедет, мы пришлём СМС. Как платить, выбираете при оформлении.`,
  },
  {
    q: "Как вернуть товар",
    a: "Косметику надлежащего качества по закону вернуть нельзя — это товар личной гигиены. Но если приехал брак или вообще не то, что вы заказывали, напишите в поддержку и пришлите фото: заменим товар или вернём деньги, без допросов. Подробности — на странице «Доставка».",
  },
  {
    q: "Как изменить или отменить заказ",
    a: "Передумали — бывает. Пока заказ не собран, откройте его в личном кабинете («Заказы») и нажмите «Отменить заказ»: деньги вернём. Хотите поменять адрес, дату или состав — напишите в поддержку, пока посылка не уехала.",
  },
  {
    q: "Проконсультироваться перед покупкой",
    a: "Глаза разбегаются — понимаем, у нас тоже. Напишите в Telegram, WhatsApp или на lunmicosm@gmail.com: расскажите про кожу и про то, что хочется исправить, — подберём уход без лишних баночек. Или загляните в «Подбор косметики»: пара вопросов — и у вас готовая подборка из каталога.",
  },
  {
    q: "Программа лояльности или бонусы для постоянных клиентов",
    a: `Зарегистрируйтесь — и получите персональную скидку ${loyalty.discount}% на каждый заказ, пока вы в личном кабинете. За отзыв на купленный товар дарим ${loyalty.bonusPerReview} баллов, 1 балл = 1 ₽: пишите честно, нам важно. Баллы копятся в кабинете, а тратить их при оплате можно будет совсем скоро — мы уже доделываем.`,
  },
];

// Английская версия FAQ — для сайта на английском (цены в евро через money)
const faqEn = [
  {
    q: "About us",
    a: "Lunmi is an online store of Korean cosmetics for everyone who’s been eyeing the shelves of Olive Young with quiet envy. Skincare, makeup, body, hair, SPF and beauty devices — from proven hits to new launches Seoul is already talking about. For every jar we explain in plain words what’s inside, how to apply it and who it’s for.",
  },
  {
    q: "Authenticity",
    a: "Only originals, no “almost the same”. We buy from official brand distributors and will gladly show certificates on request — just message support. If something in your parcel looks off, take a photo of the packaging and send it to us: we’ll sort it out without endless back-and-forth.",
  },
  {
    q: "Delivery and payment",
    a: `Moscow and Saint Petersburg, courier to your door — ${money(delivery.courier.price)}, 1–3 days. Same cities, to a CDEK pickup point — ${money(delivery.pickup.price)}, 1–3 days. All other cities — courier or CDEK, from ${money(delivery.regions.priceFrom)}, 5 days or more. CDEK calculates the exact price and time as soon as you enter your address — no surprises at checkout. Your parcel waits at the pickup point for ${delivery.storageDays} days, and we’ll text you when it arrives. You choose how to pay at checkout.`,
  },
  {
    q: "How to return an item",
    a: "By law, cosmetics of proper quality can’t be returned — they’re personal care products. But if something arrived damaged or isn’t what you ordered, message support and send a photo: we’ll replace it or refund you, no questions asked. More details on the “Delivery” page.",
  },
  {
    q: "How to change or cancel an order",
    a: "Changed your mind? It happens. While the order hasn’t been packed yet, open it in your account (“Orders”) and click “Cancel order” — we’ll refund you. Want to change the address, date or items — message support before the parcel ships.",
  },
  {
    q: "Get advice before buying",
    a: "Spoiled for choice? We get it, us too. Message us on Telegram, WhatsApp or at lunmicosm@gmail.com: tell us about your skin and what you’d like to improve, and we’ll put together a routine without extra jars. Or try “Beauty match”: a couple of questions — and you have a ready selection from our catalog.",
  },
  {
    q: "Loyalty program and rewards",
    a: `Sign up and get a personal ${loyalty.discount}% discount on every order while you’re signed in. For a review of a product you bought, we give you ${loyalty.bonusPerReview} points: be honest, it matters to us. Points collect in your account, and you’ll soon be able to spend them at checkout — we’re finishing that up.`,
  },
];

export const faq = isEn ? faqEn : faqRu;
