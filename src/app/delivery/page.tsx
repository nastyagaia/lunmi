// Доставка (Figma «доставка», 5442:44270): шапка photo bg с пакетом Lunmi, условия по пунктам.
// Текст переписан из черновика макета: цены и сроки — из src/data/delivery.ts, чтобы совпадали с оформлением заказа.
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { delivery } from "@/data/delivery";

export const metadata: Metadata = {
  title: "Доставка — Lunmi",
  description:
    "Курьером по Москве и Петербургу и в пункты выдачи СДЭК по всей России. Сроки, стоимость, оплата и отмена заказа.",
};

const rub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    // заголовок → текст 8 px
    <section className="flex flex-col gap-2">
      <h2 className="text-h4">{title}</h2>
      <div className="flex flex-col gap-3 text-base-s">{children}</div>
    </section>
  );
}

/** строка «способ — цена, срок» */
function Way({ name, price, days, hint }: { name: string; price: string; days: string; hint?: string }) {
  return (
    <li>
      {name} — <span className="whitespace-nowrap">{price}</span>, <span className="whitespace-nowrap">{days}</span>
      {hint && ` (${hint})`}
    </li>
  );
}

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main>
        {/* photo bg: фон surface 320 px, заголовок и подзаголовок слева снизу, фото 550 × 320 справа */}
        <section className="bg-surface">
          <div className="container-page flex items-end justify-between gap-10 md:h-[320px]">
            <div className="flex max-w-[504px] flex-col gap-2 pt-24 pb-8 md:pt-0 md:pb-[50px]">
              <h1 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">Доставка</h1>
              <p className="text-base-s">
                Привезём заказ курьером или в пункт выдачи СДЭК — по всей России. Стоимость и срок вы увидите сразу при
                оформлении.
              </p>
            </div>
            <div className="relative hidden h-full w-[550px] shrink-0 md:block xl:mr-[66px]">
              <Image src="/img/covers/delivery-bag.webp" alt="" fill priority sizes="550px" className="object-cover" />
            </div>
          </div>
        </section>

        <div className="container-page flex max-w-[1240px] flex-col gap-[50px] pt-10 md:pt-[50px]">
          <div className="flex max-w-[720px] flex-col gap-[50px]">
            <Block title="Способы доставки">
              <ul className="flex flex-col gap-3">
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
                  price={`от ${rub(delivery.regions.priceFrom)}`}
                  days={delivery.regions.days}
                  hint="точные стоимость и срок рассчитываются по тарифам СДЭК, когда вы укажете адрес при оформлении"
                />
              </ul>
            </Block>

            <Block title="Хранение в пункте выдачи">
              <p>
                Заказ ждёт вас {delivery.storageDays} календарных дней с момента поступления в пункт. Мы пришлём СМС,
                как только его можно будет забрать.
              </p>
            </Block>

            <Block title="Отмена и возврат">
              <p>
                Отменить заказ и вернуть деньги можно, пока он не собран, — до статуса «Собран». Напишите нам в
                поддержку, и мы всё сделаем.
              </p>
              <p>
                Косметику надлежащего качества по закону нельзя вернуть после покупки. Если товар пришёл с браком или не
                тот, что вы заказывали, — напишите нам: заменим его или вернём деньги.
              </p>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
