"use client";

// Подписка на рассылку (блок «Мы рядом» на главной): кнопка-стрелка серая, пока почта не введена,
// и тёмная (text/primary), когда почта похожа на настоящую. После отправки — «Спасибо!».
// «Готово» показываем только до перезагрузки страницы: вдруг в почте опечатка — после обновления можно ввести заново.
// Писем пока не отправляем.
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "./icons";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<string | null>(null);
  const ready = EMAIL_RE.test(email.trim());

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) setSubscribed(email.trim());
      }}
    >
      <label htmlFor="near-newsletter" className="text-base-s text-secondary">
        Подписаться на рассылку
      </label>
      {subscribed ? (
        <p className="flex h-[52px] items-center text-base-s">
          Готово! Будем писать на {subscribed} — только по делу, про новинки и скидки. Спамом не балуемся.
        </p>
      ) : (
        <div className="flex h-[52px] items-center rounded-xs border border-line bg-white pl-3 pr-2 focus-within:border-primary">
          <input
            id="near-newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваша почта"
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent text-base-s outline-none placeholder:text-tertiary"
          />
          <button
            type="submit"
            disabled={!ready}
            aria-label="Подписаться"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-line text-white transition-colors enabled:bg-primary enabled:hover:bg-primary/85"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
      <p className="text-base-xs text-secondary">
        Продолжая, я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
        <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
          политикой конфиденциальности
        </Link>
        .
      </p>
    </form>
  );
}
