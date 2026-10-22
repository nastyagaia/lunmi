import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/Cart";
import { LoginLayer } from "@/components/Login";
import "./globals.css";
import { t, isEn } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("Lunmi — корейская косметика"),
  description: t("Интернет-магазин корейской косметики Lunmi: бестселлеры, скидки недели, подбор ухода с помощью AI."),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={isEn ? "en" : "ru"}>
      <head>
        <link
          rel="preload"
          href="/fonts/unbounded-cyrillic-500-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link rel="preload" href="/fonts/onest-cyrillic-500-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body className="min-h-dvh">
        <CartProvider>
          {children}
          <LoginLayer />
        </CartProvider>
      </body>
    </html>
  );
}
