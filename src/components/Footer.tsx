// Footer из UI KIT (Figma 3721:9494): белый фон, слева серый логотип и «All rights reserved», дальше колонки
// «Покупателям» (с 5-й колонки сетки) и «Контакты» (с 9-й). Подписка на рассылку переехала в блок «Мы рядом» на главной.
import Link from "next/link";
import { Logo } from "./icons";

const buyers = ["О нас", "Как заказать", "Доставка", "Возврат товара", "Документы сайта"];
const contacts = ["Написать в поддержку", "Telegram", "Whatsapp", "Instagram"];
/** куда ведут ссылки, у которых уже есть страницы; остальные пока «#» */
const hrefs: Record<string, string> = {
  Доставка: "/delivery",
  "Возврат товара": "/offer",
  "Документы сайта": "/documents",
  "Написать в поддержку": "/account/help",
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
    <footer className="mt-16 bg-white pt-8 pb-11 md:mt-[74px]">
      <div className="container-page grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-2 lg:col-span-4">
          <Link href="/" aria-label="Lunmi — на главную" className="self-start text-secondary">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="text-base-s text-secondary">All rights reserved. 2026©</p>
        </div>
        <div className="lg:col-span-4">
          <Column title="покупателям" links={buyers} />
        </div>
        <div className="lg:col-span-4">
          <Column title="контакты" links={contacts} />
        </div>
      </div>
    </footer>
  );
}
