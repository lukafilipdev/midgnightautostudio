"use client";

import { useEffect, useRef, useState } from "react";

export interface AssurancePillar {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
}

interface AssuranceSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  pillars: [AssurancePillar, AssurancePillar, AssurancePillar];
  footnote: string;
  notCoveredLabel: string;
  notCoveredTitle: string;
  notCoveredIntro: string;
  notCoveredItems: string[];
}

export function AssuranceSection({
  kicker,
  title,
  subtitle,
  pillars,
  footnote,
  notCoveredLabel,
  notCoveredTitle,
  notCoveredIntro,
  notCoveredItems,
}: AssuranceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showNotCovered, setShowNotCovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const leftItems = notCoveredItems.filter((_, i) => i % 2 === 0);
  const rightItems = notCoveredItems.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className="atm-center relative overflow-hidden border-t border-white/[0.06] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[42px]">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {subtitle}
          </p>
        </div>

        {/* 3 pillars */}
        <div className="relative grid gap-8 md:grid-cols-3 md:gap-8">
          {/* Vertical dividers between columns */}
          <div className="pointer-events-none absolute inset-y-6 left-1/3 hidden w-px -translate-x-1/2 bg-white/[0.05] md:block" />
          <div className="pointer-events-none absolute inset-y-6 left-2/3 hidden w-px -translate-x-1/2 bg-white/[0.05] md:block" />

          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`relative px-1 transition-all duration-700 ease-out md:px-6 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${180 + i * 120}ms` }}
            >
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/35 md:text-[11px]">
                {pillar.kicker}
              </p>

              <h3 className="mb-3 text-[20px] font-semibold tracking-[-0.01em] md:text-[22px]">
                {pillar.title}
              </h3>

              <p className="mb-5 text-sm leading-[1.65] text-white/[0.72]">
                {pillar.description}
              </p>

              <ul className="space-y-2.5">
                {pillar.bullets.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm leading-[1.55] text-white/[0.78]"
                  >
                    <span className="mt-[9px] block h-px w-3 shrink-0 bg-white/[0.35]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p
          className={`mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-white/40 transition-all duration-700 ease-out md:mt-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "560ms" }}
        >
          {footnote}
        </p>

        {/* Collapsible "Not covered" */}
        <div
          className={`mx-auto mt-10 max-w-[900px] transition-all duration-700 ease-out md:mt-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "640ms" }}
        >
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowNotCovered((v) => !v)}
              aria-expanded={showNotCovered}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/40 transition-colors hover:text-white/70 md:text-xs"
            >
              <span>{notCoveredLabel}</span>
              <span
                className={`inline-block transition-transform duration-300 ${
                  showNotCovered ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
          </div>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
              showNotCovered
                ? "mt-8 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="mb-8 text-center">
                <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/45 md:text-xs">
                  {notCoveredTitle}
                </p>
                <p className="mx-auto max-w-xl text-sm leading-[1.7] text-white/[0.5]">
                  {notCoveredIntro}
                </p>
              </div>

              <div className="grid gap-x-12 gap-y-5 md:grid-cols-2 md:gap-x-14 md:gap-y-6">
                <div className="space-y-5 md:space-y-6">
                  {leftItems.map((line, i) => (
                    <div
                      key={`left-${i}`}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-[11px] block h-px w-4 shrink-0 bg-white/[0.22]" />
                      <p className="text-sm leading-[1.7] text-white/[0.62]">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-5 md:space-y-6">
                  {rightItems.map((line, i) => (
                    <div
                      key={`right-${i}`}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-[11px] block h-px w-4 shrink-0 bg-white/[0.22]" />
                      <p className="text-sm leading-[1.7] text-white/[0.62]">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
