// Личный кабинет — заказы и покупки (Figma: orders, 4798:6454; пусто — account new user)
import type { Metadata } from "next";
import { AccountOrders } from "@/components/Account";
import { AccountShell } from "@/components/AccountShell";

export const metadata: Metadata = { title: "Заказы — Lunmi", robots: { index: false } };

export default function OrdersPage() {
  return (
    <AccountShell>
      <AccountOrders />
    </AccountShell>
  );
}
