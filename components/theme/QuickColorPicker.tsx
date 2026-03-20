"use client";

import { useEffect, useRef, useMemo } from "react";
import { ThemeColors, COLOR_LABELS } from "@/lib/theme/types";
import { RotateCcw, Globe, Sun, Droplets } from "lucide-react";
import { generateSimilarTones, hexToHsl, hslToHex } from "@/lib/theme/color-utils";

interface QuickColorPickerProps {
  x: number;
  y: number;
  colorKey: keyof ThemeColors;
  currentValue: string;
  isModified: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
  onApplyToAll: () => void;
  onClose: () => void;
  sectionId: string;
}

export default function QuickColorPicker({
  x,
  y,
  colorKey,
  currentValue,
  isModified,
  onChange,
  onReset,
  onApplyToAll,
  onClose,
  sectionId,
}: QuickColorPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Valeurs HSL pour les sliders
  const { h, s, l } = useMemo(() => hexToHsl(currentValue), [currentValue]);

  // Générer des suggestions basées sur la valeur INITIALE (figé pour cette ouverture)
  // On utilise un tableau de dépendances vide pour qu'elles ne changent pas quand on clique sur une suggestion
  const suggestions = useMemo(() => generateSimilarTones(currentValue), []);

  // Fermer quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Adjust position so it doesn't go off-screen
  const left = Math.min(x, typeof window !== "undefined" ? window.innerWidth - 200 : x);
  const top = Math.min(y, typeof window !== "undefined" ? window.innerHeight - 100 : y);

  return (
    <div
      ref={containerRef}
      className="fixed z-[100] flex flex-col gap-3 rounded-lg border border-border bg-popover p-3 shadow-xl animate-in fade-in zoom-in-95 duration-200 min-w-[220px]"
      style={{ top, left }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-popover-foreground">
            {COLOR_LABELS[colorKey]}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase">
            {sectionId === "global" ? "Global" : `Section: ${sectionId}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded border border-border overflow-hidden shadow-sm hover:scale-110 transition-transform">
            <div className="absolute inset-0 z-10" style={{ backgroundColor: currentValue }} />
            <input
              type="color"
              value={currentValue}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-20"
            />
          </label>

          {isModified && (
            <button
              onClick={onReset}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Suggestions de tons */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Suggestions
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {suggestions.map((hex, i) => (
            <button
              key={`${hex}-${i}`}
              className="w-6 h-6 rounded-full border border-border/40 hover:scale-125 transition-all shadow-sm ring-offset-background hover:ring-2 hover:ring-ring"
              style={{ backgroundColor: hex }}
              onClick={() => onChange(hex)}
              title={hex}
            />
          ))}
        </div>
      </div>

      {/* Sliders HSL */}
      <div className="flex flex-col gap-3 py-2 border-y border-border/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <Droplets className="w-3 h-3" /> Saturation
            </div>
            <span className="text-[10px] font-mono tabular-nums">{Math.round(s)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={s}
            onChange={(e) => onChange(hslToHex(h, parseInt(e.target.value), l))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <Sun className="w-3 h-3" /> Luminosité
            </div>
            <span className="text-[10px] font-mono tabular-nums">{Math.round(l)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={l}
            onChange={(e) => onChange(hslToHex(h, s, parseInt(e.target.value)))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>



      {sectionId !== "global" && (
        <div className="pt-1 mt-1 border-t border-border/50">
          <button
            onClick={onApplyToAll}
            className="flex items-center gap-1.5 w-full text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors py-1 px-1 rounded hover:bg-muted/50"
            title="Appliquer cette couleur à tout le site"
          >
            <Globe className="w-3 h-3" />
            Appliquer partout
          </button>
        </div>
      )}
    </div>
  );
}
