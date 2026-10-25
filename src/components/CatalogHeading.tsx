"use client";

// Текст в серой шапке раздела (Figma: catalog 2936:6591): заголовок H1, через 8 px крошки «Главная / Уход для лица / Очищение»
// (Base/S серым, между частями 4 px), через 8 px — «Найдено 45 продуктов» (Caps серым).
// Подраздел берётся из адреса (?type=…) — его меняют чипсы над товарами; число товаров передаёт сетка с фильтрами.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, Suspense } from "react";
import { productsCount } from "./CatalogGrid";
import { useCatalogCount } from "@/lib/catalog-count";
import { isEn, t } from "@/lib/i18n";

type Props = {
  title: string;
  href: string;
  /** подразделы и группы, которые можно показать в заголовке */
  valid: string[];
  initialType?: string;
  brand?: string;
  /** сколько товаров при загрузке страницы — пока сетка не пересчитала */
  initialCount: number;
};

export function CatalogHeading(props: Props) {
  return (
    <Suspense fallback={<Heading {...props} type={props.initialType ?? null} />}>
      <WithParams {...props} />
    </Suspense>
  );
}

function WithParams(props: Props) {
  return <Heading {...props} type={useSearchParams().get("type")} />;
}

function Heading({ title, href, valid, brand, initialCount, type }: Props & { type: string | null }) {
  const count = useCatalogCount(initialCount);
  const current = type && valid.includes(type) ? type : null;
  const heading = current ? t(current) : brand ? `${brand} ${t(title).toLowerCase()}` : t(title);
  const parts = [
    { label: isEn ? "Home" : "Главная", href: "/" },
    { label: t(title), href: current ? href : undefined },
    ...(current ? [{ label: t(current), href: undefined }] : []),
  ];
  return (
    <div className="flex flex-col gap-2 pb-8 md:pb-[50px]">
      <h1 className="text-h1 max-md:text-[28px] max-md:leading-[36px]">{heading}</h1>
      <nav aria-label={t("Хлебные крошки")} className="flex flex-wrap items-center gap-1 text-base-s text-secondary">
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
      <p className="text-caps text-secondary">
        {t("Найдено")} {productsCount(count)}
      </p>
    </div>
  );
}
