// Доставка (Figma «доставка», 5442:44270): шапка photo bg с пакетом Lunmi, условия по пунктам.
// Текст переписан из черновика макета: цены и сроки — из src/data/delivery.ts, чтобы совпадали с оформлением заказа.
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { delivery } from "@/data/delivery";
import { t, money } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `${t("Доставка")} — Lunmi`,
  description: t(
    "Курьером по Москве и Петербургу и в пункты выдачи СДЭК по всей России. Сроки, стоимость, оплата и отмена заказа.",
  ),
};

const rub = money;

function Block({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    // заголовок → текст 8 px
    <section id={id} className="flex scroll-mt-24 flex-col gap-2">
      <h2 className="text-h4">{t(title)}</h2>
      {/* телефон: строки идут сплошным текстом, как в макете */}
      <div className="flex flex-col text-base-s md:gap-3">{children}</div>
    </section>
  );
}

/** строка «способ — цена, срок» */
function Way({ name, price, days, hint }: { name: string; price: string; days: string; hint?: string }) {
  return (
    <li>
      {t(name)} — <span className="whitespace-nowrap">{price}</span>, <span className="whitespace-nowrap">{t(days)}</span>
      {hint && ` (${t(hint)})`}
    </li>
  );
}

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main>
        {/* photo bg: фон surface 320 px, заголовок и подзаголовок слева снизу, фото 550 × 320 справа.
            Телефон (delivery mobile 11597:21998, mobile banner): шапка 200, фото 344 × 200 от x = 158, заголовок H3 */}
        <section className="relative overflow-hidden bg-surface max-md:pt-12">
          <div className="container-page flex items-end justify-between gap-10 max-md:h-[200px] md:h-[320px]">
            <div className="relative z-10 flex max-w-[504px] flex-col gap-2 pb-[38px] md:pb-[50px]">
              <h1 className="text-h3 md:text-h1">{t("Доставка")}</h1>
            </div>
            <div className="absolute top-12 left-[158px] h-[200px] w-[344px] md:relative md:top-auto md:left-auto md:h-full md:w-[min(550px,45%)] md:shrink-0 xl:mr-[66px]">
              <Image src="/img/covers/delivery-bag.webp" alt="" fill priority sizes="550px" className="object-cover" />
            </div>
          </div>
        </section>

        <div className="container-page flex max-w-[1240px] flex-col gap-8 pt-8 md:gap-[50px] md:pt-[50px]">
          <div className="flex max-w-[720px] flex-col gap-8 md:gap-[50px]">
            <Block title="Способы доставки">
              <ul className="flex flex-col md:gap-3">
                <Way
                  name="Курьером по Москве и Санкт-Петербургу"
                  price={rub(delivery.courier.price)}
                  days={delivery.courier.days}
                />
                <Way
                  name="В пункт выдачи СДЭК в Москве и Санкт-Петербурге"
                  price={rub(delivery.pickup.price)}
                  days={delivery.pickup.days}
                />
                <Way
                  name="В другие города — курьером или в пункт выдачи СДЭК"
                  price={t("от {price}", { price: rub(delivery.regions.priceFrom) })}
                  days={delivery.regions.days}
                  hint="точные стоимость и срок рассчитываются по тарифам СДЭК, когда вы укажете адрес при оформлении"
                />
              </ul>
            </Block>

            <Block title="Хранение в пункте выдачи">
              <p>
                {t("Посылка терпеливо ждёт вас {n} календарных дней с момента, как приехала в пункт. Мы пришлём СМС, как только её можно будет забрать.", { n: delivery.storageDays })}
              </p>
            </Block>

            <Block title="Отмена и возврат" id="returns">
              <p>
                {t("Передумали — бывает. Пока заказ не собран, его можно отменить в личном кабинете или через поддержку, и мы вернём деньги.")}
              </p>
              <p>
                {t("Косметику надлежащего качества по закону нельзя вернуть после покупки. Если товар пришёл с браком или не тот, что вы заказывали, — напишите нам: заменим его или вернём деньги.")}
              </p>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
