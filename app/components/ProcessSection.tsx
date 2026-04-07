"use client";

import { useEffect, useRef, useState } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export function ProcessSection({ kicker, title, subtitle, steps }: ProcessSectionProps) {
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

  const firstRow = steps.slice(0, 3);
  const secondRow = steps.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="process-section py-20 md:py-28 px-6 border-t border-white/[0.06]"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 md:mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4">
            {kicker}
          </p>
          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
            {title}
          </h2>
          <p className="text-white/70 text-xs md:text-sm max-w-2xl mx-auto mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* First Row */}
        <div className="process-row relative mb-8 md:mb-10">
          {/* Flow line */}
          <div className="hidden md:block process-flow-line" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {firstRow.map((step, i) => (
              <div
                key={i}
                className={`process-step relative text-center md:text-left transition-all duration-600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${180 + i * 80}ms` }}
              >
                <p className="process-step-number">
                  {step.number}
                </p>
                <h3 className="process-step-title text-[18px] md:text-[20px] font-semibold tracking-[-0.01em] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-white/[0.7] text-sm leading-[1.6] max-w-[280px] mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="process-row relative">
          {/* Flow line */}
          <div className="hidden md:block process-flow-line" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {secondRow.map((step, i) => (
              <div
                key={i}
                className={`process-step relative text-center md:text-left transition-all duration-600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${420 + i * 80}ms` }}
              >
                <p className="process-step-number">
                  {step.number}
                </p>
                <h3 className="process-step-title text-[18px] md:text-[20px] font-semibold tracking-[-0.01em] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-white/[0.7] text-sm leading-[1.6] max-w-[280px] mx-auto md:mx-0">
                  {step.description}
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
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "600ms"
          }}
        />
      </div>

      {/* Center glow */}
      <div className="process-glow" />
    </section>
  );
}
