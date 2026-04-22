"use client";

import Script from "next/script";
import { useLocalStorageJSON } from "./useLocalStorage";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/**
 * Client-side loader for Google Analytics 4.
 *
 * The `gtag.js` tag is only injected into the DOM once the user has granted
 * `analytics_storage`. Consent Mode v2 defaults (see ConsentBootstrap) ensure
 * that even if GA were somehow loaded, no identifying cookies would be set
 * until consent is granted — this component is the belt alongside those braces.
 *
 * Configure the GA measurement ID via `NEXT_PUBLIC_GA_ID` (e.g. G-XXXXXXXXXX).
 * When the variable is empty, nothing is rendered, so local dev and preview
 * builds stay analytics-free.
 */
export function Analytics() {
  const [consent] = useLocalStorageJSON<ConsentState | null>(
    "mas_consent_v1",
    null,
  );
  const analyticsAllowed = Boolean(consent?.analytics);

  if (!GA_ID || !analyticsAllowed) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}
