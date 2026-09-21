"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { pointOnRoundedRect, roundedRectPerimeter } from "@/lib/rounded-rect-path";
import { cn } from "@/lib/utils";

const LAP_DURATION_MS = 20_000;
const ROAD_INSET = 16;
const ROAD_RADIUS = 20;
const CAR_WIDTH = 48;
const CAR_HEIGHT = 26;
const DOT_SPACING = 36;
const TRAIL_FRACTION = 0.12;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type RoadDot = {
  progress: number;
  x: number;
  y: number;
};

function buildDots(width: number, height: number): RoadDot[] {
  if (width === 0 || height === 0) return [];
  const perimeter = roundedRectPerimeter(width, height, ROAD_RADIUS);
  const count = Math.max(8, Math.round(perimeter / DOT_SPACING));

  return Array.from({ length: count }, (_, i) => {
    const progress = i / count;
    const { x, y } = pointOnRoundedRect(progress, width, height, ROAD_RADIUS);
    return { progress, x, y };
  });
}

function parkCar(car: HTMLDivElement, width: number, height: number) {
  const { x, y } = pointOnRoundedRect(0, width, height, ROAD_RADIUS);
  car.style.transform = `translate3d(${x - CAR_WIDTH / 2}px, ${y - CAR_HEIGHT / 2}px, 0) rotate(0deg)`;
}

function resetDots(dots: RoadDot[], overlayRefs: Array<HTMLDivElement | null>) {
  dots.forEach((_, i) => {
    const overlay = overlayRefs[i];
    if (!overlay) return;
    overlay.style.opacity = "0";
    overlay.style.transform = "scale(1)";
  });
}

export function FrameCar() {
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const progressRef = useRef(0);
  const lastFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const dots = useMemo(() => buildDots(size.width, size.height), [size.width, size.height]);

  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      sizeRef.current = { width, height };
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    });
    observer.observe(road);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(entry ? entry.isIntersecting : true);
      },
      { threshold: 0 },
    );
    observer.observe(road);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const car = carRef.current;
    if (!car) return;

    const { width, height } = sizeRef.current;
    const shouldPark = reducedMotion || paused || width === 0 || height === 0;

    if (shouldPark) {
      parkCar(car, width, height);
      progressRef.current = 0;
      resetDots(dots, overlayRefs.current);
      runningRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    if (!visible) {
      runningRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    runningRef.current = true;

    const step = (time: number) => {
      if (!runningRef.current) return;
      if (lastFrameRef.current === 0) lastFrameRef.current = time;
      const delta = time - lastFrameRef.current;
      lastFrameRef.current = time;

      const carProgress = (progressRef.current + delta / LAP_DURATION_MS) % 1;
      progressRef.current = carProgress;

      const { width: w, height: h } = sizeRef.current;
      const { x, y, angle } = pointOnRoundedRect(carProgress, w, h, ROAD_RADIUS);
      car.style.transform = `translate3d(${x - CAR_WIDTH / 2}px, ${y - CAR_HEIGHT / 2}px, 0) rotate(${angle}deg)`;

      for (let i = 0; i < dots.length; i++) {
        const overlay = overlayRefs.current[i];
        if (!overlay) continue;
        const behind = (carProgress - dots[i].progress + 1) % 1;
        if (behind <= TRAIL_FRACTION) {
          const t = 1 - behind / TRAIL_FRACTION;
          overlay.style.opacity = String(t);
          overlay.style.transform = `scale(${1 + 0.6 * t})`;
        } else {
          overlay.style.opacity = "0";
          overlay.style.transform = "scale(1)";
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    lastFrameRef.current = 0;
    rafRef.current = requestAnimationFrame(step);

    return () => {
      runningRef.current = false;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [reducedMotion, visible, paused, dots]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div ref={roadRef} className="absolute" style={{ inset: ROAD_INSET }}>
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line-strong"
            style={{ left: dot.x, top: dot.y }}
          >
            <div
              ref={(el) => {
                overlayRefs.current[i] = el;
              }}
              className="absolute inset-0 rounded-full bg-marigold opacity-0"
            />
          </div>
        ))}

        <div
          ref={carRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: CAR_WIDTH, height: CAR_HEIGHT, transformOrigin: "50% 50%" }}
        >
          <div
            className={cn(
              "absolute top-1/2 left-full h-4 w-6 -translate-y-1/2",
              "bg-linear-to-r from-marigold/35 to-transparent",
              "[clip-path:polygon(0%_50%,100%_0%,100%_100%)]",
            )}
          />
          <CarSvg />
        </div>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Play car animation" : "Pause car animation"}
        onClick={() => setPaused((value) => !value)}
        className={cn(
          "pointer-events-auto absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center",
          "rounded-full border border-line bg-surface text-fg transition-colors hover:border-primary-fg",
        )}
      >
        {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </div>
  );
}

function CarSvg() {
  return (
    <svg viewBox="0 0 48 26" width={CAR_WIDTH} height={CAR_HEIGHT} className="block overflow-visible">
      {/* Tail lights (back, left) */}
      <rect x="1" y="11" width="2.2" height="1.6" rx="0.6" className="fill-primary" />
      <rect x="1" y="13.8" width="2.2" height="1.6" rx="0.6" className="fill-primary" />

      <rect x="3" y="10.5" width="34" height="5" rx="2" className="fill-primary" />
      <path d="M11 10.5 L17 4 H31 L37 10.5 Z" className="fill-primary" />
      <path d="M18 9.5 L21 5.5 H29 L32 9.5 Z" className="fill-muted" />
      <circle cx="13" cy="19.5" r="4" className="fill-line-strong" />
      <circle cx="31" cy="19.5" r="4" className="fill-line-strong" />

      {/* Headlights (front, right), with a soft marigold glow */}
      <rect
        x="37"
        y="10.7"
        width="3"
        height="1.8"
        rx="0.7"
        className="fill-marigold drop-shadow-[0_0_3px_var(--color-marigold)]"
      />
      <rect
        x="37"
        y="13.5"
        width="3"
        height="1.8"
        rx="0.7"
        className="fill-marigold drop-shadow-[0_0_3px_var(--color-marigold)]"
      />
    </svg>
  );
}
