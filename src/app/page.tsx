// Главная страница (макет home в Figma)
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ArrowRight, TelegramIcon, WhatsappIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { Button, SectionHeader } from "@/components/ui";
import { brands as allBrands } from "@/data/brands";
import { catalog, heroSlides } from "@/data/home";
import { FaqList } from "@/components/FaqList";
import { allProducts } from "@/data/sections";

/** Bestsellers — настоящие товары каталога: тинт Dasique (обложка Cherry Soda, при наведении — модель),
 *  патчи Petitfee Aura Quartz, бустер Celimax и дальше хиты, чтобы ленту было что листать */
const BESTSELLER_IDS = [
  "dasique-juicy-dewy-lip-tint",
  "petitfee-aura-quartz-patch",
  "celimax-retinal-shot",
  "anua-pore-cleansing-oil",
  "numbuzin-no5-pad",
  "skin1004-centella-ampoule",
  "dr-althea-345-cream",
  "biodance-caviar-eye-patch",
  "torriden-dive-in-cream",
];
/** на главной у части карточек вместо упаковки — фото с моделью, кадр как в макете; упаковка — при наведении */
const BESTSELLER_COVERS: Record<string, string> = {
  "petitfee-aura-quartz-patch": "/img/b-aura-quartz-model-651ccd.webp",
};
const bestsellerList = BESTSELLER_IDS.flatMap((id) => allProducts.filter((p) => p.id === id)).map((p) =>
  BESTSELLER_COVERS[p.id] ? { ...p, image: BESTSELLER_COVERS[p.id], hoverImage: p.images?.[0] ?? p.image } : p,
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider slides={heroSlides} />
        <div className="flex flex-col gap-20 pt-20 md:gap-[140px] md:pt-[100px]">
          <Bestsellers />
          <Catalog />
          <Brands />
          <WeeklyDeals />
          <AiBanner />
          <Faq />
          <Contacts />
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ---------- Bestsellers ---------- */
function Bestsellers() {
  return (
    <section id="bestsellers" className="container-page scroll-mt-20">
      <SectionHeader title="Bestsellers" />
      {/* focus: карточка в центре ленты плавно вытягивается по высоте при листании */}
      <Carousel label="Бестселлеры" arrowTop={194} className="items-start" focus>
        {bestsellerList.map((p) => (
          <div
            key={p.id}
            className="w-[85%] shrink-0 snap-start @container sm:w-[calc((100%-8px)/2)] lg:w-[calc((100%-16px)/3)]"
          >
            <ProductCard product={p} size="L" grow />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

/* ---------- Каталог (мозаика) ---------- */
function Catalog() {
  return (
    <section className="container-page reveal">
      <SectionHeader title="Каталог" href="/catalog" />
      <div className="grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-4">
        {catalog.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className={`group relative flex h-[180px] items-end overflow-hidden rounded-xs bg-surface p-3 sm:h-[220px] md:h-[200px] md:p-4 lg:h-[280px] ${
              c.wide ? "col-span-2" : ""
            }`}
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes={c.wide ? "(min-width: 1024px) 616px, 100vw" : "(min-width: 1024px) 304px, 50vw"}
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                "left" in c && c.left ? "object-left" : ""
              }`}
            />
            <span className="relative text-base-m">{c.title}</span>
          </Link>
        ))}
        <Link
          href="/catalog"
          className="group flex h-[180px] flex-col items-center justify-center gap-4 rounded-xs bg-accent-soft sm:h-[220px] md:h-[200px] lg:h-[280px]"
        >
          <Image src="/img/c9.webp" alt="" width={43} height={51} />
          <span className="text-caps text-center underline underline-offset-2">Смотреть весь каталог</span>
        </Link>
      </div>
    </section>
  );
}

/* ---------- Баннер «Подбери косметику с помощью AI» ---------- */
function AiBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image src="/img/banner.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="container-page relative flex flex-col-reverse items-center lg:h-[511px] lg:flex-row lg:items-stretch lg:justify-between">
        <div className="relative -mb-px aspect-[632/511] w-full max-w-[632px] self-center lg:self-end lg:-ml-[6px]">
          <Image
            src="/img/bannerPhoto.webp"
            alt="Девушка с сияющей кожей"
            fill
            sizes="(min-width: 1024px) 632px, 100vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="flex max-w-[510px] flex-col gap-6 py-12 text-white lg:justify-center lg:py-0">
          <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">
            подбери косметику
            <br />с помощью ai
          </h2>
          <div className="flex flex-col gap-5 text-base-s">
            <p>
              Давай разберёмся вместе, что тебе подойдёт. Загрузи селфи в хорошем качестве и освещении и расскажи, что
              тебя беспокоит. AI проанализирует состояние твоей кожи и предложит подборку корейских средств, которые
              могут подойти именно тебе.
            </p>
            <p>Попробуй — это просто и удобно!</p>
          </div>
          <Button href="/ai" tone="glass" className="self-start">
            Попробовать
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Скидки недели ---------- */
/** Скидки недели — настоящие товары каталога со скидкой, сначала самые большие скидки (16 штук) */
const weeklyDeals = allProducts
  .filter((p) => p.discount)
  .sort((a, b) => parseInt(b.discount ?? "0") - parseInt(a.discount ?? "0"))
  .slice(0, 16);

function WeeklyDeals() {
  return (
    <section className="container-page">
      <SectionHeader title="Скидки недели" href="/sale" />
      <Carousel label="Скидки недели" arrowTop={119} className="items-start">
        {weeklyDeals.map((p) => (
          <div
            key={p.id}
            className="w-[70%] shrink-0 snap-start xs:w-[calc((100%-8px)/2)] md:w-[calc((100%-16px)/3)] lg:w-[calc((100%-24px)/4)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

/* ---------- Бренды ---------- */
function Brands() {
  // 40 настоящих брендов (4 колонки по 10, как в макете): больше всего товаров — по алфавиту.
  // Остальные — на странице «Бренды» по ссылке «Показать все»
  const top = [...allBrands]
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, 40)
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
    // бренды на цифру (3CE) — в конце, как на странице «Бренды»
    .sort((a, b) => Number(/^\d/.test(a.name)) - Number(/^\d/.test(b.name)));
  return (
    <section className="container-page reveal md:py-6">
      <SectionHeader title="Бренды" href="/brands" />
      <ul className="grid grid-flow-row grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4 md:grid-flow-col md:grid-rows-10">
        {top.map((b) => (
          <li key={b.slug}>
            <Link href={`/brands/${b.slug}`} className="block text-h4 transition-colors hover:text-accent">
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Частые вопросы ---------- */
function Faq() {
  return (
    <section className="container-page reveal grid gap-6 md:py-5 lg:grid-cols-[minmax(0,1fr)_824px]">
      <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">
        Частые
        <br className="hidden lg:block" /> вопросы
      </h2>
      <FaqList />
    </section>
  );
}

/* ---------- Мы рядом (Figma 11102:19256, высота 540 — на 30 ниже макета по просьбе Насти): три колонки по 4 — поддержка и рассылка, фото + почта, мессенджеры + фото ---------- */
function NearPhoto({ src }: { src: string }) {
  return (
    <div className="relative h-[280px] overflow-hidden rounded-xs md:h-[240px] lg:h-auto lg:flex-1">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 408px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function Contacts() {
  return (
    <section className="container-page reveal grid gap-2 md:grid-cols-2 lg:h-[540px] lg:grid-cols-3">
      <div className="flex flex-col justify-between gap-10 rounded-xs bg-surface p-6 md:row-span-2 lg:row-span-1 lg:px-[30px] lg:pt-8 lg:pb-[30px]">
        <p className="text-base-s text-secondary">Поддержка</p>
        <div className="flex flex-col gap-4">
          <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">Мы рядом</h2>
          <p className="text-base-s">
            Хотим становиться лучше благодаря вам — оставляйте отзывы и пожелания или задавайте вопросы: о доставке,
            уходе и вообще о чём угодно.
          </p>
        </div>
        <form className="flex flex-col gap-3" action="#">
          <label htmlFor="near-newsletter" className="text-base-s text-secondary">
            Подписаться на рассылку
          </label>
          <div className="flex h-[52px] items-center rounded-xs border border-line bg-white pl-3 pr-2 focus-within:border-primary">
            <input
              id="near-newsletter"
              type="email"
              required
              placeholder="Ваша почта"
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent text-base-s outline-none placeholder:text-tertiary"
            />
            <button
              type="submit"
              aria-label="Подписаться"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-line text-white transition-colors hover:bg-primary"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
          <p className="text-base-xs text-secondary">
            Продолжая, я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
            <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        <NearPhoto src="/img/near1-99ff3c.webp" />
        <a
          href="mailto:lunmicosm@gmail.com"
          className="group flex h-[180px] shrink-0 flex-col justify-between rounded-xs bg-primary p-4 transition-colors hover:bg-primary/90"
        >
          <span className="text-base-s text-tertiary">Наш email</span>
          <span className="text-h3 break-all text-line-light transition-colors group-hover:text-white max-md:text-[16px]">
            lunmicosm@gmail.com
          </span>
        </a>
      </div>

      <div className="flex flex-col gap-2 md:col-start-2 lg:col-start-auto">
        <div className="flex h-[180px] shrink-0 flex-col justify-between rounded-xs bg-accent-soft p-4">
          <span className="text-base-s text-secondary">Поддержка в мессенджерах</span>
          <div className="flex flex-wrap gap-x-[60px] gap-y-3">
            <Link href="#" className="flex h-10 items-center gap-2.5 text-h4 transition-colors hover:text-accent">
              <WhatsappIcon className="size-8" />
              whatsapp
            </Link>
            <Link href="#" className="flex h-10 items-center gap-2.5 text-h4 transition-colors hover:text-accent">
              <TelegramIcon className="size-8" />
              telegram
            </Link>
          </div>
        </div>
        <NearPhoto src="/img/near2-4492f6.webp" />
      </div>
    </section>
  );
}
