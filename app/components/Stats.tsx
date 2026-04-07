"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  stats: [StatItem, StatItem, StatItem];
}

function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

function StatValue({ value, isVisible }: { value: string; isVisible: boolean }) {
  const numericMatch = value.match(/^([\d,]+)(\+?)$/);
  const euroMatch = value.match(/^€([\d,]+)([MK]?)(\+?)$/);

  if (euroMatch) {
    const num = parseInt(euroMatch[1].replace(/,/g, ""), 10);
    const suffix = euroMatch[2];
    const plus = euroMatch[3];
    const count = useCountUp(num, 2000, isVisible);
    return <>{`€${count}${suffix}${plus}`}</>;
  }

  if (numericMatch) {
    const num = parseInt(numericMatch[1].replace(/,/g, ""), 10);
    const plus = numericMatch[2];
    const count = useCountUp(num, 2000, isVisible);
    return <>{`${count}${plus}`}</>;
  }

  return <>{value}</>;
}

export function Stats({ stats }: StatsProps) {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section py-20 md:py-24 border-t border-white/[0.06] px-6"
    >
      <div className="max-w-[1150px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-item relative text-center transition-all duration-300 ease-out hover:-translate-y-1 ${
                isVisible ? "stat-visible" : "stat-hidden"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="stat-value text-[40px] md:text-[56px] font-semibold tracking-[-0.02em] text-white leading-none">
                <StatValue value={stat.value} isVisible={isVisible} />
              </p>
              <p className="stat-label text-sm md:text-[15px] text-white/60 mt-2 md:mt-3 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
