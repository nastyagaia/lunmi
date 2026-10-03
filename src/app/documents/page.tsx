// «Документы сайта» из подвала: список юридических страниц
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { legalDocs } from "@/data/legal";

export const metadata: Metadata = { title: "Документы сайта — Lunmi" };

export default function DocumentsPage() {
  return (
    <>
      <Header />
      <main className="container-page pt-[106px] pb-6">
        <div className="flex max-w-[720px] flex-col gap-10">
          <h1 className="text-h2 max-md:text-[28px] max-md:leading-[36px]">Документы сайта</h1>
          <ul className="flex flex-col gap-4 text-base-m">
            {legalDocs.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className="underline-offset-4 hover:underline">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
