"use client";

import { openCookieSettings } from "./CookieConsent";

interface CookieSettingsButtonProps {
  label: string;
  variant?: "link" | "pill";
}

/**
 * Thin client button that dispatches the "mas:open-cookie-settings" event
 * consumed by <CookieConsent/>. Safe to render inside server components.
 */
export function CookieSettingsButton({
  label,
  variant = "link",
}: CookieSettingsButtonProps) {
  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={openCookieSettings}
        className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-white transition-all hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none"
    >
      {label}
    </button>
  );
}
