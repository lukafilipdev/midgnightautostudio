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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8">
      {children}
    </div>
  );
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

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-neutral-950"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-500 mb-4">
            {kicker}
          </p>
          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
            {title}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto mt-5 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <Card>
                <p className="text-xs tracking-[0.35em] text-gray-500 mb-3">
                  {step.number}
                </p>
                <h3 className="text-base mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
