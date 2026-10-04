// Тексты вкладок страницы товара из cosmetic_cards_master.json (подготовлены в ChatGPT, своими словами по сайтам брендов).
// Плюс тексты остальных разделов из scripts/cards/*.json (их делает scripts/docs-to-cards.py из документов Word).
// Запуск: node scripts/import-product-texts.mjs [путь к json] → src/data/product-texts.json
// Из текстов убираются служебные пометки для редактора («название папки…», «сверяйте упаковку…»).
import fs from "node:fs";

const SRC =
  process.argv[2] ??
  "/Users/anastasiagajkalova/.codex/.chatgpt-projects/g-p-6aa864aa10d881919dd2ea67b101f692/deliverables/cosmetic_cards_master.json";

/** наш id товара → id карточки в файле. Неопознанные карточки (патчи, маски без варианта) не подключаем,
 *  как и те, где версия товара под вопросом: Purito Centella Serum, Mediheal N.M.F Aquaring, Medicube Collagen Milky Glow */
const MAP = {
  "cosrx-good-morning-gel": "CLN-01",
  "banila-clean-it-zero": "CLN-02",
  "boj-green-plum-cleanser": "CLN-03",
  "round-lab-dokdo-balm": "CLN-04",
  "torriden-dive-in-foam": "CLN-05",
  "anua-pore-cleansing-oil": "CLN-06",
  "somebymi-miracle-foam": "CLN-07",
  "drg-green-pore-balm": "CLN-09",
  "beplain-mung-bean-foam": "CLN-10",
  "abib-heartleaf-pad": "TON-01",
  "boj-green-plum-toner": "TON-02",
  "cosrx-aha-bha-toner": "TON-03",
  "isntree-hyaluronic-toner": "TON-04",
  "numbuzin-no5-pad": "TON-05",
  "round-lab-dokdo-toner": "TON-06",
  "skinfood-carrot-pad": "TON-07",
  "tonymoly-mochi-toner": "TON-08",
  "torriden-dive-in-toner": "TON-09",
  "boj-glow-serum": "SER-01",
  "torriden-dive-in-serum": "SER-02",
  "abib-pdrn-glow-serum": "SER-03",
  "numbuzin-no3-serum": "SER-04",
  "anua-peach-70-niacin-serum": "SER-06",
  "anua-azelaic-serum": "SER-07",
  "anua-niacinamide-txa-serum": "SER-08",
  "anua-pdrn-capsule-serum": "SER-09",
  "anua-vita-10-serum": "SER-10",
  "banila-propolis-ampoule": "SER-11",
  "cosrx-vitamin-c23": "SER-12",
  "cosrx-alpha-arbutin": "SER-13",
  "cosrx-snail-96": "SER-14",
  "isntree-onion-ampoule": "SER-15",
  "manyo-bifida-ampoule": "SER-16",
  "medicube-kojic-serum": "SER-17",
  "numbuzin-no5-glutathione": "SER-18",
  "skin1004-centella-ampoule": "SER-19",
  "skin1004-tone-brightening": "SER-20",
  "tirtir-vitamin-c24": "SER-21",
  "arencia-vitamin-c-shot": "SER-22",
  "abib-pdrn-cream": "CRM-01",
  "aestura-atobarrier-cream": "CRM-02",
  "anua-heartleaf-70-cream": "CRM-03",
  "anua-heartleaf-sun-cream": "CRM-04",
  "anua-pdrn-cream": "CRM-05",
  "anua-peach-77-cream": "CRM-06",
  "boj-dynasty-cream": "CRM-08",
  "boj-red-bean-gel": "CRM-09",
  "wishtrend-bakuchiol-cream": "CRM-10",
  "celimax-dual-barrier-cream": "CRM-11",
  "centellian-madeca-cream": "CRM-12",
  "cosrx-ceramide-cream": "CRM-13",
  "dr-althea-345-cream": "CRM-14",
  "illiyoon-hyaluronic-cream": "CRM-15",
  "laneige-water-bank-cream": "CRM-16",
  "manyo-bifida-cream": "CRM-17",
  "medipeel-peptide-9-cream": "CRM-18",
  "medicube-collagen-jelly-cream": "CRM-19",
  "round-lab-birch-cream": "CRM-20",
  "s-nature-squalane-cream": "CRM-21",
  "skin1004-centella-cream": "CRM-22",
  "torriden-balanceful-cream": "CRM-23",
  "torriden-dive-in-cream": "CRM-24",
  "vely-vely-spicule-cream": "CRM-25",
  "wellage-hyaluronic-cream": "CRM-26",
  "anua-peach-tone-up": "SUN-01",
  "biodance-collagen-mask": "MSK-01",
  "drjart-cryo-rubber-mask": "MSK-02",
  "jmsolution-pearl-mask": "MSK-03",
  "koelf-royal-jelly-mask": "MSK-04",
  "koelf-ruby-rose-mask": "MSK-05",
  "mediheal-hyper-collagen-mask": "MSK-06",
  "petitfee-black-pearl-mask": "MSK-07",
  "boj-red-bean-pore-mask": "MSK-08",
  "anua-heartleaf-sheet-mask": "MSK-11",
  "boj-calming-barrier-mask": "MSK-12",
  "round-lab-birch-mask": "MSK-19",
  "round-lab-dokdo-mask": "MSK-20",
  "round-lab-mugwort-mask": "MSK-21",
  "round-lab-pine-mask": "MSK-22",
  "torriden-dive-in-mask": "MSK-24",
  "medicube-pdrn-caffeine-mask": "MSK-25",
  "medicube-kojic-mask": "MSK-27",
  "medicube-collagen-overnight-mask": "MSK-28",
};

/** то же для scripts/cards. Карточки, у которых id — это наш id товара (из_интернета.json), подключаются сами */
const EXTRA_MAP = {
  "nature-garden-grape-mist": "BODY-12",
  "anua-heartleaf-77-toner": "GLOWSKIN-01",
  "cosrx-bha-blackhead": "GLOWSKIN-04",
  "drjart-ceramidin-cream": "GLOWSKIN-05",
  "goodal-vita-c-serum": "GLOWSKIN-06",
  "klairs-vitamin-drop": "GLOWSKIN-07",
  "manyo-bifida-eye-cream": "GLOWSKIN-08",
  "medipeel-melanon-x": "GLOWSKIN-09",
  "medipeel-red-lacto-mask": "GLOWSKIN-11",
  "somebymi-miracle-toner": "GLOWSKIN-15",
  "vt-reedle-shot-100": "GLOWSKIN-17",
  "ahc-real-eye-cream": "AGE-01",
  "arencia-nad-booster": "AGE-02",
  "arencia-red-smoothie-serum": "AGE-03",
  "drdifferent-vitalift-a": "AGE-04",
  "elizavecca-piggy-collagen": "AGE-05",
  "hera-signia-lifting-serum": "AGE-06",
  "ohui-retinol-cream": "AGE-07",
  "sulwhasoo-ginseng-cream": "AGE-09",
  "caelumen-micro-led-mask": "DEV-01",
  "currentbody-led-mask": "DEV-03",
  "medicube-age-r-booster-pro": "DEV-05",
  "jsoop-keratin-ampoule": "HAI-01",
  "lador-angel-muguet-oil": "HAI-02",
  "lador-angel-muguet-shampoo": "HAI-03",
  "lador-acid-conditioner": "HAI-04",
  "lador-hydro-lpp": "HAI-05",
  "lador-keratin-shampoo": "HAI-07",
  "lador-moisture-shampoo": "HAI-08",
  "lador-osmanthus-oil": "HAI-09",
  "lador-osmanthus-treatment": "HAI-10",
  "lador-tea-tree-scalp": "HAI-11",
  "lador-wonder-balm": "HAI-12",
  "anua-glow-sunstick": "SUN-01",
  "axis-y-physical-sunscreen": "SUN-02",
  "benton-air-fit-sun": "SUN-03",
  "cosrx-invisible-sunscreen": "SUN-04",
  "drg-green-mild-sun": "SUN-05",
  "haruharu-black-rice-sun": "SUN-06",
  "makeprem-sun-essence": "SUN-07",
  "manyo-sun-serum": "SUN-08",
  "manyo-sun-stick": "SUN-09",
  "purito-soft-touch-sun": "SUN-10",
  "skin1004-hyalu-cica-sun": "SUN-11",
  "thank-you-farmer-sun": "SUN-12",
  "tocobo-bio-watery-sun": "SUN-13",
  "aestura-body-lotion": "BODY-01",
  "aromatica-body-mist": "BODY-02",
  "aromatica-body-cream": "BODY-03",
  "happy-bath-baby-powder": "BODY-04",
  "illiyoon-top-to-toe-wash": "BODY-05",
  "illiyoon-ato-concentrate-cream": "BODY-06",
  "illiyoon-ato-lotion": "BODY-07",
  "illiyoon-scrub-wash": "BODY-08",
  "kundal-honey-body-lotion": "BODY-09",
  "kundal-honey-body-wash": "BODY-10",
  "kundal-white-musk-mist": "BODY-11",
  "scentlier-body-mist": "BODY-13",
  "skinfood-black-sugar-scrub": "BODY-14",
  "somebymi-body-cleanser": "BODY-15",
  "whamisa-algae-mist": "BODY-16",
  "3ce-drop-glow-gel": "MAKEUP-LIP-01",
  "amuse-jel-fit-tint": "MAKEUP-LIP-02",
  "clio-crystal-glam-tint": "MAKEUP-LIP-03",
  "colorgram-fruity-glass-tint-deep-glaze": "MAKEUP-LIP-04",
  "dasique-juicy-dewy-lip-tint": "MAKEUP-LIP-05",
  "etude-glow-fixing-tint": "MAKEUP-LIP-06",
  "fwee-3d-voluming-gloss": "MAKEUP-LIP-07",
  "fwee-3d-voluming-tint": "MAKEUP-LIP-08",
  "hince-raw-glow-gel-tint": "MAKEUP-LIP-09",
  "holika-soft-rolling-gloss": "MAKEUP-LIP-10",
  "milk-touch-jelly-fit-tint": "MAKEUP-LIP-11",
  "nuse-care-liptual": "MAKEUP-LIP-12",
  "romand-glasting-color-gloss": "MAKEUP-LIP-13",
  "romand-juicy-lasting-tint": "MAKEUP-LIP-14",
  "espoir-brow-balance-pencil": "MAKEUP-EYE-01",
  "etude-drawing-eye-brow": "MAKEUP-EYE-02",
  "peripera-speedy-skinny-brow-mascara": "MAKEUP-EYE-03",
  "romand-han-all-brow-cara": "MAKEUP-EYE-04",
  "unleashia-shaper-pomade-brow-fixer": "MAKEUP-EYE-05",
  "bbia-last-auto-gel-eyeliner": "MAKEUP-EYE-06",
  "clio-sharp-so-simple-pencil-liner": "MAKEUP-EYE-07",
  "clio-superproof-pen-liner": "MAKEUP-EYE-08",
  "3ce-eye-switch": "MAKEUP-EYE-09",
  "3ce-multi-eye-color-palette": "MAKEUP-EYE-24",
  "clio-pro-eye-palette-air": "MAKEUP-EYE-25",
  "unleashia-get-loose-glitter-gel": "MAKEUP-EYE-26",
  "unleashia-glitterpedia-eye-palette": "MAKEUP-EYE-27",
  "unleashia-mood-shower-face-palette": "MAKEUP-FACE-28",
  "dasique-starlit-jewel-liquid-glitter": "MAKEUP-EYE-29",
  "unleashia-pretty-easy-glitter-stick": "MAKEUP-EYE-30",
  "dasique-mood-slim-liner": "MAKEUP-EYE-31",
  "innisfree-simple-label-pencil-liner": "MAKEUP-EYE-32",
  "lilybyred-am9-pm9-penliner": "MAKEUP-EYE-33",
  "merzy-first-gel-eyeliner": "MAKEUP-EYE-35",
  "romand-twinkle-pen-liner": "MAKEUP-EYE-36",
  "clio-kill-lash-superproof-mascara": "MAKEUP-EYE-37",
  "dasique-mood-up-mascara": "MAKEUP-EYE-38",
  "etude-curl-fix-mascara": "MAKEUP-EYE-39",
  "holika-lash-correcting-mascara": "MAKEUP-EYE-40",
  "mude-inspire-skinny-curling-mascara": "MAKEUP-EYE-41",
  "peripera-ink-all-black-cara": "MAKEUP-EYE-42",
  "bbia-last-powder-lipstick": "MAKEUP-FACE-43",
  "romand-zero-matte-lipstick": "MAKEUP-FACE-44",
  "unleashia-oh-happy-day-lip-pencil": "MAKEUP-FACE-45",
  "about-tone-blur-powder-pact": "MAKEUP-FACE-46",
  "unleashia-babe-skin-cushion": "MAKEUP-FACE-47",
  "clio-kill-cover-founwear-cushion": "MAKEUP-FACE-48",
  "unleashia-dough-dough-waffle-blush": "MAKEUP-FACE-49",
  "erborian-cc-red": "MAKEUP-FACE-50",
  "erborian-bb-creme-ginseng": "MAKEUP-FACE-51",
  "espoir-fresh-setting-fixer": "MAKEUP-FACE-52",
  "holika-puri-pore-pact": "MAKEUP-FACE-53",
  "innisfree-no-sebum-pact": "MAKEUP-FACE-54",
  "missha-m-perfect-cover-bb": "MAKEUP-FACE-55",
  "missha-m-perfect-cover-serum-bb": "MAKEUP-FACE-56",
  "unleashia-satin-wear-cushion": "MAKEUP-FACE-57",
  "so-natural-setting-fixx": "MAKEUP-FACE-58",
  "the-saem-perfect-pore-pact": "MAKEUP-FACE-59",
};

const TABS = ["Характеристики", "Состав", "Применение", "О бренде"];

// предложения-пометки для редактора, а не для покупателя
const NOTE =
  /папк|скриншот|оставляю|сохранённ|карточк|расхожден|до проверки|SKU|не полный список|неполный список|полный (состав|INCI|список)|INCI|упаковк|региональн|версии (продукта|формулы)|назван|обозначен|маркировк|отдельный продукт|самостоятельн|не переносите|конкретно|изображени|поэтому|доступн|нельзя|точный вариант|важен|оформля|если на |подтверждённ|индивидуальн|производитель не указал|ориентир|выделен|не путай|не путать|не следует|не смешивай|не объединяй|отличать|отлича|запись|обещать|описывать|описание огранич|файл|каталог|американск|рынк|официальн\w* верси|идентифик|тюбик|коробк|этикетк|проверяйте|могут (встречаться|отличаться|различаться)|точного описания|заявленной версии|этой позиции|не является простым|важно отлич|не указыва|не подтвержд|подтвердить|сверя|сверить|провер(ьте|ять|ить)|Olive Young|ритейлер|отзыв|публикац|сведения|не совпада|той же формул|отдельн\w* продукт|не одно и то же/i;

// ссылки на источник звучат для покупателя канцелярски — говорим прямо
const REWORD = [
  ["В официальном списке также указаны", "В составе также есть"],
  ["В официальном списке ингредиентов указаны", "В составе есть"],
  ["В официальном списке указаны", "В составе есть"],
  ["Официальная формула содержит", "Формула содержит"],
  ["В карточке перечислены", "В составе есть"],
  ["mude. —", "mude —"],
  ["celimax —", "Celimax —"],
  ["В опубликованных списках для Nature Garden Perfumed Body Mist встречаются", "В составе есть"],
  ["В опубликованном составе указаны", "В составе есть"],
  ["Официальная версия бренда содержит", "Формула содержит"],
  ["В официальной формуле линейки выделяются", "Ключевые компоненты —"],
  ["На официальной странице перечислены", "Ключевые компоненты —"],
  ["Официальная линия выделяет", "В основе формулы —"],
  ["По официальной корейской странице в формуле указаны", "В формуле —"],
  ["В официальном описании выделяются", "Ключевые компоненты —"],
  [" В официальной версии объём тубы — 75 мл.", ""],
  ["официальный сайт указывает до 120 часов", "бренд заявляет до 120 часов"],
  ["Официальное описание международной версии указывает на", "Бренд обещает"],
  [
    "Официальная страница указывает хлопковую основу и время применения 10–20 минут.",
    "Основа из хлопка, время применения — 10–20 минут.",
  ],
];

function clean(text) {
  for (const [from, to] of REWORD) text = text.replace(from, to);
  // точка внутри слова (Dr.G, N.M.F) — не конец предложения
  const sentences = text.match(/(?:[^.!?]|[.!?](?!\s|$))+[.!?]*/g) ?? [text];
  // в длинном предложении пометка бывает только во второй половине, после «;» — оставляем первую
  const kept = sentences
    .map((s) => {
      const parts = s.trim().split(/;\s+/);
      const cut = parts.findIndex((p) => NOTE.test(p));
      const ok = cut === -1 ? parts : parts.slice(0, cut);
      if (ok.length === parts.length || !ok.length) return ok.join("; ");
      return ok.join("; ").replace(/[.!?]*$/, ".");
    })
    .filter(Boolean);
  // предложение начинается с бренда со строчной буквы («fwee — …») — делаем заглавную, как в названиях товаров
  return kept
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|[.!?] )([a-z])/g, (_, p, c) => p + c.toUpperCase());
}

const faceCare = JSON.parse(fs.readFileSync("src/data/face-care.json", "utf8"));
const extra = JSON.parse(fs.readFileSync("src/data/catalog-extra.json", "utf8")).products;
const brandOf = Object.fromEntries([...faceCare, ...extra].map((p) => [p.id, p.brand]));

const master = JSON.parse(fs.readFileSync(SRC, "utf8"));
const byId = Object.fromEntries(master.items.map((i) => [i.id, i]));
const cards = fs
  .readdirSync("scripts/cards")
  .flatMap((f) => JSON.parse(fs.readFileSync(`scripts/cards/${f}`, "utf8")).items);
const extraById = Object.fromEntries(cards.map((i) => [i.id, i]));
const out = {};
const removed = [];

for (const [slug, card] of [
  ...Object.entries(MAP).map(([slug, id]) => [slug, byId[id] ?? id]),
  ...Object.entries(EXTRA_MAP).map(([slug, id]) => [slug, extraById[id] ?? id]),
  ...cards.filter((c) => brandOf[c.id]).map((c) => [c.id, c]),
]) {
  if (!brandOf[slug]) throw new Error(`нет товара ${slug}`);
  if (typeof card === "string") throw new Error(`нет карточки ${card}`);
  out[slug] = Object.fromEntries(
    TABS.map((t) => {
      const raw = card.tabs[t] ?? "";
      const c = clean(raw);
      if (c.length < raw.length) removed.push(`${slug} / ${t}: ${raw.length - c.length} зн.`);
      // от вкладки почти ничего не осталось — пусть страница покажет временный текст
      return [t, c.length >= (t === "О бренде" ? 30 : 80) ? c : null];
    }),
  );
}

// пустое «О бренде» — общая первая фраза о том же бренде из соседней карточки
const aboutBrand = {};
for (const [slug, tabs] of Object.entries(out)) {
  const first = tabs["О бренде"]?.match(/^[^.]*бренд[^.]*\./)?.[0];
  if (first && !aboutBrand[brandOf[slug]]) aboutBrand[brandOf[slug]] = first;
}
for (const [slug, tabs] of Object.entries(out)) tabs["О бренде"] ??= aboutBrand[brandOf[slug]] ?? null;

fs.writeFileSync("src/data/product-texts.json", JSON.stringify(out, null, 2) + "\n");
console.log(`товаров: ${Object.keys(out).length}, почищено вкладок: ${removed.length}`);
