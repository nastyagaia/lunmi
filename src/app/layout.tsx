import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/Cart";
import { LoginLayer } from "@/components/Login";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunmi — корейская косметика",
  description: "Интернет-магазин корейской косметики Lunmi: бестселлеры, скидки недели, подбор ухода с помощью AI.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
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
