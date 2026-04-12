"use client";

import { useEffect, useRef, useState } from "react";

export interface GuaranteeCard {
  step: string;
  title: string;
  description: string;
}

interface GuaranteeSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  cards: GuaranteeCard[];
  footnote: string;
  notCoveredTitle: string;
  notCoveredItems: string[];
}

export function GuaranteeSection({
  kicker,
  title,
  subtitle,
  cards,
  footnote,
  notCoveredTitle,
  notCoveredItems,
}: GuaranteeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className="relative overflow-hidden border-t border-white/[0.06] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div
          className={`mb-10 text-center transition-all duration-700 ease-out md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[38px]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/70 md:text-sm">
            {subtitle}
          </p>
        </div>

        {/* Top row */}
        <div className="relative mb-10 md:mb-12">
          <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-white/[0.04] md:block" />

          <div className="relative z-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`relative text-center transition-all duration-700 ease-out md:text-left ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: `${180 + i * 80}ms` }}
              >
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/35 md:text-xs">
                  {card.step}
                </p>

                <h3 className="mb-1.5 text-[18px] font-semibold tracking-[-0.01em] md:text-[20px]">
                  {card.title}
                </h3>

                <p className="mx-auto max-w-[280px] text-sm leading-[1.6] text-white/[0.7] md:mx-0">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p
          className={`mx-auto mb-14 max-w-2xl text-center text-xs leading-relaxed text-white/38 transition-all duration-700 ease-out md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "460ms" }}
        >
          {footnote}
        </p>

        {/* Divider before lower section */}
        <div
          className={`mx-auto mb-10 h-px w-full max-w-[800px] transition-opacity duration-700 md:mb-12 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "520ms",
          }}
        />

        {/* Not covered section */}
        <div
          className={`mx-auto max-w-[900px] transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "560ms" }}
        >
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/35 md:text-xs">
              {notCoveredTitle}
            </p>

            <p className="mx-auto max-w-xl text-sm leading-[1.7] text-white/[0.48]">
              Primeri situacij, kjer poškodbe ali obraba niso več del studijske odgovornosti.
            </p>
          </div>

          <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 md:gap-x-14 md:gap-y-7">
            <div className="space-y-6 md:space-y-7">
              {leftItems.map((line, i) => (
                <div
                  key={`left-${i}`}
                  className={`flex items-start gap-4 transition-all duration-700 ease-out ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${620 + i * 60}ms` }}
                >
                  <span className="mt-[11px] block h-px w-4 shrink-0 bg-white/[0.22]" />
                  <p className="text-sm leading-[1.75] text-white/[0.64]">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-6 md:space-y-7">
              {rightItems.map((line, i) => (
                <div
                  key={`right-${i}`}
                  className={`flex items-start gap-4 transition-all duration-700 ease-out ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${740 + i * 60}ms` }}
                >
                  <span className="mt-[11px] block h-px w-4 shrink-0 bg-white/[0.22]" />
                  <p className="text-sm leading-[1.75] text-white/[0.64]">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom anchor line */}
        <div
          className={`mx-auto mt-16 h-px w-full max-w-[800px] transition-opacity duration-700 md:mt-20 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "860ms",
          }}
        />
      </div>

      {/* Subtle center glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-full w-[720px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_70%)]" />
      </div>
    </section>
  );
}