"use client";

// Переключатель языка RU / EN: ведёт на ту же страницу другой языковой версии сайта (отдельный адрес)
import { usePathname } from "next/navigation";
import { isEn, OTHER_LOCALE_URL } from "@/lib/i18n";

export function LangSwitch({ className = "" }: { className?: string }) {
  const path = usePathname();
  return (
    <a
      href={OTHER_LOCALE_URL + path}
      hrefLang={isEn ? "ru" : "en"}
      aria-label={isEn ? "Русская версия сайта" : "English version"}
      className={`flex h-9 items-center px-1.5 text-caps transition-colors hover:text-accent ${className}`}
    >
      {isEn ? "RU" : "EN"}
    </a>
  );
}
