"use client";

import { useEffect, useRef, useState } from "react";

interface ClientVehiclesSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  brands: string[];
}

export function ClientVehiclesSection({
  kicker,
  title,
  subtitle,
  brands,
}: ClientVehiclesSectionProps) {
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
          className={`text-center mb-8 md:mb-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4 uppercase">
            {kicker}
          </p>

          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
            {title}
          </h2>

          <p className="text-white/65 text-xs md:text-sm max-w-2xl mx-auto mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Brand cards */}
        <div className="relative mt-10">
          {/* Subtle background line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/[0.018] z-0" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 relative z-10">
            {brands.map((brand, i) => (
              <div
                key={i}
                className={`material-card transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <div className="material-card-inner">
                  <p
                    className={`font-semibold tracking-[0.08em] uppercase ${
                      brand.length > 10 ? "text-base md:text-lg" : "text-lg md:text-xl"
                    }`}
                  >
                    {brand}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}