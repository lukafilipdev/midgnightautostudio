"use client";

import { useEffect, useRef, useState } from "react";

interface ConfiguratorSectionProps {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  cta1Text: string;
  cta2Text: string;
  miniCfgLabel: string;
  interactiveLabel: string;
  finishLabel: string;
  glossLabel: string;
  satinLabel: string;
  matteLabel: string;
  coverageLabel: string;
  coverageHint: string;
  ppfCoverageLabel: string;
  detailsLabel: string;
  accentsLabel: string;
  approvalLabel: string;
  beforeInstallLabel: string;
  images: {
    gloss: string;
    satin: string;
    matte: string;
  };
}

export function ConfiguratorSection({
  kicker,
  title,
  description,
  bullets,
  cta1Text,
  cta2Text,
  miniCfgLabel,
  interactiveLabel,
  finishLabel,
  glossLabel,
  satinLabel,
  matteLabel,
  coverageLabel,
  coverageHint,
  ppfCoverageLabel,
  detailsLabel,
  accentsLabel,
  approvalLabel,
  beforeInstallLabel,
  images,
}: ConfiguratorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [finish, setFinish] = useState<"gloss" | "satin" | "matte">("gloss");
  const [coverage, setCoverage] = useState(70);

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

  const finishImg = finish === "gloss" ? images.gloss : finish === "satin" ? images.satin : images.matte;

  const finishOptions = [
    { key: "gloss" as const, label: glossLabel },
    { key: "satin" as const, label: satinLabel },
    { key: "matte" as const, label: matteLabel },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-6 border-t border-neutral-900 bg-black"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-500 mb-4">
            {kicker}
          </p>
          <h2 className="text-xl md:text-3xl tracking-[0.28em] md:tracking-[0.3em] mb-6">
            {title}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
            {description}
          </p>
          <div className="space-y-4">
            {bullets.map((txt, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-white mt-2" />
                <p className="text-gray-300 text-sm">{txt}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#booking"
              className="border border-white px-7 py-3 rounded-full text-sm hover:bg-white hover:text-black transition text-center"
            >
              {cta1Text}
            </a>
            <a
              href="#projects"
              className="border border-neutral-700 px-7 py-3 rounded-full text-sm text-gray-200 hover:border-white transition text-center"
            >
              {cta2Text}
            </a>
          </div>
        </div>

        {/* Configurator Panel */}
        <div
          className={`bg-neutral-950 rounded-3xl border border-neutral-800 overflow-hidden transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <p className="text-[10px] md:text-xs tracking-[0.35em] text-gray-400">
              {miniCfgLabel}
            </p>
            <p className="text-xs text-gray-500">{interactiveLabel}</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-5 mb-6">
              {/* Finish Selector */}
              <div>
                <p className="text-xs text-gray-500 mb-3">{finishLabel}</p>
                <div className="grid grid-cols-3 gap-3">
                  {finishOptions.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFinish(key)}
                      className={
                        "rounded-full border px-4 py-2 text-xs tracking-wide transition " +
                        (finish === key
                          ? "border-white bg-white text-black"
                          : "border-neutral-800 text-gray-200 hover:border-white")
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coverage Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500">{coverageLabel}</p>
                  <p className="text-xs text-gray-300">{coverage}%</p>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={coverage}
                  onChange={(e) => setCoverage(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-[11px] text-gray-500 mt-2">{coverageHint}</p>
              </div>
            </div>

            {/* Preview Image */}
            <div className="rounded-2xl overflow-hidden bg-black border border-neutral-800 relative">
              <img
                src={finishImg}
                alt="Configurator preview"
                className="w-full h-[320px] md:h-[360px] object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - coverage}% 0 0)` }}
              >
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/18 via-white/0 to-white/0" />
                <div className="absolute top-5 left-5 border border-white/50 rounded-full px-3 py-1 text-[10px] tracking-[0.35em] text-white/90">
                  {ppfCoverageLabel}
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                [finishLabel, finish.toUpperCase()],
                [coverageLabel, `${coverage}%`],
                [detailsLabel, accentsLabel],
                [approvalLabel, beforeInstallLabel],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-neutral-800 rounded-2xl p-4"
                >
                  <p className="text-xs text-gray-500 mb-1">{k}</p>
                  <p className="text-sm text-gray-200">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
