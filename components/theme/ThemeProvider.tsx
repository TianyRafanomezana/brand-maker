"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeState, ThemeColors, ThemeFonts, DEFAULT_THEME_STATE, DEFAULT_THEME } from "@/lib/theme/types";
import { applyThemeToDOM } from "@/lib/theme/utils";
import QuickColorPicker from "./QuickColorPicker";
import QuickFontPicker from "./QuickFontPicker";
import PaletteVisualizer from "./PaletteVisualizer";

interface QuickPickerConfig {
  x: number;
  y: number;
  colorKey: keyof ThemeColors;
  sectionId: string;
}

interface QuickFontPickerConfig {
  x: number;
  y: number;
  fontCategory: keyof ThemeFonts;
}

interface ThemeContextType {
  themeState: ThemeState;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  isPanelOpen: boolean;
  updateColor: (key: keyof ThemeColors, value: string) => void;
  updateFont: (key: keyof ThemeFonts, value: string) => void;
  resetTheme: () => void;
  loadTheme: (state: ThemeState) => void;
  togglePanel: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeState, setThemeState] = useState<ThemeState>(DEFAULT_THEME_STATE);
  const [activeSection, setActiveSection] = useState<string>("global");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quickPickerConfig, setQuickPickerConfig] = useState<QuickPickerConfig | null>(null);
  const [quickFontPickerConfig, setQuickFontPickerConfig] = useState<QuickFontPickerConfig | null>(null);

  // Charger depuis le localStorage au premier rendu
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("brand-maker-theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // Helper to migrate old font keys (sans → body)
        const migrateFonts = (fonts: Record<string, string>) => {
          const migrated = { ...fonts };
          if (migrated.sans && !migrated.body) {
            migrated.body = migrated.sans;
            migrated.heading = migrated.heading || migrated.sans;
            migrated.product = migrated.product || migrated.sans;
            migrated.price = migrated.price || migrated.sans;
            delete migrated.sans;
          }
          return migrated;
        };

        // Migration depuis l'ancien format (Theme) vers le nouveau (ThemeState)
        if (parsed.colors && !parsed.global) {
          const fonts = parsed.fonts ? migrateFonts(parsed.fonts) : {};
          setThemeState({
            global: { ...DEFAULT_THEME, ...parsed, fonts: { ...DEFAULT_THEME.fonts, ...fonts } },
            sections: {},
          });
        } else {
          // Nouveau format
          const globalData = parsed.global || {};
          const fonts = globalData.fonts ? migrateFonts(globalData.fonts) : {};
          setThemeState({
            global: { ...DEFAULT_THEME, ...globalData, fonts: { ...DEFAULT_THEME.fonts, ...fonts } },
            sections: parsed.sections || {},
          });
        }
      } catch (e) {
        console.error("Erreur lors du parsing du thème", e);
      }
    }
  }, []);

  // Appliquer le thème au DOM et sauvegarder
  useEffect(() => {
    if (mounted) {
      applyThemeToDOM(themeState);
      localStorage.setItem("brand-maker-theme", JSON.stringify(themeState));
    }
  }, [themeState, mounted]);

  // Global Double Click Listener for Visual Editing
  useEffect(() => {
    if (!mounted) return;

    const handleDoubleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const fontElement = target.closest('[data-font-category]');
      if (fontElement) {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        const fontCategory = fontElement.getAttribute('data-font-category') as keyof ThemeFonts;
        
        setQuickPickerConfig(null);
        setQuickFontPickerConfig({
          x: e.clientX,
          y: e.clientY,
          fontCategory,
        });
        return;
      }

      // Find the closest element with data-editable attribute
      const editableElement = target.closest('[data-editable]');
      
      if (editableElement) {
        // Prevent text selection on double click
        e.preventDefault();
        window.getSelection()?.removeAllRanges();

        const colorKey = editableElement.getAttribute('data-editable') as keyof ThemeColors;
        
        // Find the closest parent section with an ID to determine scope
        const sectionElement = editableElement.closest('section[id]');
        const sectionId = sectionElement ? sectionElement.id : 'global';

        setQuickFontPickerConfig(null);
        setQuickPickerConfig({
          x: e.clientX,
          y: e.clientY,
          colorKey,
          sectionId,
        });
      }
    };

    document.addEventListener("dblclick", handleDoubleClick);
    return () => document.removeEventListener("dblclick", handleDoubleClick);
  }, [mounted]);

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setThemeState((prev) => {
      // Modification globale
      if (activeSection === "global") {
        return {
          ...prev,
          global: {
            ...prev.global,
            colors: { ...prev.global.colors, [key]: value },
          },
        };
      }
      
      // Modification spécifique à une section
      const currentSectionColors = prev.sections[activeSection] || {};
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [activeSection]: {
            ...currentSectionColors,
            [key]: value,
          },
        },
      };
    });
  };

  // Helper dedicated to the Quick Picker
  const updateColorFromPicker = (sectionId: string, key: keyof ThemeColors, value: string) => {
    // If the picker modifies a specific section, we temporarily change activeSection so the side panel syncs too,
    // and then we update the state.
    setActiveSection(sectionId);
    
    setThemeState((prev) => {
      if (sectionId === "global") {
        return {
          ...prev,
          global: { ...prev.global, colors: { ...prev.global.colors, [key]: value } },
        };
      }
      const currentSectionColors = prev.sections[sectionId] || {};
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: { ...currentSectionColors, [key]: value },
        },
      };
    });
  };

  const updateFont = (key: keyof ThemeFonts, value: string) => {
    // Les fonts restent globales pour le moment
    setThemeState((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        fonts: { ...prev.global.fonts, [key]: value },
      },
    }));
  };

  const resetTheme = () => {
    setThemeState(DEFAULT_THEME_STATE);
    setActiveSection("global");
    localStorage.removeItem("brand-maker-theme");
  };

  const loadTheme = (newState: ThemeState) => {
    setThemeState(newState);
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  // Get current color for the picker
  const getPickerCurrentColor = () => {
    if (!quickPickerConfig) return "#000000";
    const { sectionId, colorKey } = quickPickerConfig;
    if (sectionId === "global" || !themeState.sections[sectionId]?.[colorKey]) {
      return themeState.global.colors[colorKey] || DEFAULT_THEME.colors[colorKey];
    }
    return themeState.sections[sectionId]?.[colorKey] as string;
  };

  // Get default color for the picker (for the reset button)
  const getPickerDefaultColor = () => {
    if (!quickPickerConfig) return "#000000";
    const { sectionId, colorKey } = quickPickerConfig;
    if (sectionId === "global") return DEFAULT_THEME.colors[colorKey];
    return themeState.global.colors[colorKey];
  };

  // Check if modified for the reset button
  const isPickerColorModified = () => {
    if (!quickPickerConfig) return false;
    const current = getPickerCurrentColor();
    const def = getPickerDefaultColor();
    return current.toLowerCase() !== def.toLowerCase();
  };

  return (
    <ThemeContext.Provider
      value={{
        themeState,
        activeSection,
        setActiveSection,
        isPanelOpen,
        updateColor,
        updateFont,
        resetTheme,
        loadTheme,
        togglePanel,
      }}
    >
      {children}
      
      <PaletteVisualizer />
      
      {quickPickerConfig && (
        <QuickColorPicker
          x={quickPickerConfig.x}
          y={quickPickerConfig.y}
          colorKey={quickPickerConfig.colorKey}
          sectionId={quickPickerConfig.sectionId}
          currentValue={getPickerCurrentColor()}
          isModified={isPickerColorModified()}
          onChange={(val) => updateColorFromPicker(quickPickerConfig.sectionId, quickPickerConfig.colorKey, val)}
          onReset={() => updateColorFromPicker(quickPickerConfig.sectionId, quickPickerConfig.colorKey, getPickerDefaultColor())}
          onApplyToAll={() => {
            const val = getPickerCurrentColor();
            setThemeState((prev) => {
              const newSections = { ...prev.sections };
              Object.keys(newSections).forEach((secId) => {
                if (newSections[secId]) {
                  const cleanedSection = { ...newSections[secId] };
                  delete cleanedSection[quickPickerConfig.colorKey];
                  newSections[secId] = cleanedSection;
                }
              });
              return {
                ...prev,
                global: {
                  ...prev.global,
                  colors: { ...prev.global.colors, [quickPickerConfig.colorKey]: val },
                },
                sections: newSections,
              };
            });
            // Also reset activeSection to global since it's now a global setting
            setActiveSection("global");
            // Close the picker
            setQuickPickerConfig(null);
          }}
            onClose={() => setQuickPickerConfig(null)}
          />
        )}
        
        {quickFontPickerConfig && (
          <QuickFontPicker
            x={quickFontPickerConfig.x}
            y={quickFontPickerConfig.y}
            fontCategory={quickFontPickerConfig.fontCategory}
            currentValue={themeState.global.fonts[quickFontPickerConfig.fontCategory] || ""}
            isModified={themeState.global.fonts[quickFontPickerConfig.fontCategory] !== DEFAULT_THEME.fonts[quickFontPickerConfig.fontCategory]}
            onChange={(val) => updateFont(quickFontPickerConfig.fontCategory, val)}
            onReset={() => updateFont(quickFontPickerConfig.fontCategory, DEFAULT_THEME.fonts[quickFontPickerConfig.fontCategory])}
            onClose={() => setQuickFontPickerConfig(null)}
          />
        )}
      </ThemeContext.Provider>
    );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext doit être utilisé dans un ThemeProvider");
  }
  return context;
}
