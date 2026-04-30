"use client";

import { track } from "@vercel/analytics";

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(
  eventName: string,
  properties?: EventProperties
) {
  try {
    if (typeof window === "undefined") {
      return;
    }

    track(eventName, properties);
  } catch {
    // Analytics should never block the user experience.
  }
}
