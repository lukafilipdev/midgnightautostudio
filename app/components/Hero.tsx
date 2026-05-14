"use client";

import Image from "next/image";
import { Logo } from "./Logo";

type Lang = "sl" | "en" | "de";

interface HeroProps {
  lang: Lang;
  requestText: string;
  viewBuildsText: string;
  limitedText: string;
}

export function Hero({
  lang,
  requestText,
  viewBuildsText,
  limitedText,
}: HeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black px-6">
      {/* Hero image */}
      <div className="absolute inset-0 -translate-y-[14vh] md:translate-y-0 scale-[1.08] md:scale-100">
        <Image
          src="/background.webp"
          alt="Midnight Auto Studio cars"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_90%] md:object-[center_72%] lg:object-[center_68%]"
        />
      </div>

      {/* Top overlay */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/90 to-transparent" />

      {/* Soft cinematic fade */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

      {/* Pure black blend at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-black to-transparent" />

      {/* Very subtle dark layer */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.018] hero-noise" />

      {/* Logo */}
      <div className="absolute inset-x-0 top-[13vh] md:top-[12vh] z-20 flex justify-center logo-glow hero-animate-1">
        <Logo className="h-28 sm:h-32 md:h-44 lg:h-56 w-auto" />
      </div>

      {/* Text */}
      <div className="absolute left-1/2 bottom-0 md:bottom-4 z-20 w-full max-w-4xl -translate-x-1/2 px-6 text-center">
        {/* Headline */}
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light tracking-wide leading-relaxed hero-animate-2">
          {lang === "sl"
            ? "Butični studio zaščite in preobrazbe za"
            : lang === "de"
            ? "Boutique-Studio für"
            : "Boutique automotive protection atelier for"}

          <span className="font-semibold gradient-text"> BMW M</span>,
          <span className="font-semibold gradient-text"> AUDI RS</span>{" "}
          {lang === "sl" ? "in" : "&"}
          <span className="font-semibold gradient-text"> PORSCHE</span>.
        </p>

        {/* Hidden on mobile */}
        <p className="hidden md:block mt-5 text-white/60 text-sm md:text-base max-w-xl mx-auto tracking-wide hero-animate-3">
          {lang === "sl"
            ? "Vizualizacija pred montažo. Izvedba brez kompromisov."
            : lang === "de"
            ? "Design-Vorschau vor der Montage. Präzision ohne Kompromisse."
            : "Design preview before installation. Precision-only execution."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 hero-animate-4">
          {/* Primary */}
          <a
            href="#booking"
            className="group relative flex h-[54px] w-full sm:w-[330px] items-center justify-center rounded-full border-2 border-white bg-white pl-8 pr-14 text-black"
          >
            <span className="text-[12.5px] font-bold tracking-[0.24em] uppercase">
              {requestText}
            </span>

            <span className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black/25 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>

          {/* Secondary */}
          <a
            href="#projects"
            className="group relative flex h-[54px] w-full sm:w-[330px] items-center justify-center rounded-full border-2 border-white/30 bg-black/20 pl-8 pr-14 text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
          >
            <span className="text-[12.5px] font-bold tracking-[0.24em] uppercase">
              {viewBuildsText}
            </span>

            <span className="absolute right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-4 hero-animate-5">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />

          <p className="text-[8px] md:text-[10px] tracking-[0.35em] text-white/45 uppercase font-medium">
            {limitedText}
          </p>

          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Trust microcopy */}
        <div className="mt-4 md:mt-7 mb-6 md:mb-0 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 hero-animate-5">
          <span className="text-[9px] md:text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span> BMW M / Porsche specialists
          </span>

          <span className="text-[9px] md:text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span> Premium materials
          </span>

          <span className="text-[9px] md:text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span> No compromises
          </span>
        </div>
      </div>
    </section>
  );
}