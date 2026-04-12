"use client";

import { useState } from "react";
import { Card, SectionTitle } from "./SectionPrimitives";

export interface WindowTintFeature {
  tag: string;
  title: string;
  description: string;
}

interface WindowTintSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  features: WindowTintFeature[];
}

export function WindowTintSection({
  kicker,
  title,
  subtitle,
  beforeImage,
  afterImage,
  beforeAlt = "Before tint",
  afterAlt = "After tint",
  features,
}: WindowTintSectionProps) {
  const [slider, setSlider] = useState(52);

  return (
    <section className="py-20 md:py-32 px-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker={kicker} title={title} subtitle={subtitle} />
        <div className="max-w-5xl mx-auto" data-reveal>
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img src={beforeImage} className="w-full" alt={beforeAlt} />
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${slider}%` }}
            >
              <img src={afterImage} className="w-full" alt={afterAlt} />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 w-3/4"
            />
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {features.map(({ tag, title: tt, description: d }, i) => (
              <Card key={i}>
                <p className="text-[10px] tracking-[0.35em] text-gray-500 mb-3">
                  {tag}
                </p>
                <p className="text-lg mb-2">{tt}</p>
                <p className="text-gray-400 text-sm">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
