import Script from "next/script";

/**
 * Google Consent Mode v2 bootstrap.
 *
 * Loads BEFORE any third-party analytics/advertising script.
 * Sets all storage to "denied" by default (EU/GDPR compliant), then — if the
 * user has previously given consent — updates immediately from localStorage so
 * the site does not flicker GA off on every reload.
 *
 * This inline script must run before `next/script` loads gtag.js, so it uses
 * strategy="beforeInteractive" and is rendered inside the root layout's <head>.
 */
export function ConsentBootstrap() {
  const inline = `
    (function () {
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      window.gtag = window.gtag || gtag;

      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500
      });

      try {
        var raw = localStorage.getItem('mas_consent_v1');
        if (raw) {
          var c = JSON.parse(raw);
          gtag('consent', 'update', {
            analytics_storage: c.analytics ? 'granted' : 'denied',
            ad_storage: c.marketing ? 'granted' : 'denied',
            ad_user_data: c.marketing ? 'granted' : 'denied',
            ad_personalization: c.marketing ? 'granted' : 'denied'
          });
          window.__masConsent = c;
        }
      } catch (e) { /* noop */ }
    })();
  `;

  return (
    <Script
      id="mas-consent-bootstrap"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: inline }}
    />
  );
}
