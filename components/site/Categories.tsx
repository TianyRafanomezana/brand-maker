import Image from "next/image";

const categories = [
  {
    label: "COLLECTION",
    image: "https://placehold.co/400x300/e8ddd9/8b7d76?text=Collection",
  },
  {
    label: "LES INTEMPORELS",
    image: "https://placehold.co/400x300/e8ddd9/8b7d76?text=Intemporels",
  },
  {
    label: "CHAPEAUX",
    image: "https://placehold.co/400x300/e8ddd9/8b7d76?text=Chapeaux",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="w-full py-12 px-8 bg-background" data-editable="background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href="#"
            className="group relative block overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] bg-card" data-editable="card">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
            </div>
            <p className="mt-3 text-sm font-semibold tracking-[0.15em] text-foreground uppercase" data-editable="foreground">
              {cat.label}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
