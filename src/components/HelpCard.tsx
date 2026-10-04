// Review Section «Нужна помощь в выборе?» + способы связи и фото.
// tall — в сетке каталога (10146:13746): 606 × 270, фон surface, поля 20 px, способы связи столбиком.
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
    <ul className={wide ? "flex flex-wrap gap-x-8 gap-y-3" : "flex flex-col gap-4"}>
      {contacts.map((c) => (
        <li key={c.label}>
          <Link href={c.href} className="flex items-center gap-2 text-base-m transition-colors hover:text-accent">
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
            <p className="text-base-s">Напишите, как вам удобнее, — подскажем без занудства:</p>
          </div>
          <Contacts wide />
        </div>
        <Image src="/img/help-product.webp" alt="" width={148} height={148} className="hidden shrink-0 sm:block" />
      </aside>
    );
  }

  return (
    <aside className={`flex justify-between gap-4 rounded-xs bg-surface p-5 sm:h-[270px] ${className}`}>
      <div className="flex flex-col gap-4">
        <h2 className="w-[242px] max-w-full text-h3">Нужна помощь в выборе?</h2>
        <p className="text-base-s">Напишите, как вам удобнее, — подскажем без занудства:</p>
        <Contacts wide={false} />
      </div>
      <div className="relative hidden aspect-square w-[230px] shrink-0 sm:block">
        <Image src="/img/help.webp" alt="" fill sizes="230px" className="object-cover" />
      </div>
    </aside>
  );
}
