"use client";

import { useEffect, useRef, useState } from "react";

interface StudioSectionProps {
  kicker: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

export function StudioSection({ kicker, title, description, features, imageSrc }: StudioSectionProps) {
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
      className="py-20 md:py-28 px-6 border-t border-neutral-900 bg-black"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
            {kicker}
          </p>
          <h2 className="text-2xl md:text-3xl tracking-[0.3em] mb-6">
            {title}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            {description}
          </p>
          <div className="space-y-3 text-sm text-gray-300">
            {features.map((feature, i) => (
              <p key={i}>• {feature}</p>
            ))}
          </div>
        </div>

        {/* Image */}
        <div
          className={`rounded-3xl overflow-hidden border border-neutral-800 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <img
            src={imageSrc}
            className="w-full h-[420px] object-cover"
            alt="Studio"
          />
        </div>
      </div>
    </section>
  );
}
