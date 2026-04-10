import { Card, SectionTitle } from "./SectionPrimitives";

export interface PricingPack {
  name: string;
  price: string;
  description: string;
  /** Middle column: light card, scaled on md+ */
  highlight?: boolean;
}

interface PricingSectionProps {
  kicker: string;
  title: string;
  subtitle: string;
  packs: [PricingPack, PricingPack, PricingPack];
}

export function PricingSection({
  kicker,
  title,
  subtitle,
  packs,
}: PricingSectionProps) {
  return (
    <section className="py-20 md:py-32 px-6 border-t border-neutral-900 text-center">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker={kicker} title={title} subtitle={subtitle} />
        <div className="grid md:grid-cols-3 gap-10" data-reveal>
          {packs.map((pack, i) =>
            pack.highlight ? (
              <div
                key={i}
                className="bg-white text-black p-10 rounded-3xl md:scale-105 shadow-xl"
              >
                <h3 className="mb-4">{pack.name}</h3>
                <p className="text-3xl mb-4">{pack.price}</p>
                <p className="text-sm">{pack.description}</p>
              </div>
            ) : (
              <Card key={i}>
                <h3 className="mb-4">{pack.name}</h3>
                <p className="text-3xl mb-4">{pack.price}</p>
                <p className="text-gray-400 text-sm">{pack.description}</p>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
