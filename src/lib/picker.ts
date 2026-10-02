// «Подбор средств» — простой подбор по правилам (пока без настоящего AI).
// Ищем в запросе ключевые слова (тип кожи, проблемы, бюджет) и подбираем товары из каталога
// с подходящими компонентами. Позже эту функцию можно заменить запросом к Claude — интерфейс тот же:
// на входе текст запроса, на выходе объяснение и группы товаров.
import type { Product } from "@/components/ProductCard";

export type PickerGroup = { title: string; text: string; products: Product[] };
export type PickerResult = { intro: string[]; groups: PickerGroup[] };

type Rule = {
  /** слова в запросе, по которым включается группа */
  ask: RegExp;
  title: string;
  /** объяснение группы под заголовком */
  text: string;
  /** что ищем в названии и описании товара */
  find: RegExp;
  /** как это звучит во вступлении: «…поможет {about}» */
  about: string;
};

const RULES: Rule[] = [
  {
    ask: /морщин|возраст|упруг|лифтинг|ретин|витамин ?а(?![а-яё])|пептид|anti-?age/i,
    title: "От морщин",
    text: "Ретиноиды, пептиды и бакучиол помогают сохранить упругость кожи и сделать мелкие морщинки менее заметными. Если используешь ретинол, не забывай про SPF.",
    find: /retin|peptide|bakuchiol|collagen|pdrn|spicule|упруг|лифтинг|антивозраст|морщин/i,
    about: "поддержать упругость и сгладить первые морщинки",
  },
  {
    ask: /пигмент|пятн|тон(?![а-яё])|тона|неровн|постакне|осветл|тусклая|веснушк/i,
    title: "Осветление",
    text: "Средства с витамином C, ниацинамидом, арбутином и транексамовой кислотой помогают выровнять тон и сделать пигментные пятна менее заметными.",
    find: /vitamin ?c|vita|niacin|arbutin|kojic|txa|glutathione|осветл|пигмент|тон|пятн|сияни/i,
    about: "выровнять тон и осветлить пигментацию",
  },
  {
    ask: /сух|обезвож|шелуш|стянут|увлажн/i,
    title: "Увлажнение",
    text: "Гиалуроновая кислота, керамиды и сквалан удерживают влагу и восстанавливают защитный барьер — кожа перестаёт шелушиться и становится мягче.",
    find: /hyalu|ceramid|squalane|water ?bank|dive-?in|увлажн|барьер/i,
    about: "глубоко увлажнить кожу и восстановить барьер",
  },
  {
    ask: /акне|прыщ|высып|пор[ыа]?(?![а-яё])|жирн|чёрн|черн|себум|блеск/i,
    title: "Чистая кожа",
    text: "BHA-кислоты, чайное дерево и центелла бережно очищают поры, уменьшают высыпания и успокаивают воспаления.",
    find: /bha|aha|clarifying|clear ?pad|tea ?tree|teatree|pore|centella|cica|акне|пор|очищ/i,
    about: "очистить поры и уменьшить высыпания",
  },
  {
    ask: /чувствит|покраснен|раздраж|реактив|купероз|успоко/i,
    title: "Успокоение",
    text: "Центелла, хауттюйния и полынь снимают раздражение и покраснения, а мягкие текстуры не перегружают чувствительную кожу.",
    find: /centella|cica|madeca|heartleaf|mugwort|azelaic|soothing|calming|успока/i,
    about: "снять раздражение и успокоить кожу",
  },
  {
    ask: /сияни|glow|гласс|glass|свеж|уставш/i,
    title: "Сияние",
    text: "Регулярное увлажнение и антиоксиданты сохраняют гладкость кожи и возвращают ей здоровое сияние.",
    find: /glow|vitamin|propolis|rice|niacin|collagen|сияни/i,
    about: "вернуть коже сияние",
  },
];

const SPF: Rule = {
  ask: /spf|солнц|загар/i,
  title: "SPF",
  text: "SPF — главный шаг против пигментации и фотостарения. Наноси солнцезащитный крем каждое утро последним шагом ухода.",
  find: /sun|uv|spf|солнце/i,
  about: "защитить кожу от солнца",
};

/** Базовый уход, если в запросе не нашлось конкретных проблем */
const BASIC: { title: string; type: string; text: string }[] = [
  { title: "Очищение", type: "Очищение", text: "Мягкое умывание утром и вечером — основа любого ухода." },
  { title: "Сыворотка", type: "Сыворотки и ампулы", text: "Концентрированный уход под твою задачу: увлажнение, сияние или ровный тон." },
  { title: "Крем", type: "Кремы", text: "Запечатывает увлажнение и защищает барьер кожи." },
  { title: "SPF", type: "SPF для лица", text: "Каждое утро последним шагом — лучшая профилактика пигментации." },
];

// \b в JS не понимает русские буквы, поэтому «конец слова» проверяем как (?![а-яё])
const priceOf = (p: Product) => Number(p.price.replace(/\D/g, ""));
const haystack = (p: Product) => `${p.name} ${p.description}`;

/** «до 5000 ₽», «бюджет 3000», «не дороже 4 000 руб» → 5000 */
function budgetOf(query: string) {
  const m = query.match(/(?:до|бюджет\w*|не дороже|максимум)\D{0,12}(\d[\d\s]{2,})/i);
  return m ? Number(m[1].replace(/\s/g, "")) : undefined;
}

/** Рекомендации: группы по найденным проблемам, в каждой — подходящие товары (дешевле бюджета на шаг, если он указан) */
export function pickProducts(query: string, catalog: Product[], hasPhoto = false): PickerResult {
  const budget = budgetOf(query);
  const rules = RULES.filter((r) => r.ask.test(query));
  // SPF добавляем, если о нём спросили или если задача — пигментация / морщины
  if (SPF.ask.test(query) || rules.some((r) => r.title === "Осветление" || r.title === "От морщин")) rules.push(SPF);

  // точные пожелания: если человек назвал компонент, такие средства ставим первыми
  const wishes: RegExp[] = [];
  if (/витамин ?а(?![а-яё])|ретин/i.test(query)) wishes.push(/retin|bakuchiol/i);
  if (/витамин ?с(?![а-яё])|витамин ?c/i.test(query)) wishes.push(/vitamin ?c|vita/i);
  if (/ниацин/i.test(query)) wishes.push(/niacin/i);
  if (/гиалурон/i.test(query)) wishes.push(/hyalu/i);
  if (/центелл/i.test(query)) wishes.push(/centella|cica|madeca/i);
  if (/pdrn/i.test(query)) wishes.push(/pdrn/i);
  if (/коллаген/i.test(query)) wishes.push(/collagen/i);

  // основа ухода — сыворотки и кремы, маски и патчи — дополнение
  const TYPE_WEIGHT: Record<string, number> = { "Сыворотки и ампулы": 6, Кремы: 6, "SPF для лица": 6, "Тонеры и пэды": 4, Очищение: 4 };

  const used = new Set<string>();
  const take = (list: Product[]) => {
    const steps = Math.max(rules.length || BASIC.length, 1);
    const perStep = budget ? budget / steps : Infinity;
    const score = (p: Product) =>
      (wishes.some((w) => w.test(haystack(p))) ? 10 : 0) +
      (TYPE_WEIGHT[p.type ?? ""] ?? 0) +
      (priceOf(p) <= perStep ? 2 : 0) + // укладывается в бюджет шага — чуть выше
      (p.hit ? 1 : 0);
    const chosen = list
      .filter((p) => !used.has(p.id))
      .sort((a, b) => score(b) - score(a))
      .slice(0, 8);
    chosen.forEach((p) => used.add(p.id));
    return chosen;
  };

  let groups: PickerGroup[];
  if (rules.length) {
    groups = rules
      .map((r) => ({ title: r.title, text: r.text, products: take(catalog.filter((p) => r.find.test(haystack(p)))) }))
      .filter((g) => g.products.length > 0);
  } else {
    groups = BASIC.map((b) => ({ title: b.title, text: b.text, products: take(catalog.filter((p) => p.type === b.type)) })).filter(
      (g) => g.products.length > 0,
    );
  }

  const intro: string[] = [];
  if (rules.length) {
    const abouts = rules.map((r) => r.about);
    const list = abouts.length > 1 ? `${abouts.slice(0, -1).join(", ")} и ${abouts.at(-1)}` : abouts[0];
    intro.push(`Мы подобрали средства, которые помогут ${list}.`);
  } else {
    intro.push("Мы не нашли в запросе конкретных задач, поэтому собрали базовый ежедневный уход: очищение, сыворотку, крем и SPF.");
  }
  intro.push("Для каждого этапа достаточно выбрать по одному средству из группы.");
  if (budget) {
    const routine = groups.reduce((sum, g) => sum + (g.products[0] ? priceOf(g.products[0]) : 0), 0);
    intro.push(
      routine <= budget
        ? `Первые средства в каждой группе вместе стоят ${routine.toLocaleString("ru-RU")} ₽ — это укладывается в твой бюджет ${budget.toLocaleString("ru-RU")} ₽.`
        : `Мы поставили первыми самые доступные варианты, чтобы уход было проще уложить в бюджет ${budget.toLocaleString("ru-RU")} ₽.`,
    );
  }
  if (hasPhoto) intro.push("Анализ кожи по фото скоро появится — пока подборка составлена по твоему описанию.");
  intro.push("При регулярном использовании кожа станет более ровной, гладкой и сияющей.");

  return { intro, groups };
}
