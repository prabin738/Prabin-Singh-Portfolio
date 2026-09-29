"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { ANALYTICS_EVENT_ATTR, ANALYTICS_LOCATION_ATTR } from "@/lib/analytics";

// One delegated listener for every element marked with trackClick(), so tracked
// buttons don't each need their own client component. Only rendered next to
// <GoogleAnalytics>, so it never runs where GA isn't loaded.
export function AnalyticsClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const tracked = event.target.closest(`[${ANALYTICS_EVENT_ATTR}]`);
      const name = tracked?.getAttribute(ANALYTICS_EVENT_ATTR);
      if (!tracked || !name) return;

      sendGAEvent("event", name, { location: tracked.getAttribute(ANALYTICS_LOCATION_ATTR) ?? undefined });
    };

    // Capture phase, so the event is sent even if a handler stops propagation.
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
