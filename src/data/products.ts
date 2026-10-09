// Страницы товаров (Figma: product 1, Frame 21289 — после «В корзину», product 3 — с оттенками).
// В макете название и тексты вкладок были «рыбой» — здесь они по тому, что на фото.
// Позже всё это переедет в базу товаров.
import type { Product } from "@/components/ProductCard";
import { delivery as deliveryTerms } from "./delivery";
import { allProducts, sectionHref, type CatalogProduct } from "./sections";
import productTexts from "./product-texts.json";

/** images — номера фото этого оттенка в images: при выборе оттенка галерея показывает только их */
export type Volume = { name: string; price: string; oldPrice?: string; images?: number[] };
export type Shade = { name: string; color: string; available?: boolean; images?: number[] };

export type ProductDetails = {
  slug: string;
  name: string;
  subtitle: string;
  category: { title: string; href: string };
  /** карточка товара для избранного (как в каталоге) */
  card?: Product;
  price: string;
  oldPrice?: string;
  discount?: string;
  hit?: boolean;
  rating?: string;
  /** выбор объёма: «150 мл», «530 мл» — у каждого своя цена и свои фото (номера в images) */
  volumes?: Volume[];
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

// сроки — из условий доставки (src/data/delivery.ts), для Москвы и Петербурга
const delivery = [`${deliveryTerms.courier.days} курьером`, `${deliveryTerms.pickup.days} в пункт выдачи СДЭК`];

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
  {
    name: "Вероника",
    date: "2 недели назад",
    rating: 5,
    text: "Беру уже второй раз. Текстура приятная, быстро впитывается и не скатывается под макияжем. Кожа заметно спокойнее и мягче.",
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
    images: allProducts.find((p) => p.id === "anua-peach-70-niacin-serum")?.images ?? [],
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
    // Фото и оттенки — из папки «макияж / Для губ / Dasique_Juicy_Dewy_Lip_Tint» через scripts/import-catalog.mjs.
    // Здесь только тексты вкладок (временные, проверить по сайту бренда)
    slug: "dasique-juicy-dewy-lip-tint",
    name: "Dasique Juicy Dewy Lip Tint",
    subtitle: "Сочный тинт для губ с глянцевым финишем",
    category: { title: "Для губ", href: "/catalog/makiyazh?type=%D0%94%D0%BB%D1%8F%20%D0%B3%D1%83%D0%B1" },
    price: "1 590 ₽",
    hit: true,
    rating: "4.8",
    images: [], // фото и оттенки — из каталога (catalog-extra.json), подставляются в getProduct
    delivery,
    ingredients: "Масла для блеска и мягкости губ",
    tabs: [
      {
        title: "Характеристики",
        text: "Лёгкий тинт с сочным глянцевым финишем: прозрачный цвет и влажный блеск, будто губы только что смазали бальзамом.\n\nНаносится одним слоем для естественного оттенка или в несколько слоёв для более яркого цвета.",
      },
      { title: "Состав", text: "Полный состав скоро появится здесь. Сверяйте его по упаковке." },
      {
        title: "Применение",
        text: "Нанесите на центр губ и растушуйте к краям — получится мягкий градиент. Для насыщенного цвета добавьте второй слой.",
      },
      {
        title: "О бренде",
        text: "Dasique — корейский бренд декоративной косметики, известный нежными палетками и тинтами в «сладких» оттенках.",
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
  [/retinal/i, "ретиналь"],
  [/retinol/i, "ретинол"],
  [/ceramid|atobarrier/i, "церамиды"],
  [/snail|mucin/i, "муцин улитки"],
  [/heartleaf/i, "экстракт хауттюйнии"],
  [/peptide/i, "пептиды"],
  [/\b(aha|bha|pha)\b|clarifying|clear ?pad/i, "AHA/BHA-кислоты"],
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
  [/plum/i, "вода зелёной сливы"],
  [/mung bean/i, "экстракт маша"],
  [/red bean/i, "экстракт красной фасоли"],
  [/dokdo|deep sea/i, "морская вода"],
  [/spicule/i, "микроспикулы"],
  [/caffeine/i, "кофеин"],
  [/carrot/i, "бета-каротин"],
  [/olive|avocado/i, "растительные масла"],
  [/agave|cactus|aloe/i, "экстракт агавы"],
  [/\b(sun|uv|spf)|spf\d/i, "UV-фильтры"],
];

/** Узнаваемые активы в русском тексте вкладки «Состав» — от более «громких» к базовым */
const ACTIVES_RU: [RegExp, string][] = [
  [/PDRN|ДНК лосося/i, "PDRN"],
  [/ретинал/i, "ретиналь"],
  [/ретинол/i, "ретинол"],
  [/бакучиол/i, "бакучиол"],
  [/аскорбинов|витамин(ом|а)? C/i, "витамин C"],
  [/азелаинов/i, "азелаиновая кислота"],
  [/транексамов/i, "транексамовая кислота"],
  [/арбутин/i, "альфа-арбутин"],
  [/койев/i, "койевая кислота"],
  [/ниацинамид/i, "ниацинамид"],
  [/глутатион/i, "глутатион"],
  [/салицил|BHA/i, "BHA-кислота"],
  [/AHA|гликолев/i, "AHA/BHA-кислоты"],
  [/пептид/i, "пептиды"],
  [/коллаген/i, "коллаген"],
  [/улитк/i, "муцин улитки"],
  [/церамид|керамид/i, "церамиды"],
  [/центелл|мадекасс|cica/i, "центелла азиатская"],
  [/хауттюйни|heartleaf/i, "экстракт хауттюйнии"],
  [/прополис/i, "прополис"],
  [/гиалурон/i, "гиалуроновая кислота"],
  [/персик/i, "экстракт персика"],
  [/женьшен/i, "экстракт женьшеня"],
  [/рисов/i, "экстракт риса"],
  [/полын/i, "экстракт полыни"],
  [/берёзов|березов/i, "берёзовый сок"],
  [/сосн/i, "экстракт сосны"],
  [/красной фасол/i, "экстракт красной фасоли"],
  [/маша/i, "экстракт маша"],
  [/зелёной слив/i, "вода зелёной сливы"],
  [/морк|каротин/i, "бета-каротин"],
  [/морск/i, "морская вода"],
  [/бифид/i, "лизат бифидобактерий"],
  [/фермент/i, "ферменты"],
  [/каолин|глин/i, "каолин"],
  [/чайного дерева/i, "масло чайного дерева"],
  [/сквалан/i, "сквалан"],
  [/витамин E|токоферол/i, "витамин E"],
  [/кофеин/i, "кофеин"],
  [/кератин/i, "кератин"],
  [/шёлк|шелк/i, "протеины шёлка"],
  [/мочевин/i, "мочевина"],
  [/оксид цинка/i, "оксид цинка"],
  [/УФ-фильтр|UV-фильтр|солнцезащитн\S* фильтр/i, "UV-фильтры"],
  [/икр/i, "экстракт икры"],
  [/жемчуг/i, "экстракт жемчуга"],
  [/экстракт\S* розы|дамасск|розов\S* вод/i, "экстракт розы"],
  [/мёд|мед[ау]?\b|манук/i, "мёд"],
  [/авокадо/i, "экстракт авокадо"],
  [/лимон(?!н)/i, "экстракт лимона"],
  [/опунци|кактус/i, "экстракт кактуса"],
  [/агав/i, "экстракт агавы"],
  [/алоэ/i, "алоэ вера"],
  [/облепих/i, "облепиха"],
  [/олив/i, "масло оливы"],
  [/жожоба/i, "масло жожоба"],
  [/арган/i, "аргановое масло"],
  [/масл\S* ши\b/i, "масло ши"],
  [/макадами/i, "масло макадамии"],
  [/цинк/i, "цинк"],
  [/витамин/i, "витамины"],
  [/бетаин/i, "бетаин"],
  [/пантенол/i, "пантенол"],
  [/аллантоин/i, "аллантоин"],
  [/глицерин/i, "глицерин"],
];

/** Активные компоненты: сначала «громкий» актив из названия товара (Kojic, PDRN…), потом — из настоящего
 *  текста «Состава» или «Характеристик» в том порядке, как они там названы (главное идёт первым) */
function activesFor(name: string, slug?: string) {
  const texts = slug ? (productTexts as Record<string, Record<string, string | null>>)[slug] : undefined;
  const text = [texts?.["Состав"], texts?.["Характеристики"]].filter(Boolean).join(" ");
  if (!text) return activesByName(name);
  // из названия — в том порядке, как активы в нём стоят
  const fromName = ACTIVES.map(([re, a]) => ({ a, at: name.search(re) }))
    .filter((h) => h.at >= 0)
    .sort((x, y) => x.at - y.at)
    .map((h) => h.a);
  const fromText = ACTIVES_RU.map(([re, a]) => ({ a, at: text.search(re) }))
    .filter((h) => h.at >= 0)
    .sort((x, y) => x.at - y.at)
    .map((h) => h.a);
  const found = withoutRepeats([...new Set([...fromName, ...fromText])]).slice(0, 3);
  // ничего узнаваемого в настоящем тексте — строку не показываем, чем выдумывать
  return found.length ? capitalize(found.join(", ")) : undefined;
}

const capitalize = (t: string) => t[0].toUpperCase() + t.slice(1);

/** убираем общее, когда рядом уже есть частное: «витамины» при «витамин C», «BHA-кислота» при «AHA/BHA» */
function withoutRepeats(list: string[]) {
  const has = (re: RegExp) => list.some((a) => re.test(a));
  return list.filter(
    (a) =>
      !(a === "витамины" && has(/^витамин /)) &&
      !(a === "BHA-кислота" && list.includes("AHA/BHA-кислоты")) &&
      !(a === "цинк" && list.includes("оксид цинка")) &&
      !(a === "растительные масла" && has(/^масло |масло$/)),
  );
}

function activesByName(name: string) {
  const found = [...new Set(ACTIVES.filter(([re]) => re.test(name)).map(([, a]) => a))].slice(0, 3);
  if (!found.length) return undefined;
  return capitalize(found.join(", "));
}

/** Как наносить — по типу товара (рыба до настоящих данных) */
const USAGE: Record<string, string> = {
  Очищение:
    "Нанесите на сухую или влажную кожу, помассируйте 30–60 секунд и смойте тёплой водой. Используйте утром и вечером, после — тонер.",
  "Тонеры и пэды":
    "После умывания нанесите тонер ладонями или протрите лицо пэдом по массажным линиям. Затем — сыворотка и крем.",
  "Сыворотки и ампулы":
    "Нанесите 2–3 капли на очищенную кожу после тонера и распределите похлопывающими движениями. Затем нанесите крем.",
  Кремы:
    "Нанесите небольшое количество на лицо последним шагом ухода, утром и вечером. Днём обязательно используйте SPF.",
  "SPF для лица":
    "Нанесите последним шагом утреннего ухода за 15 минут до выхода на улицу. Обновляйте каждые 2–3 часа на солнце.",
  Маски:
    "Нанесите на очищенную кожу на 15–20 минут, затем снимите и вбейте остатки средства. Используйте 2–3 раза в неделю.",
  "Пэды и патчи":
    "Протрите кожу пэдом после умывания или наложите патчи под глаза на 15–20 минут. Остатки эссенции вбейте кончиками пальцев.",
};

/** Как наносить в других разделах (у волос и тела свои «Маски» и кремы) — рыба до настоящих данных */
const USAGE_BY_SECTION: Record<string, Record<string, string>> = {
  "Для тела": {
    "Гели для душа": "Нанесите на влажную кожу, вспеньте и смойте тёплой водой.",
    "Уход против акне":
      "Нанесите на влажную кожу проблемных зон, помассируйте 30 секунд и смойте. Используйте 1 раз в день.",
    Скрабы:
      "Нанесите на влажную кожу, мягко помассируйте круговыми движениями и смойте. Используйте 1–2 раза в неделю.",
    "Мисты для тела": "Распылите на кожу тела с расстояния 20–30 см. Можно обновлять в течение дня.",
    default: "Нанесите на чистую кожу тела и распределите массажными движениями до впитывания.",
  },
  "Для волос": {
    Шампуни: "Нанесите на влажные волосы, вспеньте, помассируйте кожу головы и смойте.",
    "Уход за кожей головы": "Нанесите на влажную кожу головы, помассируйте 1–2 минуты и смойте.",
    Кондиционеры: "После шампуня распределите по длине волос, оставьте на 1–2 минуты и смойте.",
    Маски: "После шампуня нанесите на отжатые волосы по длине, оставьте на 5–10 минут и смойте.",
    default: "Распределите небольшое количество по длине и кончикам влажных или сухих волос. Не смывайте.",
  },
  "Бьюти-гаджеты": {
    default:
      "Перед первым использованием прочитайте инструкцию производителя. Используйте на чистой коже, подходящий режим подберите по инструкции.",
  },
};

function usageFor(p: CatalogProduct) {
  const bySection = USAGE_BY_SECTION[p.category];
  if (bySection) return bySection[p.type ?? ""] ?? bySection.default;
  return USAGE[p.type ?? ""] ?? USAGE["Кремы"];
}

/** Вкладки «Характеристики / Состав / Применение / О бренде», пока нет настоящих текстов.
 *  Собираются из данных товара — потом заменим текстами, написанными по фактам с сайтов брендов. */
function draftTabs(fc: CatalogProduct, actives: string) {
  const list = actives
    .split(", ")
    .map((a) => `— ${a[0].toUpperCase() + a.slice(1)}`)
    .join("\n");
  // у макияжа состав зависит от оттенка, у гаджетов его нет — ухоженные «ключевые компоненты» тут не к месту
  const makeup = fc.category === "Макияж";
  const gadget = fc.category === "Бьюти-гаджеты";
  return [
    {
      title: "Характеристики",
      text:
        makeup || gadget
          ? `${fc.description}.`
          : `${fc.description}. Подходит для ежедневного ухода и сочетается с другими средствами корейской рутины.\n\nКлючевые компоненты:\n${list}`,
    },
    {
      title: "Состав",
      text: makeup
        ? "Состав зависит от оттенка — полный список ингредиентов указан на упаковке."
        : gadget
          ? "Это прибор, а не косметическое средство, поэтому состава у него нет."
          : `Полный состав скоро появится здесь. Ключевые компоненты: ${actives.toLowerCase()}.`,
    },
    { title: "Применение", text: usageFor(fc) },
    {
      title: "О бренде",
      text: `${fc.brand} — корейский бренд. Скоро расскажем о нём подробнее.`,
    },
  ];
}

/** Настоящие тексты вкладок (scripts/import-product-texts.mjs). Вкладку без текста оставляем временной */
function withTexts(slug: string, tabs: { title: string; text: string }[] = []) {
  const texts = (productTexts as Record<string, Record<string, string | null>>)[slug];
  return texts ? tabs.map((t) => ({ ...t, text: texts[t.title] ?? t.text })) : tabs;
}

/** Карточка для избранного: то же, что в каталоге, без галереи */
function cardOf(p: CatalogProduct): Product {
  const card: Partial<CatalogProduct> = { ...p };
  delete card.images;
  delete card.thumbs;
  delete card.also;
  delete card.shades;
  return card as Product;
}

/** Похожие товары: тот же раздел и тип, кроме самого товара */
function similarTo(fc: CatalogProduct): Product[] {
  return allProducts.filter((p) => p.category === fc.category && p.type === fc.type && p.id !== fc.id).slice(0, 8);
}

/** Страница товара: подробные данные, если они есть, иначе — собранные из каталога */
export function getProduct(slug: string): ProductDetails | undefined {
  const fc = allProducts.find((p) => p.id === slug);
  const detailed = products.find((p) => p.slug === slug);
  if (detailed)
    return fc
      ? {
          ...detailed,
          tabs: withTexts(slug, detailed.tabs),
          // фото и оттенки — всегда из каталога, чтобы совпадали с карточкой
          images: fc.images,
          thumbs: fc.thumbs,
          shades: fc.shades ?? detailed.shades,
          volumes: fc.volumes,
          similar: similarTo(fc),
          card: cardOf(fc),
        }
      : detailed;
  if (!fc) return undefined;
  return {
    slug: fc.id,
    name: fc.name,
    subtitle: fc.description,
    category: { title: fc.type ?? fc.category, href: sectionHref(fc.category, fc.type) },
    price: fc.price,
    oldPrice: fc.oldPrice,
    discount: fc.discount,
    hit: fc.hit,
    rating: fc.rating,
    images: fc.images,
    thumbs: fc.thumbs,
    shades: fc.shades,
    volumes: fc.volumes,
    delivery,
    // «активные компоненты» — это про уход; у макияжа и гаджетов строку не показываем
    ingredients: fc.category === "Макияж" || fc.category === "Бьюти-гаджеты" ? undefined : activesFor(fc.name, fc.id),
    tabs: withTexts(
      fc.id,
      draftTabs(fc, activesFor(fc.name, fc.id) ?? activesByName(fc.name) ?? "увлажняющие компоненты"),
    ),
    // ВНИМАНИЕ: отзывы — из макета, одинаковые у всех товаров. Перед запуском магазина заменить настоящими
    reviews,
    similar: similarTo(fc),
    card: cardOf(fc),
  };
}

export const productSlugs = [...new Set([...products.map((p) => p.slug), ...allProducts.map((p) => p.id)])];
