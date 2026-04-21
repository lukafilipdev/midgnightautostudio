"use client";

import { useEffect, useRef, useState } from "react";

export interface ServiceItem {
  title: string;
  description: string;
}

interface ServicesSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export function ServicesSection({
  kicker,
  title,
  subtitle,
  items,
}: ServicesSectionProps) {
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
      className="atm-top relative border-t border-white/[0.06] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out md:mb-14 ${
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

        {/* Services */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative border-t border-white/[0.06] pt-5 text-center transition-all duration-700 ease-out md:text-left ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${160 + i * 90}ms` }}
            >
              {/* vertical divider on desktop */}
              {i < items.length - 1 && (
                <div className="pointer-events-none absolute right-[-20px] top-0 hidden h-full w-px bg-white/[0.06] md:block" />
              )}

              <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/35 md:text-xs">
                {String(i + 1).padStart(2, "0")}
              </p>

              <h3 className="mb-1.5 text-[18px] font-semibold tracking-[-0.01em] transition-transform duration-300 group-hover:-translate-y-[2px] md:text-[20px]">
                {item.title}
              </h3>

              <p className="mx-auto max-w-[240px] text-sm leading-[1.6] text-white/[0.7] md:mx-0">
                {item.description}
              </p>
            </div>
          ))}
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