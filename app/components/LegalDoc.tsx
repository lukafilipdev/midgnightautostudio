"use client";

import Link from "next/link";
import { useLocalStorageString } from "./useLocalStorage";

type Lang = "sl" | "en" | "de";

const LANGS: { key: Lang; label: string }[] = [
  { key: "sl", label: "SI" },
  { key: "en", label: "EN" },
  { key: "de", label: "DE" },
];

const ALLOWED_LANGS = ["sl", "en", "de"] as const;

interface LegalDocProps {
  titles: Record<Lang, string>;
  content: Record<Lang, React.ReactNode>;
  backLabels?: Record<Lang, string>;
}

/**
 * Tri-language legal document shell with a language toggle matching the
 * Navbar's aesthetic. The active language is remembered in `localStorage`
 * under `mas_lang` so it stays in sync with the main site.
 */
export function LegalDoc({ titles, content, backLabels }: LegalDocProps) {
  const [lang, setLang] = useLocalStorageString<Lang>(
    "mas_lang",
    ALLOWED_LANGS,
    "sl",
  );
  const changeLang = setLang;

  const back =
    backLabels?.[lang] ??
    (lang === "sl"
      ? "Nazaj na stran"
      : lang === "de"
        ? "Zurück zur Startseite"
        : "Back to home");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 sm:pt-32">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/55 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> {back}
          </Link>
          <div className="relative grid grid-cols-3 rounded-full bg-white/10 p-1 backdrop-blur-md">
            {LANGS.map((item) => {
              const isActive = lang === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => changeLang(item.key)}
                  className={`relative z-10 min-w-[44px] rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] transition-colors ${
                    isActive ? "bg-white text-black" : "text-white/70 hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <h1 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
          {titles[lang]}
        </h1>

        <article className="prose-legal">{content[lang]}</article>
      </div>

      <style jsx global>{`
        .prose-legal {
          color: rgba(255, 255, 255, 0.72);
          font-size: 15px;
          line-height: 1.75;
        }
        .prose-legal h2 {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 2rem 0 0.75rem;
        }
        .prose-legal h3 {
          color: rgba(255, 255, 255, 0.92);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin: 1.5rem 0 0.5rem;
        }
        .prose-legal p {
          margin: 0.75rem 0;
        }
        .prose-legal ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin: 0.75rem 0;
        }
        .prose-legal li {
          margin: 0.35rem 0;
        }
        .prose-legal a {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: rgba(255, 255, 255, 0.25);
          text-underline-offset: 3px;
        }
        .prose-legal table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 13px;
        }
        .prose-legal th,
        .prose-legal td {
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.55rem 0.75rem;
          text-align: left;
          vertical-align: top;
        }
        .prose-legal th {
          background: rgba(255, 255, 255, 0.04);
          font-weight: 600;
          color: #fff;
        }
      `}</style>
    </main>
  );
}
