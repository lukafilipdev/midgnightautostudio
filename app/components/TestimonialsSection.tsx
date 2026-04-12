"use client";

import { useEffect, useRef, useState } from "react";

export interface TestimonialItem {
  name: string;
  quote: string;
}

interface TestimonialsSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export function TestimonialsSection({
  kicker,
  title,
  subtitle,
  items,
}: TestimonialsSectionProps) {
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
      className="relative py-20 md:py-28 px-6 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4 uppercase">
            {kicker}
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.18em] md:tracking-[0.22em]">
            {title}
          </h2>

          <p className="text-white/65 text-xs md:text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Testimonials */}
        <div className="relative">
          <div
            className={`hidden md:block absolute top-8 left-0 right-0 h-px transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
              transitionDelay: "120ms",
            }}
          />

          <div className="grid md:grid-cols-3 gap-10 md:gap-12 relative z-10">
            {items.map((item, i) => (
              <div
                key={i}
                className={`relative pt-8 transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${180 + i * 90}ms` }}
              >
                <div className="mb-6 text-white/18 text-4xl leading-none font-serif">
                  “
                </div>

                <p className="text-white/[0.8] text-[15px] md:text-base leading-[1.85] max-w-[320px]">
                  {item.quote}
                </p>

                <div className="mt-8 h-px w-12 bg-white/[0.08]" />

                <p className="mt-5 text-[11px] md:text-xs tracking-[0.28em] text-white/38 uppercase">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom anchor line */}
        <div
          className={`mt-16 md:mt-20 h-px w-full max-w-[800px] mx-auto transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "520ms",
          }}
        />
      </div>

      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />
      </div>
    </section>
  );
}