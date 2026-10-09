// Частые вопросы — аккордеон из UI KIT: на главной и в «Поддержке» личного кабинета
import { faq } from "@/data/home";
import { PlusIcon } from "./icons";

export function FaqList() {
  return (
    <div>
      {faq.map((item, i) => (
        <details key={item.q} className="group border-b border-line-light">
          <summary
            className={`flex cursor-pointer list-none items-center justify-between gap-4 pb-6 text-h4 [&::-webkit-details-marker]:hidden ${
              i === 0 ? "" : "pt-6"
            }`}
          >
            {item.q}
            <PlusIcon className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="-mt-2 pb-6 text-base-s text-secondary">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
