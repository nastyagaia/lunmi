"use client";

// Избранное (Figma favorites, 4996:6196): заголовок H2, «N продуктов», сетка карточек 4 в ряд.
// Сердечко в карточке убирает товар из избранного прямо здесь.
import Image from "next/image";
import { productsCount } from "./CatalogGrid";
import { useFavorites } from "./Favorites";
import { ProductCard } from "./ProductCard";

export function FavoritesList() {
  const { items } = useFavorites();

  return (
    <>
      <h1 className="text-h2">Избранное</h1>
      {items.length ? (
        <>
          <p className="mt-6 text-caps text-secondary">{productsCount(items.length)}</p>
          <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-3 md:gap-y-20 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        // empty state (Figma 11021:19617): блок 300 px, по центру сердечко 130 × 130, под ним через 16 px текст
        <div className="flex h-[300px] flex-col items-center justify-center gap-4 text-center md:mt-6">
          <Image src="/img/empty-favorites-heart-w.webp" alt="" width={130} height={130} />
          <p className="text-base-s">Пока пусто. Жмите на сердечко у товаров — сохраним всё, что приглянулось.</p>
        </div>
      )}
    </>
  );
}
