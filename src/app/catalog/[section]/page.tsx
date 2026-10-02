// Разделы каталога: /catalog/dlya-tela, /catalog/glow-skin и т. д. Подраздел — ?type=Скрабы
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogSection } from "@/components/CatalogSection";
import { sectionProducts, sections, sectionTypes } from "@/data/sections";

const findSection = (slug: string) => sections.find((s) => s.slug && s.slug === slug);

export function generateStaticParams() {
  return sections.filter((s) => s.slug).map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[section]">): Promise<Metadata> {
  const section = findSection((await params).section);
  if (!section) return {};
  return { title: `${section.title} — Lunmi`, description: `${section.title}: корейская косметика в Lunmi.` };
}

export default async function SectionPage({ params, searchParams }: PageProps<"/catalog/[section]">) {
  const section = findSection((await params).section);
  if (!section) notFound();
  const { type } = await searchParams;
  const products = sectionProducts(section.title);
  const types = sectionTypes(section.title, products);
  const initialType = typeof type === "string" && types.includes(type) ? type : undefined;

  return (
    <CatalogSection
      title={section.title}
      hero={section.hero}
      products={products}
      types={types}
      initialType={initialType}
    />
  );
}
