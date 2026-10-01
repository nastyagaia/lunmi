"use client";

// Product card из UI KIT: size=L (крупная, бестселлеры) и size=M (компактная, 300px)
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon, StarIcon } from "./icons";
import { Tag } from "./ui";

export type Product = {
  id: string;
  name: string;
  /** ссылка на страницу товара; если нет — карточка пока никуда не ведёт */
  href?: string;
  /** бренд — для фильтра «Бренд» в каталоге */
  brand?: string;
  /** тип (раздел каталога): «Кремы», «Маски»… — для фильтра «Тип продукта» */
  type?: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
  discount?: string;
  hit?: boolean;
  /** объём под описанием: «50 / 100 ml» */
  volume?: string;
  /** рейтинг справа от цены: «4.7» со звёздочкой */
  rating?: string;
  /** короткое название для карточки (полное — на странице товара) */
  title?: string;
  /** линейка без бренда: «Peach 70 Niacin Serum» (пока в карточке не показываем) */
  line?: string;
  /** второе фото — плавно проявляется при наведении (фото с моделью или другой ракурс) */
  hoverImage?: string;
  /** соотношение сторон фото, как в макете: L — 402/420, M — 300/270 */
  aspect?: string;
};

export function ProductCard({ product, size = "M" }: { product: Product; size?: "L" | "M" }) {
  const [liked, setLiked] = useState(false);
  const aspect = product.aspect ?? (size === "L" ? "402/420" : "300/270");
  const sizes = size === "L" ? "(min-width: 1024px) 402px, (min-width: 640px) 50vw, 85vw" : "(min-width: 1024px) 300px, 50vw";

  return (
    <article className="group flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-xs bg-surface" style={{ aspectRatio: aspect }}>
        <Link href={product.href ?? "#"} aria-label={product.title ?? product.name} className="absolute inset-0">
          <Image
            src={product.image}
            alt=""
            fill
            unoptimized={product.image.startsWith("/img/face/")}
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* при наведении — второе фото мягко проявляется поверх первого */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              fill
              unoptimized={product.hoverImage.startsWith("/img/face/")}
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        {(product.discount || product.hit) && (
          <div className="pointer-events-none absolute left-0 top-0 flex items-center">
            {product.discount && <Tag className={product.hit ? "-mr-px" : ""}>{product.discount}</Tag>}
            {product.hit && <Tag kind="hit">hit</Tag>}
          </div>
        )}

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Убрать из избранного" : "В избранное"}
          className="group/heart absolute right-0 top-0 flex size-10 items-center justify-center text-tertiary"
        >
          {/* heart из UI KIT: Default — контур, hover — заливка pink/300, pressed (в избранном) — pink/500 */}
          <HeartIcon
            className={`transition-colors ${
              liked ? "fill-accent text-accent" : "group-hover/heart:fill-accent-300 group-hover/heart:text-accent-300"
            }`}
          />
        </button>

        {/* state=hover из UI KIT: кнопка «в корзину» появляется только при наведении, матовое розовое стекло */}
        <button
          type="button"
          className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center rounded-xs bg-accent-soft/60 text-caps opacity-0 backdrop-blur-[15px] transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          в корзину
        </button>
      </div>

      {/* cell: у size=L строки через 4 px, у size=M — вплотную, как в UI KIT */}
      <div className={`flex flex-col ${size === "L" ? "gap-1" : ""}`}>
        {/* как у Золотого Яблока: заголовок — бренд + линейка обычным шрифтом, под ним серым — что это по-русски */}
        <h3 className="text-base-m">
          <Link href={product.href ?? "#"} className="transition-colors hover:text-secondary">
            {product.title ?? product.name}
          </Link>
        </h3>
        <p className="text-base-s text-secondary">
          {product.description}
          {product.volume && (
            <>
              <br />
              {product.volume}
            </>
          )}
        </p>
        <div className="flex items-center justify-between gap-2 text-base-s text-secondary">
          <p>
            {product.price}
            {product.oldPrice && <s className="ml-2">{product.oldPrice}</s>}
          </p>
          {product.rating && (
            <p className="flex shrink-0 items-center gap-0.5 text-caps" aria-label={`Рейтинг ${product.rating}`}>
              {product.rating}
              <StarIcon className="text-accent-300" />
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
