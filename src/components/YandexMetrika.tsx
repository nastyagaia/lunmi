"use client";

// Счётчик Яндекс Метрики: вебвизор, карта кликов, переходы по ссылкам.
// Работает только на опубликованном сайте (на компьютере при разработке не включается, чтобы не мешать статистике).
// Сайт переключает страницы без перезагрузки, поэтому о каждой новой странице сообщаем Метрике сами (hit).
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { YM_ID } from "@/lib/metrika";

const enabled = Boolean(YM_ID) && process.env.NODE_ENV === "production";

export function YandexMetrika() {
  const path = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    // первую страницу счётчик учитывает сам, дальше — каждый переход
    if (first.current) {
      first.current = false;
      return;
    }
    window.ym?.(YM_ID, "hit", window.location.href, { referer: document.referrer });
  }, [path]);

  if (!enabled) return null;
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${YM_ID}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
      </noscript>
    </>
  );
}
