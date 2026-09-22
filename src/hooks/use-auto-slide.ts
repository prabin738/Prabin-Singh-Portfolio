import { useEffect, type RefObject } from "react";

// Mobile-only: gently bounces a horizontally-scrollable row back and forth so
// it reads as scrollable, while a touch/pointer drag pauses it and hands
// control back to native scrolling; it resumes a couple seconds after the
// interaction ends.
const AUTO_SLIDE_PX_PER_FRAME = 0.6;
const AUTO_SLIDE_RESUME_DELAY_MS = 2000;

export function useAutoSlide(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const track = ref.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let direction: 1 | -1 = 1;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const step = () => {
      if (!paused) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0) {
          let next = track.scrollLeft + direction * AUTO_SLIDE_PX_PER_FRAME;
          if (next >= maxScroll) {
            next = maxScroll;
            direction = -1;
          } else if (next <= 0) {
            next = 0;
            direction = 1;
          }
          track.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, AUTO_SLIDE_RESUME_DELAY_MS);
    };

    track.addEventListener("pointerdown", pause);
    track.addEventListener("pointerup", scheduleResume);
    track.addEventListener("pointercancel", scheduleResume);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("pointerup", scheduleResume);
      track.removeEventListener("pointercancel", scheduleResume);
    };
  }, [ref]);
}
