"use client";

import { useEffect, useRef, useState } from "react";

interface Brand {
  name: string;
  descriptor: string;
}

interface MaterialsSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  partnersLabel: string;
  brands: Brand[];
}

// Logo matcher (robust)
const getLogo = (name: string) => {
  const n = name.toLowerCase();

  if (n.includes("skyfol")) return "/skyfol.png";
  if (n.includes("stek")) return "/stek.png";
  if (n.includes("3m")) return "/3m.png";
  if (n.includes("avery")) return "/avery.png";

  return null;
};

export function MaterialsSection({
  kicker,
  title,
  subtitle,
  partnersLabel,
  brands,
}: MaterialsSectionProps) {
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

  return (
    <section
      ref={sectionRef}
      className="materials-section py-20 md:py-28 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div
          className={`mb-8 md:mb-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4">
            {kicker}
          </p>

          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
            {title}
          </h2>

          <p className="text-white/65 text-xs md:text-sm max-w-2xl mx-auto mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Partners Label */}
        <p
          className={`text-[11px] md:text-xs tracking-[0.3em] text-white/40 mb-5 md:mb-6 uppercase transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          {partnersLabel}
        </p>

        {/* Brand Cards */}
        <div className="relative">
          {/* Subtle background line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/[0.018] z-0" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 relative z-10">
            {brands.map((brand, i) => {
              const logoSrc = getLogo(brand.name);

              return (
                <div
                  key={i}
                  className={`material-card transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${150 + i * 80}ms` }}
                >
                  <div className="material-card-inner flex flex-col items-center justify-center text-center gap-4">
                    
                    {/* Logo */}
                    {logoSrc && (
                      <img
                        src={logoSrc}
                        alt={brand.name}
                        className="h-[48px] md:h-[64px] w-auto max-w-[140px] object-contain opacity-90 transition duration-300 hover:opacity-100"
                      />
                    )}

                    {/* Brand Name */}
                    <p className="text-sm md:text-base font-semibold tracking-[0.04em]">
                      {brand.name}
                    </p>

                    {/* Descriptor */}
                    <p className="text-[11px] md:text-xs text-white/50 tracking-wide">
                      {brand.descriptor}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}