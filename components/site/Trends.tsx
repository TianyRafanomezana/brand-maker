import Image from "next/image";

const trends = [
  { image: "/img/td-first.png" },
  { image: "/img/td-second.png" },
  { image: "/img/td-third.png" },
  { image: "/img/td-fourth.png" },
];

export default function Trends() {
  return (
    <section id="trends" className="w-full py-12 px-8 bg-background" data-editable="background">
      <h2 className="font-[family-name:var(--theme-font-heading)] text-center text-xl font-semibold tracking-[0.2em] text-foreground uppercase mb-10" data-editable="foreground" data-font-category="heading">
        LES TENDANCES
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {trends.map((trend, i) => (
          <div key={i} className="group block overflow-hidden cursor-pointer">
            <div className="relative w-full aspect-[2/3] bg-card overflow-hidden" data-editable="card">
              <Image
                src={trend.image}
                alt={`Tendance ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
