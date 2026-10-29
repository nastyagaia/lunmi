"use client";

// Разделы личного кабинета: главная, заказы, отзывы (Figma: account, orders, reviews, account new user, reviews empty).
// Данные — из браузера (src/lib/account.ts): заказы появляются после оформления, отзывы — после доставки.
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ordersStore, productIdOf, reviewsStore, viewedStore, type Order, type OrderItem } from "@/lib/account";
import { isPrepared } from "@/lib/images";
import { loyalty } from "@/data/loyalty";
import { AccountEmpty } from "./AccountShell";
import { rub } from "./Cart";
import { StarIcon } from "./icons";
import { Sheet } from "./Sheet";
import { ProductCard, type Product } from "./ProductCard";
import { SectionHeader } from "./ui";
import { t, plural } from "@/lib/i18n";

const EMPTY_ORDERS = "/img/account/sparkle-db18b4.webp";
const EMPTY_REVIEWS = "/img/account/heart-824a2f.webp";

/** Строка заказа → карточка товара для сетки «Покупки» */
const asProduct = (i: OrderItem): Product => ({
  id: productIdOf(i.key),
  name: i.name,
  description: i.description,
  price: rub(i.price),
  image: i.image,
  href: i.href,
});

/** Уникальные товары из всех заказов (без отменённых) */
function boughtItems(orders: Order[]) {
  const seen = new Map<string, OrderItem>();
  for (const o of orders) if (o.status !== "Отменён") for (const i of o.items) seen.set(productIdOf(i.key), i);
  return [...seen.values()];
}

/** Номер заказа — маленькая плашка: розовая у активного, серая у завершённого */
function OrderNumber({ order }: { order: Order }) {
  const active = order.status !== "Доставлен" && order.status !== "Отменён";
  return (
    <span className={`self-start px-1.5 max-md:self-center py-0.5 text-base-xs ${active ? "bg-accent-soft" : "bg-surface"}`}>
      № {order.number}
    </span>
  );
}

/** Карточка заказа (Figma: orders): номер, статус, сроки, адрес, сумма; справа фото товаров 60 × 60 */
export function OrderCard({ order }: { order: Order }) {
  const thumbs = order.items.slice(0, order.items.length > 5 ? 4 : 5);
  const rest = order.items.length - thumbs.length;
  return (
    <Link
      href={`/account/orders/${order.number}`}
      className="flex flex-col gap-4 rounded-xs border border-line-light p-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-col gap-2">
        {/* телефон (orders mobile): статус H2 и номер заказа в одну строку */}
        <div className="flex flex-col gap-2 max-md:flex-row-reverse max-md:items-center max-md:justify-end">
          <OrderNumber order={order} />
          <p className="text-h3 max-md:text-h2">{t(order.status)}</p>
        </div>
        <div className="text-base-s text-secondary">
          {order.status !== "Отменён" && (
            <p>
              {order.status === "Доставлен" ? t("Доставлен") : t("Ожидаемая дата доставки")}: {order.delivery.date}
            </p>
          )}
          <p>
            {t("Адрес")}: {order.delivery.address}
          </p>
          <p>
            {t("Сумма")}: {rub(order.total)}
          </p>
        </div>
      </div>
      <ul className="flex gap-1.5">
        {thumbs.map((i) => (
          <li key={i.key} className="relative size-[60px] shrink-0 bg-surface">
            <Image
              src={i.image}
              alt=""
              fill
              sizes="60px"
              unoptimized={isPrepared(i.image)}
              className="object-contain"
            />
          </li>
        ))}
        {rest > 0 && (
          <li className="flex size-[60px] shrink-0 items-center justify-center bg-surface text-center text-base-xs text-tertiary">
            {t("ещё {n} шт.", { n: rest })}
          </li>
        )}
      </ul>
    </Link>
  );
}

/** пустая звезда — контур, как в макете «Поделись мнением» */
const starLook = (on: boolean) => (on ? {} : { fill: "none", stroke: "currentColor", strokeWidth: 0.8 });

/** Звёзды оценки: можно навести и выбрать */
function Stars({
  value,
  onChange,
  size = "size-6",
  big = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: string;
  /** телефон (item rate / mobile): кнопки 36 × 36 вплотную, звезда 26 */
  big?: boolean;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className={`flex ${big ? "-ml-[5px]" : "gap-0.5"}`} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) =>
        onChange ? (
          <button
            key={n}
            type="button"
            aria-label={t("Оценка {n}", { n })}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className={`transition-colors ${big ? "flex size-9 items-center justify-center" : ""} ${n <= shown ? "text-accent" : "text-primary"}`}
          >
            <StarIcon className={big ? "size-[26px]" : size} {...starLook(n <= shown)} />
          </button>
        ) : (
          <StarIcon
            key={n}
            className={`${size} ${n <= shown ? "text-accent" : "text-line"}`}
            {...starLook(n <= shown)}
          />
        ),
      )}
    </div>
  );
}

/** Товар, который ждёт оценки: фото, название, звёзды. Нажали звезду — появляется поле для текста */
const saveReview = (item: OrderItem, rating: number, text: string) =>
  reviewsStore.set((list) => [
    {
      key: `${item.key}-${Date.now()}`,
      productId: productIdOf(item.key),
      name: item.name,
      image: item.image,
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
    },
    ...list,
  ]);

function RateCard({ item }: { item: OrderItem }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const send = () => saveReview(item, rating, text);
  return (
    <div className="flex flex-col gap-3">
      <Link href={item.href ?? "#"} className="relative block aspect-[304/270] bg-surface">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 304px, 50vw"
          unoptimized={isPrepared(item.image)}
          className="object-contain"
        />
      </Link>
      <div>
        <p className="text-base-s">{item.name}</p>
        <p className="text-base-s text-secondary">{item.description}</p>
      </div>
      <Stars value={rating} onChange={setRating} />
      {rating > 0 && (
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder={t("Как вам средство? Пишите честно — нам и другим покупателям важно")}
            className="rounded-xs border border-line p-3 text-base-s outline-none placeholder:text-tertiary focus:border-primary"
          />
          <button
            type="button"
            onClick={send}
            className="h-10 self-start bg-primary px-6 text-caps text-white transition-colors hover:bg-secondary"
          >
            {t("отправить")}
          </button>
        </div>
      )}
    </div>
  );
}

/** Фото 80 × 80 и название с описанием — для строки и шторки отзыва на телефоне */
function MiniItem({ item, children }: { item: OrderItem; children?: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <Link href={item.href ?? "#"} className="relative size-20 shrink-0 bg-surface">
        <Image src={item.image} alt="" fill sizes="80px" unoptimized={isPrepared(item.image)} className="object-contain" />
      </Link>
      <div className="min-w-0">
        <p className="line-clamp-1 text-base-m">{item.name}</p>
        <p className="line-clamp-1 text-base-s text-secondary">{item.description}</p>
        {children}
      </div>
    </div>
  );
}

/** Телефон (item rate / mobile 11588:20666): фото 80, справа название, описание и звёзды; звезда открывает шторку
 *  «Поделись мнением» (leave review sheet mobile 11588:20876): товар, звёзды, поле текста и action bar «Оценить» */
function RateRow({ item }: { item: OrderItem }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setRating(0);
  };
  return (
    <>
      <MiniItem item={item}>
        <div className="mt-3">
          <Stars
            value={open ? rating : 0}
            onChange={(n) => {
              setRating(n);
              setOpen(true);
            }}
            big
          />
        </div>
      </MiniItem>
      <Sheet
        open={open}
        onClose={close}
        title="Поделись мнением"
        footer={
          <button
            type="button"
            onClick={() => {
              saveReview(item, rating, text);
              setOpen(false);
            }}
            className="h-[52px] bg-primary text-caps text-white transition-colors hover:bg-secondary"
          >
            {t("оценить")}
          </button>
        }
      >
        <MiniItem item={item} />
        <div className="mt-4">
          <Stars value={rating} onChange={setRating} big />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder={t("Как вам средство? Пишите честно — нам и другим покупателям важно")}
          className="mt-4 w-full rounded-xs border border-line p-3 text-base-s outline-none placeholder:text-tertiary focus:border-primary"
        />
      </Sheet>
    </>
  );
}

/** Доставленные товары без отзыва */
function useToRate() {
  const orders = ordersStore.useValue();
  const reviews = reviewsStore.useValue();
  const reviewed = new Set(reviews.map((r) => r.productId));
  return boughtItems(orders.filter((o) => o.status === "Доставлен")).filter((i) => !reviewed.has(productIdOf(i.key)));
}

/* ---------------- Главная ---------------- */

export function AccountHome({ picks }: { picks: Product[] }) {
  const orders = ordersStore.useValue();
  const viewed = viewedStore.useValue();
  const reviews = reviewsStore.useValue();
  const toRate = useToRate();
  const bonus = reviews.length * loyalty.bonusPerReview;
  const current = orders.find((o) => o.status !== "Доставлен" && o.status !== "Отменён") ?? orders[0];

  // телефон: «Смотрели недавно» и «Подобрали» — карусели с карточками 240, на компьютере — сетка по 3
  const row =
    "max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-4 max-md:gap-2 max-md:overflow-x-auto max-md:px-4 max-md:[scrollbar-width:none] md:grid md:grid-cols-3 md:gap-x-2 md:gap-y-10";
  const cell = "max-md:w-[240px] max-md:shrink-0 max-md:snap-start";

  return (
    // телефон (account mobile 11591:20893): блоки через 40
    <div className="flex flex-col gap-10 md:gap-20">
      {/* персональная скидка и бонусы: две плашки по 6 колонок */}
      <div className="grid gap-2 max-md:hidden md:grid-cols-2">
        <div className="relative flex min-h-[188px] flex-col justify-between overflow-hidden bg-accent-soft p-4">
          <div className="flex flex-col gap-2">
            <p className="text-h4">{t("Ваша персональная скидка")}</p>
            <p className="text-h1">{loyalty.discount}%</p>
            <p className="text-base-s">{t("на весь заказ")}</p>
          </div>
          <p className="text-base-xs">{t("Больше покупаешь — больше экономишь.")}</p>
          <Image src={EMPTY_REVIEWS} alt="" width={130} height={130} className="absolute top-4 right-4" />
        </div>
        <div className="relative flex min-h-[188px] flex-col justify-between overflow-hidden bg-surface p-4">
          <div className="flex flex-col gap-2">
            <p className="text-h4">{t("Оплачивай бонусами")}</p>
            <p className="text-h2">{plural(bonus, ["балл", "балла", "баллов"], ["point", "points"])}</p>
            <p className="text-base-s">{t("на вашем счёте")}</p>
          </div>
          <p className="text-base-xs">{t("1 бонус = 1 ₽")}</p>
          <Image
            src="/img/account/bonus-fd7691.webp"
            alt=""
            width={150}
            height={150}
            className="absolute top-4 right-2"
          />
        </div>
      </div>
      {/* телефон: две маленькие плашки 118 в ряд — подпись, число, внизу пояснение; картинка 64 справа */}
      <div className="grid grid-cols-2 gap-2 md:hidden">
        {[
          { bg: "bg-accent-soft", title: t("Ваша скидка"), value: `${loyalty.discount}%`, note: t("на весь заказ"), image: EMPTY_REVIEWS },
          { bg: "bg-surface", title: t("Оплачивай бонусами"), value: String(bonus), note: t("на бонусном счёте"), image: "/img/account/bonus-fd7691.webp" },
        ].map((c) => (
          <div key={c.title} className={`relative flex h-[118px] flex-col overflow-hidden p-2.5 ${c.bg}`}>
            <p className="relative z-10 text-base-s font-semibold">{c.title}</p>
            <p className="relative z-10 mt-[13px] text-h2">{c.value}</p>
            <p className="relative z-10 mt-auto text-base-xs">{c.note}</p>
            <Image src={c.image} alt="" width={64} height={64} className="absolute top-[23px] right-[7px]" />
          </div>
        ))}
      </div>

      {current && (
        <section>
          <SectionHeader title="Заказы" href="/account/orders" />
          <OrderCard order={current} />
        </section>
      )}

      {toRate.length > 0 && (
        <section>
          <SectionHeader title="Поделись мнением" href="/account/reviews" />
          <div className="grid grid-cols-2 gap-x-2 gap-y-10 max-md:hidden md:grid-cols-3">
            {toRate.slice(0, 3).map((i) => (
              <RateCard key={i.key} item={i} />
            ))}
          </div>
          <div className="flex flex-col gap-6 md:hidden">
            {toRate.slice(0, 3).map((i) => (
              <RateRow key={i.key} item={i} />
            ))}
          </div>
        </section>
      )}

      {viewed.length > 0 && (
        <section>
          <SectionHeader title="Смотрели недавно" href={null} />
          <div className={row}>
            {viewed.slice(0, 3).map((p) => (
              <div key={p.id} className={cell}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader title="Подобрали для вас" href="/ai" />
        <div className={row}>
          {picks.slice(0, 3).map((p) => (
            <div key={p.id} className={cell}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- Заказы ---------------- */

export function AccountOrders() {
  const orders = ordersStore.useValue();
  const bought = boughtItems(orders);
  const [tab, setTab] = useState<"orders" | "bought">("orders");
  const tabClass = (on: boolean) => `text-h2 transition-colors ${on ? "" : "text-tertiary hover:text-primary"}`;

  return (
    // телефон (orders mobile): вкладки через 16, до списка 24, карточки через 16
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex gap-4 md:gap-5" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "orders"}
          onClick={() => setTab("orders")}
          className={tabClass(tab === "orders")}
        >
          {t("Заказы")} <span className="text-tertiary">{orders.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "bought"}
          onClick={() => setTab("bought")}
          className={tabClass(tab === "bought")}
        >
          {t("Покупки")} <span className="text-tertiary">{bought.length}</span>
        </button>
      </div>

      {tab === "orders" ? (
        orders.length ? (
          <div className="flex flex-col gap-4 md:gap-5">
            {orders.map((o) => (
              <OrderCard key={o.number} order={o} />
            ))}
          </div>
        ) : (
          <AccountEmpty image={EMPTY_ORDERS}>{t("Заказов пока нет — непорядок! Каталог уже заждался.")}</AccountEmpty>
        )
      ) : bought.length ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-10 md:grid-cols-3">
          {bought.map((i) => (
            <ProductCard key={i.key} product={asProduct(i)} />
          ))}
        </div>
      ) : (
        <AccountEmpty image={EMPTY_ORDERS}>{t("Покупок пока нет — самое время начать коллекцию.")}</AccountEmpty>
      )}
    </div>
  );
}

/* ---------------- Отзывы ---------------- */

export function AccountReviews() {
  const orders = ordersStore.useValue();
  const reviews = reviewsStore.useValue();
  const toRate = useToRate();
  const intro = t("За каждый отзыв на купленный товар вы получите {n} баллов (1 балл = 1 ₽). Честное мнение — лучшая валюта.", { n: loyalty.bonusPerReview });

  if (!toRate.length && !reviews.length) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-h3 md:text-h2">{t("Отзывы")}</h1>
        <p className="max-w-[720px] text-base-s">{intro}</p>
        <AccountEmpty image={EMPTY_REVIEWS}>
          {orders.length
            ? t("Оценить средства можно, когда заказ приедет и вы их попробуете. Ждём ваш вердикт!")
            : t("Заказов пока нет — непорядок! Каталог уже заждался.")}
        </AccountEmpty>
      </div>
    );
  }

  return (
    // телефон (account reviews mobile 11593:21211): товары строками item rate через 24, разделы через 40
    <div className="flex flex-col gap-10 md:gap-20">
      {toRate.length > 0 && (
        <section>
          <SectionHeader title="Ждут оценки" href={null} />
          <p className="mb-6 text-base-s md:-mt-3">{intro}</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-10 max-md:hidden md:grid-cols-3">
            {toRate.map((i) => (
              <RateCard key={i.key} item={i} />
            ))}
          </div>
          <div className="flex flex-col gap-6 md:hidden">
            {toRate.map((i) => (
              <RateRow key={i.key} item={i} />
            ))}
          </div>
        </section>
      )}
      {reviews.length > 0 && (
        <section>
          <SectionHeader title="Ваши отзывы" href={null} />
          <ul className="flex flex-col gap-4 md:gap-5">
            {reviews.map((r) => (
              <li key={r.key} className="flex flex-col gap-4 rounded-xs border border-line-light p-4">
                <div className="flex items-start gap-4">
                  <div className="relative size-[60px] shrink-0 bg-surface">
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      sizes="60px"
                      unoptimized={isPrepared(r.image)}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-base-s">{r.name}</p>
                    <Stars value={r.rating} size="size-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => reviewsStore.set((list) => list.filter((x) => x.key !== r.key))}
                    className="text-caps text-tertiary underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {t("удалить")}
                  </button>
                </div>
                {r.text && <p className="text-base-s">{r.text}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
