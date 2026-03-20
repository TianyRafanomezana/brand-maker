import Image from "next/image";

const categories = [
  {
    label: "LES SACS",
    image: "/img/intemporels-sec.png",
    subtitle: "Un savoir faire unique",
    centered: true,
  },
  {
    label: "CHAPEAUX",
    image: "/img/chapeaux.jpg",
    subtitle: "Élégance tressée",
    centered: true,
  },
  {
    label: "LES ACCESSOIRES",
    image: "/img/accessoires-sec.jpg",
    subtitle: "L'art du détail, fait main",
    centered: true,
  },

];

export default function Categories() {
  return (
    <section id="categories" className="w-full py-12 px-8 bg-background" data-editable="background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="group relative block overflow-hidden cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] bg-card overflow-hidden" data-editable="card">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {cat.centered && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-[family-name:var(--theme-font-heading)] text-xl font-bold tracking-[0.2em] text-foreground uppercase drop-shadow-sm" data-editable="foreground" data-font-category="heading">
                    {cat.label}
                  </h3>
                  {cat.subtitle && (
                    <p className="font-[family-name:var(--theme-font-product)] text-[13px] font-medium tracking-wide text-foreground mt-2 drop-shadow-sm" data-editable="foreground" data-font-category="product">
                      {cat.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!cat.centered && (
              <p className="font-[family-name:var(--theme-font-product)] mt-3 text-sm font-semibold tracking-[0.15em] text-foreground uppercase" data-editable="foreground" data-font-category="product">
                {cat.label}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
