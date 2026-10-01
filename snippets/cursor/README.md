# Свой курсор: точка + догоняющий круг

Эффект по примеру «Animated Circle Following Cursor» (CodePen, Matteo Dumont), без библиотек.
Был на сайте Lunmi и снят 2 октября 2026 — отложен для сайта-портфолио.

Как подключить в другом проекте на Next.js + Tailwind:
1. `Cursor.tsx` положить в `src/components/`.
2. Содержимое `cursor.css` добавить в `globals.css`.
3. В `layout.tsx` вставить `<Cursor />` внутрь `<body>` после `{children}`.

Цвет — классы `border-primary/50` и `bg-primary` в `Cursor.tsx`.
