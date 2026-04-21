"use client";

import { useEffect, useRef, useState } from "react";

interface Project {
  src: string;
  label: string;
  tag?: string;
}

interface FeaturedBuildsSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  projects: Project[];
  installationText: string;
  viewProjectText: string;
  viewAllText: string;
}

export function FeaturedBuildsSection({
  kicker,
  title,
  subtitle,
  projects,
  installationText,
  viewProjectText,
  viewAllText
}: FeaturedBuildsSectionProps) {
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
      className="featured-section py-20 md:py-32 px-6 border-t border-white/[0.06]"
    >
      {/* Header */}
      <div
        className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4">
          {kicker}
        </p>
        <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
          {title}
        </h2>
        <p className="text-white/65 text-xs md:text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`project-card group transition-all duration-700 ease-out ${
              i === 1 ? "md:project-card-featured" : ""
            } ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${150 + i * 120}ms` }}
          >
            <div className="project-image-wrapper relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.06]">
              
              {/* Tag */}
              {p.tag && (
                <span className="project-tag absolute top-4 left-4 z-20 px-3 py-1.5 uppercase rounded-full">
                  {p.tag}
                </span>
              )}

              {/* Image */}
              <img
                src={p.src}
                alt={p.label}
                className="project-image w-full h-[300px] md:h-[360px] object-cover"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="project-overlay absolute inset-0 flex items-center justify-center">
                <span className="text-xs tracking-[0.2em] uppercase text-white/90">
                  {viewProjectText}
                </span>
              </div>
            </div>

            <p className="mt-4 text-white/90 text-sm font-semibold tracking-[-0.01em] text-center">
              {p.label}
            </p>
            <p className="text-white/50 text-xs text-center mt-1.5">
              {installationText}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div
        className={`mt-14 md:mt-16 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <a
          href="https://www.instagram.com/midnightautostudio.eu/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium text-white/80 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
        >
          {viewAllText}
        </a>
      </div>
    </section>
  );
}