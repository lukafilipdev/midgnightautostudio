"use client";

import { Logo } from "./Logo";

type Lang = "sl" | "en" | "de";

interface HeroProps {
  lang: Lang;
  requestText: string;
  viewBuildsText: string;
  limitedText: string;
}

export function Hero({ lang, requestText, viewBuildsText, limitedText }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-6 pt-24 hero-bg overflow-hidden">
      {/* Noise texture overlay */}
      <div className="hero-noise" />

      {/* Cursor light effect */}
      <div
        className="cursor-light"
        style={{
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />

      <div className="relative z-20 max-w-4xl text-center">
        {/* Logo with glow */}
        <div className="flex justify-center mb-6 hero-animate-1 logo-glow">
          <Logo className="h-64 md:h-80 lg:h-[420px] w-auto" />
        </div>

        {/* Main headline with gradient text */}
        <div className="max-w-2xl mx-auto space-y-4 hero-animate-2">
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light tracking-wide leading-relaxed">
            {lang === "sl"
              ? "Butični studio zaščite in preobrazbe za"
              : lang === "de"
                ? "Boutique-Studio für"
                : "Boutique automotive protection atelier for"}
            <span className="font-semibold gradient-text"> BMW M</span>,
            <span className="font-semibold gradient-text"> Audi RS</span>{" "}
            {lang === "sl" ? "in" : lang === "de" ? "&" : "&"}
            <span className="font-semibold gradient-text"> Porsche</span>.
          </p>
        </div>

        {/* Subheadline */}
        <p className="mt-5 text-white/60 text-sm md:text-base max-w-xl mx-auto tracking-wide hero-animate-3">
          {lang === "sl"
            ? "Vizualizacija pred montažo. Izvedba brez kompromisov."
            : lang === "de"
              ? "Design-Vorschau vor der Montage. Präzision ohne Kompromisse."
              : "Design preview before installation. Precision-only execution."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 hero-animate-4">
          <a
            href="#booking"
            className="btn-primary w-full sm:w-auto px-12 py-3.5 rounded-full text-xs tracking-[0.2em] font-semibold text-center bg-white text-black border-2 border-white"
          >
            {requestText}
          </a>
          <a
            href="#projects"
            className="btn-secondary w-full sm:w-auto px-12 py-3.5 rounded-full text-xs tracking-[0.2em] font-medium text-center text-white/80 border border-white/20 hover:border-white/40 hover:text-white"
          >
            {viewBuildsText}
          </a>
        </div>

        {/* Divider with limited text */}
        <div className="mt-12 flex items-center justify-center gap-4 hero-animate-5">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
          <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-medium">
            {limitedText}
          </p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Trust microcopy */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 hero-animate-5">
          <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span> BMW M / Audi RS{" "}
            {lang === "sl" ? "specialisti" : lang === "de" ? "Spezialisten" : "specialists"}
          </span>
          <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span> Premium{" "}
            {lang === "sl" ? "materiali" : lang === "de" ? "Materialien" : "materials"}
          </span>
          <span className="text-[11px] text-white/50 tracking-wide flex items-center gap-1.5">
            <span className="text-white/70">✓</span>{" "}
            {lang === "sl" ? "Brez kompromisov" : lang === "de" ? "Keine Kompromisse" : "No compromises"}
          </span>
        </div>
      </div>
    </section>
  );
}
