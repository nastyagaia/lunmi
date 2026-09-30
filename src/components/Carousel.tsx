"use client";

// carousel arrow из UI KIT + лента со скроллом.
// На телефоне и планшете листается пальцем, на широком экране появляются стрелки по бокам.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

export function Carousel({
  children,
  label,
  arrowTop,
  className = "",
}: {
  children: ReactNode;
  label: string;
  /** отступ стрелок сверху (px) — по центру фото, как в макете */
  arrowTop: number;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="карусель" aria-label={label}>
      <div
        ref={track}
        className={`no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-1.5 overflow-x-auto px-4 md:-mx-6 md:scroll-px-6 md:px-6 xl:mx-0 xl:px-0 xl:scroll-px-0 ${className}`}
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
          className="pointer-events-auto text-primary transition-opacity hover:text-accent disabled:opacity-25"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={edge.end}
          aria-label="Вперёд"
          className="pointer-events-auto text-primary transition-opacity hover:text-accent disabled:opacity-25"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
