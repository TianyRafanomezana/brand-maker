"use client";

import { useThemeContext } from "./ThemeProvider";
import { COLOR_LABELS } from "@/lib/theme/types";
import { RotateCcw } from "lucide-react";

// The core colors we want to show in the visualizer
const VISUALIZED_COLORS = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "accent"
] as const;

export default function PaletteVisualizer() {
  const { themeState, updateColor, resetTheme } = useThemeContext();
  
  return (
    <div className="fixed bottom-6 right-20 z-40 animate-in slide-in-from-bottom duration-500 hidden md:block">
      <div className="flex bg-popover rounded-full p-1.5 shadow-xl border border-border/50 backdrop-blur-sm shadow-black/10">
        {VISUALIZED_COLORS.map((key) => {
          const colorValue = themeState.global.colors[key] as string;
          return (
            <div 
              key={key}
              className="group relative"
            >
              {/* Le carré de couleur cliquable */}
              <label 
                className="block w-8 h-8 rounded-full m-0.5 shadow-inner cursor-pointer transition-transform hover:scale-110 overflow-hidden relative"
                style={{ backgroundColor: colorValue }}
              >
                <input
                  type="color"
                  value={colorValue}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title={`Modifier ${COLOR_LABELS[key]}`}
                />
              </label>
              
              {/* Info bulle au hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <span className="font-bold">{COLOR_LABELS[key]}</span>
                <span className="ml-2 uppercase opacity-80">{colorValue}</span>
                {/* Petite flèche en bas de l'infobulle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
              </div>
            </div>
          );
        })}
        
        {/* Ligne de séparation */}
        <div className="w-px bg-border/50 mx-1 my-2" />
        
        {/* Bouton Reset */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={resetTheme}
            className="flex w-8 h-8 items-center justify-center rounded-full m-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          {/* Info bulle au hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">
            Réinitialiser le thème
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
