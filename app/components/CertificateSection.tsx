"use client";

import { useEffect, useRef, useState } from "react";

interface CertificateSectionProps {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
}

export function CertificateSection({
  kicker,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
}: CertificateSectionProps) {
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
      className="studio-section relative py-20 md:py-28 px-6 border-t border-white/[0.06]"
    >
      <div className="hidden md:block studio-divider" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div
          className={`studio-text transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.35em] text-white/40 mb-4 uppercase">
            {kicker}
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.01em] leading-[1.2] mb-5">
            {title}
          </h2>

          <p className="text-white/[0.78] leading-[1.65] mb-5 max-w-[480px]">
            {description}
          </p>

          <div className="space-y-2">
            {bullets.map((line, i) => (
              <p
                key={i}
                className="studio-feature text-sm text-white/70 flex items-center"
              >
                <span className="studio-bullet" />
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`studio-image-wrapper transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <img
            src={imageSrc}
            className="w-full h-[420px] object-cover"
            alt={imageAlt}
          />
        </div>
      </div>
    </section>
  );
}