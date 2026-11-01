// Review Section «Не можете выбрать?» + способы связи и фото-«цветочек».
// tall — в сетке каталога (10146:13746): плитка размером с карточку (304 × 270), розовый фон, поля 20 px,
// способы связи столбиком через 24 px, фото-«цветочек» 116 × 116 в правом нижнем углу.
// wide — на странице товара (4622:4981): 720 × 161, фон blush, поля 16 px, способы связи в строку через 32 px
// (кнопки 40 px высотой), фото-«цветочек» 129 × 129 в 24 px от правого края.
// телефон (product mobile, 11542:16758): фото тоже видно, по центру по высоте, у правого края только поля 16; способы связи столбиком вплотную (кнопки по 40 px).
import Image from "next/image";
import Link from "next/link";
import { MailIcon, TelegramIcon, WhatsappIcon } from "./icons";
import { t } from "@/lib/i18n";

const contacts = [
  { label: "Whatsapp", href: "#", icon: <WhatsappIcon className="size-6" /> },
  { label: "Telegram", href: "#", icon: <TelegramIcon className="size-6" /> },
  { label: "Email", href: "#", icon: <MailIcon /> },
];

function Contacts({ wide }: { wide: boolean }) {
  return (
    <ul className={wide ? "flex flex-col md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-1" : "flex flex-col gap-6"}>
      {contacts.map((c) => (
        <li key={c.label}>
          {/* в столбике зона нажатия 44 px (палец на телефоне), а на вид строки 24 px через 24, как в макете */}
          <Link
            href={c.href}
            className={`flex items-center gap-2 text-base-m transition-colors hover:text-accent ${
              wide ? "h-10" : "-my-2.5 py-2.5"
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
      <aside className={`flex justify-between rounded-xs bg-blush p-4 md:gap-4 ${className}`}>
        <div className="flex max-w-[392px] flex-col justify-between md:gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-h3">{t("Не можете выбрать?")}</h2>
            <p className="text-base-s">{t("Пишите, подскажем:")}</p>
          </div>
          <div className="pb-2">
            <Contacts wide />
          </div>
        </div>
        <Image
          src="/img/help-clover-wide-927aa0.webp"
          alt=""
          width={129}
          height={129}
          className="shrink-0 self-center md:mr-6 md:self-start"
        />
      </aside>
    );
  }

  return (
    <aside
      className={`relative flex min-h-[270px] flex-col justify-between gap-6 overflow-hidden rounded-xs bg-accent-soft p-5 lg:aspect-[300/270] lg:min-h-0 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="max-w-[264px] text-h3">{t("Не можете выбрать?")}</h2>
        <p className="max-w-[264px] text-base-s">{t("Пишите, подскажем:")}</p>
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
