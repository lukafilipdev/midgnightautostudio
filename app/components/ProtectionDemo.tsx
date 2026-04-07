"use client";

import { useEffect, useRef, useState } from "react";

interface BenefitCard {
  label: string;
  text: string;
}

interface ProtectionDemoProps {
  kicker: string;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
  benefits: BenefitCard[];
}

export function ProtectionDemo({
  kicker,
  title,
  subtitle,
  beforeImage,
  afterImage,
  benefits,
}: ProtectionDemoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

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
      className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {kicker && (
            <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4">
              {kicker}
            </p>
          )}
          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/60 text-xs md:text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Slider Comparison */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-black">
            <img
              src={beforeImage}
              className="w-full"
              alt="Before protection"
              loading="lazy"
            />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${sliderValue}%` }}
            >
              <img
                src={afterImage}
                className="w-full h-full object-cover"
                alt="After protection"
                loading="lazy"
                style={{ minWidth: "100%" }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4"
            />
          </div>

          {/* Benefit Cards */}
          <div
            className={`grid md:grid-cols-3 gap-6 mt-10 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8"
              >
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  {benefit.label}
                </p>
                <p className="text-gray-300 text-sm">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
