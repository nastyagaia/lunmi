// Виды товаров внутри подраздела — третий уровень каталога: пилюли над сеткой («Тушь · Подводка · Тени»)
// и третья колонка в меню «Каталог». Маленький файл без товаров: его импортирует и меню в шапке.
// Вид определяется по названию и описанию товара; правила проверяются по порядку, первое совпадение — вид.

export type KindRules = { category: string; kinds: [name: string, test: RegExp][] };

export const KINDS: Record<string, KindRules> = {
  // уход для лица
  Очищение: {
    category: "Уход для лица",
    kinds: [
      ["Гидрофильное масло", /oil/i],
      ["Бальзам", /balm/i],
      ["Пенка", /foam/i],
      ["Энзимная пудра", /powder/i],
      ["Гель", /./],
    ],
  },
  Маски: {
    category: "Уход для лица",
    kinds: [
      ["Маски-плёнки", /плёнк|пленк/i],
      ["Гидрогелевые", /гидрогел|гелев|альгинат|желе/i],
      ["Глиняные", /глин/i],
      ["Тканевые", /./],
    ],
  },
  "Пэды и патчи": {
    category: "Уход для лица",
    kinds: [
      ["Патчи", /патч/i],
      ["Пэды", /./],
    ],
  },
  "SPF для лица": {
    category: "Уход для лица",
    kinds: [
      ["Стик", /стик/i],
      ["Сыворотка", /сыворот|эссенц/i],
      ["Гель", /гель/i],
      ["Крем", /./],
    ],
  },
  // макияж
  "Для глаз": {
    category: "Макияж",
    kinds: [
      ["Тушь", /mascara|\bcara\b/i],
      ["Подводка", /liner/i],
      ["Тени", /palette/i],
      ["Глиттер", /glitter|switch/i],
    ],
  },
  "Для губ": {
    category: "Макияж",
    kinds: [
      ["Помада", /lipstick/i],
      ["Карандаш", /pencil/i],
      ["Блеск", /gloss|plumper|drop glow|jelly pot/i],
      ["Бальзам", /liptual|balm/i],
      ["Тинт", /./],
    ],
  },
  "Для бровей": {
    category: "Макияж",
    kinds: [
      ["Карандаш", /pencil|drawing/i],
      ["Тушь", /mascara|\bcara\b/i],
      ["Гель", /pomade|fixer|gel/i],
    ],
  },
};

/** Вид товара по его основному подразделу (type) и разделу (category) */
export function kindOf(p: { type?: string; category?: string; name: string; description?: string }) {
  const rules = KINDS[p.type ?? ""];
  if (!rules || rules.category !== p.category) return undefined;
  const text = `${p.name} ${p.description ?? ""}`;
  return rules.kinds.find(([, re]) => re.test(text))?.[0];
}

/** Названия видов подраздела в порядке меню */
export const kindNames = (type: string, category?: string) => {
  const rules = KINDS[type];
  return rules && (!category || rules.category === category) ? rules.kinds.map(([name]) => name) : [];
};
