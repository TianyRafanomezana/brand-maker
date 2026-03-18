"use client";

import { useThemeContext } from "./ThemeProvider";
import { Palette, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ColorEditor from "./ColorEditor";
import FontEditor from "./FontEditor";

export default function ThemePanel() {
  const { isPanelOpen, togglePanel } = useThemeContext();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "fonts">("colors");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) null; // Éviter l'hydratation mismatch

  return (
    <>
      {/* Bouton flottant pour ouvrir le panneau */}
      <button
        onClick={togglePanel}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95",
          isPanelOpen && "translate-x-32 opacity-0 pointer-events-none" // Cache le bouton quand le panneau est ouvert
        )}
        aria-label="Ouvrir le panneau de thème"
      >
        <Palette className="h-6 w-6" />
      </button>

      {/* Overlay sombre pour fermer au clic dehors (optionnel, mais pratique sur mobile) */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={togglePanel}
        />
      )}

      {/* Panneau latéral droit */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 flex h-screen w-full max-w-sm flex-col bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-in-out",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header du panneau */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-bold text-foreground font-[family-name:var(--theme-font-body)]">
              Personnalisation
            </h2>
          </div>
          <button
            onClick={togglePanel}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors text-foreground"
            aria-label="Fermer le panneau"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Onglets */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("colors")}
            className={cn(
              "flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 font-[family-name:var(--theme-font-body)]",
              activeTab === "colors" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Couleurs
          </button>
          <button
            onClick={() => setActiveTab("fonts")}
            className={cn(
              "flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 font-[family-name:var(--theme-font-body)]",
              activeTab === "fonts" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Polices
          </button>
        </div>

        {/* Contenu du panneau */}
        <div className="flex-1 overflow-y-auto p-6 text-foreground font-[family-name:var(--theme-font-body)]">
          {activeTab === "colors" ? <ColorEditor /> : <FontEditor />}
        </div>
      </div>
    </>
  );
}
