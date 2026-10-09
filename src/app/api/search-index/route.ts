// Облегчённый список товаров для живого поиска в панели (SearchPanel): только то, по чему ищем.
// Собирается при сборке сайта, браузер скачивает его один раз при первом открытии поиска.
import { allProducts } from "@/data/sections";

export const dynamic = "force-static";

export function GET() {
  const seen = new Set<string>();
  const index = allProducts
    .filter((p) => !seen.has(p.id) && seen.add(p.id))
    .map(({ id, name, title, brand, description, type, category }) => ({ id, name, title, brand, description, type, category }));
  return Response.json(index);
}
