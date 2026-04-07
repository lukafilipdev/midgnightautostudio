"use client";

import { useEffect, useRef, useState } from "react";

interface GalleryItem {
  src: string;
  label: string;
}

interface GallerySectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
  galleryLabel: string;
  prevLabel: string;
  nextLabel: string;
  dotLabel: string;
  detailText: string;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GallerySection({
  kicker,
  title,
  subtitle,
  items,
  galleryLabel,
  prevLabel,
  nextLabel,
  dotLabel,
  detailText,
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);

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

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 900);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      children.forEach((c, idx) => {
        const cMid = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cMid - mid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });
      setActive(bestIdx);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
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

        {/* Gallery */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs tracking-[0.35em] text-gray-500">
              {galleryLabel}
            </p>
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label={prevLabel}
                className="border border-neutral-800 w-10 h-10 rounded-full text-gray-200 hover:border-white transition flex items-center justify-center"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label={nextLabel}
                className="border border-neutral-800 w-10 h-10 rounded-full text-gray-200 hover:border-white transition flex items-center justify-center"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollBehavior: "smooth" }}
          >
            {items.map((it, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[88%] md:w-[520px]">
                <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <div className="relative">
                    <img
                      src={it.src}
                      alt={it.label}
                      className="w-full h-[340px] md:h-[420px] object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/0" />
                    <div className="absolute bottom-5 left-6 right-6">
                      <p className="text-sm md:text-base tracking-wide">
                        {it.label}
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        {detailText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-2 mt-4"
            aria-label="Gallery progress"
          >
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${dotLabel} ${i + 1}`}
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  const child = el.children[i] as HTMLElement | undefined;
                  if (!child) return;
                  el.scrollTo({ left: child.offsetLeft - 24, behavior: "smooth" });
                }}
                className={
                  "h-2 rounded-full transition-all border border-neutral-700 " +
                  (i === active ? "w-8 bg-white" : "w-2 bg-transparent")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
