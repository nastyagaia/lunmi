// Адрес ↔ точка на карте через бесплатный геокодер OpenStreetMap (Nominatim): без ключа и аккаунта.
// Правила Nominatim: не чаще запроса в секунду и без подсказок на каждую букву — поэтому ищем с паузой после ввода.

/** «Пушкинская улица, 14» в городе → координаты (или null, если не нашли) */
export async function geocode(city: string, address: string): Promise<[number, number] | null> {
  const q = `${city}, ${address}`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=ru&countrycodes=ru&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url);
    const [hit] = (await res.json()) as { lat: string; lon: string }[];
    return hit ? [Number(hit.lat), Number(hit.lon)] : null;
  } catch {
    return null;
  }
}

/** точка на карте → «Пушкинская улица, 14» (улица и дом без города) */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&accept-language=ru&zoom=18&lat=${lat}&lon=${lng}`;
  try {
    const res = await fetch(url);
    const data = (await res.json()) as { address?: Record<string, string> };
    const a = data.address;
    if (!a?.road) return null;
    return a.house_number ? `${a.road}, ${a.house_number}` : a.road;
  } catch {
    return null;
  }
}
