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
import { t } from "@/lib/i18n";

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
        {/* photo bg: фон surface 320 px, заголовок и описание слева, фото справа (зеркально).
            Телефон (ai picker mobile 11569:18092, mobile banner): шапка 200, фото справа 170 × 200, заголовок H3, описание — под шапкой */}
        <section className="relative overflow-hidden bg-surface max-md:pt-12">
          <div className="container-page flex items-end justify-between gap-10 max-md:h-[200px] md:h-[320px]">
            <div className="relative z-10 flex max-w-[480px] flex-col gap-2 pb-[38px] md:pb-[50px]">
              <h1 className="text-h3 md:text-h1">{t("Подбор средств")}</h1>
              <p className="text-base-s max-md:hidden">
                {t("Не знаешь, что выбрать? Расскажи, что тебя беспокоит, укажи бюджет или загрузи фотографию. AI предложит средства, которые лучше всего соответствуют твоему запросу.")}
              </p>
            </div>
            <div className="absolute top-12 right-0 h-[200px] w-[170px] overflow-hidden md:relative md:right-auto md:top-auto md:h-full md:w-[385px] md:shrink-0 xl:mr-[137px]">
              <Image
                src="/img/bannerPhoto.webp"
                alt=""
                fill
                priority
                sizes="385px"
                className="-scale-x-100 object-cover object-top"
              />
              {/* телефон: левый край фото мягко уходит в серый фон под заголовком */}
              <span aria-hidden className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-surface to-transparent md:hidden" />
            </div>
          </div>
        </section>

        <div className="container-page pt-4 pb-10 md:pt-[50px] md:pb-[120px]">
          <p className="mb-6 text-base-s md:hidden">
            {t("Не знаешь, что выбрать? Расскажи, что тебя беспокоит, укажи бюджет или загрузи фотографию. AI предложит средства, которые лучше всего соответствуют твоему запросу.")}
          </p>
          <AiChatInput onSubmit={submit} busy={busy} />
          {busy && (
            <p aria-live="polite" className="mt-4 animate-pulse text-base-s text-secondary">
              {t("Подбираем средства…")}
            </p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* шапка результата на фоне surface: крошки, «Рекомендации», объяснение, «Новый запрос» */}
      {/* телефон (ai picker result mobile 11569:18164): крошки на 64, до заголовка 32, дальше через 16, снизу 32 */}
      <section className="bg-surface pt-16 pb-8 md:pt-[110px] md:pb-[60px]">
        <div className="container-page flex flex-col gap-4 md:gap-6">
          <nav aria-label={t("Хлебные крошки")} className="-ml-0.5 flex items-center gap-1 text-base-s text-secondary max-md:mb-4">
            <button
              type="button"
              onClick={() => setResult(null)}
              aria-label={t("Назад к запросу")}
              className="mr-3 flex h-7 w-8 items-center pr-3 text-primary transition-colors hover:text-accent"
            >
              <ArrowLeft />
            </button>
            <span>{t("AI-подбор ухода")}</span>
            <span aria-hidden>/</span>
            <span aria-current="page">{t("Результат")}</span>
          </nav>

          <div className="flex items-center gap-3">
            <h1 className="text-h3 md:text-h2">{t("Рекомендации")}</h1>
            <Image src="/img/c9.webp" alt="" width={27} height={32} />
          </div>

          <div className="flex max-w-[1060px] flex-col gap-1 text-base-s">
            {result.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <Button size="M" className="self-start" onClick={() => setResult(null)}>
            {t("новый запрос")}
          </Button>
        </div>
      </section>

      <div className="flex flex-col gap-10 py-10 md:gap-[100px] md:py-[70px]">
        {result.groups.map((g) => (
          <section key={g.title} className="container-page">
            <h2 className="text-h3 md:text-h2">{g.title}</h2>
            <p className="mt-3 mb-4 max-w-[580px] text-base-s md:mb-8">{g.text}</p>
            <Carousel label={g.title} arrowTop={119} className="items-start">
              {g.products.map((p) => (
                <div
                  key={p.id}
                  className="w-[240px] shrink-0 snap-start sm:w-[calc((100%-8px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-24px)/4)]"
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
