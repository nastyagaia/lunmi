"use client";

// Вход в личный кабинет (Figma: «Вход по почте уже зарегистрированного пользователя», «Вход по почте новичка»,
// «если пользователь новый», «Frame 21292»). Панель справа: почта → пароль (знакомая почта) или
// «Зарегистрироваться» с «Придумайте пароль» (новая) → окно «Давай знакомиться» → окно «Привет!».
// ВНИМАНИЕ: вход фейковый — подходит любой пароль, писем не отправляем (поэтому без окон «мы отправили ссылку»
// и без «Сбросить пароль»). Данные кабинета хранятся только в этом браузере.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { authStore, contactStore, isKnownEmail, logIn, profileStore, type Profile } from "@/lib/account";
import { loyalty } from "@/data/loyalty";
import { CloseIcon } from "./icons";
import { Button, Checkbox, Radio, TextField } from "./ui";

/* ---------- открыть окно входа можно из любого места: openLogin() ---------- */
let loginOpen = false;
const listeners = new Set<() => void>();
const setLoginOpen = (v: boolean) => {
  loginOpen = v;
  listeners.forEach((l) => l());
};
export const openLogin = () => setLoginOpen(true);
const useLoginOpen = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => loginOpen,
    () => false,
  );

/** Кто вошёл (почта) или null. До загрузки страницы — null */
export const useAuthEmail = () => authStore.useValue().email;

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M4 20 20 4" />}
    </svg>
  );
}

/** Окно по центру (Figma: «если пользователь новый», «Frame 21292»): 616 px, поля 24, крестик справа */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Закрыть"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-full w-full max-w-[616px] animate-[dropdown-in_250ms_ease-out] flex-col gap-6 overflow-y-auto rounded-xs bg-white p-8 shadow-[0_5px_15px_6px_rgb(41_41_41/0.05)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-8 right-8 flex size-10 items-center justify-center transition-colors hover:text-accent"
        >
          <CloseIcon />
        </button>
        <h2 className="pr-12 text-h2 max-md:text-[20px] max-md:leading-[26px]">{title}</h2>
        {children}
      </div>
    </div>
  );
}

const darkButton = "bg-primary text-white hover:bg-primary/85";

/** Шаг после регистрации: имя, телефон, пол, рассылка → профиль и контакты кабинета */
function AboutYou({ onDone, onClose }: { onDone: () => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<Profile["gender"]>();
  const [news, setNews] = useState(true);
  const valid = name.trim().length >= 2;

  const save = () => {
    const [firstName, ...rest] = name.trim().split(/\s+/);
    profileStore.set((p) => ({ ...p, firstName, lastName: rest.join(" "), gender, news }));
    if (phone.trim()) contactStore.set((c) => ({ notify: c?.notify ?? "СМС", name: name.trim(), phone: phone.trim() }));
    onDone();
  };

  return (
    <Modal title="Давай знакомиться" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <TextField label="Твоё имя" value={name} onChange={setName} autoComplete="name" />
        <TextField label="Телефон" value={phone} onChange={setPhone} type="tel" inputMode="tel" autoComplete="tel" />
        <div className="flex gap-6">
          {(["Женщина", "Мужчина"] as const).map((g) => (
            <Radio key={g} name="about-gender" checked={gender === g} onChange={() => setGender(g)}>
              {g}
            </Radio>
          ))}
        </div>
        <Checkbox checked={news} onChange={() => setNews((v) => !v)}>
          <span className="text-base-s">Хочу получать новости и специальные предложения.</span>
        </Checkbox>
      </div>
      <Button size="M" disabled={!valid} onClick={save} className={`self-end ${darkButton} disabled:border-tertiary disabled:bg-tertiary`}>
        создать аккаунт
      </Button>
    </Modal>
  );
}

function Hello({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Привет!" onClose={onClose}>
      <p className="-mt-4 text-base-s">
        Рады тебя видеть! Тебя ждёт приветственная скидка {loyalty.discount}%. Приятных покупок!
      </p>
      <Image
        src="/img/account/welcome-kitty-59b41a.webp"
        alt=""
        width={400}
        height={300}
        className="mx-auto h-auto w-full max-w-[400px]"
      />
      <Button href="/catalog" size="M" onClick={onClose} className={`self-end ${darkButton}`}>
        за покупками
      </Button>
    </Modal>
  );
}

/** Панель входа + окна после регистрации. Стоит один раз на весь сайт (в layout) */
export function LoginLayer() {
  const open = useLoginOpen();
  const [step, setStep] = useState<"email" | "password" | "register">("email");
  const [after, setAfter] = useState<"about" | "hello" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const close = () => {
    setLoginOpen(false);
    setStep("email");
    setPassword("");
    setShow(false);
  };

  // Esc закрывает, страница под панелью не прокручивается
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  });

  const emailOk = EMAIL_RE.test(email.trim());
  const passwordOk = step === "register" ? password.length >= 8 : password.length > 0;

  const submit = () => {
    if (step === "email") {
      if (!emailOk) return;
      setStep(isKnownEmail(email.trim()) ? "password" : "register");
      return;
    }
    if (!passwordOk) return;
    const isNew = step === "register";
    logIn(email.trim());
    close();
    if (isNew) setAfter("about");
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <button
            type="button"
            aria-label="Закрыть"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative flex h-full w-full max-w-[717px] animate-[drawer-in_300ms_ease-out] flex-col bg-white"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-5 right-5 flex size-10 items-center justify-center transition-colors hover:text-accent md:top-6 md:right-6"
            >
              <CloseIcon />
            </button>
            {/* колонка 432 px по центру панели, как в макете */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="mx-auto flex w-full max-w-[464px] flex-1 flex-col px-5 pt-24 pb-8 md:px-4 md:pt-[130px]"
            >
              <h2 id="login-title" className="text-h2 max-md:text-[20px] max-md:leading-[26px]">
                {step === "register" ? "Зарегистрироваться" : "Войти в личный кабинет"}
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    // поменяли почту — заново решаем, вход это или регистрация
                    if (step !== "email") setStep("email");
                  }}
                  onClear={() => {
                    setEmail("");
                    setStep("email");
                  }}
                />
                {step !== "email" && (
                  <TextField
                    label={step === "register" ? "Придумайте пароль" : "Пароль"}
                    type={show ? "text" : "password"}
                    autoComplete={step === "register" ? "new-password" : "current-password"}
                    value={password}
                    onChange={setPassword}
                    hint={step === "register" ? "Не менее 8 символов" : undefined}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShow((v) => !v)}
                        aria-label={show ? "Скрыть пароль" : "Показать пароль"}
                        className={`-mr-1 flex size-9 shrink-0 items-center justify-center transition-colors hover:text-primary ${
                          show ? "text-accent" : "text-tertiary"
                        }`}
                      >
                        <EyeIcon open={show} />
                      </button>
                    }
                  />
                )}
                <button
                  type="submit"
                  disabled={step === "email" ? !emailOk : !passwordOk}
                  className={`mt-1 h-[52px] text-caps transition-colors disabled:bg-tertiary ${darkButton}`}
                >
                  продолжить
                </button>
              </div>
              <p className="mt-auto pt-10 text-base-xs">
                Продолжая, вы даёте согласие на{" "}
                <Link href="/privacy" onClick={close} className="text-accent hover:underline">
                  обработку персональных данных
                </Link>{" "}
                и соглашаетесь с{" "}
                <Link href="/privacy" onClick={close} className="text-accent hover:underline">
                  политикой конфиденциальности
                </Link>
                .
              </p>
            </form>
          </aside>
        </div>
      )}
      {after === "about" && <AboutYou onDone={() => setAfter("hello")} onClose={() => setAfter(null)} />}
      {after === "hello" && <Hello onClose={() => setAfter(null)} />}
    </>
  );
}

/** Вместо раздела кабинета, пока не вошли */
export function LoginGate({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const email = useAuthEmail();
  if (!ready) return null;
  if (email) return <>{children}</>;
  return (
    <div className="flex flex-col items-start gap-6 py-10">
      <h1 className="text-h2">Личный кабинет</h1>
      <p className="max-w-[504px] text-base-s">Войдите, чтобы увидеть свои заказы, отзывы и данные для доставки.</p>
      <button type="button" onClick={openLogin} className={`h-10 px-8 text-caps transition-colors ${darkButton}`}>
        войти
      </button>
    </div>
  );
}
