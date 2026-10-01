"use client";

// Свой курсор по примеру «Animated Circle Following Cursor» (CodePen, Matteo Dumont):
// точка ровно под мышкой + тонкий круг 40 px, который догоняет её на 20% пути за кадр.
// Над ссылками и кнопками круг слегка увеличивается.
// Включается только на устройствах с мышкой и без настройки «уменьшить движение».
import { useEffect, useRef } from "react";

const interactive = "a, button, summary, label, [role='button']";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches || !dot.current || !ring.current) return;
    const d = dot.current;
    const r = ring.current;

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      rx = lerp(rx, x, 0.2);
      ry = lerp(ry, y, 0.2);
      scale = lerp(scale, targetScale, 0.2);
      d.style.transform = `translate(${x}px, ${y}px)`;
      r.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
      frame = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      document.documentElement.dataset.cursor = "on";
      targetScale = (e.target as Element).closest?.(interactive) ? 1.6 : 1;
    };
    const onLeave = () => {
      document.documentElement.dataset.cursor = "off";
    };

    document.documentElement.classList.add("custom-cursor");
    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div aria-hidden className="cursor-layer">
      {/* круг: 40 px, обводка 1 px, primary 50% — как strokeColor в примере */}
      <div ref={ring} className="cursor-ring fixed -left-5 -top-5 z-[100] size-10 rounded-full border border-primary/50" />
      {/* точка: 5 px */}
      <div ref={dot} className="cursor-dot fixed -left-[2.5px] -top-[2.5px] z-[100] size-[5px] rounded-full bg-primary" />
    </div>
  );
}
