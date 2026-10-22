// Личный кабинет — заказы и покупки (Figma: orders, 4798:6454; пусто — account new user)
import type { Metadata } from "next";
import { AccountOrders } from "@/components/Account";
import { AccountShell } from "@/components/AccountShell";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: `${t("Заказы")} — Lunmi`, robots: { index: false } };

export default function OrdersPage() {
  return (
    <AccountShell>
      <AccountOrders />
    </AccountShell>
  );
}
