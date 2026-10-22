// Личный кабинет — отзывы (Figma: reviews, 5594:19480; пусто — reviews empty)
import type { Metadata } from "next";
import { AccountReviews } from "@/components/Account";
import { AccountShell } from "@/components/AccountShell";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: `${t("Отзывы")} — Lunmi`, robots: { index: false } };

export default function ReviewsPage() {
  return (
    <AccountShell>
      <AccountReviews />
    </AccountShell>
  );
}
