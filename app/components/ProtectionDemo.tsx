"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface BenefitCard {
  label: string;
  text: string;
}

interface ProtectionDemoProps {
  kicker: string;
  title: string;
  subtitle: string;
  benefits: BenefitCard[];
  beforeLabel: string;
  afterLabel: string;
  dragHint: string;
  beforeImage?: string;
  afterImage?: string;
}

export function ProtectionDemo({
  kicker,
  title,
  subtitle,
  benefits,
  beforeLabel,
  afterLabel,
  dragHint,
  beforeImage = "/before1.webp",
  afterImage = "/after1.webp",
}: ProtectionDemoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [slider, setSlider] = useState(50);
  const [dragging, setDragging] = useState(false);

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const updateSlider = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));

    setSlider(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    updateSlider(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      updateSlider(e.clientX);
    };

    const handlePointerUp = () => {
      setDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging]);

  return (
    <section
      ref={sectionRef}
      className="atm-center border-t border-white/[0.06] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-xl uppercase tracking-[0.22em] md:text-3xl md:tracking-[0.26em]">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-white/60 md:text-sm">
            {subtitle}
          </p>
        </div>

        {/* Slider */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="group relative mx-auto aspect-[16/9] max-w-5xl cursor-ew-resize overflow-hidden rounded-[28px] border border-white/[0.08] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            style={{ touchAction: "none" }}
          >
            {/* After */}
            <div className="absolute inset-0">
              <Image
                src={afterImage}
                alt={afterLabel}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover pointer-events-none select-none"
                draggable={false}
              />
            </div>

            {/* Before */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${slider}%` }}
            >
              <div
                className="absolute inset-y-0 left-0"
                style={{ width: containerRef.current?.offsetWidth || "100%" }}
              >
                <Image
                  src={beforeImage}
                  alt={beforeLabel}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-white/[0.14] bg-black/45 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm md:left-5 md:top-5">
              {beforeLabel}
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-white/[0.14] bg-black/45 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm md:right-5 md:top-5">
              {afterLabel}
            </div>

            <div
              className="absolute bottom-0 top-0 z-20 w-px bg-white/35 shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              style={{ left: `${slider}%`, transform: "translateX(-50%)" }}
            />

            <div
              className="absolute top-1/2 z-30"
              style={{
                left: `${slider}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 ease-out group-hover:scale-105">
                <div className="flex items-center gap-[3px]">
                  <span className="block h-4 w-px bg-white/70" />
                  <span className="block h-4 w-px bg-white/70" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] tracking-[0.08em] text-white/50 md:text-xs">
            {dragHint}
          </p>
        </div>

        {/* Benefits (FIXED ALIGNMENT) */}
        <div
          className={`mt-12 transition-all duration-700 ease-out md:mt-14 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "260ms" }}
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-10 justify-items-center">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-700 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: `${320 + i * 80}ms` }}
              >
                <div className="max-w-[260px]">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/40 md:text-xs">
                    {benefit.label}
                  </p>

                  <p className="text-sm leading-[1.6] text-white/[0.78]">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mx-auto mt-14 h-px w-full max-w-[800px] transition-opacity duration-700 md:mt-16 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "500ms",
          }}
        />
      </div>
    </section>
  );
}