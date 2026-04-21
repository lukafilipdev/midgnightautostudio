"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

interface WhyItem {
  number: string;
  title: string;
  description: string;
}

interface WhySectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  items: [WhyItem, WhyItem, WhyItem];
  brands?: string[];
  brandsLabel?: string;
}

const getVehicleLogo = (name: string) => {
  const n = name.toLowerCase().trim();
  if (n.includes("porsche")) return "/porsche.webp";
  if (n.includes("bmw")) return "/bmw.webp";
  if (n.includes("audi")) return "/audi.webp";
  if (n.includes("mercedes") || n.includes("amg")) return "/amg.webp";
  return null;
};

export function WhySection({
  kicker,
  title,
  subtitle,
  items,
  brands,
  brandsLabel,
}: WhySectionProps) {
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

  const hasBrands = Array.isArray(brands) && brands.length > 0;

  return (
    <section
      ref={sectionRef}
      className="why-section py-24 md:py-28 lg:py-32 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 md:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[11px] tracking-[0.3em] text-white/40 mb-5 uppercase">
            {kicker}
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[52px] font-semibold tracking-[0.08em] leading-[1.1] max-w-[900px] mx-auto">
            {title}
          </h2>
          <p className="text-white/75 text-sm md:text-base max-w-[600px] mx-auto mt-4 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Structure line */}
        <div
          className={`h-px w-full max-w-[700px] mx-auto mb-12 md:mb-14 bg-white/[0.08] transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        />

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {items.map((item, i) => (
            <div
              key={i}
              className={`why-column relative text-center md:text-left transition-all duration-600 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <p className="text-[12px] tracking-[0.3em] text-white/35 mb-3 -translate-y-1">
                {item.number}
              </p>
              <h3 className="why-column-title text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] mb-3 text-white/90 transition-colors duration-250">
                {item.title}
              </h3>
              <p className="text-white/[0.74] text-sm leading-[1.65] max-w-[320px] mx-auto md:mx-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Client vehicles — specialisation row */}
        {hasBrands && (
          <div
            className={`mt-16 md:mt-20 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "560ms" }}
          >
            <div className="mx-auto mb-8 h-px w-full max-w-[700px] bg-white/[0.06]" />

            {brandsLabel && (
              <p className="mb-7 text-center text-[10px] uppercase tracking-[0.35em] text-white/35 md:text-[11px]">
                {brandsLabel}
              </p>
            )}

            <div className="relative mx-auto max-w-[900px]">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                {brands!.map((brand, i) => {
                  const logoSrc = getVehicleLogo(brand);
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center gap-2.5 opacity-70 transition-opacity duration-300 hover:opacity-100"
                    >
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={brand}
                          width={110}
                          height={44}
                          className="h-9 w-auto max-w-[110px] object-contain md:h-11"
                        />
                      ) : null}
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 md:text-xs">
                        {brand}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
