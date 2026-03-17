import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const infoItems = [
  {
    icon: Truck,
    title: "LIVRAISON",
    description: "Livraison offerte en France métropolitaine pour toute commande à partir de 39 euros",
  },
  {
    icon: ShieldCheck,
    title: "PAIEMENTS SÉCURISÉS",
    description: "Paiement sécurisé par carte bancaire Visa, MasterCard et PayPal",
  },
  {
    icon: RotateCcw,
    title: "Politique de retours",
    description: "Retour à la charge du client",
  },
];

export default function InfoBar() {
  return (
    <section id="info" className="w-full border-y border-border/30 bg-background" data-editable="background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
        {infoItems.map((item) => (
          <div key={item.title} className="flex items-start gap-4 px-8 py-6">
            <item.icon className="w-8 h-8 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} data-editable="foreground" />
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground uppercase" data-editable="foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed" data-editable="mutedForeground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
