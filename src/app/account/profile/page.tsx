// Личный кабинет — мои данные (Figma: profile, 5336:15998; заполнено — edit profile)
import type { Metadata } from "next";
import { AccountProfile } from "@/components/AccountProfile";
import { AccountShell } from "@/components/AccountShell";

export const metadata: Metadata = { title: "Мои данные — Lunmi", robots: { index: false } };

export default function ProfilePage() {
  return (
    <AccountShell>
      <AccountProfile />
    </AccountShell>
  );
}
