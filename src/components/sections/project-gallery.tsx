"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectType } from "@content/data/projects";
import { getImage, hasImage } from "@/lib/images";
import { cn } from "@/lib/utils";

// Phone screenshots are portrait; a landscape crop would lose most of the screen.
const TYPE_ASPECT: Record<ProjectType, string> = {
  mobile: "aspect-9/16",
  web: "aspect-4/3 sm:aspect-video",
  backend: "aspect-4/3 sm:aspect-video",
};
const TYPE_COVER_WIDTH: Record<ProjectType, string> = { mobile: "max-w-xs", web: "max-w-2xl", backend: "max-w-2xl" };

type Shot = { src: string; alt: string };

type ProjectGalleryProps = {
  type: ProjectType;
  cover: Shot;
  gallery?: Shot[];
  emptyCoverFallback: ReactNode;
};

export function ProjectGallery({ type, cover, gallery, emptyCoverFallback }: ProjectGalleryProps) {
  const hasCover = hasImage(cover.src);
  const shots = (gallery ?? []).filter((shot) => hasImage(shot.src));
  const images = hasCover ? [cover, ...shots] : shots;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const show = useCallback((delta: number) => {
    setIndex((current) => (current + delta + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!dialogRef.current?.open) return;
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [show]);

  const active = images[index];
  const activeMeta = active ? getImage(active.src) : undefined;

  return (
    <>
      <div
        className={cn(
          "relative mt-8 w-full overflow-hidden rounded-3xl border border-line bg-raised",
          TYPE_ASPECT[type],
          TYPE_COVER_WIDTH[type],
        )}
      >
        {hasCover ? (
          <button
            type="button"
            onClick={() => openAt(0)}
            aria-label={`Expand image: ${cover.alt}`}
            className="group absolute inset-0 h-full w-full cursor-zoom-in"
          >
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>
        ) : (
          <div className="flex h-full w-full items-center justify-center">{emptyCoverFallback}</div>
        )}
      </div>

      {shots.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => openAt(hasCover ? i + 1 : i)}
              aria-label={`Expand image: ${shot.alt}`}
              className={cn(
                "group relative w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-raised",
                TYPE_ASPECT[type],
              )}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label="Image preview"
        className="fixed inset-0 h-dvh w-dvw max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-black/85"
      >
        {active ? (
          <div className="relative h-full w-full" onClick={close}>
            <div className="flex h-full w-full items-center justify-center p-4 sm:p-10">
              <div
                className="relative flex max-h-full max-w-full flex-col items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  width={activeMeta?.width ?? 1600}
                  height={activeMeta?.height ?? 900}
                  sizes="95vw"
                  className="max-h-[80dvh] w-auto max-w-[92vw] rounded-xl object-contain"
                />
                <p className="max-w-[92vw] text-center text-sm text-white/80">{active.alt}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close preview"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={20} aria-hidden />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    show(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
                >
                  <ChevronLeft size={22} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    show(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
                >
                  <ChevronRight size={22} aria-hidden />
                </button>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                  {index + 1} / {images.length}
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
