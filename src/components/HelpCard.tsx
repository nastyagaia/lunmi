// Review Section из макета каталога (10146:13746): «Нужна помощь в выборе?» + способы связи и фото.
// Занимает две колонки сетки, 606 × 270, фон surface, поля 20 px.
import Image from "next/image";
import Link from "next/link";
import { MailIcon, TelegramIcon, WhatsappIcon } from "./icons";

const contacts = [
  { label: "Whatsapp", href: "#", icon: <WhatsappIcon className="size-6" /> },
  { label: "Telegram", href: "#", icon: <TelegramIcon className="size-6" /> },
  { label: "Email", href: "#", icon: <MailIcon /> },
];

/** layout="tall" — в сетке каталога (606 × 270), "wide" — на странице товара (708 × 172, способы связи в строку) */
export function HelpCard({ className = "", layout = "tall" }: { className?: string; layout?: "tall" | "wide" }) {
  const wide = layout === "wide";
  return (
    <aside
      className={`flex justify-between gap-4 rounded-xs bg-surface p-5 ${wide ? "sm:h-[172px]" : "sm:h-[270px]"} ${className}`}
    >
      <div className={`flex flex-col ${wide ? "gap-2" : "gap-4"}`}>
        <h2 className={`max-w-full text-h3 ${wide ? "" : "w-[242px]"}`}>Нужна помощь в выборе?</h2>
        <p className="text-base-s">Выберите удобный способ связи:</p>
        <ul className={`flex gap-4 ${wide ? "mt-auto flex-wrap gap-x-6" : "flex-col"}`}>
          {contacts.map((c) => (
            <li key={c.label}>
              <Link href={c.href} className="flex items-center gap-2 text-base-m transition-colors hover:text-accent">
                {c.icon}
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`relative hidden aspect-square shrink-0 sm:block ${wide ? "h-full" : "w-[230px]"}`}>
        <Image src="/img/help.webp" alt="" fill sizes="230px" className="object-cover" />
      </div>
    </aside>
  );
}
