// Структура меню «Каталог» (Figma: catalog menu 1, 5697:28114).
// Слева — категории, справа — подразделы выбранной категории.
// Тексты подразделов — из черновиков Figma (catalog menu 2 и menu dropdown правее).

export type CatalogCategory = {
  title: string;
  href: string;
  items: { title: string; href: string }[];
};

export const catalogMenu: CatalogCategory[] = [
  {
    title: "Уход для лица",
    href: "/catalog",
    items: [
      { title: "Очищение", href: "/catalog?type=Очищение" },
      { title: "Тонеры и пэды", href: "/catalog?type=Тонеры+и+пэды" },
      { title: "Сыворотки и ампулы", href: "/catalog?type=Сыворотки+и+ампулы" },
      { title: "Мисты", href: "/catalog" },
      { title: "Кремы", href: "/catalog?type=Кремы" },
      { title: "Маски", href: "/catalog?type=Маски" },
      { title: "Пэды и патчи", href: "/catalog?type=Пэды+и+патчи" },
      { title: "Пилинги и эксфолианты", href: "/catalog" },
      { title: "Средства от акне", href: "/catalog" },
      { title: "SPF для лица", href: "/catalog?type=SPF+для+лица" },
    ],
  },
  {
    title: "Glow-skin",
    href: "/catalog",
    items: [
      { title: "Увлажнение", href: "/catalog" },
      { title: "Сияние кожи", href: "/catalog" },
      { title: "Выравнивание тона", href: "/catalog" },
      { title: "Восстановление барьера", href: "/catalog" },
      { title: "Уход за порами", href: "/catalog" },
      { title: "Антивозрастной уход", href: "/catalog" },
      { title: "Защита от солнца", href: "/catalog" },
      { title: "Питание и восстановление", href: "/catalog" },
      { title: "Успокаивающий уход", href: "/catalog" },
      { title: "Экспресс-уход", href: "/catalog" },
    ],
  },
  {
    title: "Антивозрастной уход",
    href: "/catalog",
    items: [
      { title: "Сыворотки и ампулы", href: "/catalog" },
      { title: "Кремы", href: "/catalog" },
      { title: "Кремы для глаз", href: "/catalog" },
      { title: "Ретинол и ретиноиды", href: "/catalog" },
      { title: "Пептиды", href: "/catalog" },
      { title: "Коллаген", href: "/catalog" },
      { title: "Лифтинг и упругость", href: "/catalog" },
      { title: "От пигментации", href: "/catalog" },
      { title: "Увлажняющие средства", href: "/catalog" },
      { title: "Солнцезащитные кремы", href: "/catalog" },
    ],
  },
  {
    title: "Макияж",
    href: "/catalog",
    items: [
      { title: "Для губ", href: "/catalog" },
      { title: "Для лица", href: "/catalog" },
      { title: "Для глаз", href: "/catalog" },
      { title: "Для бровей", href: "/catalog" },
      { title: "Кушоны", href: "/catalog" },
      { title: "Тональные средства", href: "/catalog" },
      { title: "Румяна", href: "/catalog" },
      { title: "Хайлайтеры и контуринг", href: "/catalog" },
      { title: "Пудры и фиксаторы", href: "/catalog" },
    ],
  },
  {
    title: "Хиты Кореи",
    href: "/catalog",
    items: [
      { title: "Бестселлеры Olive Young", href: "/catalog" },
      { title: "Тренды в Корее", href: "/catalog" },
      { title: "Тренды Тиктока", href: "/catalog" },
    ],
  },
  {
    title: "Для тела",
    href: "/catalog",
    items: [
      { title: "Гели для душа", href: "/catalog" },
      { title: "Лосьоны и кремы", href: "/catalog" },
      { title: "Скрабы", href: "/catalog" },
      { title: "Мисты для тела", href: "/catalog" },
      { title: "Уход за руками", href: "/catalog" },
      { title: "Уход за ногами", href: "/catalog" },
      { title: "Дезодоранты", href: "/catalog" },
      { title: "Уход против акне", href: "/catalog" },
      { title: "Масла и эссенции для тела", href: "/catalog" },
    ],
  },
  {
    title: "Для волос",
    href: "/catalog",
    items: [
      { title: "Шампуни", href: "/catalog" },
      { title: "Кондиционеры", href: "/catalog" },
      { title: "Маски", href: "/catalog" },
      { title: "Несмываемый уход", href: "/catalog" },
      { title: "Сыворотки и масла", href: "/catalog" },
      { title: "Уход за кожей головы", href: "/catalog" },
      { title: "Средства от выпадения", href: "/catalog" },
      { title: "Стайлинг", href: "/catalog" },
    ],
  },
  {
    title: "Бьюти-гаджеты",
    href: "/catalog",
    items: [
      { title: "LED-маски", href: "/catalog" },
      { title: "Микротоки", href: "/catalog" },
      { title: "RF-лифтинг", href: "/catalog" },
      { title: "EMS", href: "/catalog" },
      { title: "Ультразвуковой уход", href: "/catalog" },
      { title: "Аппараты для лица", href: "/catalog" },
    ],
  },
  {
    title: "Для загара",
    href: "/catalog",
    items: [
      { title: "SPF для тела", href: "/catalog" },
      { title: "SPF-стики", href: "/catalog" },
      { title: "SPF-спреи", href: "/catalog" },
      { title: "После загара", href: "/catalog" },
      { title: "Автозагар", href: "/catalog" },
      { title: "Увлажняющие кремы с SPF", href: "/catalog" },
    ],
  },
];
