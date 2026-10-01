"use client";

// Tabs из UI KIT (3669:8681): переключают разделы без перехода на другую страницу.
// Активный — чёрный с линией снизу, остальные серые (text/tetriary). Шрифт H4, между табами 32 px.
import { useState } from "react";

export function ProductTabs({ tabs }: { tabs: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" className="no-scrollbar flex gap-8 overflow-x-auto border-b border-line">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={i === active}
            aria-controls={`tabpanel-${i}`}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 border-b pb-2.5 text-h4 transition-colors ${
              i === active ? "border-primary" : "border-transparent text-tertiary hover:text-primary"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`tabpanel-${active}`} aria-labelledby={`tab-${active}`} className="whitespace-pre-line text-base-s">
        {tabs[active].text}
      </div>
    </div>
  );
}
