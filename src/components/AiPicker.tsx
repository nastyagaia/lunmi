"use client";

// Подбор средств (Figma: ai picker 5891:31357 → ai picker result 3831:12414).
// Экран 1: шапка «Подбор средств» + поле input ai-chat. Экран 2: «Рекомендации» — объяснение
// и группы товаров каруселями. Подбор пока по правилам (lib/picker.ts), без настоящего AI.
import Image from "next/image";
import { useState } from "react";
import { pickProducts, type PickerResult } from "@/lib/picker";
import { AiChatInput } from "./AiChatInput";
import { Carousel } from "./Carousel";
import { ArrowLeft } from "./icons";
import { ProductCard, type Product } from "./ProductCard";
import { Button } from "./ui";

export function AiPicker({ products }: { products: Product[] }) {
  const [result, setResult] = useState<PickerResult | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (text: string, photos: File[]) => {
    setBusy(true);
    // короткая пауза «думаем» — чтобы ответ не появлялся мгновенно и было понятно, что идёт подбор
    window.setTimeout(() => {
      setResult(pickProducts(text, products, photos.length > 0));
      setBusy(false);
      window.scrollTo({ top: 0 });
    }, 900);
  };

  if (!result) {
    return (
      <>
        {/* photo bg: фон surface 320 px, заголовок и описание слева, фото справа (зеркально) */}
        <section className="bg-surface">
          <div className="container-page flex items-end justify-between gap-10 md:h-[320px]">
            <div className="flex max-w-[480px] flex-col gap-2 pt-20 pb-10 md:pt-0 md:pb-[50px]">
              <h1 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">Подбор средств</h1>
              <p className="text-base-s">
                Не знаешь, что выбрать? Расскажи, что тебя беспокоит, укажи бюджет или загрузи фотографию. AI предложит
                средства, которые лучше всего соответствуют твоему запросу.
              </p>
            </div>
            <div className="relative hidden h-full w-[385px] shrink-0 overflow-hidden md:block xl:mr-[137px]">
              <Image
                src="/img/bannerPhoto.webp"
                alt=""
                fill
                priority
                sizes="385px"
                className="-scale-x-100 object-cover object-top"
              />
            </div>
          </div>
        </section>

        <div className="container-page pt-10 pb-10 md:pt-[50px] md:pb-[120px]">
          <AiChatInput onSubmit={submit} busy={busy} />
          {busy && (
            <p aria-live="polite" className="mt-4 animate-pulse text-base-s text-secondary">
              Подбираем средства…
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* шапка результата на фоне surface: крошки, «Рекомендации», объяснение, «Новый запрос» */}
      <section className="bg-surface pt-[90px] pb-10 md:pt-[110px] md:pb-[60px]">
        <div className="container-page flex flex-col gap-6">
          <nav aria-label="Хлебные крошки" className="-ml-0.5 flex items-center gap-1 text-base-s text-secondary">
            <button
              type="button"
              onClick={() => setResult(null)}
              aria-label="Назад к запросу"
              className="mr-3 flex h-7 w-8 items-center pr-3 text-primary transition-colors hover:text-accent"
            >
              <ArrowLeft />
            </button>
            <span>AI-подбор ухода</span>
            <span aria-hidden>/</span>
            <span aria-current="page">Результат</span>
          </nav>

          <div className="flex items-center gap-3">
            <h1 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">Рекомендации</h1>
            <Image src="/img/c9.webp" alt="" width={27} height={32} />
          </div>

          <div className="flex max-w-[1060px] flex-col gap-1 text-base-s">
            {result.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <Button size="M" className="self-start" onClick={() => setResult(null)}>
            новый запрос
          </Button>
        </div>
      </section>

      <div className="flex flex-col gap-20 py-20 md:gap-[100px] md:py-[70px]">
        {result.groups.map((g) => (
          <section key={g.title} className="container-page">
            <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">{g.title}</h2>
            <p className="mt-3 mb-8 max-w-[580px] text-base-s">{g.text}</p>
            <Carousel label={g.title} arrowTop={119} className="items-start">
              {g.products.map((p) => (
                <div
                  key={p.id}
                  className="w-[70%] shrink-0 snap-start xs:w-[calc((100%-8px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-24px)/4)]"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </Carousel>
          </section>
        ))}
      </div>
    </>
  );
}
