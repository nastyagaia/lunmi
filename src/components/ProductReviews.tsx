"use client";

// Отзывы на странице товара (Figma: product 1, блок 4622:4980): заголовок H3 + число серым, сортировка «по дате».
// Комментарий (comments): фото (если есть) 50 × 50, звёзды, имя H4 + дата серым, текст — всё через 8 px.
// Между комментариями 24 px и тонкая линия divider. Сначала видны 2 отзыва, «смотреть все отзывы» раскрывает остальные.
import Image from "next/image";
import { useState } from "react";
import type { ProductDetails } from "@/data/products";
import { Popover, SingleSelect } from "./Dropdown";
import { StarIcon } from "./icons";
import { DropdownButton } from "./ui";

const sorts = ["по дате", "с высокими оценками", "с низкими оценками"];
const PREVIEW = 2;

/** star rating, size M: звезда 16 px в ячейке 20 px; закрашенные — accent, пустые — border/tetriary */
function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Оценка ${rating} из 5`} className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="flex size-5 items-center justify-center">
          <StarIcon className={`size-4 ${i <= rating ? "text-accent" : "text-line-light"}`} />
        </span>
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: { reviews: ProductDetails["reviews"] }) {
  const [sort, setSort] = useState(sorts[0]);
  const [open, setOpen] = useState(false);
  const [all, setAll] = useState(false);

  const shown =
    sort === "с высокими оценками"
      ? [...reviews].sort((a, b) => b.rating - a.rating)
      : sort === "с низкими оценками"
        ? [...reviews].sort((a, b) => a.rating - b.rating)
        : reviews;

  return (
    <section id="reviews" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex gap-1 text-h3">
          Отзывы <span className="text-tertiary">{reviews.length}</span>
        </h2>
        <Popover
          open={open}
          onClose={() => setOpen(false)}
          align="right"
          trigger={
            <DropdownButton expanded={open} onClick={() => setOpen((v) => !v)}>
              {sort}
            </DropdownButton>
          }
        >
          <SingleSelect
            options={sorts}
            value={sort}
            onSelect={(v) => {
              setSort(v);
              setOpen(false);
            }}
          />
        </Popover>
      </div>

      <ul className="flex flex-col divide-y divide-line-light">
        {(all ? shown : shown.slice(0, PREVIEW)).map((r) => (
          <li key={r.name + r.date} className="flex flex-col items-start gap-2 py-6 first:pt-0 last:pb-0">
            {r.avatar && <Image src={r.avatar} alt="" width={50} height={50} className="size-[50px] rounded-xs object-cover" />}
            <Stars rating={r.rating} />
            <p className="flex items-center gap-1.5">
              <span className="text-h4">{r.name}</span>
              <span className="text-base-s text-secondary">{r.date}</span>
            </p>
            <p className="text-base-s">{r.text}</p>
          </li>
        ))}
      </ul>

      {!all && reviews.length > PREVIEW && (
        <button
          type="button"
          onClick={() => setAll(true)}
          className="self-start text-caps underline underline-offset-2 transition-colors hover:text-accent"
        >
          смотреть все отзывы
        </button>
      )}
    </section>
  );
}
