// Юридическая страница (оферта, политика): белый фон, заголовок и текст — без картинок и украшений
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { LegalDoc } from "@/data/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main className="container-page pt-[106px] pb-6">
        <article className="flex max-w-[720px] flex-col gap-10">
          <header className="flex flex-col gap-4">
            <h1 className="text-h2 max-md:text-[28px] max-md:leading-[36px]">{doc.title}</h1>
            <p className="text-base-xs text-secondary">Редакция от {doc.updated}</p>
            <p className="text-base-s">{doc.intro}</p>
          </header>
          {doc.sections.map((s, i) => (
            <section key={s.title} className="flex flex-col gap-2">
              <h2 className="text-h4">
                {i + 1}. {s.title}
              </h2>
              <div className="flex flex-col gap-3 text-base-s">
                {s.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
