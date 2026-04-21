"use client";

interface FooterProps {
  tagline: string;
}

export function Footer({ tagline }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Subtle brand mark */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-white/[0.08]" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] text-sm text-white/70">
              M
            </div>
            <div className="h-px w-10 bg-white/[0.08]" />
          </div>

          {/* Tagline */}
          <p className="text-sm md:text-[15px] text-white/[0.62] leading-relaxed max-w-[520px]">
            {tagline}
          </p>

          {/* Brand signature */}
          <p className="mt-6 text-[11px] md:text-xs tracking-[0.28em] uppercase text-white/35">
            Midnight Auto Studio
          </p>

          {/* Bottom anchor line */}
          <div
            className="mt-10 h-px w-full max-w-[720px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />
        </div>
      </div>

      {/* Same background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-full w-[720px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_70%)]" />
      </div>
    </footer>
  );
}