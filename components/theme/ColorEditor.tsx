"use client";

import { useThemeContext } from "./ThemeProvider";
import { COLOR_GROUPS, COLOR_LABELS, ThemeColors, DEFAULT_THEME, AVAILABLE_SECTIONS } from "@/lib/theme/types";
import { RotateCcw } from "lucide-react";

export default function ColorEditor() {
  const { themeState, activeSection, setActiveSection, updateColor } = useThemeContext();

  // Get the effective colors for the current section
  // If it's a specific section, we fall back to the global color for display if not overridden
  const currentColors = activeSection === "global"
    ? themeState.global.colors
    : { ...themeState.global.colors, ...(themeState.sections[activeSection] || {}) };

  // What should we consider the "default" for the reset button?
  // If global: reset to DEFAULT_THEME.
  // If section: reset to the global theme's current value (effectively removing the override conceptually, though we just set the value).
  const getDefaultColor = (key: keyof ThemeColors) => {
    if (activeSection === "global") return DEFAULT_THEME.colors[key];
    return themeState.global.colors[key];
  };

  return (
    <div className="space-y-8">
      {/* Sélecteur de Section */}
      <div className="space-y-2">
        <label htmlFor="section-selector" className="text-sm font-semibold text-foreground">
          Zone à modifier
        </label>
        <select
          id="section-selector"
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full bg-background border border-border text-foreground text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
        >
          {AVAILABLE_SECTIONS.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          {activeSection === "global" 
            ? "Ces couleurs s'appliquent par défaut à toute la page." 
            : "Ces couleurs surchargent les couleurs globales uniquement pour cette section."}
        </p>
      </div>

      {Object.entries(COLOR_GROUPS).map(([groupId, group]) => (
        <div key={groupId} className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground border-b border-border pb-1">
            {group.label}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {group.keys.map((key) => {
              const colorKey = key as keyof ThemeColors;
              const hexValue = currentColors[colorKey] || DEFAULT_THEME.colors[colorKey];
              const defaultHex = getDefaultColor(colorKey);

              // We only show reset button if the value is strictly different from its default
              // For sections, if it matches the global color, it is "reset"
              const isModified = hexValue.toLowerCase() !== defaultHex.toLowerCase();

              return (
                <div key={colorKey} className="flex flex-col gap-1.5">
                  <label 
                    htmlFor={`color-${colorKey}`}
                    className="text-xs font-medium text-foreground truncate"
                    title={COLOR_LABELS[colorKey]}
                  >
                    {COLOR_LABELS[colorKey]}
                  </label>
                  
                  <div className="flex items-center gap-2">
                    {/* Le color picker natif invisible qui couvre le div visible */}
                    <label className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-border overflow-hidden shadow-sm">
                      <div 
                        className="absolute inset-0 z-10" 
                        style={{ backgroundColor: hexValue }} 
                      />
                      <input
                        id={`color-${colorKey}`}
                        type="color"
                        value={hexValue}
                        onChange={(e) => updateColor(colorKey, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-20"
                      />
                    </label>
                    <span className="text-xs text-muted-foreground font-mono uppercase bg-muted px-1.5 py-1 rounded">
                      {hexValue}
                    </span>
                    {isModified && (
                      <button
                        onClick={() => updateColor(colorKey, defaultHex)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-auto"
                        title="Réinitialiser cette couleur"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
