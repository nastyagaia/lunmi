"use client";

// «Мои данные» (Figma: profile, edit profile): основное, адреса доставки, рассылка, удаление аккаунта.
// Телефон — из контактов оформления заказа. Пароля и привязки карт пока нет: появятся вместе со входом по почте.
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { addressStore, contactStore, forgetEverything, profileStore, type Profile } from "@/lib/account";
import { AddressDrawer, addressSubtitle, addressTitle, type Address } from "./CheckoutDrawers";
import { CloseIcon, PlusIcon } from "./icons";
import { Checkbox, Radio, TextField } from "./ui";

/** «12031995» → «12.03.1995» */
function maskDate(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  return [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean).join(".");
}

function Heading({ children }: { children: string }) {
  return <h2 className="text-h4">{children}</h2>;
}

/** Строка адреса с меню «…»: изменить или удалить */
function AddressRow({ address, onEdit }: { address: Address; onEdit: () => void }) {
  const [open, setOpen] = useState(false);
  const sub = address.kind === "courier" ? addressSubtitle(address) : undefined;
  return (
    <li className="relative flex items-center justify-between gap-4 py-3">
      <p className="text-base-s">
        {address.kind === "pickup" && <span className="text-secondary">Пункт выдачи СДЭК: </span>}
        {addressTitle(address)}
        {sub && `, ${sub}`}
      </p>
      <button
        type="button"
        aria-label="Действия с адресом"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-8 shrink-0 items-center justify-center text-tertiary transition-colors hover:text-primary"
      >
        <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden>
          <circle cx="2" cy="2" r="1.5" />
          <circle cx="8" cy="2" r="1.5" />
          <circle cx="14" cy="2" r="1.5" />
        </svg>
      </button>
      {open && (
        <ul className="absolute top-full right-0 z-10 flex w-[200px] flex-col bg-white py-2 shadow-[0_5px_15px_6px_rgb(41_41_41/0.05)]">
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="h-10 w-full px-4 text-left text-base-s hover:bg-surface"
            >
              Изменить
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => addressStore.set((s) => ({ ...s, list: s.list.filter((a) => a.id !== address.id) }))}
              className="h-10 w-full px-4 text-left text-base-s hover:bg-surface"
            >
              Удалить
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}

const noop = () => () => {};

/** Форма заполняется данными из браузера — поэтому показываем её только после загрузки страницы */
export function AccountProfile() {
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  return ready ? <ProfileForm /> : null;
}

function ProfileForm() {
  const router = useRouter();
  const saved = profileStore.useValue();
  const contact = contactStore.useValue();
  const { list: addresses } = addressStore.useValue();

  const [form, setForm] = useState<Profile>(saved);
  const [phone, setPhone] = useState(contact?.phone ?? "");
  const [panel, setPanel] = useState<{ edit?: Address } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setDone(false);
  };
  const dirty =
    JSON.stringify({ ...form, news: saved.news }) !== JSON.stringify(saved) || phone !== (contact?.phone ?? "");
  const emailOk = !form.email || /^\S+@\S+\.\S+$/.test(form.email);

  const save = () => {
    profileStore.set((p) => ({ ...form, news: p.news }));
    if (phone !== (contact?.phone ?? ""))
      contactStore.set((c) => ({
        name: c?.name || `${form.firstName} ${form.lastName}`.trim(),
        notify: c?.notify ?? "СМС",
        phone,
      }));
    setDone(true);
  };

  const saveAddress = (a: Address) => {
    addressStore.set((s) => ({
      ...s,
      list: s.list.some((x) => x.id === a.id) ? s.list.map((x) => (x.id === a.id ? a : x)) : [...s.list, a],
    }));
    setPanel(null);
  };

  return (
    // в макете форма стоит с 5-й колонки и занимает 7 колонок (720 px)
    <div className="flex max-w-[720px] flex-col gap-[60px] lg:ml-[104px]">
      <section className="flex flex-col gap-6">
        <h1 className="text-h2">Мои данные</h1>
        <Heading>Основное</Heading>
        <div className="grid gap-2 sm:grid-cols-2">
          <TextField
            label="Имя"
            value={form.firstName}
            onChange={(v) => set("firstName", v)}
            onClear={() => set("firstName", "")}
            autoComplete="given-name"
          />
          <TextField
            label="Фамилия"
            value={form.lastName}
            onChange={(v) => set("lastName", v)}
            onClear={() => set("lastName", "")}
            autoComplete="family-name"
          />
        </div>
        <div className="flex gap-6">
          {(["Женщина", "Мужчина"] as const).map((g) => (
            <Radio key={g} name="gender" checked={form.gender === g} onChange={() => set("gender", g)}>
              {g}
            </Radio>
          ))}
        </div>
        <div className="grid gap-x-2 gap-y-5 sm:grid-cols-2">
          <TextField
            label="Дата рождения"
            value={form.birthday}
            onChange={(v) => set("birthday", maskDate(v))}
            inputMode="numeric"
            autoComplete="bday"
            hint="дд.мм.гггг"
          />
          <TextField
            label="Телефон*"
            value={phone}
            onChange={(v) => {
              setPhone(v);
              setDone(false);
            }}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(v) => set("email", v.trim())}
            type="email"
            autoComplete="email"
            error={emailOk ? undefined : "Проверьте адрес почты"}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={!dirty || !emailOk}
            onClick={save}
            className="h-10 bg-primary px-6 text-caps text-white transition-colors hover:bg-primary/85 disabled:bg-tertiary"
          >
            сохранить изменения
          </button>
          {done && !dirty && <p className="text-base-s text-success">Сохранено</p>}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading>Адреса доставки</Heading>
        {addresses.length > 0 && (
          <ul className="flex flex-col">
            {addresses.map((a) => (
              <AddressRow key={a.id} address={a} onEdit={() => setPanel({ edit: a })} />
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setPanel({})}
          className="flex items-center gap-2 self-start text-base-s transition-colors hover:text-accent"
        >
          <PlusIcon className="size-6 text-accent" />
          Добавить адрес
        </button>
      </section>

      <Checkbox checked={saved.news} onChange={() => profileStore.set((p) => ({ ...p, news: !p.news }))}>
        <span className="text-base-s">Хочу получать новости и специальные предложения.</span>
      </Checkbox>

      <button
        type="button"
        onClick={() => setConfirmDelete(true)}
        className="flex items-center gap-2 self-start text-base-s transition-colors hover:text-error"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
        </svg>
        Удалить аккаунт
      </button>

      {panel && (
        <AddressDrawer
          initial={panel.edit}
          tab={panel.edit?.kind ?? "courier"}
          onClose={() => setPanel(null)}
          onSave={saveAddress}
          onDelete={
            panel.edit
              ? () => {
                  const id = panel.edit?.id;
                  addressStore.set((s) => ({ ...s, list: s.list.filter((a) => a.id !== id) }));
                  setPanel(null);
                }
              : undefined
          }
        />
      )}

      {/* окно «Удалить аккаунт?» (Figma: delete profile) */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Закрыть"
            tabIndex={-1}
            onClick={() => setConfirmDelete(false)}
            className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="relative flex w-full max-w-[616px] animate-[dropdown-in_250ms_ease-out] flex-col gap-6 rounded-xs bg-white p-8"
          >
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              aria-label="Закрыть"
              className="absolute top-5 right-5 flex size-10 items-center justify-center transition-colors hover:text-accent"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col gap-2 pr-10">
              <h2 id="delete-title" className="text-h3">
                Удалить аккаунт?
              </h2>
              <p className="text-base-s">
                Мы удалим ваши данные, адреса, историю заказов и отзывы. Отменить это будет нельзя.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="h-10 bg-primary px-6 text-caps text-white transition-colors hover:bg-primary/85"
              >
                оставить
              </button>
              <button
                type="button"
                onClick={() => {
                  forgetEverything();
                  router.push("/");
                }}
                className="h-10 border border-primary px-6 text-caps transition-colors hover:bg-surface"
              >
                удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
