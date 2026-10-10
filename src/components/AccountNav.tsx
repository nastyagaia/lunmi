"use client";

// Account Section из Figma: аватар, имя и меню личного кабинета. На телефоне меню — горизонтальная лента.
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { contactStore, displayName, logOut, profileStore } from "@/lib/account";
import { BagIcon, LogoutIcon, ProfileIcon, ReviewIcon, SparkleIcon, SupportIcon } from "./icons";

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

  return (
    <aside className="flex flex-col gap-6 lg:gap-8">
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
        <Image key={avatar} src={avatar} alt="" width={173} height={173} priority className="size-16 rounded-full lg:size-[173px]" />
        {name && <p className="text-h4">{name}</p>}
      </div>
      <nav aria-label="Личный кабинет" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
        <ul className="flex gap-0.5 lg:w-[268px] lg:flex-col">
          {menu.map((it) => {
            const active = it.href === "/account" ? path === "/account" : path.startsWith(it.href) && it.href !== "/";
            return (
              <li key={it.title}>
                <Link
                  href={it.href}
                  onClick={it.title === "Выйти" ? logOut : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-[47px] items-center gap-2 rounded-xs px-4 text-base-s whitespace-nowrap transition-colors hover:bg-surface ${
                    active ? "bg-surface" : ""
                  }`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center">{it.icon}</span>
                  {it.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
