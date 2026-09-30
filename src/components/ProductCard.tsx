"use client";

// Product card из UI KIT: size=L (крупная, бестселлеры) и size=M (компактная, 300px)
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BagIcon, HeartIcon } from "./icons";
import { Tag } from "./ui";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
  discount?: string;
  hit?: boolean;
  /** соотношение сторон фото, как в макете: L — 402/420, M — 300/270 */
  aspect?: string;
};

export function ProductCard({ product, size = "M" }: { product: Product; size?: "L" | "M" }) {
  const [liked, setLiked] = useState(false);
  const aspect = product.aspect ?? (size === "L" ? "402/420" : "300/270");

  return (
    <article className="group flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-xs bg-surface" style={{ aspectRatio: aspect }}>
        <Link href="#" aria-label={product.name} className="absolute inset-0">
          <Image
            src={product.image}
            alt=""
            fill
            sizes={size === "L" ? "(min-width: 1024px) 402px, (min-width: 640px) 50vw, 85vw" : "(min-width: 1024px) 300px, 50vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {(product.discount || product.hit) && (
          <div className="pointer-events-none absolute left-0 top-2.5 flex">
            {product.discount && <Tag>{product.discount}</Tag>}
            {product.hit && (
              <span className={product.discount ? "-ml-0.5" : ""}>
                <Tag kind="hit">hit</Tag>
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={liked ? "Убрать из избранного" : "В избранное"}
          className="absolute right-0 top-0 flex size-10 items-center justify-center text-tertiary transition-colors hover:text-accent"
        >
          <HeartIcon className={liked ? "fill-accent text-accent" : ""} />
        </button>

        <button
          type="button"
          aria-label="В корзину"
          className="absolute bottom-2.5 right-2.5 flex size-10 items-center justify-center rounded-full bg-white text-tertiary shadow-card transition-colors hover:text-primary"
        >
          <BagIcon />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-base-m">
          <Link href="#" className="hover:text-secondary">
            {product.name}
          </Link>
        </h3>
        <p className="text-base-s text-secondary">{product.description}</p>
        <p className="text-base-s text-secondary">
          {product.price}
          {product.oldPrice && <s className="ml-2">{product.oldPrice}</s>}
        </p>
      </div>
    </article>
  );
}
