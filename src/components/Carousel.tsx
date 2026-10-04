"use client";

// carousel arrow из UI KIT (arrow 143:587): тёмная (#292929, text/primary), при наведении — на серой плашке surface;
// когда листать некуда (начало или конец ленты) — disabled: серая #b8b8b8 (border/secondary), без ховера.
// На телефоне и планшете листается пальцем, на широком экране появляются стрелки по бокам.
// focus: карточка в центре ленты плавно вытягивается — каждому слайду ставится --focus от 0 до 1
// (1 — ровно по центру), карточка сама решает, как на это ответить (ProductCard grow).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

export function Carousel({
  children,
  label,
  arrowTop,
  className = "",
  focus = false,
}: {
  children: ReactNode;
  label: string;
  /** отступ стрелок сверху (px) — по центру фото, как в макете */
  arrowTop: number;
  className?: string;
  /** выделять карточку в центре ленты */
  focus?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // насколько слайд близок к центру ленты: 1 — по центру, 0 — на шаг в сторону и дальше.
    // smoothstep делает переход мягким у краёв, как в интерфейсах Apple
    const centre = () => {
      const box = el.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      for (const slide of el.children as HTMLCollectionOf<HTMLElement>) {
        const r = slide.getBoundingClientRect();
        const step = r.width + 8; // ширина слайда + промежуток между колонками
        const t = Math.max(0, 1 - Math.abs(r.left + r.width / 2 - mid) / step);
        slide.style.setProperty("--focus", (t * t * (3 - 2 * t)).toFixed(3));
      }
    };
    let frame = 0;
    const update = () => {
      setEdge({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
      if (focus && !frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          centre();
        });
    };
    update();
    if (focus) centre(); // сразу при загрузке, не дожидаясь первого кадра
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [focus]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="карусель" aria-label={label}>
      <div
        ref={track}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 md:-mx-6 md:scroll-px-6 md:px-6 xl:mx-0 xl:px-0 xl:scroll-px-0 ${className}`}
      >
        {children}
      </div>
      <div
        className="pointer-events-none absolute -inset-x-10 hidden justify-between xl:flex"
        style={{ top: arrowTop }}
      >
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={edge.start}
          aria-label="Назад"
          className="pointer-events-auto cursor-pointer rounded-sm text-primary transition-colors hover:bg-surface disabled:cursor-default disabled:text-line disabled:hover:bg-transparent"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={edge.end}
          aria-label="Вперёд"
          className="pointer-events-auto cursor-pointer rounded-sm text-primary transition-colors hover:bg-surface disabled:cursor-default disabled:text-line disabled:hover:bg-transparent"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
