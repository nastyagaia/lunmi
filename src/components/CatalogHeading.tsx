"use client";

// Текст в серой шапке раздела (Figma: catalog 2936:6591): заголовок H1, через 8 px крошки «Главная / Уход для лица / Очищение»
// (Base/S серым, между частями 4 px), до низа шапки 20 px. Счётчик «Найдено 45 продуктов» — над фильтрами.
// Подраздел берётся из адреса (?type=…) — его меняют чипсы над товарами.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { kindNames } from "@/data/kinds";
import { isEn, t } from "@/lib/i18n";

type Props = {
  title: string;
  href: string;
  /** подразделы и группы, которые можно показать в заголовке */
  valid: string[];
  initialType?: string;
  /** «crumbs» — только хлебные крошки (на телефоне под серой шапкой) */
  only?: "crumbs";
};

export function CatalogHeading(props: Props) {
  return (
    <Suspense fallback={<Heading {...props} type={props.initialType ?? null} />}>
      <WithParams {...props} />
    </Suspense>
  );
}

function WithParams(props: Props) {
  const params = useSearchParams();
  return <Heading {...props} type={params.get("type")} kind={params.get("kind")} />;
}

function Heading({
  title,
  href,
  valid,
  type,
  kind = null,
  only,
}: Props & { type: string | null; kind?: string | null }) {
  const current = type && valid.includes(type) ? type : null;
  // вид — ещё один уровень вглубь, как у Золотого яблока: «Главная / Уход для лица / Очищение / Гидрофильное масло»
  const currentKind = current && kind && kindNames(current).includes(kind) ? kind : null;
  // выбранный бренд (?brand=) в заголовок не идёт — он отмечен в фильтре «Бренд»
  const heading = currentKind ? t(currentKind) : current ? t(current) : t(title);
  const typeHref = current ? `${href}?type=${encodeURIComponent(current)}` : undefined;
  const parts = [
    { label: isEn ? "Home" : "Главная", href: "/" },
    { label: t(title), href: current ? href : undefined },
    ...(current ? [{ label: t(current), href: currentKind ? typeHref : undefined }] : []),
    ...(currentKind ? [{ label: t(currentKind), href: undefined }] : []),
  ];
  return (
    <div className={only === "crumbs" ? "" : "relative z-10 flex flex-col gap-2 pb-[38px] md:pb-[50px]"}>
      {/* телефон (catalog mobile): в серой шапке только заголовок H3, крошки — отдельно под шапкой (only="crumbs") */}
      {/* телефон: «Уход / для лица» в две строки, чтобы подпись не наезжала на фото; с md перенос схлопывается */}
      {only !== "crumbs" && <h1 className="text-h3 max-md:whitespace-pre-line md:text-h1">{heading.replace(/^Уход для лица$/, "Уход\nдля лица").replace(/^Антивозрастной уход$/, "Антивозрастной\nуход")}</h1>}
      <Crumbs key={parts.map((p) => p.label).join("/")} parts={parts} hideOnPhone={only !== "crumbs"} />
    </div>
  );
}

type Part = { label: string; href?: string };

/** Крошки в одну строку. Не помещаются по ширине — средние пункты уходят в «…» («Главная / … / Очищение»),
 *  «…» ведёт на ближайший скрытый раздел. Если и так длинно — обрезается последний пункт. */
function Crumbs({ parts, hideOnPhone }: { parts: Part[]; hideOnPhone: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [cut, setCut] = useState(0);
  const maxCut = Math.max(0, parts.length - 2);
  // по одному пункту убираем, пока строка не влезет (до первой отрисовки на экране)
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && cut < maxCut && el.scrollWidth > el.clientWidth + 1) setCut(cut + 1);
  }, [cut, maxCut]);
  // ширина изменилась (поворот телефона, окно) — считаем заново
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let w = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== w) {
        w = el.clientWidth;
        setCut(0);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const hidden = parts.slice(1, 1 + cut);
  const shown: (Part & { dots?: boolean })[] = [
    parts[0],
    ...(cut ? [{ label: "…", href: hidden[hidden.length - 1].href, dots: true }] : []),
    ...parts.slice(1 + cut),
  ];
  return (
    <nav
      ref={ref}
      aria-label={t("Хлебные крошки")}
      className={`flex items-center gap-1 overflow-hidden whitespace-nowrap text-base-s text-secondary md:flex-wrap ${hideOnPhone ? "max-md:hidden" : ""}`}
    >
      {shown.map((p, i) => {
        const last = i === shown.length - 1;
        const cls = last && cut >= maxCut ? "min-w-0 truncate md:overflow-visible" : "shrink-0";
        return (
          <Fragment key={p.label}>
            {i > 0 && <span aria-hidden className="shrink-0">/</span>}
            {p.href ? (
              <Link href={p.href} className={`${cls} transition-colors hover:text-primary`}>
                {p.label}
              </Link>
            ) : (
              <span className={cls} aria-current={last ? "page" : undefined}>
                {p.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
