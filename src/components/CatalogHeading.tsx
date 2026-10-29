"use client";

// Текст в серой шапке раздела (Figma: catalog 2936:6591): заголовок H1, через 8 px крошки «Главная / Уход для лица / Очищение»
// (Base/S серым, между частями 4 px), до низа шапки 20 px. Счётчик «Найдено 45 продуктов» — над фильтрами.
// Подраздел берётся из адреса (?type=…) — его меняют чипсы над товарами.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, Suspense } from "react";
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
      {only !== "crumbs" && <h1 className="text-h3 md:text-h1">{heading}</h1>}
      <nav aria-label={t("Хлебные крошки")} className={`flex flex-wrap items-center gap-1 text-base-s text-secondary ${only === "crumbs" ? "" : "max-md:hidden"}`}>
        {parts.map((p, i) => (
          <Fragment key={p.label}>
            {i > 0 && <span aria-hidden>/</span>}
            {p.href ? (
              <Link href={p.href} className="transition-colors hover:text-primary">
                {p.label}
              </Link>
            ) : (
              <span aria-current={i === parts.length - 1 ? "page" : undefined}>{p.label}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
