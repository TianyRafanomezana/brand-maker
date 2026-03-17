"use client";

import { Search, User, Heart, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "ACCUEIL", href: "/" },
  { label: "PRÉSENTATION", href: "#", hasDropdown: true },
  { label: "COLLECTION", href: "#", hasDropdown: true },
  { label: "LES INTEMPORELS", href: "#", hasDropdown: true },
  { label: "CHAPEAUX", href: "#" },
  { label: "CONTACT", href: "#" },
];

export default function Header() {
  return (
    <header id="header" className="w-full bg-background" data-editable="background">
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <Link href="/" className="font-[family-name:var(--font-script)] text-5xl text-foreground hover:opacity-80 transition-opacity" data-editable="foreground">
          Rabarany
        </Link>
      </div>

      {/* Navigation + Icons */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-border/30" data-editable="border">
        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-wider text-foreground hover:opacity-70 transition-opacity flex items-center gap-1"
              data-editable="foreground"
            >
              {item.label}
              {item.hasDropdown && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:opacity-70 transition-opacity" data-editable="foreground">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:opacity-70 transition-opacity" data-editable="foreground">
            <User className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:opacity-70 transition-opacity" data-editable="foreground">
            <Heart className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:opacity-70 transition-opacity" data-editable="foreground">
            <Settings className="w-5 h-5" />
          </button>
          <button className="relative text-foreground hover:opacity-70 transition-opacity" data-editable="foreground">
            <ShoppingBag className="w-5 h-5" />
            <span 
              className="absolute -top-2 -right-2 bg-foreground text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
              data-editable="primary"
            >
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
