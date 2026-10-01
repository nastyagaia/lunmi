// Главная страница (макет home в Figma)
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { InstagramIcon, PlusIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { Button, SectionHeader } from "@/components/ui";
import { bestsellers, brands, catalog, faq, heroSlides, reviews, weeklyDeals } from "@/data/home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider slides={heroSlides} />
        <div className="flex flex-col gap-20 pt-20 md:gap-[140px] md:pt-[100px]">
          <Bestsellers />
          <Catalog />
          <AiBanner />
          <WeeklyDeals />
          <Brands />
          <Reviews />
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
      <Carousel label="Бестселлеры" arrowTop={194} className="items-start">
        {bestsellers.map((p) => (
          <div key={p.id} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-6px)/2)] lg:w-[calc((100%-12px)/3)]">
            <ProductCard product={p} size="L" />
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
      <div className="grid grid-flow-dense grid-cols-2 gap-1.5 md:grid-cols-4">
        {catalog.map((c) => (
          <Link
            key={c.title}
            href="/catalog"
            className={`group relative flex h-[180px] items-end overflow-hidden rounded-xs bg-surface p-3 sm:h-[220px] md:h-[200px] md:p-4 lg:h-[280px] ${
              c.wide ? "col-span-2" : ""
            }`}
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes={c.wide ? "(min-width: 1024px) 606px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
              тебя беспокоит. AI проанализирует состояние твоей кожи и предложит подборку корейских средств, которые могут
              подойти именно тебе.
            </p>
            <p>Попробуй — это просто и удобно!</p>
          </div>
          <Button href="#" tone="glass" className="self-start">
            Попробовать
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Скидки недели ---------- */
function WeeklyDeals() {
  return (
    <section className="container-page">
      <SectionHeader title="Скидки недели" />
      <Carousel label="Скидки недели" arrowTop={119} className="items-start">
        {weeklyDeals.map((p) => (
          <div key={p.id} className="w-[70%] shrink-0 snap-start xs:w-[calc((100%-6px)/2)] md:w-[calc((100%-12px)/3)] lg:w-[calc((100%-18px)/4)]">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

/* ---------- Бренды ---------- */
function Brands() {
  return (
    <section className="container-page reveal md:py-6">
      <SectionHeader title="Бренды" />
      <ul className="grid grid-flow-row grid-cols-2 gap-x-1.5 gap-y-6 md:grid-cols-4 md:grid-flow-col md:grid-rows-10">
        {brands.map((b) => (
          <li key={b}>
            <Link href="#" className="block text-h4 transition-colors hover:text-accent">
              {b}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Отзывы ---------- */
function Reviews() {
  return (
    <section className="container-page md:py-6">
      <SectionHeader title="Отзывы" />
      <Carousel label="Отзывы" arrowTop={111} className="items-stretch">
        {reviews.map((r, i) => (
          <article
            key={i}
            className="flex min-h-[280px] w-[85%] shrink-0 snap-start flex-col items-end gap-8 rounded-xs bg-surface p-6 sm:w-[392px]"
          >
            <Image src={r.avatar} alt="" width={70} height={70} />
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-h4">{r.name}</h3>
              <p className="text-base-s">{r.text}</p>
            </div>
          </article>
        ))}
        <article className="relative flex min-h-[280px] w-[85%] shrink-0 snap-start flex-col rounded-xs bg-accent-soft p-6 sm:w-[422px]">
          <div>
            <p className="text-h4">скидка за отзыв</p>
            <p className="text-h1">5%</p>
          </div>
          {/* текст начинается на той же высоте, что отзывы в соседних карточках (154 px от верха) */}
          <p className="mt-[54px] max-w-[321px] text-base-s">
            Напиши честный отзыв о магазине или о товаре, купленном у нас, и получи скидку 5% на следующую покупку.
          </p>
          <Image src="/img/av3.webp" alt="" width={66} height={61} className="absolute right-12 top-8" />
        </article>
      </Carousel>
    </section>
  );
}

/* ---------- Частые вопросы ---------- */
function Faq() {
  return (
    <section className="container-page reveal grid gap-6 md:py-5 lg:grid-cols-[minmax(0,1fr)_810px]">
      <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">
        Частые
        <br className="hidden lg:block" /> вопросы
      </h2>
      <div>
        {faq.map((item, i) => (
          <details key={item.q} className="group border-b border-line-light">
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 pb-6 text-h4 transition-colors hover:text-accent [&::-webkit-details-marker]:hidden ${
                i === 0 ? "" : "pt-6"
              }`}
            >
              {item.q}
              <PlusIcon className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="-mt-2 pb-6 text-base-s text-secondary">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- Мы рядом ---------- */
function Social({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Link
      href="#"
      className="flex h-[200px] items-center justify-center gap-2.5 rounded-xs bg-surface text-h4 transition-colors hover:text-accent md:h-[270px]"
    >
      {icon}
      {label}
    </Link>
  );
}

function Photo({ src, sizes }: { src: string; sizes: string }) {
  return (
    <div className="relative h-[200px] overflow-hidden rounded-xs md:h-[270px]">
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function Contacts() {
  return (
    <section className="container-page reveal flex flex-col gap-1.5">
      <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-3">
        <div className="col-span-2 flex flex-col items-start gap-4 rounded-xs bg-accent-soft p-6 lg:col-span-1 lg:h-[270px] lg:p-[30px]">
          <h2 className="text-h2 max-md:text-[20px] max-md:leading-[26px]">Мы рядом</h2>
          <p className="text-base-s">
            Хотим быть лучше благодаря вам — оставляйте ваши отзывы и пожелания или задавайте вопросы! Мы обещаем всё учесть!
          </p>
          <Button href="#" size="M">
            связаться
          </Button>
        </div>
        <Photo src="/img/n1.webp" sizes="(min-width: 768px) 402px, 50vw" />
        <Social icon={<InstagramIcon />} label="Instagram" />
      </div>
      <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
        <Photo src="/img/n2.webp" sizes="(min-width: 768px) 300px, 50vw" />
        <Social icon={<WhatsappIcon />} label="whatsapp" />
        <Photo src="/img/n3.webp" sizes="(min-width: 768px) 300px, 50vw" />
        <Social icon={<TelegramIcon />} label="telegram" />
      </div>
    </section>
  );
}
