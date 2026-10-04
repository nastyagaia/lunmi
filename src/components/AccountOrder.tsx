"use client";

// Страница заказа (Figma: order assembling, order in transit, cancel order): шкала статусов, информация,
// товары и справа «Ваш заказ» с суммой. Отменить можно, пока заказ не передан в доставку.
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { formatDateTime, ORDER_STEPS, ordersStore, type Order } from "@/lib/account";
import { isPrepared } from "@/lib/images";
import { rub } from "./Cart";
import { ArrowLeft, CloseIcon } from "./icons";

const noop = () => () => {};

function Row({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="shrink-0 text-base-s">{label}</dt>
      <dd className="text-base-s sm:text-right">{children}</dd>
    </div>
  );
}

/** Шкала «Создан → В сборке → В пути → Доставлен»: пройденные шаги — розовое сердечко и линия */
function Progress({ order }: { order: Order }) {
  const at = ORDER_STEPS.indexOf(order.status as (typeof ORDER_STEPS)[number]);
  return (
    <ol className="grid grid-cols-4">
      {ORDER_STEPS.map((step, i) => {
        const done = i <= at;
        const when = order.history[step];
        return (
          <li key={step} className="flex flex-col gap-2">
            <div className="flex items-center">
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                aria-hidden
                className={done ? "text-accent" : "text-line"}
              >
                <path
                  fill="currentColor"
                  d="M6 11 5.1 10.2C1.9 7.3 0 5.6 0 3.3 0 1.5 1.4 0 3.3 0c1 0 2 .5 2.7 1.2C6.7.5 7.7 0 8.7 0 10.6 0 12 1.5 12 3.3c0 2.3-1.9 4-5.1 6.9L6 11Z"
                />
              </svg>
              {i < ORDER_STEPS.length - 1 && <span className={`h-px flex-1 ${i < at ? "bg-accent" : "bg-line"}`} />}
            </div>
            <div className="text-base-s">
              <p className={i === at ? "" : "text-tertiary"}>{step}</p>
              {when && <p className="text-tertiary">{formatDateTime(when)}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function AccountOrder({ number }: { number: string }) {
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const orders = ordersStore.useValue();
  const order = orders.find((o) => o.number === number);
  const [confirm, setConfirm] = useState(false);

  if (!ready) return null;
  if (!order) {
    return (
      <div className="flex flex-col items-start gap-6 py-10">
        <h1 className="text-h2">Заказ не найден</h1>
        <p className="text-base-s text-secondary">
          Заказы сохраняются в этом браузере. Если вы оформляли заказ на другом устройстве, откройте кабинет там.
        </p>
        <Link href="/account/orders" className="text-caps underline underline-offset-2 hover:text-accent">
          к заказам
        </Link>
      </div>
    );
  }

  const cancellable = order.status === "Создан" || order.status === "В сборке";
  const count = order.items.reduce((n, i) => n + i.qty, 0);
  const cancel = () => {
    const now = new Date().toISOString();
    ordersStore.set((list) =>
      list.map((o) => (o.number === number ? { ...o, status: "Отменён", history: { ...o.history, Отменён: now } } : o)),
    );
    setConfirm(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/account/orders"
        className="flex items-center gap-4 self-start text-base-s text-secondary hover:text-primary"
      >
        <ArrowLeft />К заказам
      </Link>

      <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-[720px] flex-col gap-[60px]">
          <div className="flex flex-col gap-6">
            <h1 className="text-h2">
              Заказ № {order.number} {order.status === "Отменён" ? "отменён" : order.status.toLowerCase()}
            </h1>
            {order.status !== "Отменён" && <Progress order={order} />}
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-h4">Информация</h2>
            <dl className="flex flex-col gap-4">
              <Row label="Получатель">{order.recipient}</Row>
              <Row label={order.delivery.kind === "courier" ? "Доставка курьером" : "Пункт выдачи СДЭК"}>
                {order.delivery.address}
              </Row>
              <Row label="Дата доставки">{order.delivery.date}</Row>
            </dl>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-h4">
              {count}{" "}
              {count % 10 === 1 && count % 100 !== 11
                ? "товар"
                : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)
                  ? "товара"
                  : "товаров"}
            </h2>
            <ul className="flex flex-col gap-5">
              {order.items.map((i) => (
                <li key={i.key}>
                  <Link href={i.href ?? "#"} className="group flex gap-4">
                    <div className="relative size-20 shrink-0 bg-surface">
                      <Image
                        src={i.image}
                        alt=""
                        fill
                        sizes="80px"
                        unoptimized={isPrepared(i.image)}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-base-s">
                      <p className="transition-colors group-hover:text-accent">{i.name}</p>
                      <p className="text-secondary">{i.description}</p>
                      <p>
                        {rub(i.price)}
                        {i.qty > 1 && <span className="text-secondary"> × {i.qty}</span>}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Ваш заказ — 4 колонки справа */}
        <aside className="flex w-full flex-col gap-4 lg:w-[408px] lg:pt-[54px]">
          <h2 className="text-h4">Ваш заказ</h2>
          <dl className="flex flex-col gap-4 text-base-s">
            <div className="flex justify-between">
              <dt>Товары</dt>
              <dd>{rub(order.goods)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between">
                <dt>Скидка</dt>
                <dd>− {rub(order.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt>Доставка</dt>
              <dd>+ {rub(order.deliveryPrice)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt>Итого, {order.payment}</dt>
              <dd className="text-h2">{rub(order.total)}</dd>
            </div>
          </dl>
          <Link
            href="/account/help"
            className="flex h-10 items-center justify-center bg-primary text-caps text-white transition-colors hover:bg-primary/85"
          >
            нужна помощь
          </Link>
          {cancellable ? (
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="h-10 border border-primary text-caps transition-colors hover:bg-surface"
            >
              отменить заказ
            </button>
          ) : (
            order.status !== "Отменён" &&
            order.status !== "Доставлен" && (
              <p className="text-center text-base-s">
                Отменить или изменить заказ уже нельзя. Но мы поможем —{" "}
                <Link href="/account/help" className="text-accent hover:underline">
                  напишите в поддержку
                </Link>
                .
              </p>
            )
          )}
        </aside>
      </div>

      {/* окно «Отменить заказ?» (Figma: cancel order) */}
      {confirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть"
            tabIndex={-1}
            onClick={() => setConfirm(false)}
            className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
            className="relative flex w-full max-w-[616px] animate-[dropdown-in_250ms_ease-out] flex-col gap-6 rounded-xs bg-white p-8"
          >
            <button
              type="button"
              onClick={() => setConfirm(false)}
              aria-label="Закрыть"
              className="absolute top-8 right-8 flex size-10 items-center justify-center transition-colors hover:text-accent"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col gap-2 pr-12">
              <h2 id="cancel-title" className="text-h3">
                Отменить заказ?
              </h2>
              <p className="text-base-s">
                Заказ № {order.number} будет отменён. Товары снова можно будет положить в корзину.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="h-10 bg-primary px-6 text-caps text-white transition-colors hover:bg-primary/85"
              >
                не отменять
              </button>
              <button
                type="button"
                onClick={cancel}
                className="h-10 border border-primary px-6 text-caps transition-colors hover:bg-surface"
              >
                отменить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
