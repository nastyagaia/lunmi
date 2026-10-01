// Страницы товаров (Figma: product 1, Frame 21289 — после «В корзину», product 3 — с оттенками).
// В макете название и тексты вкладок были «рыбой» — здесь они по тому, что на фото.
// Позже всё это переедет в базу товаров.
import type { Product } from "@/components/ProductCard";
import faceCare from "./face-care.json";

export type Shade = { name: string; color: string; available?: boolean };

export type ProductDetails = {
  slug: string;
  name: string;
  subtitle: string;
  category: { title: string; href: string };
  price: string;
  oldPrice?: string;
  discount?: string;
  hit?: boolean;
  rating?: string;
  /** выбор объёма: «50 ml», «100 ml» */
  volumes?: string[];
  /** выбор оттенка (для декоративной косметики) */
  shades?: Shade[];
  images: string[];
  /** уменьшенные копии для превью (600 px) */
  thumbs?: string[];
  delivery: string[];
  ingredients?: string;
  tabs?: { title: string; text: string }[];
  reviews: { name: string; date: string; text: string; avatar?: string; rating: number }[];
  similar: Product[];
};

const similar: Product[] = [
  {
    id: "s1",
    name: "Anua Niacinamide 10% + TXA 4% Serum",
    description: "Осветляющая сыворотка с ниацинамидом",
    price: "2 490 ₽",
    image: "/img/sim1.webp",
    discount: "15%",
  },
  {
    id: "s2",
    name: "Beauty of Joseon Glow Serum: Propolis + Niacinamide",
    description: "Сыворотка для сияния кожи с ниацинамидом",
    price: "1 690 ₽",
    image: "/img/sim2.webp",
    discount: "15%",
  },
  {
    id: "s3",
    name: "Jumiso Niacinamide 20 Serum",
    description: "Сыворотка с ниацинамидом для выравнивания тона кожи",
    price: "1 990 ₽",
    image: "/img/sim3.webp",
    discount: "15%",
  },
  {
    id: "s4",
    name: "Beauty of Joseon Glow Deep Serum Rice + Arbutin",
    description: "Осветляющая сыворотка против пигментации",
    price: "1 790 ₽",
    image: "/img/sim4.webp",
    discount: "15%",
  },
];

const delivery = ["1–3 дня курьером", "3–7 дней Почтой России"];

const reviews = [
  {
    name: "Анна",
    date: "1 день назад",
    avatar: "/img/rev-anna.webp",
    rating: 5,
    text: "Вместе с сывороткой из этой линейки даёт заметный, хороший эффект. Тон ровнее, заломы на коже менее заметны, плюс при частом использовании — меньше высыпаний.",
  },
  {
    name: "Полина",
    date: "1 неделю назад",
    rating: 4,
    text: "Один из самых любимых продуктов в уходе. Вводила постепенно, чтобы кожа привыкла: сначала через день, потом каждый вечер. Через месяц пятна после высыпаний заметно посветлели, а кожа стала более ровной и сияющей. Не забываю про SPF днём.",
  },
];

export const products: ProductDetails[] = [
  {
    slug: "anua-peach-70-niacin-serum",
    name: "Anua Peach 70 Niacin Serum",
    subtitle: "Сыворотка с ниацинамидом для сияния кожи",
    category: { title: "Сыворотки и ампулы", href: "/catalog?type=Сыворотки+и+ампулы" },
    price: "2 993 ₽",
    discount: "5%",
    hit: true,
    rating: "4.3",
    volumes: ["30 ml", "50 ml"],
    images: faceCare.find((p) => p.id === "anua-peach-70-niacin-serum")?.images ?? [],
    delivery,
    ingredients: "Ниацинамид, экстракт персика, гиалуроновая кислота",
    tabs: [
      {
        title: "Характеристики",
        text: "Лёгкая сыворотка, на 70% состоящая из экстракта персика. Выравнивает тон, возвращает коже сияние и делает её мягче уже после первых недель использования.\n\nНевесомая текстура быстро впитывается, не оставляет липкости и подходит под макияж. Подходит для всех типов кожи, в том числе для чувствительной.\n\nЧем полезна:\n— Ниацинамид выравнивает тон и делает менее заметными следы после высыпаний.\n— Экстракт персика питает и смягчает кожу, придаёт ей здоровое сияние.\n— Гиалуроновая кислота глубоко увлажняет и возвращает упругость.",
      },
      {
        title: "Состав",
        text: "Prunus Persica (Peach) Fruit Extract, Niacinamide, Glycerin, Butylene Glycol, Sodium Hyaluronate, Panthenol, Allantoin, Adenosine, Carbomer, Arginine, Ethylhexylglycerin, 1,2-Hexanediol.",
      },
      {
        title: "Применение",
        text: "Утром и вечером после очищения и тонера нанесите 2–3 капли на лицо и мягко распределите похлопывающими движениями. Затем нанесите крем. Днём обязательно используйте SPF.",
      },
      {
        title: "О бренде",
        text: "Anua — корейский бренд, который делает мягкий уход для чувствительной кожи на основе растительных экстрактов. Самый известный продукт бренда — тонер с хауттюйнией, один из бестселлеров Olive Young.",
      },
    ],
    reviews,
    similar,
  },
  {
    slug: "clio-crystal-glam-tint",
    name: "Clio Crystal Glam Tint",
    subtitle: "Тинт для губ, 3,4 г",
    category: { title: "Макияж", href: "/catalog" },
    price: "2 993 ₽",
    rating: "4.3",
    shades: [
      { name: "03 Blushed Peach", color: "#F5487F" },
      { name: "05 Fresh Cherry", color: "#FF424E" },
      { name: "06 Pink Jelly", color: "#ED5099" },
      { name: "07 Fuchsia Glow", color: "#EC65BF" },
      { name: "08 Rose Berry", color: "#EC6580" },
      { name: "09 Coral Pop", color: "#F36B6B" },
      { name: "10 Mellow Coral", color: "#F07B7D" },
      { name: "11 Peach Milk", color: "#FF9496", available: false },
    ],
    images: ["/img/pd-clio-1.webp", "/img/pd-model.webp"],
    delivery,
    ingredients: "Сквалан, диглицерин, бутиленгликоль",
    tabs: [
      {
        title: "Характеристики",
        text: "Тинт с эффектом стеклянных губ: яркий прозрачный цвет и сочный глянцевый блеск, как у кристалла.\n\nЛёгкая формула не липнет и не сушит губы, а сквалан в составе смягчает и ухаживает за кожей губ в течение дня.",
      },
      { title: "Состав", text: "Diisostearyl Malate, Hydrogenated Polyisobutene, Squalane, Diglycerin, Butylene Glycol, Tocopherol." },
      {
        title: "Применение",
        text: "Нанесите на центр губ и растушуйте к краям — так получится эффект градиента. Для насыщенного цвета нанесите второй слой.",
      },
      {
        title: "О бренде",
        text: "Clio — корейский бренд декоративной косметики, известный кушонами и тинтами с профессиональной стойкостью.",
      },
    ],
    reviews,
    similar,
  },
];

/** «Активные компоненты», пока нет настоящих данных: подбираем по словам в названии товара.
 *  Это осмысленная «рыба» — потом заменим данными из базы. */
const ACTIVES: [RegExp, string][] = [
  [/centella|cica|madeca/i, "центелла азиатская"],
  [/hyalu|water bank|dive-?in/i, "гиалуроновая кислота"],
  [/niacin/i, "ниацинамид"],
  [/pdrn/i, "PDRN"],
  [/collagen/i, "коллаген"],
  [/vitamin ?c|vita ?c|vita 10|tangerine/i, "витамин C"],
  [/retin/i, "ретиналь"],
  [/ceramid|atobarrier/i, "церамиды"],
  [/snail|mucin/i, "муцин улитки"],
  [/heartleaf/i, "экстракт хауттюйнии"],
  [/peptide/i, "пептиды"],
  [/aha|bha|pha|clarifying|clear ?pad/i, "AHA/BHA-кислоты"],
  [/glutathione/i, "глутатион"],
  [/arbutin/i, "альфа-арбутин"],
  [/propolis|honey/i, "прополис"],
  [/birch/i, "берёзовый сок"],
  [/mugwort/i, "экстракт полыни"],
  [/tea ?tree|teatree/i, "масло чайного дерева"],
  [/squalane/i, "сквалан"],
  [/bakuchiol/i, "бакучиол"],
  [/azelaic/i, "азелаиновая кислота"],
  [/kojic/i, "койевая кислота"],
  [/rice|dynasty/i, "экстракт риса"],
  [/rose/i, "экстракт розы"],
  [/pearl/i, "экстракт жемчуга"],
  [/bifida/i, "лизат бифидобактерий"],
  [/peach/i, "экстракт персика"],
  [/plum/i, "экстракт сливы"],
  [/mung bean|red bean/i, "экстракт бобов"],
  [/dokdo|deep sea/i, "морская вода"],
  [/spicule/i, "микроспикулы"],
  [/caffeine/i, "кофеин"],
  [/carrot/i, "бета-каротин"],
  [/olive|avocado/i, "растительные масла"],
  [/agave|cactus|aloe/i, "экстракт агавы"],
  [/sun|uv|spf/i, "UV-фильтры"],
];

function activesFor(name: string) {
  const found = [...new Set(ACTIVES.filter(([re]) => re.test(name)).map(([, a]) => a))].slice(0, 3);
  const text = (found.length ? found : ["гиалуроновая кислота", "пантенол"]).join(", ");
  return text[0].toUpperCase() + text.slice(1);
}

/** Как наносить — по типу товара (рыба до настоящих данных) */
const USAGE: Record<string, string> = {
  Очищение:
    "Нанесите на сухую или влажную кожу, помассируйте 30–60 секунд и смойте тёплой водой. Используйте утром и вечером, после — тонер.",
  "Тонеры и пэды":
    "После умывания нанесите тонер ладонями или протрите лицо пэдом по массажным линиям. Затем — сыворотка и крем.",
  "Сыворотки и ампулы":
    "Нанесите 2–3 капли на очищенную кожу после тонера и распределите похлопывающими движениями. Затем нанесите крем.",
  Кремы: "Нанесите небольшое количество на лицо последним шагом ухода, утром и вечером. Днём обязательно используйте SPF.",
  "SPF для лица":
    "Нанесите последним шагом утреннего ухода за 15 минут до выхода на улицу. Обновляйте каждые 2–3 часа на солнце.",
  Маски:
    "Нанесите на очищенную кожу на 15–20 минут, затем снимите и вбейте остатки средства. Используйте 2–3 раза в неделю.",
  "Пэды и патчи":
    "Протрите кожу пэдом после умывания или наложите патчи под глаза на 15–20 минут. Остатки эссенции вбейте кончиками пальцев.",
};

/** Вкладки «Характеристики / Состав / Применение / О бренде», пока нет настоящих текстов.
 *  Собираются из данных товара — потом заменим текстами, написанными по фактам с сайтов брендов. */
function draftTabs(fc: Product, actives: string) {
  const list = actives
    .split(", ")
    .map((a) => `— ${a[0].toUpperCase() + a.slice(1)}`)
    .join("\n");
  return [
    {
      title: "Характеристики",
      text: `${fc.description}. Подходит для ежедневного ухода и сочетается с другими средствами корейской рутины.\n\nКлючевые компоненты:\n${list}`,
    },
    { title: "Состав", text: `Полный состав скоро появится здесь. Ключевые компоненты: ${actives.toLowerCase()}.` },
    { title: "Применение", text: USAGE[fc.type ?? ""] ?? USAGE["Кремы"] },
    {
      title: "О бренде",
      text: `${fc.brand} — корейский бренд ухода за кожей. Скоро расскажем о нём подробнее.`,
    },
  ];
}

/** Похожие товары: тот же тип, кроме самого товара */
function similarTo(id: string, type?: string): Product[] {
  return (faceCare as Product[]).filter((p) => p.type === type && p.id !== id).slice(0, 8);
}

/** Страница товара: подробные данные, если они есть, иначе — собранные из каталога «Ухода для лица» */
export function getProduct(slug: string): ProductDetails | undefined {
  const fc = (faceCare as (Product & { images: string[]; thumbs: string[] })[]).find((p) => p.id === slug);
  const detailed = products.find((p) => p.slug === slug);
  if (detailed) return fc ? { ...detailed, thumbs: fc.thumbs, similar: similarTo(fc.id, fc.type) } : detailed;
  if (!fc) return undefined;
  return {
    slug: fc.id,
    name: fc.name,
    subtitle: fc.description,
    category: { title: fc.type ?? "Каталог", href: `/catalog?type=${encodeURIComponent(fc.type ?? "")}` },
    price: fc.price,
    oldPrice: fc.oldPrice,
    discount: fc.discount,
    hit: fc.hit,
    rating: fc.rating,
    images: fc.images,
    thumbs: fc.thumbs,
    delivery,
    ingredients: activesFor(fc.name),
    tabs: draftTabs(fc, activesFor(fc.name)),
    // ВНИМАНИЕ: отзывы — из макета, одинаковые у всех товаров. Перед запуском магазина заменить настоящими
    reviews,
    similar: similarTo(fc.id, fc.type),
  };
}

export const productSlugs = [...new Set([...products.map((p) => p.slug), ...faceCare.map((p) => p.id)])];
