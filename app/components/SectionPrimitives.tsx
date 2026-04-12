import type { ReactNode } from "react";

export function SectionTitle({
  kicker,
  title,
  subtitle,
  reveal = true,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  /** When false, skip scroll-reveal (opacity stays visible). */
  reveal?: boolean;
}) {
  return (
    <div
      className="text-center mb-12 md:mb-16"
      {...(reveal ? { "data-reveal": true } : {})}
    >
      {kicker ? (
        <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-500 mb-4">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em]">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto mt-5 leading-relaxed whitespace-pre-line">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8">
      {children}
    </div>
  );
}
