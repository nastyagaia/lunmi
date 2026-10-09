// Поиск по товарам: каждое слово запроса должно найтись в названии, бренде, описании, типе или разделе.
// Русские слова сравниваем по основе (без 1–2 последних букв), чтобы «сыворотка» находила «сыворотки».
/** Всё, по чему ищем; подходит и карточка товара, и облегчённая запись из /api/search-index */
export type Searchable = {
  id: string;
  name: string;
  title?: string;
  brand?: string;
  description?: string;
  type?: string;
  category?: string;
};

const normalize = (s: string) => s.toLowerCase().replace(/ё/g, "е");

function stem(word: string) {
  if (!/[а-я]/.test(word) || word.length <= 4) return word;
  return word.slice(0, Math.max(4, word.length - 2));
}

export function searchProducts<T extends Searchable>(query: string, products: T[]): T[] {
  const words = normalize(query).split(/[\s,.;:!?«»"]+/).filter(Boolean).map(stem);
  if (!words.length) return [];
  const seen = new Set<string>();
  return products.filter((p) => {
    if (seen.has(p.id)) return false;
    const text = normalize([p.name, p.title, p.brand, p.description, p.type, p.category].filter(Boolean).join(" "));
    // латиница без точек и дефисов: «drjart» найдёт «Dr.Jart+»
    const squashed = text.replace(/[^a-zа-я0-9]/g, "");
    const ok = words.every((w) => text.includes(w) || squashed.includes(w.replace(/[^a-zа-я0-9]/g, "")));
    if (ok) seen.add(p.id);
    return ok;
  });
}
