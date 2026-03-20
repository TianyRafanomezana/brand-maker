"use client";

import { Search, User, Heart, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "ACCUEIL" },
  { label: "PRÉSENTATION" },
  {
    label: "COLLECTION",
    hasDropdown: true,
    subItems: ["Nouvelle Collection", "Intemporels", "Édition limitée"]
  },
  {
    label: "SAC",
    hasDropdown: true,
    subItems: ["Sac porté épaule", "Sac bandoulière", "Sac édition limitée"]
  },
  {
    label: "CHAPEAUX",
  },
  {
    label: "ACCESSOIRES",
    hasDropdown: true,
    subItems: ["Ceintures", "Pochettes"]
  },
  { label: "CONTACT" },
];

export default function Header() {
  return (
    <header id="header" className="w-full bg-background" data-editable="background">
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <span className="cursor-pointer font-[family-name:var(--theme-font-script)] text-5xl text-foreground hover:opacity-80 transition-opacity" data-editable="foreground" data-font-category="script">
          Rabarany
        </span>
      </div>

      {/* Navigation + Icons */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-border/30" data-editable="border">
        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group py-2">
              <span
                className="cursor-pointer font-[family-name:var(--theme-font-body)] text-sm font-medium tracking-wider text-foreground hover:opacity-70 transition-opacity flex items-center gap-1"
                data-editable="foreground"
                data-font-category="body"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>

              {item.hasDropdown && item.subItems && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[220px]">
                  <div className="bg-background border border-border/50 shadow-2xl py-4 rounded-sm backdrop-blur-md" data-editable="background border">
                    <ul className="flex flex-col">
                      {item.subItems.map((subItem) => (
                        <li key={subItem}>
                          <span
                            className="block px-6 py-2.5 text-xs tracking-widest text-foreground hover:bg-foreground/5 transition-colors cursor-pointer font-[family-name:var(--theme-font-body)]"
                            data-editable="foreground"
                            data-font-category="body"
                          >
                            {subItem.toUpperCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
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
