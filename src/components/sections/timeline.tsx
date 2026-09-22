"use client";

import { useEffect, useRef, useState } from "react";
import type { ExperienceEntry } from "@content/data/experience";
import { cn } from "@/lib/utils";

function TimelineCard({ entry, isLeft, active }: { entry: ExperienceEntry; isLeft: boolean; active: boolean }) {
  // The border sweeps in from the rail-facing side outward: connector reaches the near
  // edge first, then top/bottom follow, then the far edge completes the loop.
  const nearDelay = 150;
  const midDelay = 300;
  const farDelay = 450;
  const sideDelays = isLeft
    ? { top: midDelay, right: nearDelay, bottom: midDelay, left: farDelay }
    : { top: midDelay, right: farDelay, bottom: midDelay, left: nearDelay };

  return (
    <div
      className={cn(
        "rounded-xl border bg-raised p-4 sm:w-full sm:max-w-xl",
        isLeft ? "sm:ml-auto" : "sm:mr-auto",
        active
          ? "border-t-primary-fg border-r-primary-fg border-b-primary-fg border-l-primary-fg"
          : "border-t-line border-r-line border-b-line border-l-line",
      )}
      style={{
        transitionProperty: "border-top-color, border-right-color, border-bottom-color, border-left-color",
        transitionDuration: "300ms",
        transitionDelay: `${sideDelays.top}ms, ${sideDelays.right}ms, ${sideDelays.bottom}ms, ${sideDelays.left}ms`,
      }}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-subtle">{entry.dates}</p>
      <h3
        className={cn(
          "mt-1 text-lg font-semibold leading-[1.2] tracking-[-0.01em] transition-colors delay-150 duration-300",
          active ? "text-primary-fg" : "text-fg",
        )}
      >
        {entry.role}
      </h3>
      <p className="text-sm text-muted">{entry.company}</p>

      <hr className="my-3 border-line" />

      <ul className="flex flex-col gap-1">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-muted">
            <span className="text-subtle" aria-hidden>
              &bull;
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineConnector({ isLeft, active }: { isLeft: boolean; active: boolean }) {
  const color = active ? "bg-primary-fg" : "bg-line-strong";

  return (
    <>
      <span
        className={cn(
          "absolute left-4 top-6 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-surface transition-colors duration-200 sm:left-1/2",
          color,
        )}
        aria-hidden
      />
      <span
        className={cn(
          "absolute left-4 top-6 h-0.5 w-4 -translate-y-1/2 transition-colors duration-200",
          isLeft ? "sm:left-auto sm:right-1/2 sm:w-8" : "sm:left-1/2 sm:w-8",
          color,
        )}
        aria-hidden
      />
    </>
  );
}

function TimelineRow({
  entry,
  isLeft,
  active,
  rowRef,
}: {
  entry: ExperienceEntry;
  isLeft: boolean;
  active: boolean;
  rowRef: (el: HTMLLIElement | null) => void;
}) {
  return (
    <li ref={rowRef} className="relative pl-8 sm:grid sm:grid-cols-2 sm:gap-x-16 sm:pl-0">
      <TimelineConnector isLeft={isLeft} active={active} />
      {isLeft ? <TimelineCard entry={entry} isLeft active={active} /> : <span className="hidden sm:block" aria-hidden />}
      {isLeft ? <span className="hidden sm:block" aria-hidden /> : <TimelineCard entry={entry} isLeft={false} active={active} />}
    </li>
  );
}

type TimelineProps = {
  entries: ExperienceEntry[];
};

const DOT_OFFSET = 24; // matches TimelineConnector's top-6

export function Timeline({ entries }: TimelineProps) {
  const currentIndex = entries.findIndex((entry) => entry.current);
  const [activeIndex, setActiveIndex] = useState(currentIndex === -1 ? 0 : currentIndex);
  const [fillHeight, setFillHeight] = useState(0);
  const olRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current;
    const distanceFromCenter = (rect: DOMRect) => Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries.filter((observerEntry) => observerEntry.isIntersecting);
        if (visible.length === 0) return;

        const closest = visible.reduce((a, b) =>
          distanceFromCenter(a.boundingClientRect) < distanceFromCenter(b.boundingClientRect) ? a : b,
        );
        const index = rows.indexOf(closest.target as HTMLLIElement);
        if (index !== -1) setActiveIndex(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    rows.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    const updateFill = () => {
      const olEl = olRef.current;
      const rowEl = rowRefs.current[activeIndex];
      if (!olEl || !rowEl) return;
      const offset = rowEl.getBoundingClientRect().top - olEl.getBoundingClientRect().top + DOT_OFFSET;
      setFillHeight(offset);
    };

    updateFill();
    window.addEventListener("resize", updateFill);
    return () => window.removeEventListener("resize", updateFill);
  }, [activeIndex]);

  const reachedEnd = activeIndex === entries.length - 1;

  return (
    <ol ref={olRef} className="relative flex flex-col gap-8 pt-4 sm:gap-10">
      {/* The rail: a shaft, an arrowhead at the top and a notched tail at the bottom, read as one arrow.
          The primary-colored overlay grows to the active entry's dot as you scroll, so the whole arrow
          tracks reading progress. */}
      <span
        className="pointer-events-none absolute left-4 top-3 bottom-3 w-0.5 -translate-x-1/2 bg-line-strong sm:left-1/2"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-4 top-3 w-0.5 -translate-x-1/2 bg-primary-fg transition-[height] duration-500 ease-out sm:left-1/2"
        style={{ height: Math.max(fillHeight - 12, 0) }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-4 top-0 h-0 w-0 -translate-x-1/2 border-x-[6px] border-x-transparent border-b-11 border-b-primary-fg sm:left-1/2"
        aria-hidden
      />
      <span
        className={cn(
          "pointer-events-none absolute left-4 bottom-0 h-3.5 w-5 -translate-x-1/2 transition-colors duration-500 sm:left-1/2",
          reachedEnd ? "bg-primary-fg" : "bg-line-strong",
        )}
        style={{ clipPath: "polygon(0% 0%, 50% 40%, 100% 0%, 50% 100%)" }}
        aria-hidden
      />

      {entries.map((entry, index) => (
        <TimelineRow
          key={`${entry.company}-${entry.role}`}
          entry={entry}
          isLeft={index % 2 === 0}
          active={activeIndex === index}
          rowRef={(el) => {
            rowRefs.current[index] = el;
          }}
        />
      ))}
    </ol>
  );
}
