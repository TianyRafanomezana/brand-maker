import { ThemeState, ThemeColors, COLOR_CSS_VAR_MAP, FONT_CSS_VAR_MAP, ThemeFonts } from "./types";

/** Track which fonts have already been injected to avoid duplicate <link> tags */
const loadedFonts = new Set<string>();

/**
 * Dynamically load a Google Font by injecting a <link> into the <head>.
 * No API key needed — uses the public fonts.googleapis.com CDN.
 */
export function loadGoogleFont(fontName: string) {
  if (typeof document === "undefined") return;
  if (loadedFonts.has(fontName)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  const formattedName = fontName.replace(/ /g, "+");
  link.href = `https://fonts.googleapis.com/css2?family=${formattedName}&display=swap`;
  document.head.appendChild(link);
  loadedFonts.add(fontName);
}

/**
 * Helper to apply a partial or full set of colors to a specific DOM element.
 */
function applyColorsToElement(element: HTMLElement, colors: Partial<ThemeColors>) {
  Object.entries(colors).forEach(([key, value]) => {
    if (!value) return; // Skip undefined values
    const cssVarName = COLOR_CSS_VAR_MAP[key as keyof typeof COLOR_CSS_VAR_MAP];
    if (cssVarName) {
      element.style.setProperty(cssVarName, value);
    }
  });
}

/**
 * Apply font CSS variables to :root and trigger dynamic loading for each font.
 */
function applyFontsToDOM(fonts: ThemeFonts) {
  const target = document.body || document.documentElement;
  (Object.entries(FONT_CSS_VAR_MAP) as [keyof ThemeFonts, string][]).forEach(([key, cssVar]) => {
    const fontName = fonts[key];
    if (fontName) {
      // Set the CSS variable with a proper font-family value
      target.style.setProperty(cssVar, `"${fontName}", sans-serif`);
      loadGoogleFont(fontName);
    }
  });
}

/**
 * Applique les couleurs du thème global aux variables CSS du :root,
 * PUIS applique les surcharges locales (sections) aux éléments par identifiant,
 * PUIS applique les fonts dynamiquement.
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

  // 3. Appliquer les fonts
  applyFontsToDOM(state.global.fonts);
}

