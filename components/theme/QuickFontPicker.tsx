"use client";

import { useEffect, useRef } from "react";
import { ThemeFonts, FONT_CATEGORIES, AVAILABLE_FONTS } from "@/lib/theme/types";
import { RotateCcw } from "lucide-react";

interface QuickFontPickerProps {
  x: number;
  y: number;
  fontCategory: keyof ThemeFonts;
  currentValue: string;
  isModified: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function QuickFontPicker({
  x,
  y,
  fontCategory,
  currentValue,
  isModified,
  onChange,
  onReset,
  onClose,
}: QuickFontPickerProps) {
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
  const left = Math.min(x, typeof window !== "undefined" ? window.innerWidth - 220 : x);
  const top = Math.min(y, typeof window !== "undefined" ? window.innerHeight - 100 : y);

  const categoryLabel = FONT_CATEGORIES.find(c => c.id === fontCategory)?.label || fontCategory;

  return (
    <div
      ref={containerRef}
      className="fixed z-[100] flex gap-2 rounded-lg border border-border bg-popover p-3 shadow-xl animate-in fade-in zoom-in-95 duration-200 w-[200px] font-[family-name:var(--theme-font-body)]"
      style={{ top, left }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-popover-foreground">
          {categoryLabel}
        </span>
        {isModified && (
          <button
            onClick={onReset}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Réinitialiser cette police"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="relative">
        <select
          value={currentValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border text-foreground text-xs rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-ring appearance-none"
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.name} value={font.name}>
              {font.name}
            </option>
          ))}
        </select>
        {/* Custom arrow for select */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
