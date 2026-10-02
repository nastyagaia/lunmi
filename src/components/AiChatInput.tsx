"use client";

// input ai-chat из UI KIT (5940:31861): большое поле 150 px, внизу — вложения и кнопка отправки.
// Камера слева добавляет фото (до 3), у превью 50 × 50 — крестик, «+» добавляет ещё.
// Кнопка отправки серая, пока поле пустое, и тёмная, когда есть текст. Cmd/Ctrl + Enter тоже отправляет.
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CameraIcon, CloseIcon, PlusIcon } from "./icons";

const MAX_PHOTOS = 3;

export function AiChatInput({
  onSubmit,
  busy = false,
}: {
  onSubmit: (text: string, photos: File[]) => void;
  busy?: boolean;
}) {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const ready = text.trim().length > 0 && !busy;

  // освобождаем память превью, когда фото убрали
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const add = (files: FileList | null) => {
    if (!files) return;
    const next = [...files].filter((f) => f.type.startsWith("image/")).slice(0, MAX_PHOTOS - photos.length);
    setPhotos((p) => [...p, ...next.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
  };

  const submit = () => {
    if (ready) onSubmit(text.trim(), photos.map((p) => p.file));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex min-h-[150px] w-full max-w-[720px] flex-col justify-between rounded-xs border border-line bg-white px-3 py-3 focus-within:border-primary"
    >
      <label htmlFor="ai-query" className="sr-only">
        Опиши, что тебя беспокоит
      </label>
      <textarea
        id="ai-query"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
        }}
        rows={3}
        placeholder={
          "Например: у меня сухая кожа, но я хочу попробовать крема с витамином А.\nИли: проанализируй мою кожу по фото и составь ежедневный уход бюджетом до 5000 ₽."
        }
        className="min-h-[60px] w-full resize-none bg-transparent text-base-s outline-none placeholder:text-tertiary"
      />

      <div className="flex items-end justify-between gap-4 pt-1.5">
        <div className="flex items-center gap-4">
          {photos.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              aria-label="Прикрепить фото"
              className="flex size-9 items-center justify-center rounded-full bg-surface transition-colors hover:bg-line-light"
            >
              <CameraIcon />
            </button>
          ) : (
            <>
              {photos.map((p, i) => (
                <div key={p.url} className="relative size-[50px] overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element -- превью локального файла */}
                  <img src={p.url} alt={`Фото ${i + 1}`} className="size-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotos((list) => list.filter((x) => x.url !== p.url))}
                    aria-label={`Убрать фото ${i + 1}`}
                    className="absolute top-1 right-1 flex items-center justify-center rounded-xs bg-white"
                  >
                    <CloseIcon className="size-4" />
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  aria-label="Добавить ещё фото"
                  className="flex size-[50px] items-center justify-center rounded-xs bg-surface transition-colors hover:bg-line-light"
                >
                  <PlusIcon />
                </button>
              )}
            </>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              add(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!ready}
          aria-label="Подобрать средства"
          className={`flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-colors ${
            ready ? "bg-primary hover:bg-accent" : "bg-tertiary"
          }`}
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}
