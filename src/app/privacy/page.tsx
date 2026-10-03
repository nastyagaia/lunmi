import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/data/legal";

export const metadata: Metadata = { title: `${privacy.title} — Lunmi` };

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
