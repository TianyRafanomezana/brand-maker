"use client";

import { useEffect, useRef } from "react";
import { ThemeColors, COLOR_LABELS } from "@/lib/theme/types";
import { RotateCcw, Globe } from "lucide-react";

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
      className="fixed z-[100] flex items-center gap-3 rounded-lg border border-border bg-popover p-3 shadow-xl animate-in fade-in zoom-in-95 duration-200"
      style={{ top, left }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-popover-foreground">
          {COLOR_LABELS[colorKey]}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase">
          {sectionId === "global" ? "Global" : `Section: ${sectionId}`}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded border border-border overflow-hidden shadow-sm">
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
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-auto"
            title="Réinitialiser cette couleur"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {sectionId !== "global" && (
        <div className="border-border">
          <button
            onClick={onApplyToAll}
            className="flex items-center gap-1.5 w-full text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
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
