"use client";

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
}

export function WhySection({ kicker, title, subtitle, items }: WhySectionProps) {
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
      </div>
    </section>
  );
}
