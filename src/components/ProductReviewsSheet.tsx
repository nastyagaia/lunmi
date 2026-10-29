"use client";

// Телефон (product mobile): вместо списка отзывов — плашка «4.3 ★ 3 отзыва ›», отзывы открываются шторкой снизу
import { useState } from "react";
import { ChevronRight, StarIcon } from "./icons";
import { ProductReviews } from "./ProductReviews";
import { Sheet } from "./Sheet";
import type { ProductDetails } from "@/data/products";
import { plural } from "@/lib/i18n";

export function ProductReviewsSheet({
  reviews,
  rating,
}: {
  reviews: ProductDetails["reviews"];
  rating?: string;
}) {
  const [open, setOpen] = useState(false);
  const n = reviews.length;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-[52px] w-full items-center justify-between gap-4 rounded-xs border border-line-light px-4 text-base-s transition-colors hover:border-primary md:hidden"
      >
        <span className="flex items-center gap-6">
          {rating && (
            <span className="flex items-center gap-1">
              {rating}
              <StarIcon className="size-4 text-accent" />
            </span>
          )}
          <span className="text-secondary">{plural(n, ["отзыв", "отзыва", "отзывов"], ["review", "reviews"])}</span>
        </span>
        <ChevronRight className="size-4 shrink-0" />
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Отзывы" tall>
        <ProductReviews reviews={reviews} inSheet />
      </Sheet>
    </>
  );
}
