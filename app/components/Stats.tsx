"use client";

interface StatItem {
  value: string;
  label: string;
}

interface StatsProps {
  stats: [StatItem, StatItem, StatItem];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="py-16 md:py-24 border-t border-neutral-900 text-center px-6">
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        data-reveal
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-3xl md:text-4xl mb-2">{stat.value}</p>
            <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
