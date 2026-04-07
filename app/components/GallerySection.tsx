"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  const [isPaused, setIsPaused] = useState(false);

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

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    
    // Calculate scroll position to center the card in the viewport
    const containerWidth = el.clientWidth;
    const cardWidth = child.offsetWidth;
    const cardLeft = child.offsetLeft;
    
    // For the first item, scroll to start; otherwise center the card
    const scrollTarget = index === 0 
      ? 0 
      : cardLeft - (containerWidth - cardWidth) / 2;
    
    el.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
    setActive(index);
  }, []);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const newIndex = Math.max(0, Math.min(items.length - 1, active + dir));
    scrollToIndex(newIndex);
  }, [active, items.length, scrollToIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    
    const calculateActiveIndex = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return 0;
      
      // Get the visible area's center point relative to the scroll container
      const scrollLeft = el.scrollLeft;
      const containerWidth = el.clientWidth;
      const viewportCenter = scrollLeft + containerWidth / 2;
      
      let bestIdx = 0;
      let bestDist = Infinity;
      
      children.forEach((child, idx) => {
        // Calculate the center of each card
        const cardLeft = child.offsetLeft;
        const cardWidth = child.offsetWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < bestDist) {
          bestDist = distance;
          bestIdx = idx;
        }
      });
      
      return bestIdx;
    };
    
    const onScroll = () => {
      const newActive = calculateActiveIndex();
      setActive(newActive);
    };
    
    // Ensure scroll starts at position 0 and first item is active
    el.scrollLeft = 0;
    setActive(0);
    
    // Recalculate after a brief delay to ensure layout is complete
    const initialTimer = setTimeout(() => {
      if (el.scrollLeft === 0) {
        setActive(0);
      } else {
        const initialActive = calculateActiveIndex();
        setActive(initialActive);
      }
    }, 100);
    
    el.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      clearTimeout(initialTimer);
      el.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(() => {
      const nextIndex = (active + 1) % items.length;
      scrollToIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [active, isPaused, isVisible, items.length, scrollToIndex]);

  return (
    <section
      ref={sectionRef}
      className="gallery-section py-20 md:py-32 px-6 border-t border-white/[0.06]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
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
          <p className="text-white/60 text-xs md:text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
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
            <p className="text-xs tracking-[0.35em] text-white/40">
              {galleryLabel}
            </p>
            <div className="hidden md:flex gap-3">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label={prevLabel}
                className="gallery-nav-btn"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label={nextLabel}
                className="gallery-nav-btn"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>

          <div className="gallery-wrapper relative">
          <div
            ref={scrollerRef}
            className="gallery-track flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
          >
            {items.map((it, idx) => (
              <div
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`gallery-card snap-center shrink-0 w-[85%] md:w-[520px] cursor-pointer ${
                  idx === active ? "gallery-card-active" : ""
                }`}
              >
                <div className="gallery-card-inner rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.06]">
                  <div className="relative">
                    <img
                      src={it.src}
                      alt={it.label}
                      className="gallery-card-image w-full h-[320px] md:h-[420px] object-cover"
                      loading="lazy"
                    />
                    <div className="gallery-card-overlay" />
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <p className="text-sm md:text-base font-semibold tracking-wide">
                        {it.label}
                      </p>
                      <p className="text-xs text-white/65 mt-1.5">
                        {detailText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center justify-center">
            <div className="gallery-progress-track">
              <div
                className="gallery-progress-fill"
                style={{ width: `${((active + 1) / items.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Dots */}
          <div
            className="flex items-center justify-center gap-2 mt-4"
            aria-label="Gallery progress"
          >
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${dotLabel} ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`gallery-dot ${i === active ? "gallery-dot-active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
