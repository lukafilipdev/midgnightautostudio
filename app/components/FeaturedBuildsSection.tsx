"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  src: string;
  label: string;
}

interface FeaturedBuildsSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  projects: Project[];
  installationText: string;
}

export function FeaturedBuildsSection({ kicker, title, subtitle, projects, installationText }: FeaturedBuildsSectionProps) {
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
      id="projects"
      className="py-20 md:py-32 px-6 border-t border-neutral-900"
    >
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

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`group transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${150 + i * 100}ms` }}
          >
            <div className="overflow-hidden rounded-3xl bg-neutral-950 border border-neutral-800">
              <img
                src={p.src}
                alt={p.label}
                className="w-full h-[320px] md:h-[360px] object-cover group-hover:scale-105 transition duration-700"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-gray-300 text-sm text-center">{p.label}</p>
            <p className="text-gray-500 text-xs text-center mt-1">
              {installationText}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
