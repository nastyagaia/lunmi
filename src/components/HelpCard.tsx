// Review Section «Не можете выбрать?» (каталог) / «Нужна помощь в выборе?» (товар) + способы связи и фото.
// tall — в сетке каталога (10146:13746): плитка размером с карточку (304 × 270), розовый фон, поля 20 px,
// способы связи столбиком через 24 px, фото-«цветочек» 116 × 116 в правом нижнем углу.
// wide — на странице товара (3715:9364): 708 × 180, розовый фон blush, поля 16 px, фото 148 × 148, способы связи в строку.
import Image from "next/image";
import Link from "next/link";
import { MailIcon, TelegramIcon, WhatsappIcon } from "./icons";

const contacts = [
  { label: "Whatsapp", href: "#", icon: <WhatsappIcon className="size-6" /> },
  { label: "Telegram", href: "#", icon: <TelegramIcon className="size-6" /> },
  { label: "Email", href: "#", icon: <MailIcon /> },
];

function Contacts({ wide }: { wide: boolean }) {
  return (
    <ul className={wide ? "flex flex-wrap gap-x-8 gap-y-3" : "flex flex-col gap-6"}>
      {contacts.map((c) => (
        <li key={c.label}>
          {/* в столбике зона нажатия 44 px (палец на телефоне), а на вид строки 24 px через 24, как в макете */}
          <Link
            href={c.href}
            className={`flex items-center gap-2 text-base-m transition-colors hover:text-accent ${
              wide ? "" : "-my-2.5 py-2.5"
            }`}
          >
            {c.icon}
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function HelpCard({ className = "", layout = "tall" }: { className?: string; layout?: "tall" | "wide" }) {
  if (layout === "wide") {
    return (
      <aside className={`flex items-center justify-between gap-4 rounded-xs bg-blush p-4 ${className}`}>
        <div className="flex max-w-[388px] flex-col justify-between gap-6 self-stretch pt-3 pb-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-h3">Нужна помощь в выборе?</h2>
            <p className="text-base-s">Пишите, куда удобнее, — подскажем:</p>
          </div>
          <Contacts wide />
        </div>
        <Image src="/img/help-product.webp" alt="" width={148} height={148} className="hidden shrink-0 sm:block" />
      </aside>
    );
  }

  return (
    <aside
      className={`relative flex min-h-[270px] flex-col justify-between gap-6 overflow-hidden rounded-xs bg-accent-soft p-5 lg:aspect-[300/270] lg:min-h-0 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="max-w-[264px] text-h3">Не можете выбрать?</h2>
        <p className="max-w-[264px] text-base-s">Пишите, подскажем:</p>
      </div>
      <Contacts wide={false} />
      <Image
        src="/img/help-clover-5bcb9f.webp"
        alt=""
        width={116}
        height={116}
        className="absolute right-[13px] bottom-4"
      />
    </aside>
  );
}
