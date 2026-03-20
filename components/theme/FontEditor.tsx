"use client";

import { useThemeContext } from "./ThemeProvider";
import { ThemeFonts, FONT_CATEGORIES, AVAILABLE_FONTS, DEFAULT_THEME } from "@/lib/theme/types";
import { RotateCcw } from "lucide-react";

export default function FontEditor() {
  const { themeState, updateFont } = useThemeContext();

  const getDefaultFont = (key: keyof ThemeFonts) => {
    return DEFAULT_THEME.fonts[key];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground border-b border-border pb-1">
          Typographies du site
        </h3>
        <p className="text-xs text-muted-foreground">
          Ces polices s'appliquent globalement à tout le site.
        </p>
      </div>

      <div className="space-y-5">
        {FONT_CATEGORIES.map((category) => {
          const fontKey = category.id as keyof ThemeFonts;
          const currentValue = themeState.global.fonts[fontKey] || DEFAULT_THEME.fonts[fontKey];
          const defaultValue = getDefaultFont(fontKey);
          const isModified = currentValue !== defaultValue;

          return (
            <div key={fontKey} className="flex flex-col gap-1.5">
              <label
                htmlFor={`font-${fontKey}`}
                className="text-xs font-semibold text-foreground flex justify-between items-center"
              >
                <span>{category.label}</span>
                {isModified && (
                  <button
                    onClick={() => updateFont(fontKey, defaultValue)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Réinitialiser cette police"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </label>

              <div className="relative shadow-sm rounded-md">
                <select
                  id={`font-${fontKey}`}
                  value={currentValue}
                  onChange={(e) => updateFont(fontKey, e.target.value)}
                  className="w-full bg-background border border-border text-foreground text-sm rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring focus:border-ring appearance-none transition-colors"
                >
                  {AVAILABLE_FONTS.map((font) => (
                    <option key={font.name} value={font.name}>
                      {font.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <svg className="h-4 w-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
