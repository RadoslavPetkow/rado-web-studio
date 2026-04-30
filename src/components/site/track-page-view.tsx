"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function TrackPageView({
  eventName,
  properties,
}: {
  eventName: string;
  properties?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackEvent(eventName, properties);
  }, [eventName, properties]);

  return null;
}
