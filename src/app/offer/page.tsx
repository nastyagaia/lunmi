import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { offer } from "@/data/legal";

export const metadata: Metadata = { title: `${offer.title} — Lunmi` };

export default function OfferPage() {
  return <LegalPage doc={offer} />;
}
