"use client";

// Фото товара: большое 600 × 550 и колонка Thumbnails (60 × 60, через 6 px) поверх его левого края.
// Клик по превью переключает большое фото. Selected — тёмная рамка, Default — без рамки, чуть приглушённое.
import Image from "next/image";
import { useState } from "react";
import { isPrepared } from "@/lib/images";
import { useShade } from "./ProductShade";
import { t } from "@/lib/i18n";

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
  // телефон: листаем фото свайпом
  const [touchX, setTouchX] = useState<number | null>(null);
  // сменили оттенок — начинаем с первого фото этого оттенка (сброс во время отрисовки, как советует React)
  const [lastShade, setLastShade] = useState(shade);
  if (lastShade !== shade) {
    setLastShade(shade);
    setActive(0);
  }

  return (
    // фото стоит на нижнем крае серого блока — у фото с моделями нет пустой полосы снизу.
    // Телефон (product mobile): серый блок на всю ширину экрана 420 = фото 400 + точки, без превью
    <div
      className="relative w-full max-w-[600px] max-md:-mx-4 max-md:h-[420px] max-md:w-[calc(100%+32px)] max-md:max-w-none max-md:bg-surface md:aspect-[600/550] lg:self-end"
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null || images.length < 2) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) setActive((a) => (a + (dx < 0 ? 1 : images.length - 1)) % images.length);
        setTouchX(null);
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[400px] md:inset-0 md:h-auto">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          priority={i === 0}
          unoptimized={ready(src)}
          sizes="(min-width: 1024px) 600px, 100vw"
          className={`object-contain object-bottom transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      </div>

      {/* телефон: точки 6 px через 6, активная тёмная */}
      {images.length > 1 && (
        <div className="absolute inset-x-0 top-[400px] flex justify-center gap-1.5 md:hidden">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={t("Фото {n}", { n: i + 1 })}
              aria-current={i === active}
              className={`size-1.5 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-line-light"}`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <ul className="absolute top-8 left-0 flex flex-col gap-1.5 max-md:hidden">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={t("Фото {n}", { n: i + 1 })}
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
