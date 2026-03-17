"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { name: "MOUSTIERS FILET MM 4T", price: "105,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Moustiers" },
  { name: "TSARA FLORE", price: "165,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Tsara" },
  { name: "LISTIER MANA MM", price: "115,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Listier" },
  { name: "ANAY", price: "99,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Anay" },
  { name: "KELY MANA", price: "89,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Kely" },
  { name: "FILET", price: "75,00 €", image: "https://placehold.co/300x400/f5f0ee/8b7d76?text=Filet" },
];

export default function ProductCarousel() {
  return (
    <section id="products" className="w-full py-12 px-8 bg-background" data-editable="background">
      <h2 className="text-center text-xl font-semibold tracking-[0.2em] text-foreground uppercase mb-10" data-editable="foreground">
        LES PLUS VUES
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Left arrow */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors" data-editable="foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <a key={product.name} href="#" className="group block">
              <div className="relative w-full aspect-[3/4] bg-card overflow-hidden" data-editable="card">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <h3 className="mt-3 text-xs font-semibold tracking-[0.1em] text-foreground uppercase" data-editable="foreground">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground" data-editable="mutedForeground">
                {product.price}
              </p>
            </a>
          ))}
        </div>

        {/* Right arrow */}
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors" data-editable="foreground">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
