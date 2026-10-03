// Footer из UI KIT
import Link from "next/link";
import { ArrowRight } from "./icons";

const buyers = ["О нас", "Как заказать", "Доставка", "Возврат товара", "Документы сайта"];
const contacts = ["Написать в поддержку", "Telegram", "Whatsapp", "Instagram"];
/** куда ведут ссылки, у которых уже есть страницы; остальные пока «#» */
const hrefs: Record<string, string> = {
  Доставка: "/delivery",
  "Возврат товара": "/offer",
  "Документы сайта": "/documents",
};

function Column({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-caps text-secondary">{title}</p>
      <ul className="flex flex-col gap-4">
        {links.map((l) => (
          <li key={l}>
            <Link
              href={hrefs[l] ?? "#"}
              className="block text-base-s text-secondary transition-colors hover:text-primary"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-surface pb-11 pt-8 md:mt-[74px]">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex max-w-[304px] flex-col justify-between gap-10 max-lg:contents lg:min-h-[202px]">
          <form className="flex max-w-[304px] flex-col gap-2" action="#">
            <label htmlFor="newsletter" className="text-caps text-secondary">
              Подписаться на рассылку
            </label>
            <div className="flex h-[52px] w-[300px] max-w-full items-center rounded-xs border border-line bg-white pl-3 pr-2 focus-within:border-primary">
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Ваш email"
                autoComplete="email"
                className="min-w-0 flex-1 bg-transparent text-base-s outline-none placeholder:text-tertiary"
              />
              <button
                type="submit"
                aria-label="Подписаться"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-line text-white transition-colors hover:bg-primary"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
            <p className="text-base-xs text-secondary">
              Продолжая, я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
              <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                политикой конфиденциальности
              </Link>
              .
            </p>
          </form>
          <p className="text-base-s text-secondary max-lg:order-last">«Beauty Lunmi» All rights reserved. 2026©</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:max-w-[520px] lg:max-w-none lg:w-[616px] lg:grid-cols-[200px_304px] lg:justify-between">
          <Column title="покупателям" links={buyers} />
          <Column title="контакты" links={contacts} />
        </div>
      </div>
    </footer>
  );
}
