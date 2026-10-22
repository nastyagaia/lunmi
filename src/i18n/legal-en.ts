// Юридические страницы для английской версии — перевод src/data/legal.ts (та же структура).
import type { LegalDoc } from "@/data/legal";

const SELLER = {
  name: "Lunmi LLC",
  ids: "tax and registration numbers are listed in your order documents",
  address: "Saint Petersburg, Russia",
  email: "hello@lunmi.ru",
};

export const privacyEn: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "4 October 2026",
  intro: `This policy explains what customer data the Lunmi online store collects, why, and how we protect it. The data controller is ${SELLER.name}; ${SELLER.ids}; address: ${SELLER.address}. The policy follows Russian Federal Law No. 152-FZ “On Personal Data”.`,
  sections: [
    {
      title: "What data we collect",
      text: [
        "Your first and last name, phone number and email address — to place and deliver your order and to contact you.",
        "Your delivery address or chosen pickup point.",
        "Date of birth and gender — only if you add them in your account yourself.",
        "Order history, favorites and cart contents.",
        "Technical data: cookies, device and browser type, pages you visited. We need them for the site to work and remember your cart.",
      ],
    },
    {
      title: "Why we need this data",
      text: [
        "To accept, pack and deliver your order, update you on its status and answer your questions.",
        "To run your account: order history, addresses, rewards and reviews.",
        "To send news and offers — only if you’ve agreed. You can unsubscribe at any time via the link in the email or in your account.",
        "To comply with the law, for example by keeping sales records.",
      ],
    },
    {
      title: "Who we share data with",
      text: [
        "The delivery service (CDEK or a courier) — your name, phone and address, exactly as much as needed to deliver your order.",
        "Services the site runs on (hosting, email) — under confidentiality terms.",
        "Government authorities — only when required by law.",
        "We never sell your data or share it for third-party advertising.",
      ],
    },
    {
      title: "How we store and protect data",
      text: [
        "Data is stored on secure servers, and only employees who need it for their work have access.",
        "We keep data while you have an account or as long as it’s needed to fulfil your order and meet legal requirements. After that, it’s deleted or anonymized.",
        "We don’t store bank card details.",
      ],
    },
    {
      title: "Your rights",
      text: [
        "You can find out what data we hold about you, correct it or ask us to delete it. You can also delete your account yourself under “My details” in your account.",
        "You can withdraw your consent to data processing and to our newsletter.",
        `To exercise these rights, email ${SELLER.email}. We’ll reply within 10 business days.`,
      ],
    },
    {
      title: "Cookies",
      text: [
        "The site uses cookies and browser storage to remember your cart, favorites, selected city and sign-in. You can disable cookies in your browser settings, but some features may stop working.",
      ],
    },
    {
      title: "Changes to this policy",
      text: [
        "We may update this policy. A new version takes effect as soon as it’s published on this page; the update date is shown at the top.",
      ],
    },
  ],
};

export const offerEn: LegalDoc = {
  slug: "offer",
  title: "Terms of Sale",
  updated: "4 October 2026",
  intro: `This is a distance retail sales agreement between ${SELLER.name} (${SELLER.ids}; address: ${SELLER.address}) — the “Seller” — and the customer. By placing an order on the Lunmi website, you accept these terms.`,
  sections: [
    {
      title: "Subject of the agreement",
      text: [
        "The Seller sells the cosmetics presented on the website, and the customer pays for and accepts them under these terms.",
        "Product descriptions, photos and ingredient lists on the website are for reference. Shades in photos may differ slightly depending on your screen settings.",
      ],
    },
    {
      title: "Placing an order",
      text: [
        "Orders are placed on the website. The customer provides their name, phone number and delivery method.",
        "After you place an order, we confirm it by phone, SMS or email. If an item turns out to be out of stock, we’ll offer a replacement or remove it from the order.",
      ],
    },
    {
      title: "Price and payment",
      text: [
        "Prices are shown on the website. The price of an item in a placed order doesn’t change.",
        "Payment methods are shown at checkout. Delivery is calculated separately and shown before you confirm the order.",
      ],
    },
    {
      title: "Delivery",
      text: [
        "We deliver orders by courier and to CDEK pickup points. Delivery times and costs are listed on the “Delivery” page and at checkout.",
        "Orders are kept at the pickup point for 7 days. If not collected, they’re returned to the Seller.",
        "When you receive your order, check its appearance and contents.",
      ],
    },
    {
      title: "Returns and exchanges",
      text: [
        "You can cancel your order at any time before receiving it.",
        "After receipt, products of proper quality can be returned within 7 days if unused, with their original appearance, packaging, protective films and proof of purchase intact (Article 26.1 of the Russian Consumer Protection Law). The customer pays for return shipping.",
        "If a product is defective or doesn’t match your order, message us — we’ll replace it or refund you, and cover return shipping.",
        "Refunds are issued within 10 days of receiving your return request.",
      ],
    },
    {
      title: "Liability",
      text: [
        "Before using cosmetics, review the ingredients and do a patch test on a small area of skin. The Seller isn’t responsible for individual reactions to listed ingredients.",
        "The Seller isn’t responsible for delivery delays caused by the delivery service or force majeure.",
      ],
    },
    {
      title: "Personal data",
      text: ["Customer data is processed in accordance with the Privacy Policy published on the website."],
    },
    {
      title: "Seller contacts",
      text: [`${SELLER.name}, ${SELLER.ids}. Address: ${SELLER.address}. Email: ${SELLER.email}.`],
    },
  ],
};
