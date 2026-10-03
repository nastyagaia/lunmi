"use client";

// Фото товара: большое 600 × 550 и колонка Thumbnails (60 × 60, через 6 px) поверх его левого края.
// Клик по превью переключает большое фото. Selected — тёмная рамка, Default — без рамки, чуть приглушённое.
import Image from "next/image";
import { useState } from "react";
import { isPrepared } from "@/lib/images";
import { useShade } from "./ProductShade";

// фото из папки материалов (/img/face/, /img/catalog/) уже подготовлены нужного размера с точным цветом фона —
// их отдаём как есть, без пережатия Next.js (оно сдвигает оттенок фона)
const ready = (src: string) => isPrepared(src);

export function ProductGallery({
  images: allImages,
  thumbs: allThumbs,
  alt,
  shadeImages,
}: {
  images: string[];
  thumbs?: string[];
  alt: string;
  /** у товаров с оттенками: какие фото (номера в images) показывать для каждого оттенка */
  shadeImages?: Record<string, number[]>;
}) {
  const { shade } = useShade();
  const only = shade ? shadeImages?.[shade] : undefined;
  const images = only ? only.map((i) => allImages[i]) : allImages;
  const thumbs = only && allThumbs ? only.map((i) => allThumbs[i]) : allThumbs;
  const [active, setActive] = useState(0);
  // сменили оттенок — начинаем с первого фото этого оттенка (сброс во время отрисовки, как советует React)
  const [lastShade, setLastShade] = useState(shade);
  if (lastShade !== shade) {
    setLastShade(shade);
    setActive(0);
  }

  return (
    <div className="relative aspect-[600/550] w-full max-w-[600px]">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          priority={i === 0}
          unoptimized={ready(src)}
          sizes="(min-width: 1024px) 600px, 100vw"
          className={`object-contain transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {images.length > 1 && (
        <ul className="absolute top-8 left-0 flex flex-col gap-1.5 max-sm:top-auto max-sm:bottom-3 max-sm:left-3 max-sm:flex-row">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Фото ${i + 1}`}
                aria-current={i === active}
                className={`relative block size-[60px] overflow-hidden rounded-xs border bg-surface transition-opacity ${
                  i === active ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumbs?.[i] ?? src}
                  alt=""
                  fill
                  unoptimized={ready(src)}
                  sizes="60px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
