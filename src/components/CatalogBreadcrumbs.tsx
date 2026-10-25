"use client";

// Хлебные крошки под заголовком раздела (Figma: catalog 2936:6591, breadcrumbs): Base/S серым, между частями 16 px.
// «Главная / Уход для лица / Очищение» — подраздел берётся из адреса (?type=…), его меняют чипсы над товарами.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, Suspense } from "react";
import { isEn, t } from "@/lib/i18n";

type Props = { title: string; href: string; valid: string[]; initialType?: string };

export function CatalogBreadcrumbs(props: Props) {
  return (
    <Suspense fallback={<Crumbs {...props} type={props.initialType ?? null} />}>
      <WithParams {...props} />
    </Suspense>
  );
}

function WithParams(props: Props) {
  return <Crumbs {...props} type={useSearchParams().get("type")} />;
}

function Crumbs({ title, href, valid, type }: Props & { type: string | null }) {
  const current = type && valid.includes(type) ? type : null;
  const parts = [
    { label: isEn ? "Home" : "Главная", href: "/" },
    { label: t(title), href: current ? href : undefined },
    ...(current ? [{ label: t(current), href: undefined }] : []),
  ];
  return (
    <nav aria-label={t("Хлебные крошки")} className="flex flex-wrap items-center gap-4 text-base-s text-secondary">
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
  );
}
