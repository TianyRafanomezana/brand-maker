import Link from "next/link";
import { CreditCard } from "lucide-react";

const footerColumns = [
  {
    title: "HORAIRES D'OUVERTURE",
    links: [
      { label: "Du Lundi au Vendredi" },
      { label: "De 9h à 18h" },
    ],
  },
  {
    title: "INFORMATIONS",
    links: [
      { label: "Livraison et retour" },
      { label: "Mentions légales" },
      { label: "Conditions générales" },
    ],
  },
  {
    title: "RABARANY",
    links: [
      { label: "La marque" },
      { label: "Lookbook" },
      { label: "A propos" },
    ],
  },
  {
    title: "LA COLLECTION",
    links: [
      { label: "Sacs" },
      { label: "Chapeaux" },
      { label: "Accessoires" },
      { label: "Paniers / Cabas" },
    ],
  },
  {
    title: "SERVICE CLIENT",
    links: [
      { label: "Phone: 06 95 18 81 17" },
      { label: "WhatsApp +33 6 95 18 81 17" },
      { label: "contact@rabarany.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full">
      {/* Main footer */}
      <div className="bg-footer text-footer-foreground" data-editable="footer">
        <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--theme-font-heading)] text-xs font-bold tracking-wider uppercase mb-4 text-foreground" data-editable="foreground" data-font-category="heading">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <span
                      className="cursor-pointer font-[family-name:var(--theme-font-body)] text-xs text-muted-foreground hover:text-foreground underline decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
                      data-editable="mutedForeground"
                      data-font-category="body"
                    >
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-footer-bottom text-footer-bottom-foreground" data-editable="footerBottom">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <p className="font-[family-name:var(--theme-font-body)] text-xs opacity-80" data-font-category="body">
            © 2021 Copyright © Rabarany
          </p>
          <div className="flex items-center gap-3">
            {["VISA", "MC", "DISC", "AMZN"].map((card) => (
              <div
                key={card}
                className="w-10 h-6 bg-white/20 rounded-sm flex items-center justify-center"
              >
                <span className="font-[family-name:var(--theme-font-body)] text-[8px] font-bold opacity-90" data-font-category="body">{card}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
