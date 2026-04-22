"use client";

import Link from "next/link";
import { openCookieSettings } from "./CookieConsent";

interface FooterProps {
  tagline: string;
  privacyLabel: string;
  cookiesLabel: string;
  settingsLabel: string;
}

export function Footer({
  tagline,
  privacyLabel,
  cookiesLabel,
  settingsLabel,
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-white/[0.08]" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] text-sm text-white/70">
              M
            </div>
            <div className="h-px w-10 bg-white/[0.08]" />
          </div>

          <p className="text-sm md:text-[15px] text-white/[0.62] leading-relaxed max-w-[520px]">
            {tagline}
          </p>

          <p className="mt-6 text-[11px] md:text-xs tracking-[0.28em] uppercase text-white/35">
            Midnight Auto Studio
          </p>

          <nav
            aria-label="Legal"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] tracking-[0.14em] uppercase text-white/45"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              {privacyLabel}
            </Link>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <Link
              href="/cookies"
              className="transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              {cookiesLabel}
            </Link>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <button
              type="button"
              onClick={openCookieSettings}
              className="transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              {settingsLabel}
            </button>
          </nav>

          <div
            className="mt-10 h-px w-full max-w-[720px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-full w-[720px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_70%)]" />
      </div>
    </footer>
  );
}
