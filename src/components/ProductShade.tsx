"use client";

// Выбранный оттенок товара — общий для блока покупки (кружки оттенков) и галереи (фото этого оттенка).
import { createContext, useContext, useState, type ReactNode } from "react";

type ShadeState = { shade?: string; setShade: (name: string) => void };

const ShadeContext = createContext<ShadeState | null>(null);

export function ShadeProvider({ initial, children }: { initial?: string; children: ReactNode }) {
  const [shade, setShade] = useState(initial);
  return <ShadeContext.Provider value={{ shade, setShade }}>{children}</ShadeContext.Provider>;
}

/** Внутри ShadeProvider — общий оттенок; без него — свой, локальный */
export function useShade(initial?: string): ShadeState {
  const shared = useContext(ShadeContext);
  const [local, setLocal] = useState(initial);
  return shared ?? { shade: local, setShade: setLocal };
}
