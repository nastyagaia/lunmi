// Каркас личного кабинета (Figma: account, orders, profile, reviews, help center):
// слева Account Section на 3 колонки сетки, справа содержимое раздела с 4-й колонки.
import Image from "next/image";
import type { ReactNode } from "react";
import { AccountNav } from "./AccountNav";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AccountShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container-page grid grid-cols-1 gap-10 pt-[106px] pb-6 lg:grid-cols-[304px_minmax(0,1fr)] lg:gap-2">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </main>
      <Footer />
    </>
  );
}

/** Пустое состояние кабинета (Figma: account new user, reviews empty): картинка 130 × 130 и фраза */
export function AccountEmpty({ image, children }: { image: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 py-10 text-center">
      <Image src={image} alt="" width={130} height={130} />
      <p className="text-base-s">{children}</p>
    </div>
  );
}
