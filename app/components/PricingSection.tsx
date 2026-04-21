"use client";

import { useEffect, useRef, useState } from "react";

export interface PricingPack {
  name: string;
  price: string;
  description: string;
  /** Middle column: highlighted card */
  highlight?: boolean;
}

interface PricingSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  packs: [PricingPack, PricingPack, PricingPack];
}

export function PricingSection({
  kicker,
  title,
  subtitle,
  packs,
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

  const renderPrice = (
    price: string,
    isHighlight: boolean
  ): React.ReactNode => {
    if (price.startsWith("od ")) {
      const amount = price.replace(/^od\s+/, "");

      return (
        <div className="mb-5 flex items-end justify-center gap-1">
          <span
            className={`text-[28px] font-light leading-none tracking-[-0.02em] md:text-[38px] ${
              isHighlight ? "text-black/55" : "text-white/50"
            }`}
          >
            od
          </span>
          <span
            className={`text-[48px] font-light leading-none tracking-[-0.04em] md:text-[58px] ${
              isHighlight ? "text-black" : "text-white"
            }`}
          >
            {amount}
          </span>
        </div>
      );
    }

    return (
      <div className="mb-5 flex items-end justify-center gap-1">
        <span
          className={`text-[48px] font-light leading-none tracking-[-0.04em] md:text-[58px] ${
            isHighlight ? "text-black" : "text-white"
          }`}
        >
          {price}
        </span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="atm-center relative border-t border-white/[0.06] px-6 py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ease-out md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-xl tracking-[0.28em] md:text-3xl md:tracking-[0.3em]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/70 md:text-sm">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-6">
          {packs.map((pack, i) => {
            const isHighlight = Boolean(pack.highlight);

            return (
              <div
                key={i}
                className={`group relative rounded-[30px] border px-8 py-10 transition-all duration-500 ease-out md:px-10 md:py-11 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${
                  isHighlight
                    ? "border-white/80 bg-white text-black shadow-[0_30px_90px_rgba(255,255,255,0.06)] hover:-translate-y-[4px] hover:scale-[1.02] hover:shadow-[0_30px_100px_rgba(255,255,255,0.08)]"
                    : "border-white/[0.12] bg-white/[0.03] text-white shadow-[inset_0_0_25px_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.35),0_0_20px_rgba(255,255,255,0.02)] hover:-translate-y-[3px] hover:border-white/[0.18] hover:bg-white/[0.04] hover:shadow-[inset_0_0_25px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.02)]"
                }`}
                style={{ transitionDelay: `${160 + i * 100}ms` }}
              >
                {isHighlight && (
                  <>
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-[30px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] opacity-25 blur-xl" />
                    <div className="absolute left-1/2 top-6 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-black/40">
                      Priporočeno
                    </div>
                  </>
                )}

                <p
                  className={`mb-6 font-medium ${
                    isHighlight
                      ? "mt-6 text-black/85"
                      : "text-white/90"
                  } text-[18px] md:text-[20px]`}
                >
                  {pack.name}
                </p>

                {renderPrice(pack.price, isHighlight)}

                <p
                  className={`text-sm leading-relaxed ${
                    isHighlight ? "text-black/65" : "text-white/55"
                  }`}
                >
                  {pack.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom anchor line */}
        <div
          className={`mx-auto mt-16 h-px w-full max-w-[800px] transition-opacity duration-700 md:mt-20 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "520ms",
          }}
        />
      </div>

    </section>
  );
}