"use client";

// Вход в личный кабинет (Figma: «вход по телефону» 11100:15886, «login sms code / typing / error / resend»,
// вход по почте 11317:16405…16592, «sign up» 11100:15818). Панель справа:
// телефон → код из СМС (4 цифры) или «продолжить с email» → почта → пароль / «Придумайте пароль».
// Новичок после входа видит окно «Давай знакомиться» (имя + почта или телефон — то, чего ещё нет), затем «Привет!».
// ВНИМАНИЕ: вход фейковый — СМС и писем не отправляем, подходит любой код и любой пароль.
// «Продолжить с Google» пока не работает — показываем подсказку. Данные кабинета хранятся только в этом браузере.
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { authStore, contactStore, isKnownEmail, logIn, profileStore, type Profile } from "@/lib/account";
import { loyalty } from "@/data/loyalty";
import { formatPhone } from "./CheckoutDrawers";
import { ArrowLeft, CloseIcon } from "./icons";
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

/** Шаг после регистрации (Figma: sign up): имя, почта или телефон (то, чем не входили), пол, рассылка */
function AboutYou({ by, onDone, onClose }: { by: "phone" | "email"; onDone: () => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const [gender, setGender] = useState<Profile["gender"]>();
  const [news, setNews] = useState(true);
  const valid = name.trim().length >= 2 && (by === "phone" ? !extra || EMAIL_RE.test(extra.trim()) : true);

  const save = () => {
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const email = by === "phone" && extra.trim() ? { email: extra.trim().toLowerCase() } : {};
    profileStore.set((p) => ({ ...p, firstName, lastName: rest.join(" "), gender, news, ...email }));
    contactStore.set((c) => ({
      notify: c?.notify ?? "СМС",
      name: name.trim(),
      phone: by === "email" && extra.trim() ? extra.trim() : (c?.phone ?? ""),
    }));
    onDone();
  };

  return (
    <Modal title="Давай знакомиться" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <TextField label="Твоё имя" value={name} onChange={setName} autoComplete="name" />
        {by === "phone" ? (
          <TextField label="Email" value={extra} onChange={setExtra} type="email" autoComplete="email" />
        ) : (
          <TextField
            label="Телефон"
            value={extra}
            onChange={(v) => setExtra(formatPhone(v))}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
          />
        )}
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
      <Button
        size="M"
        disabled={!valid}
        onClick={save}
        className={`self-end ${darkButton} disabled:border-tertiary disabled:bg-tertiary`}
      >
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
      {/* анимация коробочки-подарка (Figma: welcoome 10810:18558) — играет один раз и замирает на последнем кадре */}
      <video
        src="/video/welcome-box-white-0c8fc3.mp4"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        className="mx-auto aspect-square w-full max-w-[450px]"
      />
      <Button href="/catalog" size="M" onClick={onClose} className={`self-end ${darkButton}`}>
        за покупками
      </Button>
    </Modal>
  );
}

/** «G» Google — фирменные цвета (Figma: кнопка «продолжить с Google») */
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** Код из СМС (Figma: login sms code / typing / error): 4 клетки 36 × 52 через 4 px.
 *  Одно поле ввода поверх клеток — так работают вставка и автоподстановка кода из СМС на телефоне */
function CodeInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  return (
    <div className="relative flex w-max gap-1">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`flex h-[52px] w-9 items-center justify-center rounded-xs border text-h3 ${
            error ? "border-error" : i === value.length ? "border-accent" : "border-primary"
          }`}
        >
          {value[i] ?? ""}
        </span>
      ))}
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-label="Код из СМС"
        aria-invalid={error}
        className="absolute inset-0 bg-transparent text-transparent caret-transparent outline-none"
      />
    </div>
  );
}

/** «через 20 секунд», «через 3 секунды», «через 1 секунду» */
function secondsWord(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} секунду`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} секунды`;
  return `${n} секунд`;
}

/** Панель входа + окна после регистрации. Стоит один раз на весь сайт (в layout) */
export function LoginLayer() {
  const open = useLoginOpen();
  const [step, setStep] = useState<"phone" | "code" | "email" | "password" | "register">("phone");
  const [after, setAfter] = useState<{ step: "about" | "hello"; by: "phone" | "email" } | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [wait, setWait] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [google, setGoogle] = useState(false);

  const close = () => {
    setLoginOpen(false);
    setStep("phone");
    setCode("");
    setPassword("");
    setShow(false);
    setGoogle(false);
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

  // отсчёт до «получить код повторно»
  useEffect(() => {
    if (step !== "code" || wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [step, wait]);

  const phoneOk = phone.replace(/\D/g, "").length === 11;
  const emailOk = EMAIL_RE.test(email.trim());
  const passwordOk = step === "register" ? password.length >= 8 : password.length > 0;

  const finish = (id: string, by: "phone" | "email") => {
    const isNew = !isKnownEmail(id);
    logIn(id);
    close();
    if (isNew) setAfter({ step: "about", by });
  };

  const sendCode = () => {
    setCode("");
    setWait(60);
    setStep("code");
  };

  // ввели 4 цифры — сразу входим (СМС фейковые, подходит любой код)
  const enterCode = (v: string) => {
    setCode(v);
    if (v.length === 4) finish(phone, "phone");
  };

  const submit = () => {
    if (step === "phone") {
      if (phoneOk) sendCode();
      return;
    }
    if (step === "email") {
      if (!emailOk) return;
      setStep(isKnownEmail(email.trim()) ? "password" : "register");
      return;
    }
    if (passwordOk) finish(email.trim(), "email");
  };

  const byEmail = step === "email" || step === "password" || step === "register";
  const outline =
    "flex h-10 items-center justify-center gap-2 rounded-xs border border-primary text-caps transition-colors hover:bg-primary hover:text-white";

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
            {step === "code" && (
              <button
                type="button"
                onClick={() => setStep("phone")}
                aria-label="Назад"
                className="absolute top-5 left-5 flex size-10 items-center justify-center transition-colors hover:text-accent md:top-6 md:left-6"
              >
                <ArrowLeft />
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-5 right-5 flex size-10 items-center justify-center transition-colors hover:text-accent md:top-6 md:right-6"
            >
              <CloseIcon />
            </button>
            {/* колонка 433 px по центру панели, как в макете (с запасом в 1 px — заголовок помещается в строку) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="mx-auto flex w-full max-w-[466px] flex-1 flex-col overflow-y-auto px-5 pt-24 pb-8 md:px-4 md:pt-[130px]"
            >
              <h2 id="login-title" className="text-h2 max-md:text-[20px] max-md:leading-[26px]">
                {step === "register" ? "Зарегистрироваться" : "Войти в личный кабинет"}
              </h2>

              {step === "phone" && (
                <div className="mt-8 flex flex-col gap-3">
                  <TextField
                    label="Телефон"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(v) => setPhone(formatPhone(v))}
                    onClear={() => setPhone("")}
                  />
                  <button
                    type="submit"
                    disabled={!phoneOk}
                    className={`mt-1 h-[52px] text-caps transition-colors disabled:bg-tertiary ${darkButton}`}
                  >
                    получить код
                  </button>
                </div>
              )}

              {step === "code" && (
                <div className="mt-4 flex flex-col gap-6">
                  <p className="text-base-s">Мы отправили СМС с кодом на номер {phone}.</p>
                  <div className="flex flex-col gap-2">
                    <CodeInput value={code} onChange={enterCode} />
                    {wait > 0 ? (
                      <p className="text-base-xs text-secondary">
                        Получить новый код можно через {secondsWord(wait)}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={sendCode}
                        className="self-start text-caps underline underline-offset-2 transition-colors hover:text-accent"
                      >
                        получить код повторно
                      </button>
                    )}
                  </div>
                </div>
              )}

              {byEmail && (
                <div className="mt-8 flex flex-col gap-3">
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
              )}

              {/* другие способы входа (Figma: «продолжить с email» / «продолжить с Google») */}
              {step !== "code" && (
                <div className="mt-auto flex flex-col gap-4 pt-10">
                  <button
                    type="button"
                    onClick={() => {
                      setGoogle(false);
                      setStep(byEmail ? "phone" : "email");
                    }}
                    className={outline}
                  >
                    {byEmail ? "продолжить по телефону" : "продолжить с email"}
                  </button>
                  <button type="button" onClick={() => setGoogle(true)} className={outline}>
                    <GoogleIcon />
                    продолжить с Google
                  </button>
                  {google && (
                    <p role="status" className="text-base-xs text-secondary">
                      Вход через Google скоро появится — пока войдите по телефону или почте.
                    </p>
                  )}
                </div>
              )}
              <p className={`${step === "code" ? "mt-auto pt-10" : "mt-8"} text-base-xs`}>
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
      {after?.step === "about" && (
        <AboutYou
          by={after.by}
          onDone={() => setAfter({ step: "hello", by: after.by })}
          onClose={() => setAfter(null)}
        />
      )}
      {after?.step === "hello" && <Hello onClose={() => setAfter(null)} />}
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
      <p className="max-w-[504px] text-base-s">
        Тут живут ваши заказы, отзывы, адреса и бонусы. Войдите — и всё будет под рукой.
      </p>
      <button type="button" onClick={openLogin} className={`h-10 px-8 text-caps transition-colors ${darkButton}`}>
        войти
      </button>
    </div>
  );
}
