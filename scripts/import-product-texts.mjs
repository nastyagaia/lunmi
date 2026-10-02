// Тексты вкладок страницы товара из cosmetic_cards_master.json (подготовлены в ChatGPT, своими словами по сайтам брендов).
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

const TABS = ["Характеристики", "Состав", "Применение", "О бренде"];

// предложения-пометки для редактора, а не для покупателя
const NOTE =
  /папк|скриншот|оставляю|сохранённ|карточк|расхожден|до проверки|SKU|не полный список|неполный список|полный (состав|INCI|список)|INCI|упаковк|региональн|версии (продукта|формулы)|назван|обозначен|маркировк|отдельный продукт|самостоятельн|не переносите|конкретно|изображени|поэтому|доступн|нельзя|точный вариант|важен|оформля|если на |подтверждённ|индивидуальн|производитель не указал|ориентир|выделен|не путай|не путать|не следует|не смешивай|не объединяй|отличать|отлича|запись|обещать|описывать|описание огранич|файл|каталог|американск|рынк|официальн\w* верси|идентифик|тюбик|коробк|этикетк|проверяйте|могут (встречаться|отличаться|различаться)|точного описания|заявленной версии|этой позиции|не является простым|важно отлич|не указыва|не подтвержд|подтвердить|сверя|сверить|провер(ьте|ять|ить)/i;

// ссылки на источник звучат для покупателя канцелярски — говорим прямо
const REWORD = [
  ["В официальном списке также указаны", "В составе также есть"],
  ["В официальном списке ингредиентов указаны", "В составе есть"],
  ["В официальном списке указаны", "В составе есть"],
  ["Официальная формула содержит", "Формула содержит"],
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
  const kept = sentences.map((s) => s.trim()).filter((s) => s && !NOTE.test(s));
  return kept.join(" ").replace(/\s+/g, " ").trim();
}

const faceCare = JSON.parse(fs.readFileSync("src/data/face-care.json", "utf8"));
const brandOf = Object.fromEntries(faceCare.map((p) => [p.id, p.brand]));

const master = JSON.parse(fs.readFileSync(SRC, "utf8"));
const byId = Object.fromEntries(master.items.map((i) => [i.id, i]));
const out = {};
const removed = [];

for (const [slug, cardId] of Object.entries(MAP)) {
  const card = byId[cardId];
  if (!card) throw new Error(`нет карточки ${cardId}`);
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
