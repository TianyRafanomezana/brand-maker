import { ThemeState, ThemeColors, COLOR_CSS_VAR_MAP } from "./types";

/**
 * Helper to apply a partial or full set of colors to a specific DOM element.
 */
function applyColorsToElement(element: HTMLElement, colors: Partial<ThemeColors>) {
  Object.entries(colors).forEach(([key, value]) => {
    if (!value) return; // Skip undefined values
    const cssVarName = COLOR_CSS_VAR_MAP[key as keyof typeof COLOR_CSS_VAR_MAP];
    if (cssVarName) {
      // Pour les sections (surcharge locale), on doit s'assurer que les CSS variables n'héritent pas du document.
      // Dans Tailwind v4, il est souvent préférable de redéclarer la variable pour la forcer.
      element.style.setProperty(cssVarName, value);
    }
  });

  // Optional: clear out properties that exist in the map but aren't in `colors` to allow fallback to root?
  // We'll leave it simple for now: we just set what's explicitly provided.
}

/**
 * Applique les couleurs du thème global aux variables CSS du :root,
 * PUIS applique les surcharges locales (sections) aux éléments par identifiant.
 */
export function applyThemeToDOM(state: ThemeState) {
  if (typeof document === "undefined") return;

  // 1. Appliquer le thème global sur :root
  const root = document.documentElement;
  applyColorsToElement(root, state.global.colors);

  // 2. Appliquer les surcharges de section
  Object.entries(state.sections).forEach(([sectionId, sectionColors]) => {
    const el = document.getElementById(sectionId);
    if (el) {
      applyColorsToElement(el, sectionColors);
    }
  });

  // (L'application des fonts dynamiques via Google Fonts se fera à l'Étape 5)
}
