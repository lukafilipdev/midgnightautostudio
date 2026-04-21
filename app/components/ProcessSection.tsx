"use client";

import { useEffect, useRef, useState } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
  bullets: string[];
}

interface ProcessSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ProcessSection({
  kicker,
  title,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [hoveredDesktopStep, setHoveredDesktopStep] = useState<number | null>(null);
  const [pinnedDesktopStep, setPinnedDesktopStep] = useState<number | null>(null);
  const [mobileOpenStep, setMobileOpenStep] = useState<number | null>(null);

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

  const firstRow = steps.slice(0, 3);
  const secondRow = steps.slice(3, 6);

  const activeDesktopStep = pinnedDesktopStep ?? hoveredDesktopStep;

  const firstRowActiveIndex =
    activeDesktopStep !== null && activeDesktopStep < 3 ? activeDesktopStep : null;

  const secondRowActiveIndex =
    activeDesktopStep !== null && activeDesktopStep >= 3 ? activeDesktopStep : null;

  const firstRowActiveStep =
    firstRowActiveIndex !== null ? steps[firstRowActiveIndex] : null;

  const secondRowActiveStep =
    secondRowActiveIndex !== null ? steps[secondRowActiveIndex] : null;

  const handleDesktopToggle = (index: number) => {
    setPinnedDesktopStep((prev) => (prev === index ? null : index));
    setHoveredDesktopStep(index);
  };

  const renderDesktopRow = (
    rowSteps: ProcessStep[],
    rowOffset: number,
    activeIndex: number | null,
    activeStep: ProcessStep | null,
    delayBase: number
  ) => {
    return (
      <div
        className="relative hidden md:block"
        onMouseLeave={() => {
          if (pinnedDesktopStep === null) {
            setHoveredDesktopStep(null);
          }
        }}
      >
        <div className="hidden md:block process-flow-line" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative z-10">
          {rowSteps.map((step, i) => {
            const absoluteIndex = rowOffset + i;
            const isSelected = activeIndex === absoluteIndex;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setHoveredDesktopStep(absoluteIndex)}
                className={`process-step group relative text-center md:text-left transition-all duration-600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${delayBase + i * 80}ms` }}
              >
                <div className="mb-2 flex items-start justify-between gap-4">
                  <p className="process-step-number">{step.number}</p>

                  <button
                    type="button"
                    onClick={() => handleDesktopToggle(absoluteIndex)}
                    aria-expanded={isSelected}
                    aria-label={isSelected ? "Collapse step details" : "Expand step details"}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "border-white/16 bg-white/[0.08] text-white"
                        : "border-white/8 bg-white/[0.02] text-white/45 hover:border-white/14 hover:text-white/80"
                    }`}
                  >
                    <Chevron
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isSelected ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>

                <h3 className="process-step-title mb-1.5 text-[18px] font-semibold tracking-[-0.01em] text-white/95 md:text-[20px]">
                  {step.title}
                </h3>

                <p className="mx-auto max-w-[280px] text-sm leading-[1.6] text-white/[0.7] md:mx-0">
                  {step.description}
                </p>

                <div
                  className={`mt-4 h-px w-full max-w-[220px] bg-gradient-to-r from-white/12 to-transparent transition-opacity duration-300 ${
                    isSelected ? "opacity-100" : "opacity-30"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            activeStep ? "mt-8 max-h-[420px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          {activeStep && (
            <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] px-7 py-7 backdrop-blur-sm">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-white/35">
                      Step {activeStep.number}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-white/95">
                    {activeStep.title}
                  </h4>

                  <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.8] text-white/68">
                    {activeStep.details}
                  </p>
                </div>

                <div className="grid gap-3">
                  {activeStep.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="rounded-[18px] border border-white/[0.06] bg-black/20 px-4 py-3.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-[2px] text-white/75">✓</span>
                        <p className="text-sm leading-[1.7] text-white/64">{bullet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMobileCard = (step: ProcessStep, index: number) => {
    const isOpen = mobileOpenStep === index;

    return (
      <div
        key={step.number}
        className={`process-step relative text-center transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: `${180 + index * 80}ms` }}
      >
        <button
          type="button"
          onClick={() => setMobileOpenStep((prev) => (prev === index ? null : index))}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse step details" : "Expand step details"}
          className={`absolute right-1 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-white/16 bg-white/[0.08] text-white"
              : "border-white/8 bg-white/[0.02] text-white/45"
          }`}
        >
          <Chevron
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div className="px-6">
          <p className="process-step-number">{step.number}</p>

          <h3 className="process-step-title mb-1.5 text-[18px] font-semibold tracking-[-0.01em] text-white/95">
            {step.title}
          </h3>

          <p className="mx-auto max-w-[280px] text-sm leading-[1.6] text-white/[0.7]">
            {step.description}
          </p>
        </div>

        <div
          className={`overflow-hidden transition-all duration-400 ease-out ${
            isOpen ? "mt-5 max-h-[420px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-[22px] border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-left">
            <p className="text-sm leading-[1.8] text-white/68">{step.details}</p>

            <div className="mt-4 grid gap-2.5">
              {step.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-[16px] border border-white/[0.06] bg-black/20 px-3.5 py-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-[2px] text-white/75">✓</span>
                    <p className="text-[13px] leading-[1.7] text-white/64">{bullet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="process-section relative overflow-hidden border-t border-white/[0.06] px-6 py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div
          className={`mb-10 text-center transition-all duration-700 ease-out md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-4 text-[10px] tracking-[0.35em] text-white/40 md:text-xs">
            {kicker}
          </p>

          <h2 className="text-xl tracking-[0.28em] text-white md:text-3xl md:tracking-[0.3em]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/70 md:text-sm">
            {subtitle}
          </p>
        </div>

        <div className="space-y-8 md:hidden">{steps.map(renderMobileCard)}</div>

        {renderDesktopRow(firstRow, 0, firstRowActiveIndex, firstRowActiveStep, 180)}

        <div className="hidden h-8 md:block" />

        {renderDesktopRow(secondRow, 3, secondRowActiveIndex, secondRowActiveStep, 420)}

        <div
          className={`mx-auto mt-16 h-px w-full max-w-[800px] transition-opacity duration-700 md:mt-20 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "600ms",
          }}
        />
      </div>

      <div className="process-glow" />
    </section>
  );
}