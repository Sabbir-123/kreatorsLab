/**
 * Kreators Lab Privacy-Conscious Analytics & Conversion Tracking Helper
 * 
 * Safely tracks user milestones (CTA clicks, project views, inquiries)
 * without capturing personal details or sensitive data from children.
 * Integrates with Google Analytics 4 (window.gtag) when configured.
 */

type AnalyticsEventName =
  | "program_view"
  | "cta_click"
  | "project_view"
  | "program_finder_interaction"
  | "parent_inquiry_start"
  | "parent_inquiry_submit"
  | "camp_video_open";

interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  program_name?: string;
  project_name?: string;
  grade_level?: string;
  location?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: AnalyticsEventParams
) {
  if (typeof window === "undefined") return;

  // If GA4 gtag exists on window, dispatch safely
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...params,
      send_to_production: process.env.NODE_ENV === "production",
    });
  }

  // Development logger for conversion testing
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[KreatorsLab Analytics Event] ${eventName}`, params);
  }
}
