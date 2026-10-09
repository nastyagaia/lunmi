"use client";

// Первый экран — слайдер из макета (hero anua pdrn, hero korea trends и др.).
// Первый слайд — видео (доигрывает до конца), остальные — фото, сменяются каждые 6 секунд.
// Нажатие на полоску переключает слайд и запускает отсчёт заново.
// Если в системе включено «уменьшить движение», слайды сами не листаются.
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/data/home";
import { HeroVideo } from "./HeroVideo";
import { Button } from "./ui";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);

  // фото-слайды: через 6 секунд — следующий (видео-слайд переключается сам, когда доиграет)
  useEffect(() => {
    if (!slides[active].image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [active, slides, next]);

  return (
    <section
      className="relative h-[700px] overflow-hidden bg-primary md:h-[660px]"
      aria-roledescription="карусель"
      aria-label="Акции"
    >
      {slides.map((s, i) => {
        const light = s.tone === "light";
        const current = i === active;
        return (
          <div
            key={s.title}
            aria-hidden={!current}
            inert={!current}
            className={`absolute inset-0 transition-opacity duration-700 ${current ? "opacity-100" : "opacity-0"}`}
          >
            {s.image ? (
              <>
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className={`object-cover ${s.mobileImage ? "max-md:hidden" : ""}`}
                />
                {s.mobileImage && (
                  <Image src={s.mobileImage} alt="" fill sizes="100vw" className="object-cover md:hidden" />
                )}
              </>
            ) : (
              <HeroVideo active={current} onEnded={next} />
            )}
            {/* на телефоне текст лежит поверх фото — подложка снизу, чтобы он читался */}
            <div
              className={`absolute inset-0 bg-gradient-to-t to-transparent md:hidden ${
                light ? "from-black/55 via-black/10" : "from-white/75 via-white/20"
              }`}
            />

            <div className="container-page relative flex h-full flex-col justify-end pb-[94px] md:pb-[98px]">
              <div
                className={`flex max-w-[709px] flex-col gap-5 transition-[opacity,translate] delay-200 duration-700 ease-out ${
                  current ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${light ? "text-white" : "text-primary"}`}
              >
                <div className="flex flex-col gap-2">
                  {i === 0 ? (
                    <h1 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">{s.title}</h1>
                  ) : (
                    <h2 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">{s.title}</h2>
                  )}
                  <p className="max-w-[401px] text-base-s md:whitespace-pre-line">{s.text}</p>
                </div>
                <Button href="#bestsellers" tone={light ? "glass" : "dark"} className="self-start">
                  за покупками
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* полоски-переключатели (Figma Frame 21217): ряд 350 px, промежуток 6 px, полоски 2 px делят ширину поровну.
          Кнопка выше самой полоски, чтобы легко попасть пальцем */}
      <div className="absolute bottom-[21px] left-1/2 flex w-[min(350px,100%-32px)] -translate-x-1/2 gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Слайд ${i + 1}: ${s.title}`}
            aria-current={i === active}
            className="group min-w-0 flex-1 py-3"
          >
            <span
              className={`block h-0.5 w-full transition-opacity ${
                slides[active].tone === "light" ? "bg-white" : "bg-primary"
              } ${i === active ? "" : "opacity-40 group-hover:opacity-70"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
