"use client";

// Product Info из UI KIT (10228:14275): бейджи, рейтинг с отзывами, название, описание,
// выбор оттенка или объёма, цена, «В корзину» и избранное. Порядок не меняем.
// После «В корзину» кнопка превращается в счётчик «− 1 +» (Figma: Frame 21289). На нуле — снова кнопка.
import Link from "next/link";
import { useEffect, useState } from "react";
import { brandSlug } from "@/data/brands";
import { rememberViewed } from "@/lib/account";
import type { ProductDetails } from "@/data/products";
import { priceToNumber, useCart } from "./Cart";
import { HeartIcon, MinusIcon, QuantityPlusIcon, StarIcon } from "./icons";
import { Tag } from "./ui";
import { useFavorites } from "./Favorites";
import { useShade } from "./ProductShade";

/** «1 отзыв», «3 отзыва», «5 отзывов» */
function reviewsWord(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} отзыв`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} отзыва`;
  return `${n} отзывов`;
}

/** Начало названия, совпадающее с брендом («CLIO»; у «VT Cosmetics» — «VT», у «Tony Moly» — «TONYMOLY») — оно станет ссылкой на бренд */
function brandPrefix(name: string, brand?: string) {
  if (!brand) return;
  return [brand, brand.split(" ")[0], brand.replaceAll(" ", "")].find((b) => name.toLowerCase().startsWith(b.toLowerCase() + " "));
}

export function ProductBuy({ product }: { product: ProductDetails }) {
  // оттенок или объём — общий с галереей (у товара бывает что-то одно): выбрали — галерея показывает его фото
  const { shade: picked, setShade } = useShade(
    product.shades?.find((s) => s.available !== false)?.name ?? product.volumes?.[0]?.name,
  );
  const shade = product.shades ? picked : undefined;
  const brand = brandPrefix(product.name, product.card?.brand);
  const volume = product.volumes?.find((v) => v.name === picked) ?? product.volumes?.[0];
  // у объёма своя цена
  const price = volume?.price ?? product.price;
  const oldPrice = volume ? volume.oldPrice : product.oldPrice;
  const cart = useCart();
  const favorites = useFavorites();
  // в избранное кладём карточку как в каталоге; у товаров не из каталога — собираем её из данных страницы
  const card = product.card ?? {
    id: product.slug,
    href: `/product/${product.slug}`,
    name: product.name,
    description: product.subtitle,
    price: product.price,
    oldPrice: product.oldPrice,
    discount: product.discount,
    hit: product.hit,
    rating: product.rating,
    image: product.thumbs?.[0] ?? product.images[0],
  };
  const liked = favorites.has(card.id);
  // для «Смотрели недавно» в личном кабинете
  useEffect(() => rememberViewed(card), [card.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [notify, setNotify] = useState<string[]>([]);
  // выбранный оттенок закончился → вместо цены «Не в наличии», вместо «В корзину» — «Узнать о поступлении»
  const soldOut = product.shades?.find((s) => s.name === shade)?.available === false;
  // в корзине разные оттенки и объёмы — отдельные строки
  const variant = shade ?? volume?.name;
  const key = variant ? `${product.slug}:${variant}` : product.slug;
  const qty = cart.qtyOf(key);
  const addOne = () =>
    cart.add(
      {
        key,
        name: product.name,
        description: variant ? `${product.subtitle}, ${variant}` : product.subtitle,
        price: priceToNumber(price),
        image: (volume?.images?.[0] !== undefined ? product.thumbs?.[volume.images[0]] : undefined) ??
          product.thumbs?.[0] ??
          product.images[0],
        href: `/product/${product.slug}`,
      },
      // первое добавление показывает снекбар, дальше «+» просто увеличивает количество
      { show: qty === 0 },
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {/* Header: бейджи + рейтинг */}
        <div className="flex items-center gap-4">
          {(product.discount || product.hit) && (
            <div className="flex items-center gap-1">
              {product.discount && <Tag>{product.discount}</Tag>}
              {product.hit && <Tag kind="hit">hit</Tag>}
            </div>
          )}
          {product.rating && (
            <div className="flex items-center gap-2 text-base-s text-secondary">
              <span className="flex items-center gap-1" aria-label={`Рейтинг ${product.rating}`}>
                {product.rating}
                <StarIcon className="size-4 text-accent" />
              </span>
              {product.reviews.length > 0 && (
                <a href="#reviews" className="underline underline-offset-2 transition-colors hover:text-accent">
                  {reviewsWord(product.reviews.length)}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-h3 leading-8 max-md:text-[18px] max-md:leading-7">
            {brand ? (
              <>
                <Link href={`/brands/${brandSlug(product.card!.brand!)}`} className="transition-colors hover:text-accent">
                  {product.name.slice(0, brand.length)}
                </Link>
                {product.name.slice(brand.length)}
              </>
            ) : (
              product.name
            )}
          </h1>
          <p className="text-base-s text-secondary">{product.subtitle}</p>
        </div>

        {/* Color Container: кружки 30 px через 6 px, выбранный — с тёмным кольцом; нет в наличии — перечёркнут */}
        {product.shades && (
          <div className="flex flex-col gap-1.5 pb-1">
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Оттенок">
              {product.shades.map((s) => {
                const selected = s.name === shade;
                const available = s.available !== false;
                return (
                  <button
                    key={s.name}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={available ? s.name : `${s.name} — нет в наличии`}
                    onClick={() => setShade(s.name)}
                    className={`relative size-[30px] rounded-full border transition-colors ${
                      selected ? "border-primary" : "border-transparent hover:border-line"
                    }`}
                  >
                    <span
                      className="absolute inset-[2px] rounded-full border-2 border-white"
                      style={{ background: s.color }}
                    />
                    {!available && (
                      <svg viewBox="0 0 30 30" className="absolute inset-0" aria-hidden>
                        <path d="M4.5 24L24.5 5.5" stroke="white" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-base-xs text-secondary">{shade}</p>
          </div>
        )}

        {/* Size Container: выбранный объём подчёркнут, остальные серые */}
        {product.volumes && (
          <div className="flex gap-4 text-base-s" role="radiogroup" aria-label="Объём">
            {product.volumes.map((v) => (
              <button
                key={v.name}
                type="button"
                role="radio"
                aria-checked={v.name === volume?.name}
                onClick={() => setShade(v.name)}
                className={
                  v.name === volume?.name
                    ? "underline underline-offset-2"
                    : "text-tertiary transition-colors hover:text-primary"
                }
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        {soldOut ? (
          <p className="text-base-m">Не в наличии</p>
        ) : (
          <p className="text-base-m">
            {price}
            {oldPrice && <s className="ml-2 text-secondary">{oldPrice}</s>}
          </p>
        )}
      </div>

      {/* Buttons Container: «В корзину» 300 px или счётчик + избранное */}
      <div className="flex items-center gap-6">
        {soldOut ? (
          // buttons Type=secondary: с обводкой; после нажатия — подтверждение, что сообщим
          <button
            type="button"
            onClick={() => shade && setNotify((n) => (n.includes(shade) ? n : [...n, shade]))}
            aria-live="polite"
            className="h-10 w-full max-w-[304px] rounded-xs border border-primary text-caps transition-colors hover:bg-primary hover:text-white"
          >
            {shade && notify.includes(shade) ? "сообщим, когда появится" : "узнать о поступлении"}
          </button>
        ) : qty === 0 ? (
          <button
            type="button"
            onClick={addOne}
            className="h-10 w-full max-w-[304px] rounded-xs bg-primary text-caps text-white transition-colors hover:bg-primary/85"
          >
            в корзину
          </button>
        ) : (
          // счётчик из UI KIT (Figma 5886:30118): кнопки 36 px через 24 px, цифра Base/M
          <div className="flex h-10 w-full max-w-[304px] items-center justify-center gap-6 rounded-xs bg-primary text-base-m text-white">
            <button
              type="button"
              onClick={() => cart.setQty(key, qty - 1)}
              aria-label="Убрать одну штуку"
              className="flex size-9 items-center justify-center transition-opacity hover:opacity-70"
            >
              <MinusIcon className="size-6" />
            </button>
            <span aria-live="polite" className="min-w-4 text-center">
              {qty}
            </span>
            <button
              type="button"
              onClick={addOne}
              aria-label="Добавить ещё одну"
              className="flex size-9 items-center justify-center transition-opacity hover:opacity-70"
            >
              <QuantityPlusIcon className="size-6" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => favorites.toggle(card)}
          aria-pressed={liked}
          aria-label={liked ? "Убрать из избранного" : "В избранное"}
          className="group/heart flex size-10 shrink-0 items-center justify-center"
        >
          {/* иконка 32 px: линия 1.5 × 24/32, чтобы на экране была ровно 1.5 px, как у остальных иконок */}
          <HeartIcon
            strokeWidth={1.125}
            className={`size-8 transition-colors ${
              liked ? "fill-accent text-accent" : "group-hover/heart:fill-accent-300 group-hover/heart:text-accent-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
