// Пункты выдачи СДЭК — ДЕМО-СПИСОК: адреса и часы примерные, только чтобы показать сценарий на карте.
// Перед запуском заменить настоящими пунктами из API СДЭК (нужен договор и ключи СДЭК).
export type PickupPoint = { id: string; city: string; address: string; hours: string; lat: number; lng: number };

export const CITIES = ["Санкт-Петербург", "Москва"] as const;

/** центр города для карты, пока адрес не выбран */
export const CITY_CENTER: Record<string, [number, number]> = {
  "Санкт-Петербург": [59.9311, 30.3609],
  Москва: [55.7558, 37.6173],
};

export const pickupPoints: PickupPoint[] = [
  { id: "spb-marata-8", city: "Санкт-Петербург", address: "Марата 8", hours: "10:00–21:00", lat: 59.9306, lng: 30.3538 },
  { id: "spb-ligovsky-50", city: "Санкт-Петербург", address: "Лиговский проспект, 50", hours: "10:00–21:00", lat: 59.9225, lng: 30.3555 },
  { id: "spb-nevsky-28", city: "Санкт-Петербург", address: "Невский проспект, 28", hours: "10:00–22:00", lat: 59.9357, lng: 30.326 },
  { id: "spb-vosstaniya-15", city: "Санкт-Петербург", address: "улица Восстания, 15", hours: "09:00–21:00", lat: 59.9366, lng: 30.3605 },
  { id: "spb-bolshoy-51", city: "Санкт-Петербург", address: "Большой проспект П.С., 51", hours: "10:00–21:00", lat: 59.9617, lng: 30.2993 },
  { id: "spb-moskovsky-143", city: "Санкт-Петербург", address: "Московский проспект, 143", hours: "11:00–21:00", lat: 59.8762, lng: 30.3196 },
  { id: "msk-tverskaya-12", city: "Москва", address: "Тверская улица, 12", hours: "10:00–22:00", lat: 55.7636, lng: 37.6066 },
  { id: "msk-arbat-24", city: "Москва", address: "улица Арбат, 24", hours: "10:00–21:00", lat: 55.7503, lng: 37.5927 },
  { id: "msk-myasnitskaya-30", city: "Москва", address: "Мясницкая улица, 30", hours: "09:00–21:00", lat: 55.7653, lng: 37.6386 },
];

/** расстояние «по прямой» в километрах — чтобы показать ближайшие пункты */
export function distanceKm(a: [number, number], b: [number, number]) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}
