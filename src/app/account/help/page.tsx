// Личный кабинет — поддержка (Figma: help center, 5437:40914): способы связи и частые вопросы
import type { Metadata } from "next";
import Link from "next/link";
import { AccountShell } from "@/components/AccountShell";
import { FaqList } from "@/components/FaqList";
import { MailIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Поддержка — Lunmi", robots: { index: false } };

const ways = [
  { label: "Whatsapp", href: "#", icon: <WhatsappIcon className="size-6" /> },
  { label: "Telegram", href: "#", icon: <TelegramIcon className="size-6" /> },
  { label: "Почта", href: "#", icon: <MailIcon /> },
];

export default function HelpPage() {
  return (
    <AccountShell>
      <div className="flex flex-col gap-[50px]">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2">Поддержка</h1>
            <p className="text-base-s">Пишите, как вам удобнее, — ответим в течение дня, а то и быстрее:</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3">
            {ways.map((w) => (
              <li key={w.label}>
                <Link
                  href={w.href}
                  className="flex h-24 items-center justify-center gap-2.5 bg-surface text-h4 transition-colors hover:text-accent"
                >
                  {w.icon}
                  {w.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-6">
          <h2 className="text-h2">Популярные вопросы</h2>
          <FaqList />
        </section>
      </div>
    </AccountShell>
  );
}
