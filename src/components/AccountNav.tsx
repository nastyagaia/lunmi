"use client";

// Account Section из Figma: аватар, имя и меню личного кабинета. На телефоне меню — горизонтальная лента.
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { contactStore, displayName, logOut, profileStore } from "@/lib/account";
import { BagIcon, CloseIcon, LogoutIcon, ProfileIcon, ReviewIcon, SparkleIcon, SupportIcon } from "./icons";
import { t } from "@/lib/i18n";

/** аватар по полу из «Моих данных»: «Мужчина» — мужской, иначе — девушка с косичками */
const AVATAR = { female: "/img/account/avatar-girl-3d3548.webp", male: "/img/account/avatar-boy-ee0cce.webp" };

const menu: { title: string; href: string; icon: ReactNode }[] = [
  { title: "Главная", href: "/account", icon: <SparkleIcon /> },
  { title: "Заказы", href: "/account/orders", icon: <BagIcon /> },
  { title: "Отзывы", href: "/account/reviews", icon: <ReviewIcon /> },
  { title: "Мои данные", href: "/account/profile", icon: <ProfileIcon /> },
  { title: "Поддержка", href: "/account/help", icon: <SupportIcon /> },
  // «Выйти» — выходим и возвращаемся на главную (данные остаются в браузере)
  { title: "Выйти", href: "/", icon: <LogoutIcon /> },
];

export function AccountNav() {
  const path = usePathname();
  const profile = profileStore.useValue();
  const name = displayName(profile, contactStore.useValue());
  const avatar = profile.gender === "Мужчина" ? AVATAR.male : AVATAR.female;
  // «Выйти» сначала спрашивает, точно ли
  const [ask, setAsk] = useState(false);
  const router = useRouter();
  const leave = () => {
    logOut();
    setAsk(false);
    router.push("/");
  };
  useEffect(() => {
    if (!ask) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAsk(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ask]);

  return (
    <aside className="flex flex-col gap-6 lg:gap-8">
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
        <Image key={avatar} src={avatar} alt="" width={173} height={173} priority className="size-16 rounded-full lg:size-[173px]" />
        {name && <p className="text-h4">{name}</p>}
      </div>
      <nav aria-label={t("Личный кабинет")} className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
        <ul className="flex gap-0.5 lg:w-[268px] lg:flex-col">
          {menu.map((it) => {
            const active = it.href === "/account" ? path === "/account" : path.startsWith(it.href) && it.href !== "/";
            return (
              <li key={it.title}>
                <Link
                  href={it.href}
                  onClick={
                    it.title === "Выйти"
                      ? (e) => {
                          e.preventDefault();
                          setAsk(true);
                        }
                      : undefined
                  }
                  aria-current={active ? "page" : undefined}
                  className={`flex h-[47px] items-center gap-2 rounded-xs px-4 text-base-s whitespace-nowrap transition-colors hover:bg-surface ${
                    active ? "bg-surface" : ""
                  }`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center">{it.icon}</span>
                  {t(it.title)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* окно «Выйти из аккаунта?» — как «Отменить заказ?» */}
      {ask && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={t("Закрыть")}
            tabIndex={-1}
            onClick={() => setAsk(false)}
            className="absolute inset-0 animate-[fade-in_200ms_ease-out] bg-primary/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="relative flex w-full max-w-[616px] animate-[dropdown-in_250ms_ease-out] flex-col gap-6 rounded-xs bg-white p-8"
          >
            <button
              type="button"
              onClick={() => setAsk(false)}
              aria-label={t("Закрыть")}
              className="absolute top-8 right-8 flex size-10 items-center justify-center transition-colors hover:text-accent"
            >
              <CloseIcon />
            </button>
            <h2 id="logout-title" className="pr-12 text-h3">
              {t("Вы точно хотите выйти?")}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setAsk(false)}
                className="h-10 bg-primary px-6 text-caps text-white transition-colors hover:bg-secondary"
              >
                {t("нет")}
              </button>
              <button
                type="button"
                onClick={leave}
                className="h-10 border border-primary px-6 text-caps transition-colors hover:border-line hover:text-secondary"
              >
                {t("да")}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
