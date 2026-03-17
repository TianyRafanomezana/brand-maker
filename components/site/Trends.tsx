import Image from "next/image";

const trends = [
  { image: "https://placehold.co/300x450/e8ddd9/8b7d76?text=Look+1" },
  { image: "https://placehold.co/300x450/e8ddd9/8b7d76?text=Look+2" },
  { image: "https://placehold.co/300x450/e8ddd9/8b7d76?text=Look+3" },
  { image: "https://placehold.co/300x450/e8ddd9/8b7d76?text=Look+4" },
];

export default function Trends() {
  return (
    <section id="trends" className="w-full py-12 px-8 bg-background" data-editable="background">
      <h2 className="text-center text-xl font-semibold tracking-[0.2em] text-foreground uppercase mb-10" data-editable="foreground">
        LES TENDANCES
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {trends.map((trend, i) => (
          <a key={i} href="#" className="group block overflow-hidden">
            <div className="relative w-full aspect-[2/3] bg-card overflow-hidden" data-editable="card">
              <Image
                src={trend.image}
                alt={`Tendance ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
