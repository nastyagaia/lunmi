"use client";

// Видео первого экрана: без звука. Пока грузится — кадр-заставка.
// В слайдере играет с начала, когда его слайд активен, и сообщает, что доиграло (onEnded).
// Если в системе включено «уменьшить движение», видео не проигрывается.
import { useEffect, useRef } from "react";

export function HeroVideo({ active = true, onEnded }: { active?: boolean; onEnded?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.currentTime = 0;
    // если браузер не дал запустить видео (экономия энергии и т.п.) — через 6 секунд идём дальше
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    v.play().catch(() => {
      if (onEnded && !cancelled) fallback = setTimeout(onEnded, 6000);
    });
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [active, onEnded]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      poster="/img/hero-poster-57b1e8.webp"
      muted
      loop={!onEnded}
      playsInline
      preload="auto"
      onEnded={onEnded}
      aria-hidden
    >
      {/* телефоны — отдельное вертикальное видео 720 × 960 (15 с, без звука) под блок 390 × 700 (макет iPhone 16) */}
      <source src="/video/hero-mobile-bfe2da.mp4" type="video/mp4" media="(max-width: 767px)" />
      {/* планшет и компьютер — видео без чёрных полос (обрезано до 1920 × 888), 15 с, без звука */}
      <source src="/video/hero-1280-364c59.mp4" type="video/mp4" media="(max-width: 1023px)" />
      <source src="/video/hero-1920-cc0766.mp4" type="video/mp4" />
    </video>
  );
}
