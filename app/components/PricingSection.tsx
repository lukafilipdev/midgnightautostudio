"use client";

import { useEffect, useRef, useState } from "react";

export interface PricingPack {
  name: string;
  price: string;
  description: string;
  highlight?: boolean;
}

interface PricingSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  packs: [PricingPack, PricingPack, PricingPack];
  recommendedLabel: string;
}

const symbols = ["◇", "🛡", "✦"];

export function PricingSection({
  kicker,
  title,
  subtitle,
  packs,
  recommendedLabel,
}: PricingSectionProps) {
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const renderPrice = (price: string): React.ReactNode => {
    const prefixMatch = price.match(/^(od|from|ab)\s+/i);

    if (prefixMatch) {
      const prefix = prefixMatch[1];
      const amount = price.slice(prefixMatch[0].length);

      return (
        <div className="mb-7 flex items-end justify-center gap-2">
          <span className="pb-2 text-[22px] font-light leading-none tracking-[-0.02em] text-white/55 md:text-[26px]">
            {prefix}
          </span>

          <span className="text-[58px] font-light leading-none tracking-[-0.06em] text-white md:text-[72px]">
            {amount}
          </span>
        </div>
      );
    }

    return (
      <div className="mb-7 flex items-end justify-center">
        <span className="text-[58px] font-light leading-none tracking-[-0.06em] text-white md:text-[72px]">
          {price}
        </span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="atm-center relative overflow-hidden border-t border-white/[0.06] bg-black px-6 py-24 text-center md:py-32"
    >
      {/* Ambient section glow */}
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1220px]">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/45 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-[25px] font-light tracking-[0.34em] text-white md:text-[44px]">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/62 md:text-[15px]">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid items-center gap-8 md:grid-cols-3">
          {packs.map((pack, i) => {
            const isHighlight = Boolean(pack.highlight);

            return (
              <div
                key={i}
                className={`relative isolate transition-all duration-500 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                } ${isHighlight ? "md:-translate-y-5" : ""}`}
                style={{
                  transitionDelay: `${160 + i * 100}ms`,
                }}
              >
                {/* Card-specific glow */}
                <div className="pointer-events-none absolute inset-[-90px] -z-10 overflow-hidden rounded-[54px]">
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      isHighlight
                        ? "h-[560px] w-[380px] bg-white/[0.2] blur-[72px]"
                        : "h-[390px] w-[280px] bg-white/[0.08] blur-[58px]"
                    }`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`relative flex flex-col items-center justify-center overflow-hidden rounded-[34px] border bg-black text-white transition-all duration-500 ${
                    isHighlight
                      ? "min-h-[500px] border-white/85 px-10 pb-16 pt-24 shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_35px_90px_rgba(0,0,0,0.75)] hover:-translate-y-[5px] hover:scale-[1.02]"
                      : "min-h-[395px] border-white/[0.16] px-10 py-14 shadow-[0_25px_75px_rgba(0,0,0,0.65)] hover:-translate-y-[4px] hover:border-white/[0.26]"
                  }`}
                >
                  {/* Recommended Badge */}
                  {isHighlight && (
                    <div className="absolute left-1/2 top-7 flex h-[34px] -translate-x-1/2 items-center justify-center gap-3">
                      <span className="text-[12px] leading-none text-white/80">
                        ✦
                      </span>

                      <div className="flex h-[34px] items-center justify-center rounded-full border border-white/40 bg-black px-5 shadow-[0_0_28px_rgba(255,255,255,0.18)]">
                        <span className="block translate-x-[0.18em] text-[9px] font-bold uppercase leading-none tracking-[0.42em] text-white/90">
                          {recommendedLabel}
                        </span>
                      </div>

                      <span className="text-[12px] leading-none text-white/80">
                        ✦
                      </span>
                    </div>
                  )}

                  {/* Premium Symbol */}
                  <div
                    className={`mb-9 flex items-center justify-center rounded-[22px] border ${
                      isHighlight
                        ? "mt-8 h-[76px] w-[76px] border-white/35 shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                        : "h-[68px] w-[68px] border-white/18"
                    }`}
                  >
                    <span className="text-[30px] text-white/85">
                      {symbols[i]}
                    </span>
                  </div>

                  {/* Package Name */}
                  <p className="mb-7 text-[18px] font-medium uppercase tracking-[0.2em] text-white/90 md:text-[22px]">
                    {pack.name}
                  </p>

                  {/* Divider */}
                  <div className="mb-7 h-px w-14 bg-white/25" />

                  {/* Price */}
                  {renderPrice(pack.price)}

                  {/* Description */}
                  <p className="max-w-[245px] text-sm leading-relaxed text-white/58 md:text-[15px]">
                    {pack.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom line */}
        <div
          className={`mx-auto mt-24 h-px w-full max-w-[900px] transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            transitionDelay: "520ms",
          }}
        />
      </div>
    </section>
  );
}