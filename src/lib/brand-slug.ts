// Адрес страницы бренда из его названия: «Beauty of Joseon» → beauty-of-joseon.
// Отдельный маленький файл, чтобы клиентские компоненты не тянули в браузер все тексты товаров из brands.ts.
export const brandSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
