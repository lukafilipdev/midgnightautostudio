"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorageJSON } from "./useLocalStorage";

type Lang = "sl" | "en" | "de";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "mas_consent_v1";

type ConsentDict = {
  bannerTitle: string;
  bannerBody: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  close: string;
  prefsTitle: string;
  prefsIntro: string;
  necessaryTitle: string;
  necessaryBody: string;
  analyticsTitle: string;
  analyticsBody: string;
  marketingTitle: string;
  marketingBody: string;
  alwaysOn: string;
  privacyLink: string;
  cookiesLink: string;
  updatedLabel: string;
};

const DICTS: Record<Lang, ConsentDict> = {
  sl: {
    bannerTitle: "Piškotki in zasebnost",
    bannerBody:
      "Uporabljamo nujne piškotke za delovanje spletne strani. Z vašim soglasjem uporabljamo tudi analitične piškotke (Google Analytics), da razumemo, kako se stran uporablja, in jo izboljšujemo. Marketinške piškotke uporabljamo samo, če jih izrecno dovolite. Svoje nastavitve lahko kadar koli spremenite v nogi strani.",
    acceptAll: "SPREJMI VSE",
    rejectAll: "ZAVRNI IZBIRNE",
    customize: "NASTAVITVE",
    save: "SHRANI IZBIRO",
    close: "Zapri",
    prefsTitle: "Nastavitve piškotkov",
    prefsIntro:
      "Spodaj lahko izberete, katere kategorije piškotkov dovolite. Nujni piškotki so potrebni za delovanje strani in jih ni mogoče izklopiti.",
    necessaryTitle: "Nujni",
    necessaryBody:
      "Omogočajo osnovne funkcije kot so navigacija, varnost in shranjevanje vaše izbire piškotkov. Brez njih stran ne deluje pravilno.",
    analyticsTitle: "Analitični",
    analyticsBody:
      "Google Analytics 4 – anonimizirano merjenje obiska in uspešnosti strani. IP je skrajšan, oglasne funkcije so izklopljene.",
    marketingTitle: "Marketinški",
    marketingBody:
      "Uporabili bi se za merjenje učinkovitosti oglaševanja in personalizacijo vsebin. Trenutno niso aktivni, zato ostanejo izklopljeni.",
    alwaysOn: "Vedno aktivno",
    privacyLink: "Politika zasebnosti",
    cookiesLink: "Politika piškotkov",
    updatedLabel: "Zadnja posodobitev",
  },
  en: {
    bannerTitle: "Cookies & privacy",
    bannerBody:
      "We use strictly necessary cookies to make this site work. With your consent we also use analytics cookies (Google Analytics) to understand how the site is used and improve it. Marketing cookies are only set if you explicitly allow them. You can change your choice any time from the footer.",
    acceptAll: "ACCEPT ALL",
    rejectAll: "REJECT OPTIONAL",
    customize: "CUSTOMIZE",
    save: "SAVE CHOICES",
    close: "Close",
    prefsTitle: "Cookie preferences",
    prefsIntro:
      "Choose which categories of cookies you allow. Strictly necessary cookies are required for the site to function and cannot be turned off.",
    necessaryTitle: "Strictly necessary",
    necessaryBody:
      "Enable core functionality such as navigation, security and remembering your cookie choice. The site cannot work properly without them.",
    analyticsTitle: "Analytics",
    analyticsBody:
      "Google Analytics 4 — anonymised measurement of site usage and performance. IP is truncated and advertising features are disabled.",
    marketingTitle: "Marketing",
    marketingBody:
      "Would be used to measure ad performance and personalise content. We currently do not run any, so this stays off.",
    alwaysOn: "Always on",
    privacyLink: "Privacy Policy",
    cookiesLink: "Cookie Policy",
    updatedLabel: "Last updated",
  },
  de: {
    bannerTitle: "Cookies & Datenschutz",
    bannerBody:
      "Wir verwenden ausschließlich notwendige Cookies, damit diese Website funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich Analyse-Cookies (Google Analytics), um die Nutzung zu verstehen und die Seite zu verbessern. Marketing-Cookies setzen wir nur, wenn Sie das ausdrücklich erlauben. Sie können Ihre Auswahl jederzeit in der Fußzeile ändern.",
    acceptAll: "ALLE AKZEPTIEREN",
    rejectAll: "OPTIONALE ABLEHNEN",
    customize: "ANPASSEN",
    save: "AUSWAHL SPEICHERN",
    close: "Schließen",
    prefsTitle: "Cookie-Einstellungen",
    prefsIntro:
      "Wählen Sie, welche Kategorien von Cookies Sie zulassen. Notwendige Cookies sind für den Betrieb der Seite erforderlich und können nicht deaktiviert werden.",
    necessaryTitle: "Notwendig",
    necessaryBody:
      "Ermöglichen Grundfunktionen wie Navigation, Sicherheit und das Speichern Ihrer Cookie-Auswahl. Ohne sie funktioniert die Seite nicht korrekt.",
    analyticsTitle: "Analyse",
    analyticsBody:
      "Google Analytics 4 – anonymisierte Messung der Nutzung und Performance der Seite. IP wird gekürzt, Werbefunktionen sind deaktiviert.",
    marketingTitle: "Marketing",
    marketingBody:
      "Würden zur Erfolgsmessung von Werbung und zur Personalisierung verwendet. Derzeit nicht aktiv und deshalb deaktiviert.",
    alwaysOn: "Immer aktiv",
    privacyLink: "Datenschutzerklärung",
    cookiesLink: "Cookie-Richtlinie",
    updatedLabel: "Zuletzt aktualisiert",
  },
};

function pushConsentToGtag(consent: Consent) {
  type GtagFn = (
    command: "consent",
    action: "update",
    params: Record<string, "granted" | "denied">,
  ) => void;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }
  window.dispatchEvent(
    new CustomEvent("mas:consent-change", { detail: consent }),
  );
}

interface CookieConsentProps {
  lang: Lang;
}

export function CookieConsent({ lang }: CookieConsentProps) {
  const t = useMemo(() => DICTS[lang], [lang]);

  const [storedConsent, setStoredConsent] = useLocalStorageJSON<Consent | null>(
    STORAGE_KEY,
    null,
  );

  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(storedConsent?.analytics ?? false);
  const [marketing, setMarketing] = useState(storedConsent?.marketing ?? false);
  const hasChoice = storedConsent !== null;

  useEffect(() => {
    const openSettings = () => {
      setAnalytics(storedConsent?.analytics ?? false);
      setMarketing(storedConsent?.marketing ?? false);
      setPrefsOpen(true);
    };
    window.addEventListener("mas:open-cookie-settings", openSettings);
    return () => {
      window.removeEventListener("mas:open-cookie-settings", openSettings);
    };
  }, [storedConsent]);

  useEffect(() => {
    if (!prefsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrefsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [prefsOpen]);

  const persist = useCallback(
    (next: { analytics: boolean; marketing: boolean }) => {
      const consent: Consent = {
        necessary: true,
        analytics: next.analytics,
        marketing: next.marketing,
        updatedAt: new Date().toISOString(),
      };
      setStoredConsent(consent);
      pushConsentToGtag(consent);
      setAnalytics(next.analytics);
      setMarketing(next.marketing);
      setPrefsOpen(false);
    },
    [setStoredConsent],
  );

  const acceptAll = useCallback(
    () => persist({ analytics: true, marketing: true }),
    [persist],
  );
  const rejectAll = useCallback(
    () => persist({ analytics: false, marketing: false }),
    [persist],
  );
  const saveCurrent = useCallback(
    () => persist({ analytics, marketing }),
    [persist, analytics, marketing],
  );

  const bannerVisible = !hasChoice && !prefsOpen;

  if (!bannerVisible && !prefsOpen) return null;

  return (
    <>
      {bannerVisible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t.bannerTitle}
          className="fixed inset-x-3 bottom-3 z-[90] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-[420px]"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-black/90 p-5 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-[1px] w-6 bg-white/40" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                {t.bannerTitle}
              </span>
            </div>
            <p className="mb-4 text-[13px] leading-relaxed text-white/70">
              {t.bannerBody}{" "}
              <Link
                href="/privacy"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                {t.privacyLink}
              </Link>
              {" · "}
              <Link
                href="/cookies"
                className="underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                {t.cookiesLink}
              </Link>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-black transition-all hover:-translate-y-[1px] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {t.acceptAll}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white transition-all hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {t.rejectAll}
              </button>
              <button
                type="button"
                onClick={() => setPrefsOpen(true)}
                className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {t.customize}
              </button>
            </div>
          </div>
        </div>
      )}

      {prefsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.prefsTitle}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          <button
            type="button"
            aria-label={t.close}
            onClick={() => setPrefsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/[0.08] bg-[#0a0a0a] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:max-w-lg sm:rounded-3xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                  {t.bannerTitle}
                </div>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  {t.prefsTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPrefsOpen(false)}
                aria-label={t.close}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="mb-5 text-[13px] leading-relaxed text-white/65">
                {t.prefsIntro}
              </p>

              <CategoryRow
                title={t.necessaryTitle}
                body={t.necessaryBody}
                checked
                disabled
                onChange={() => {}}
                alwaysOnLabel={t.alwaysOn}
              />
              <CategoryRow
                title={t.analyticsTitle}
                body={t.analyticsBody}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                title={t.marketingTitle}
                body={t.marketingBody}
                checked={marketing}
                onChange={setMarketing}
              />

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
                <Link
                  href="/privacy"
                  className="underline decoration-white/20 underline-offset-4 hover:text-white/80"
                >
                  {t.privacyLink}
                </Link>
                <Link
                  href="/cookies"
                  className="underline decoration-white/20 underline-offset-4 hover:text-white/80"
                >
                  {t.cookiesLink}
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/[0.06] px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                {t.rejectAll}
              </button>
              <button
                type="button"
                onClick={saveCurrent}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-white transition-all hover:border-white/50 hover:bg-white/5"
              >
                {t.save}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] text-black transition-all hover:-translate-y-[1px] hover:bg-white/90"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface CategoryRowProps {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  alwaysOnLabel?: string;
}

function CategoryRow({
  title,
  body,
  checked,
  disabled,
  onChange,
  alwaysOnLabel,
}: CategoryRowProps) {
  return (
    <div className="mb-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold tracking-wide text-white">
            {title}
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-white/60">
            {body}
          </p>
        </div>

        {disabled ? (
          <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-white/60">
            {alwaysOnLabel}
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
              checked
                ? "border-white/40 bg-white"
                : "border-white/15 bg-white/[0.04]"
            }`}
          >
            <span
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${
                checked ? "left-[22px] bg-black" : "left-[3px] bg-white/70"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Imperative helper for the footer link — dispatches a window event that
 * CookieConsent listens for. Kept outside the component so it can be called
 * without importing the component's internals.
 */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("mas:open-cookie-settings"));
}
