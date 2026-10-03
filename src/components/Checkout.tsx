"use client";

// Оформление заказа (Figma: checkout 2 → checkout 3 / 3b → checkout courier, 5515:49743 и правее).
// На странице — короткие карточки: контакты, адрес, дата, оплата, комментарий. Заполнение и правка —
// в боковых панелях (CheckoutDrawers): контакты, адрес с картой (курьер / пункт выдачи СДЭК), ваши адреса,
// способ оплаты, новая карта. Справа «Ваш заказ» с суммой и промокодом.
// Онлайн-оплаты пока нет: «Оплатить» оформляет заказ без списания денег, корзина очищается, показываем «Заказ оформлен».
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { addressStore, contactStore, newOrderNumber, ordersStore, type Order } from "@/lib/account";
import { rub, useCart } from "./Cart";
import {
  AddCardDrawer,
  AddressDrawer,
  addressSubtitle,
  addressTitle,
  CardBadge,
  ContactDrawer,
  PaymentDrawer,
  pointOf,
  SavedAddressesDrawer,
  type Address,
  type Payment,
  type SavedCard,
} from "./CheckoutDrawers";
import { ArrowRight, ChevronLeft, ChevronRight, CloseIcon } from "./icons";
import { Button, CdekLogo, ChoiceChip, InfoCard, Radio, TextField } from "./ui";
import { delivery as deliveryTerms } from "@/data/delivery";

const PROMO: Record<string, number> = { FIRST5: 5 }; // промокод → скидка в процентах
const TIMES = ["9:00–12:00", "12:00–18:00", "18:00–21:00"];

// контакты и адреса запоминаются в браузере (src/lib/account.ts) — при следующем заказе вводить заново не нужно

type Panel =
  | { kind: "contact" }
  | { kind: "address"; tab: Address["kind"]; edit?: Address; back?: boolean }
  | { kind: "addresses" }
  | { kind: "payment" }
  | { kind: "card" };

/** «1 товар», «3 товара», «15 товаров» */
function itemsWord(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} товар`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} товара`;
  return `${n} товаров`;
}

/** ближайшие 10 дней доставки начиная с завтра: «13 апреля, пн» */
function nextDays() {
  const fmt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", weekday: "short" });
  return Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const parts = fmt.formatToParts(d);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    return `${get("day")} ${get("month")}, ${get("weekday")}`;
  });
}

/** Блок: заголовок H4, под ним содержимое через 16 px. Блоки появляются по очереди, как в макетах:
 *  контакты → адрес → дата и оплата → дополнительно */
function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    // новый блок мягко выплывает, когда заполнен предыдущий
    <section className="flex animate-[dropdown-in_300ms_ease-out] flex-col gap-4">
      <h2 className="text-h4">{title}</h2>
      {children}
    </section>
  );
}

const darkButton = "self-start bg-primary text-white hover:bg-primary/85";

export function Checkout() {
  const cart = useCart();
  const contact = contactStore.useValue();
  const { list: addresses, selected } = addressStore.useValue();
  const address = addresses.find((a) => a.id === selected);

  const [panel, setPanel] = useState<Panel | null>(null);
  const close = () => setPanel(null);
  // радио «Курьером / Пункт выдачи» до выбора адреса
  const [method, setMethod] = useState<Address["kind"]>("courier");
  const kind = address?.kind ?? method;

  const days = useMemo(() => nextDays(), []);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);
  const daysRow = useRef<HTMLDivElement>(null);
  // стрелки ряда дат: левая — когда уже пролистали вправо, правая — пока есть куда листать
  const [daysEdge, setDaysEdge] = useState({ start: true, end: false });
  const onDaysScroll = () => {
    const el = daysRow.current;
    if (el) setDaysEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };

  // карты — только на время визита (последние 4 цифры), полный номер нигде не храним
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [payment, setPayment] = useState<Payment>();
  const card = payment?.kind === "card" ? cards.find((c) => c.id === payment.cardId) : undefined;

  const [comment, setComment] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<string>();
  const [promoError, setPromoError] = useState<string>();
  const [order, setOrder] = useState<string>();

  // цены доставки — из src/data/delivery.ts (оформление пока только для Москвы и Петербурга)
  const delivery = address ? deliveryTerms[address.kind].price : 0;
  const promoDiscount = promoApplied ? Math.round((cart.total * PROMO[promoApplied]) / 100) : 0;
  const total = Math.max(cart.total - promoDiscount + delivery, 0);
  const ready = Boolean(contact && address && payment);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO[code]) {
      setPromoApplied(code);
      setPromoError(undefined);
      setPromoOpen(false);
    } else {
      setPromoError("Такого промокода нет");
    }
  };

  /** «Выбрать адрес» и карандаш: есть сохранённые — список, нет — сразу форма с картой */
  const chooseAddress = (tab: Address["kind"] = kind) =>
    setPanel(addresses.length ? { kind: "addresses" } : { kind: "address", tab });

  const switchMethod = (k: Address["kind"]) => {
    setMethod(k);
    const last = [...addresses].reverse().find((a) => a.kind === k);
    if (last) addressStore.set((s) => ({ ...s, selected: last.id }));
    else if (address) setPanel({ kind: "address", tab: k });
  };

  const saveAddress = (a: Address) => {
    addressStore.set((s) => ({
      list: s.list.some((x) => x.id === a.id) ? s.list.map((x) => (x.id === a.id ? a : x)) : [...s.list, a],
      selected: a.id,
    }));
    setMethod(a.kind);
    close();
  };

  const submit = () => {
    if (!ready || !contact || !address) return;
    const { number, now } = newOrderNumber();
    // заказ сохраняется в браузере и появляется в личном кабинете («Заказы»)
    const saved: Order = {
      number,
      createdAt: now,
      status: "Создан",
      history: { Создан: now },
      items: cart.items.map((i) => ({ ...i })),
      recipient: `${contact.name}, ${contact.phone}`,
      delivery: {
        kind: address.kind,
        address:
          address.kind === "courier" && addressSubtitle(address)
            ? `${addressTitle(address)}, ${addressSubtitle(address)}`
            : addressTitle(address),
        date: `${days[day]}, ${TIMES[time]}`,
      },
      payment: card ? `Картой ${card.system} ••${card.last4}` : "СБП",
      goods: cart.total,
      discount: promoDiscount,
      deliveryPrice: delivery,
      total,
    };
    ordersStore.set((list) => [saved, ...list]);
    setOrder(number);
    cart.items.forEach((i) => cart.remove(i.key));
    window.scrollTo({ top: 0 });
  };

  // окно «Заказ оформлен»: Esc закрывает
  useEffect(() => {
    if (!order) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOrder(undefined);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [order]);

  if (cart.items.length === 0 && !order) {
    return (
      <div className="flex flex-col items-start gap-6 pt-8 pb-20">
        <p className="text-base-s text-secondary">В корзине пока ничего нет — оформлять нечего.</p>
        <Button href="/catalog" size="M">
          в каталог
        </Button>
      </div>
    );
  }

  return (
    <>
      {order ? (
        // после оформления корзина пуста — вместо формы спокойное «спасибо»
        <div className="flex flex-col items-start gap-6 pt-6 pb-20">
          <p className="text-base-s">Спасибо! Заказ {order} оформлен — мы скоро свяжемся, чтобы его подтвердить.</p>
          <Button href="/catalog" size="M">
            в каталог
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-12 pt-6 pb-20 lg:flex-row lg:items-start lg:justify-between lg:pb-[60px]">
          {/* ---------- блоки ---------- */}
          <div className="flex w-full max-w-[616px] flex-col gap-[50px]">
            <Step title="Контактные данные">
              {contact ? (
                <InfoCard
                  title={contact.name}
                  subtitle={`${contact.phone}, по ${contact.notify}`}
                  onEdit={() => setPanel({ kind: "contact" })}
                  editLabel="Изменить контакты"
                />
              ) : (
                <>
                  <p className="text-base-s">Чтобы оформить заказ, войдите в личный кабинет или зарегистрируйтесь.</p>
                  {/* входа по почте пока нет — «Войти» открывает панель контактов; потом поведёт во вход */}
                  <Button size="M" className={darkButton} onClick={() => setPanel({ kind: "contact" })}>
                    войти
                  </Button>
                </>
              )}
            </Step>

            {contact && (
              <Step title="Адрес доставки">
                {!address && (
                  <p className="text-base-s">
                    Выберите адрес доставки, вы можете выбрать курьера или пункт выдачи заказов.
                  </p>
                )}
                <div className="flex flex-wrap gap-6">
                  <Radio name="method" checked={kind === "courier"} onChange={() => switchMethod("courier")}>
                    Курьером
                  </Radio>
                  <Radio name="method" checked={kind === "pickup"} onChange={() => switchMethod("pickup")}>
                    Пункт выдачи
                  </Radio>
                </div>
                {address ? (
                  <InfoCard
                    leading={address.kind === "pickup" ? <CdekLogo /> : undefined}
                    title={addressTitle(address)}
                    subtitle={addressSubtitle(address)}
                    extra={
                      address.kind === "pickup" && pointOf(address) ? (
                        <button
                          type="button"
                          onClick={() => setPanel({ kind: "address", tab: "pickup", edit: address })}
                          className="text-caps underline underline-offset-2 transition-colors hover:text-accent"
                        >
                          подробнее о пункте
                        </button>
                      ) : undefined
                    }
                    onEdit={() => chooseAddress()}
                    editLabel="Изменить адрес"
                  />
                ) : (
                  <Button size="M" className={darkButton} onClick={() => chooseAddress()}>
                    выбрать адрес
                  </Button>
                )}
              </Step>
            )}

            {address && (
              // свои отступы, как в макете (checkout promo code): заголовок → текст 8, текст → «Дата» 12,
              // подпись → плашки 4, между «Дата» и «Время» 16
              <section className="flex animate-[dropdown-in_300ms_ease-out] flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-h4">
                    {address.kind === "courier" ? "Дата и время доставки" : "Дата и время получения"}
                  </h2>
                  <p className="text-base-s">
                    {address.kind === "courier"
                      ? "Выберите день и время доставки, также мы пришлём вам СМС за день до доставки."
                      : "Выберите день и время, когда удобно забрать заказ. Мы пришлём СМС, когда он приедет в пункт."}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base-xs text-tertiary">Дата</p>
                    {/* ряд дат прокручивается; стрелки по краям листают на 240 px */}
                    <div className="relative">
                      <div
                        ref={daysRow}
                        onScroll={onDaysScroll}
                        className="no-scrollbar flex gap-2 overflow-x-auto pr-10"
                      >
                        {days.map((d, i) => (
                          <ChoiceChip key={d} selected={day === i} onClick={() => setDay(i)}>
                            {d}
                          </ChoiceChip>
                        ))}
                      </div>
                      {!daysEdge.start && (
                        <button
                          type="button"
                          onClick={() => daysRow.current?.scrollBy({ left: -240, behavior: "smooth" })}
                          aria-label="Предыдущие даты"
                          className="absolute top-1.5 flex size-6 items-center justify-center rounded-sm border border-line bg-white shadow-[1px_1px_2.5px_rgb(0_0_0/0.25)] transition-colors hover:border-primary left-0 animate-[fade-in_200ms_ease-out]"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                      )}
                      {!daysEdge.end && (
                        <button
                          type="button"
                          onClick={() => daysRow.current?.scrollBy({ left: 240, behavior: "smooth" })}
                          aria-label="Следующие даты"
                          className="absolute top-1.5 flex size-6 items-center justify-center rounded-sm border border-line bg-white shadow-[1px_1px_2.5px_rgb(0_0_0/0.25)] transition-colors hover:border-primary right-0"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-base-xs text-tertiary">Время</p>
                    <div className="flex flex-wrap gap-2">
                      {TIMES.map((t, i) => (
                        <ChoiceChip key={t} selected={time === i} onClick={() => setTime(i)}>
                          {t}
                        </ChoiceChip>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {address && (
              <Step title="Способ оплаты">
                {payment ? (
                  <InfoCard
                    leading={<CardBadge system={card ? card.system : "СБП"} />}
                    title={card ? `Банковская карта ${card.system}` : "СБП"}
                    subtitle={card ? card.last4 : "Оплата через приложение вашего банка"}
                    onEdit={() => setPanel({ kind: "payment" })}
                    editLabel="Изменить способ оплаты"
                  />
                ) : (
                  <>
                    <p className="text-base-s">
                      Выберите способ оплаты, возможна оплата онлайн банковской картой или СБП.
                    </p>
                    <Button size="M" className={darkButton} onClick={() => setPanel({ kind: "payment" })}>
                      выбрать
                    </Button>
                  </>
                )}
              </Step>
            )}

            {payment && (
              <Step title="Дополнительно">
                <TextField
                  label="Комментарий к заказу"
                  value={comment}
                  onChange={setComment}
                  onClear={() => setComment("")}
                />
                <p className="text-base-s">
                  Нажимая «Оплатить», вы соглашаетесь с{" "}
                  <Link href="#" className="text-accent hover:underline">
                    Офертой
                  </Link>
                  .
                </p>
              </Step>
            )}
          </div>

          {/* ---------- ваш заказ (липнет при прокрутке) ---------- */}
          <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-[78px] lg:w-[408px]">
            <div className="flex items-center justify-between">
              <h2 className="text-h4">Ваш заказ</h2>
              {!promoOpen && !promoApplied && (
                <button
                  type="button"
                  onClick={() => setPromoOpen(true)}
                  className="text-caps underline underline-offset-2 transition-colors hover:text-accent"
                >
                  ввести промокод
                </button>
              )}
            </div>

            <ul className="flex flex-col gap-4 text-base-s">
              <li className="flex justify-between gap-4">
                <button type="button" onClick={() => cart.setOpen(true)} className="text-left hover:text-accent">
                  {itemsWord(cart.count)}
                </button>
                <span>{rub(cart.total)}</span>
              </li>
              {address && (
                <li className="flex justify-between gap-4">
                  <span>Доставка</span>
                  <span>{delivery ? `+ ${rub(delivery)}` : "бесплатно"}</span>
                </li>
              )}
              {promoApplied && (
                <li className="flex justify-between gap-4">
                  <span>Скидка по промокоду – {PROMO[promoApplied]}%</span>
                  <span className="flex items-center gap-1">
                    – {rub(promoDiscount)}
                    <button
                      type="button"
                      onClick={() => setPromoApplied(undefined)}
                      aria-label="Убрать промокод"
                      className="-mr-1 flex size-6 items-center justify-center transition-colors hover:text-accent"
                    >
                      <CloseIcon className="size-4" />
                    </button>
                  </span>
                </li>
              )}
            </ul>

            {promoOpen && !promoApplied && (
              <TextField
                label="Промокод"
                value={promo}
                onChange={(v) => {
                  setPromo(v);
                  setPromoError(undefined);
                }}
                error={promoError}
                trailing={
                  promo && (
                    <button
                      type="button"
                      onClick={applyPromo}
                      aria-label="Применить промокод"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent"
                    >
                      <ArrowRight className="size-4" />
                    </button>
                  )
                }
              />
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="text-base-s">Итоговая сумма</span>
              <span className="text-h2 max-md:text-[20px]">{rub(total)}</span>
            </div>

            <button
              type="button"
              onClick={submit}
              disabled={!ready}
              className="h-[52px] rounded-xs bg-primary text-caps text-white transition-colors hover:bg-primary/85 disabled:bg-tertiary disabled:text-line-light"
            >
              оплатить
            </button>
            {!ready && (
              <p className="text-base-xs text-secondary">
                {!contact
                  ? "Войдите или добавьте контакты"
                  : !address
                    ? "Выберите адрес доставки"
                    : "Выберите способ оплаты"}
                , чтобы оформить заказ.
              </p>
            )}
          </aside>
        </div>
      )}

      {/* ---------- боковые панели ---------- */}
      {panel?.kind === "contact" && (
        <ContactDrawer
          initial={contact}
          onClose={close}
          onSave={(c) => {
            contactStore.set(c);
            close();
          }}
        />
      )}
      {panel?.kind === "address" && (
        <AddressDrawer
          key={`${panel.tab}-${panel.edit?.id ?? "new"}`}
          initial={panel.edit}
          tab={panel.tab}
          onClose={close}
          onBack={addresses.length ? () => setPanel({ kind: "addresses" }) : undefined}
          onSave={saveAddress}
          onDelete={
            panel.edit
              ? () => {
                  const id = panel.edit!.id;
                  addressStore.set((s) => ({
                    list: s.list.filter((x) => x.id !== id),
                    selected: s.selected === id ? undefined : s.selected,
                  }));
                  setPanel(addresses.length > 1 ? { kind: "addresses" } : null);
                }
              : undefined
          }
        />
      )}
      {panel?.kind === "addresses" && (
        <SavedAddressesDrawer
          addresses={addresses}
          selectedId={selected}
          onClose={close}
          onConfirm={(id) => {
            addressStore.set((s) => ({ ...s, selected: id }));
            close();
          }}
          onEdit={(a) => setPanel({ kind: "address", tab: a.kind, edit: a })}
          onAdd={() => setPanel({ kind: "address", tab: kind })}
        />
      )}
      {panel?.kind === "payment" && (
        <PaymentDrawer
          cards={cards}
          initial={payment}
          onClose={close}
          onAddCard={() => setPanel({ kind: "card" })}
          onConfirm={(p) => {
            setPayment(p);
            close();
          }}
        />
      )}
      {panel?.kind === "card" && (
        <AddCardDrawer
          onClose={close}
          onBack={() => setPanel({ kind: "payment" })}
          onSave={(c) => {
            setCards((list) => [...list, c]);
            setPayment({ kind: "card", cardId: c.id });
            setPanel({ kind: "payment" });
          }}
        />
      )}

      {/* ---------- окно «Заказ оформлен» (Figma: order paid) ---------- */}
      {order && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть"
            tabIndex={-1}
            onClick={() => setOrder(undefined)}
            className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-done-title"
            className="relative flex w-full max-w-[616px] animate-[dropdown-in_250ms_ease-out] flex-col gap-2 rounded-xs bg-white p-8 shadow-[0_5px_15px_6px_rgb(41_41_41/0.05)]"
          >
            <button
              type="button"
              onClick={() => setOrder(undefined)}
              aria-label="Закрыть"
              className="absolute top-5 right-5 flex size-10 items-center justify-center transition-colors hover:text-accent"
            >
              <CloseIcon />
            </button>
            <h2 id="order-done-title" className="pr-10 text-h3">
              Заказ оформлен
            </h2>
            <p className="text-base-s">
              Номер заказа {order}. Мы позвоним или напишем, чтобы подтвердить его, и будем информировать о статусе
              {contact ? ` через ${contact.notify}` : ""}. Онлайн-оплата пока в тестовом режиме — деньги не списаны.
            </p>
            <Image src="/img/order-done-kitty.webp" alt="" width={400} height={300} className="mx-auto my-4" />
            <Button href="/catalog" size="M" className="self-end bg-primary text-white hover:bg-primary/85">
              вернуться в каталог
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
