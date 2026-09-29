// GA4 custom events from docs/08-seo-performance.md, section 9. Server components
// mark a clickable element with these data attributes instead of an onClick, and
// the single client-side AnalyticsClickTracker reports the click. That keeps
// sections like Services and Contact as server components.

export type AnalyticsEvent = "whatsapp_click";

export const ANALYTICS_EVENT_ATTR = "data-analytics-event";
export const ANALYTICS_LOCATION_ATTR = "data-analytics-location";

export function trackClick(event: AnalyticsEvent, location: string) {
  return {
    [ANALYTICS_EVENT_ATTR]: event,
    [ANALYTICS_LOCATION_ATTR]: location,
  };
}
