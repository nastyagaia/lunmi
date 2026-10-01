"use client";

// Отзывы на странице товара (Figma: Frame 21202): заголовок H3 + число серым, сортировка «по дате»,
// комментарии через 50 px: фото (если есть) 50 × 50, имя H4 + дата серым, текст.
import Image from "next/image";
import { useState } from "react";
import type { ProductDetails } from "@/data/products";
import { Popover, SingleSelect } from "./Dropdown";
import { DropdownButton } from "./ui";

const sorts = ["по дате", "с высокими оценками", "с низкими оценками"];

export function ProductReviews({ reviews }: { reviews: ProductDetails["reviews"] }) {
  const [sort, setSort] = useState(sorts[0]);
  const [open, setOpen] = useState(false);

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

      <ul className="flex flex-col gap-[50px]">
        {shown.map((r) => (
          <li key={r.name + r.date} className="flex flex-col gap-3">
            {r.avatar && <Image src={r.avatar} alt="" width={50} height={50} className="rounded-xs object-cover" />}
            <p className="flex items-center gap-1.5">
              <span className="text-h4">{r.name}</span>
              <span className="text-base-s text-secondary">{r.date}</span>
            </p>
            <p className="text-base-s">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
