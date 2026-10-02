"use client";

// Боковые панели оформления (Figma, справа от checkout 2): add contact, courier address, pick up point,
// saved addresses, payment method, add bank card. Каждая панель монтируется заново при открытии,
// поэтому поля начинаются с текущих данных и «Отменить» ничего не портит.
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CITIES, CITY_CENTER, distanceKm, pickupPoints, type PickupPoint } from "@/data/pickup-points";
import { geocode, reverseGeocode } from "@/lib/geocode";
import { Drawer, DrawerButton } from "./Drawer";
import { MapView, type MapMarker } from "./MapView";
import { CdekLogo, Radio, RadioCard, SelectField, SmallTabs, TextField } from "./ui";

/* ---------- данные ---------- */

export const NOTIFY = ["СМС", "Telegram", "WhatsApp"] as const;
export type Contact = { name: string; phone: string; notify: (typeof NOTIFY)[number] };

export type CourierAddress = {
  id: string;
  kind: "courier";
  city: string;
  street: string;
  flat: string;
  entrance: string;
  comment: string;
  lat?: number;
  lng?: number;
};
export type PickupAddress = { id: string; kind: "pickup"; pointId: string };
export type Address = CourierAddress | PickupAddress;

/** Сохранённая карта — только платёжная система и последние 4 цифры. Полный номер нигде не храним */
export type SavedCard = { id: string; system: string; last4: string };
export type Payment = { kind: "card"; cardId: string } | { kind: "sbp" };

export const pointOf = (a: PickupAddress) => pickupPoints.find((p) => p.id === a.pointId);

export function addressTitle(a: Address) {
  if (a.kind === "courier") return `${a.city}, ${a.street}`;
  const p = pointOf(a);
  return p ? `${p.city}, ${p.address}` : "Пункт выдачи";
}

export function addressSubtitle(a: Address) {
  if (a.kind === "pickup") return pointOf(a)?.hours;
  return [a.flat && `кв. ${a.flat}`, a.entrance, a.comment].filter(Boolean).join(", ") || undefined;
}

const uid = () => Math.random().toString(36).slice(2, 10);

/** +7 (995) 100 03 03 — маска по мере ввода */
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d && !d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  if (!d) return "";
  let out = "+7";
  if (p[0]) out += ` (${p[0]}`;
  if (p[0].length === 3) out += ")";
  if (p[1]) out += ` ${p[1]}`;
  if (p[2]) out += ` ${p[2]}`;
  if (p[3]) out += ` ${p[3]}`;
  return out;
}

/* ---------- контактные данные (Figma add contact, 5433:37997) ---------- */

export function ContactDrawer({
  initial,
  onClose,
  onSave,
}: {
  initial: Contact | null;
  onClose: () => void;
  onSave: (c: Contact) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [notify, setNotify] = useState<Contact["notify"]>(initial?.notify ?? "СМС");
  const valid = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 11;

  return (
    <Drawer
      open
      onClose={onClose}
      title="Контактные данные"
      footer={
        <>
          <DrawerButton outline onClick={onClose}>
            отменить
          </DrawerButton>
          <DrawerButton disabled={!valid} onClick={() => onSave({ name: name.trim(), phone, notify })}>
            сохранить
          </DrawerButton>
        </>
      }
    >
      <div className="grid gap-1.5 sm:grid-cols-2">
        <TextField label="Имя" value={name} onChange={setName} autoComplete="name" onClear={() => setName("")} />
        <TextField
          label="Телефон"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(v) => setPhone(formatPhone(v))}
          autoComplete="tel"
          onClear={() => setPhone("")}
        />
      </div>
      <p className="mt-4 text-base-xs text-secondary">Информировать через:</p>
      <div className="mt-2 flex flex-wrap gap-6">
        {NOTIFY.map((n) => (
          <Radio key={n} name="notify" checked={notify === n} onChange={() => setNotify(n)}>
            {n}
          </Radio>
        ))}
      </div>
    </Drawer>
  );
}

/* ---------- адрес доставки: курьер и пункт выдачи (Figma courier address / pick up point) ---------- */

export function AddressDrawer({
  initial,
  tab: initialTab,
  onClose,
  onBack,
  onSave,
  onDelete,
}: {
  initial?: Address;
  tab: Address["kind"];
  onClose: () => void;
  onBack?: () => void;
  onSave: (a: Address) => void;
  onDelete?: () => void;
}) {
  const courier = initial?.kind === "courier" ? initial : undefined;
  const pickup = initial?.kind === "pickup" ? initial : undefined;
  const [tab, setTab] = useState<Address["kind"]>(initialTab);
  const [city, setCity] = useState(courier?.city ?? (pickup && pointOf(pickup)?.city) ?? CITIES[0]);
  const [street, setStreet] = useState(courier?.street ?? "");
  const [flat, setFlat] = useState(courier?.flat ?? "");
  const [entrance, setEntrance] = useState(courier?.entrance ?? "");
  const [comment, setComment] = useState(courier?.comment ?? "");
  const [coords, setCoords] = useState<[number, number] | undefined>(
    courier?.lat && courier.lng ? [courier.lat, courier.lng] : undefined,
  );
  const [pointId, setPointId] = useState(pickup?.pointId);

  // нашли адрес на карте сами — после паузы в наборе (геокодер просит не дёргать его на каждую букву)
  const [typed, setTyped] = useState(false);
  useEffect(() => {
    if (!typed || street.trim().length < 3) return;
    const t = window.setTimeout(async () => {
      const found = await geocode(city, street);
      if (found) setCoords(found);
    }, 900);
    return () => window.clearTimeout(t);
  }, [typed, city, street]);

  const cityPoints = useMemo(() => {
    const list = pickupPoints.filter((p) => p.city === city);
    return coords
      ? [...list].sort((a, b) => distanceKm(coords, [a.lat, a.lng]) - distanceKm(coords, [b.lat, b.lng]))
      : list;
  }, [city, coords]);
  const point = pickupPoints.find((p) => p.id === pointId);

  const center: [number, number] =
    tab === "pickup" && point ? [point.lat, point.lng] : (coords ?? CITY_CENTER[city] ?? CITY_CENTER[CITIES[0]]);
  const markers: MapMarker[] =
    tab === "pickup"
      ? cityPoints.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng, label: p.address }))
      : coords
        ? [{ id: "home", lat: coords[0], lng: coords[1], label: street || "Адрес доставки" }]
        : [];

  // клик по карте: курьер — ставим булавку и подставляем адрес
  const pickOnMap = async (lat: number, lng: number) => {
    if (tab !== "courier") return;
    setCoords([lat, lng]);
    setTyped(false);
    const found = await reverseGeocode(lat, lng);
    if (found) setStreet(found);
  };

  const canSave = tab === "courier" ? street.trim().length >= 3 : Boolean(pointId);
  const save = () => {
    if (tab === "courier") {
      onSave({
        id: courier?.id ?? uid(),
        kind: "courier",
        city,
        street: street.trim(),
        flat: flat.trim(),
        entrance: entrance.trim(),
        comment: comment.trim(),
        ...(coords ? { lat: coords[0], lng: coords[1] } : {}),
      });
    } else if (pointId) {
      onSave({ id: pickup?.id ?? uid(), kind: "pickup", pointId });
    }
  };

  return (
    <Drawer
      open
      onClose={onClose}
      onBack={onBack}
      title="Адрес доставки"
      left={
        <MapView
          center={center}
          zoom={tab === "pickup" && !point && !coords ? 13 : 16}
          markers={markers}
          activeId={tab === "pickup" ? pointId : "home"}
          onSelect={(id) => tab === "pickup" && setPointId(id)}
          onMapClick={pickOnMap}
        />
      }
      footer={
        tab === "courier" ? (
          <>
            <DrawerButton outline onClick={onBack ?? onClose}>
              отменить
            </DrawerButton>
            <DrawerButton disabled={!canSave} onClick={save}>
              сохранить
            </DrawerButton>
          </>
        ) : (
          <DrawerButton disabled={!canSave} onClick={save}>
            подтвердить
          </DrawerButton>
        )
      }
    >
      <SmallTabs
        tabs={[
          { id: "courier", title: "Курьером" },
          { id: "pickup", title: "В пункт выдачи" },
        ]}
        value={tab}
        onChange={setTab}
      />

      <div className="mt-[20px] grid gap-1.5 sm:grid-cols-2">
        <SelectField
          label="Город"
          value={city}
          options={CITIES}
          onChange={(c) => {
            setCity(c);
            setCoords(undefined);
            setPointId(undefined);
          }}
        />
        <TextField
          label="Адрес"
          value={street}
          onChange={(v) => {
            setStreet(v);
            setTyped(true);
          }}
          autoComplete="street-address"
          onClear={() => {
            setStreet("");
            setCoords(undefined);
          }}
          hint={tab === "pickup" ? "Покажем пункты выдачи рядом" : undefined}
        />
      </div>

      {tab === "courier" ? (
        <>
          <div className="mt-5 grid gap-1.5 sm:grid-cols-2">
            <TextField label="Квартира" value={flat} onChange={setFlat} onClear={() => setFlat("")} />
            <TextField label="Подъезд и этаж" value={entrance} onChange={setEntrance} onClear={() => setEntrance("")} />
          </div>
          <TextField
            label="Комментарий курьеру"
            value={comment}
            onChange={setComment}
            onClear={() => setComment("")}
            className="mt-5"
          />
          <p className="mt-3 text-base-xs text-tertiary">Можно просто нажать на нужный дом на карте.</p>
        </>
      ) : (
        <PickupList points={cityPoints} value={pointId} onChange={setPointId} />
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="mt-6 self-start text-caps text-secondary underline underline-offset-2 transition-colors hover:text-error"
        >
          удалить адрес
        </button>
      )}
    </Drawer>
  );
}

function PickupList({
  points,
  value,
  onChange,
}: {
  points: PickupPoint[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <p className="text-caps text-secondary">Ближайшие пункты выдачи</p>
      {!value && (
        // notification из UI KIT: розовая плашка surface/accent 2
        <p className="rounded-xs bg-accent-soft px-3 py-3 text-base-s">Пожалуйста, выберите пункт выдачи.</p>
      )}
      <ul className="flex flex-col gap-3">
        {points.map((p) => (
          <li key={p.id}>
            <RadioCard
              name="pickup-point"
              checked={value === p.id}
              onChange={() => onChange(p.id)}
              leading={<CdekLogo />}
              title={`${p.city}, ${p.address}`}
              subtitle={p.hours}
            />
          </li>
        ))}
      </ul>
      <p className="text-base-xs text-tertiary">Пункты выдачи СДЭК. Список пока демонстрационный.</p>
    </div>
  );
}

/* ---------- ваши адреса (Figma saved addresses, 5548:11270) ---------- */

export function SavedAddressesDrawer({
  addresses,
  selectedId,
  onClose,
  onConfirm,
  onEdit,
  onAdd,
}: {
  addresses: Address[];
  selectedId?: string;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onEdit: (a: Address) => void;
  onAdd: () => void;
}) {
  const [value, setValue] = useState(selectedId ?? addresses[0]?.id);
  return (
    <Drawer
      open
      onClose={onClose}
      title="Адрес доставки"
      footer={
        <DrawerButton disabled={!value} onClick={() => value && onConfirm(value)}>
          подтвердить
        </DrawerButton>
      }
    >
      <p className="text-caps text-secondary">Ваши адреса</p>
      <ul className="mt-4 flex flex-col gap-2">
        {addresses.map((a) => (
          <li key={a.id}>
            <RadioCard
              name="saved-address"
              checked={value === a.id}
              onChange={() => setValue(a.id)}
              leading={a.kind === "pickup" ? <CdekLogo /> : undefined}
              title={addressTitle(a)}
              subtitle={addressSubtitle(a)}
              onEdit={() => onEdit(a)}
              editLabel="Изменить адрес"
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 h-[52px] rounded-xs border border-primary text-caps transition-colors hover:bg-primary hover:text-white"
      >
        добавить новый адрес
      </button>
    </Drawer>
  );
}

/* ---------- способ оплаты (Figma payment method, 5545:53487) ---------- */

export function CardBadge({ system }: { system: string }) {
  return (
    <span className="flex h-[30px] min-w-[30px] shrink-0 items-center justify-center rounded-full bg-accent-soft px-2 text-[9px] leading-none font-bold text-primary uppercase">
      {system}
    </span>
  );
}

export function PaymentDrawer({
  cards,
  initial,
  onClose,
  onAddCard,
  onConfirm,
}: {
  cards: SavedCard[];
  initial?: Payment;
  onClose: () => void;
  onAddCard: () => void;
  onConfirm: (p: Payment) => void;
}) {
  const [value, setValue] = useState<string | undefined>(
    initial?.kind === "card" ? initial.cardId : initial?.kind === "sbp" ? "sbp" : cards[0]?.id,
  );
  return (
    <Drawer
      open
      onClose={onClose}
      title="Способ оплаты"
      footer={
        <DrawerButton
          disabled={!value}
          onClick={() => value && onConfirm(value === "sbp" ? { kind: "sbp" } : { kind: "card", cardId: value })}
        >
          подтвердить
        </DrawerButton>
      }
    >
      <ul className="flex flex-col gap-2">
        {cards.map((c) => (
          <li key={c.id}>
            <RadioCard
              name="payment"
              checked={value === c.id}
              onChange={() => setValue(c.id)}
              leading={<CardBadge system={c.system} />}
              title={`Банковская карта ${c.system}`}
              subtitle={c.last4}
            />
          </li>
        ))}
        <li>
          <RadioCard
            name="payment"
            checked={value === "sbp"}
            onChange={() => setValue("sbp")}
            leading={<CardBadge system="СБП" />}
            title="СБП"
            subtitle="Оплата через приложение вашего банка"
          />
        </li>
      </ul>
      <button
        type="button"
        onClick={onAddCard}
        className="mt-2 h-[52px] rounded-xs border border-primary text-caps transition-colors hover:bg-primary hover:text-white"
      >
        добавить новую карту
      </button>
    </Drawer>
  );
}

/* ---------- добавить новую карту (Figma add bank card, 5520:51677) ---------- */

const systemOf = (digits: string) =>
  digits.startsWith("2") ? "Мир" : digits.startsWith("4") ? "Visa" : digits.startsWith("5") ? "Mastercard" : "Карта";

/** ДЕМО-ФОРМА: номер карты не отправляется и не сохраняется — остаются только система и последние 4 цифры.
 *  Настоящий ввод карты будет в форме платёжного сервиса (ЮKassa, CloudPayments и т. п.) */
export function AddCardDrawer({
  onClose,
  onBack,
  onSave,
}: {
  onClose: () => void;
  onBack: () => void;
  onSave: (c: SavedCard) => void;
}) {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvc, setCvc] = useState("");
  const digits = number.replace(/\D/g, "");
  const valid = digits.length >= 16 && Number(mm) >= 1 && Number(mm) <= 12 && yy.length === 2 && cvc.length === 3;

  const cell =
    "h-[52px] min-w-0 border border-line bg-white px-3 text-base-s outline-none caret-accent placeholder:text-tertiary focus:z-10 focus:border-primary";

  return (
    <Drawer
      open
      onClose={onClose}
      onBack={onBack}
      title="Добавить новую карту"
      footer={
        <>
          <DrawerButton outline onClick={onBack}>
            отменить
          </DrawerButton>
          <DrawerButton
            disabled={!valid}
            onClick={() => onSave({ id: uid(), system: systemOf(digits), last4: digits.slice(-4) })}
          >
            сохранить
          </DrawerButton>
        </>
      }
    >
      {/* розовая карта 504 × 284 с логотипами платёжных систем (фон из макета) */}
      <div className="relative w-full max-w-[504px] overflow-hidden rounded-xs">
        <Image src="/img/bank-card-bg.webp" alt="" fill sizes="504px" className="object-cover" />
        <div className="relative flex flex-col gap-2 px-5 pt-[64px] pb-8 sm:px-[21px]">
          <span className="sr-only">Visa, Мир, Mastercard</span>
          <input
            value={number}
            onChange={(e) =>
              setNumber(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 19)
                  .replace(/(\d{4})(?=\d)/g, "$1 "),
              )
            }
            inputMode="numeric"
            autoComplete="off"
            placeholder="Номер карты"
            aria-label="Номер карты"
            className={`${cell} rounded-xs`}
          />
          <p className="mt-4 text-base-s">Срок</p>
          <div className="flex">
            <input
              value={mm}
              onChange={(e) => setMm(e.target.value.replace(/\D/g, "").slice(0, 2))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="ММ"
              aria-label="Месяц"
              className={`${cell} w-[68px] rounded-l-xs`}
            />
            <input
              value={yy}
              onChange={(e) => setYy(e.target.value.replace(/\D/g, "").slice(0, 2))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="ГГ"
              aria-label="Год"
              className={`${cell} -ml-px w-[200px]`}
            />
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
              inputMode="numeric"
              autoComplete="off"
              type="password"
              placeholder="CVC код"
              aria-label="CVC код"
              className={`${cell} -ml-px flex-1 rounded-r-xs`}
            />
          </div>
        </div>
      </div>
      <p className="mt-4 max-w-[504px] text-base-xs text-tertiary">
        Онлайн-оплата пока в тестовом режиме: данные карты никуда не отправляются и не сохраняются, деньги не
        списываются.
      </p>
    </Drawer>
  );
}
