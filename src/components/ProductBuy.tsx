"use client";

// Product Info из UI KIT (10228:14275): бейджи, рейтинг с отзывами, название, описание,
// выбор оттенка или объёма, цена, «В корзину» и избранное. Порядок не меняем.
// После «В корзину» кнопка превращается в счётчик «− 1 +» (Figma: Frame 21289). На нуле — снова кнопка.
import { useState } from "react";
import type { ProductDetails } from "@/data/products";
import { priceToNumber, useCart } from "./Cart";
import { HeartIcon, MinusIcon, PlusIcon, StarIcon } from "./icons";
import { Tag } from "./ui";
import { useFavorites } from "./Favorites";

/** «1 отзыв», «3 отзыва», «5 отзывов» */
function reviewsWord(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} отзыв`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} отзыва`;
  return `${n} отзывов`;
}

export function ProductBuy({ product }: { product: ProductDetails }) {
  const [volume, setVolume] = useState(product.volumes?.[0]);
  const [shade, setShade] = useState(product.shades?.find((s) => s.available !== false)?.name);
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
  const [notify, setNotify] = useState<string[]>([]);
  // выбранный оттенок закончился → вместо цены «Не в наличии», вместо «В корзину» — «Узнать о поступлении»
  const soldOut = product.shades?.find((s) => s.name === shade)?.available === false;
  // в корзине разные оттенки и объёмы — отдельные строки
  const variant = shade ?? volume;
  const key = variant ? `${product.slug}:${variant}` : product.slug;
  const qty = cart.qtyOf(key);
  const addOne = () =>
    cart.add(
      {
        key,
        name: product.name,
        description: variant ? `${product.subtitle}, ${variant}` : product.subtitle,
        price: priceToNumber(product.price),
        image: product.thumbs?.[0] ?? product.images[0],
        href: `/product/${product.slug}`,
      },
      // первое добавление показывает корзину, дальше «+» просто увеличивает количество
      { show: qty === 0 },
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {/* Header: бейджи + рейтинг */}
        <div className="flex items-center gap-4">
          {(product.discount || product.hit) && (
            <div className="flex items-center gap-1">
              {product.discount && <Tag className="rounded-xs">{product.discount}</Tag>}
              {product.hit && (
                <Tag kind="hit" className="rounded-xs">
                  hit
                </Tag>
              )}
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
          <h1 className="text-h3 leading-8 max-md:text-[18px] max-md:leading-7">{product.name}</h1>
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
                    <span className="absolute inset-[2px] rounded-full border-2 border-white" style={{ background: s.color }} />
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
                key={v}
                type="button"
                role="radio"
                aria-checked={v === volume}
                onClick={() => setVolume(v)}
                className={
                  v === volume
                    ? "underline underline-offset-2"
                    : "text-tertiary transition-colors hover:text-primary"
                }
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {soldOut ? (
          <p className="text-base-m">Не в наличии</p>
        ) : (
          <p className="text-base-m">
            {product.price}
            {product.oldPrice && <s className="ml-2 text-secondary">{product.oldPrice}</s>}
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
          <div className="flex h-10 w-full max-w-[304px] items-center justify-center gap-8 rounded-xs bg-primary text-base-s text-white">
            <button
              type="button"
              onClick={() => cart.setQty(key, qty - 1)}
              aria-label="Убрать одну штуку"
              className="flex size-10 items-center justify-center transition-opacity hover:opacity-70"
            >
              <MinusIcon />
            </button>
            <span aria-live="polite" className="min-w-4 text-center">
              {qty}
            </span>
            <button
              type="button"
              onClick={addOne}
              aria-label="Добавить ещё одну"
              className="flex size-10 items-center justify-center transition-opacity hover:opacity-70"
            >
              <PlusIcon />
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
          <HeartIcon
            className={`size-8 transition-colors ${
              liked ? "fill-accent text-accent" : "group-hover/heart:fill-accent-300 group-hover/heart:text-accent-300"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
