"use client";

import { useEffect, useRef, useState } from "react";

export interface BookingContact {
  email: string;
  instagram: string;
  whatsapp: string;
}

interface BookingSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  vehiclePlaceholder: string;
  emailPlaceholder: string;
  service: string;
  onServiceChange: (value: string) => void;
  opt0: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt5: string;
  opt6: string;
  submitLabel: string;
  responseNote: string;
  quickContact: string;
  qcSub: string;
  qc1: string;
  qc2: string;
  qc3: string;
  contact: BookingContact;
}

export function BookingSection({
  kicker,
  title,
  subtitle,
  vehiclePlaceholder,
  emailPlaceholder,
  service,
  onServiceChange,
  opt0,
  opt1,
  opt2,
  opt3,
  opt4,
  opt5,
  opt6,
  submitLabel,
  responseNote,
  quickContact,
  qcSub,
  qc1,
  qc2,
  qc3,
  contact,
}: BookingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative px-6 py-20 md:py-28 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-14 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/40 mb-4 uppercase">
            {kicker}
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.01em] leading-[1.2]">
            {title}
          </h2>

          <p className="text-white/[0.68] text-sm md:text-[15px] max-w-2xl mx-auto mt-4 leading-[1.7]">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          {/* Form side */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            <div className="border-t border-white/[0.06] pt-8">
              <form className="space-y-4">
                <input
                  placeholder={vehiclePlaceholder}
                  className="w-full border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm text-white placeholder:text-white/28 outline-none transition-colors duration-300 focus:border-white/[0.18]"
                />

                <select
                  value={service}
                  onChange={(e) => onServiceChange(e.target.value)}
                  className="w-full border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition-colors duration-300 focus:border-white/[0.18]"
                >
                  <option value="" className="bg-black text-white">
                    {opt0}
                  </option>
                  <option className="bg-black text-white">{opt1}</option>
                  <option className="bg-black text-white">{opt2}</option>
                  <option className="bg-black text-white">{opt3}</option>
                  <option className="bg-black text-white">{opt4}</option>
                  <option className="bg-black text-white">{opt5}</option>
                  <option className="bg-black text-white">{opt6}</option>
                </select>

                <input
                  placeholder={emailPlaceholder}
                  className="w-full border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-sm text-white placeholder:text-white/28 outline-none transition-colors duration-300 focus:border-white/[0.18]"
                />

                <button
                  type="submit"
                  className="w-full border border-white/[0.12] py-4 text-sm tracking-[0.18em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  {submitLabel}
                </button>
              </form>

              <p className="mt-4 text-xs text-white/38 leading-relaxed">
                {responseNote}
              </p>
            </div>
          </div>

          {/* Contact side */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="border-t border-white/[0.06] pt-8">
              <p className="text-[10px] md:text-xs tracking-[0.35em] text-white/35 mb-4 uppercase">
                {quickContact}
              </p>

              <p className="text-white/[0.62] text-sm leading-[1.7] max-w-[420px] mb-8">
                {qcSub}
              </p>

              <div className="space-y-0">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-5 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-sm text-white/[0.78]">{qc1}</span>
                  <span className="text-sm text-white/40 text-right">
                    {contact.email}
                  </span>
                </a>

                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-5 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-sm text-white/[0.78]">{qc2}</span>
                  <span className="text-sm text-white/40 text-right">
                    @midnight_autostudio.eu
                  </span>
                </a>

                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-5 transition-colors duration-300 hover:text-white"
                >
                  <span className="text-sm text-white/[0.78]">{qc3}</span>
                  <span className="text-sm text-white/40 text-right">
                    +386 30 358 407
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom anchor line */}
        <div
          className={`mt-16 md:mt-20 h-px w-full max-w-[800px] mx-auto transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
            transitionDelay: "420ms",
          }}
        />
      </div>

      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />
      </div>
    </section>
  );
}