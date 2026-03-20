/**
 * Conversions HEX <-> HSL pour générer des variantes de couleurs
 */

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Supprimer le # si présent
  hex = hex.replace(/^#/, "");

  // Convertir en RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Génère une liste de couleurs similaires (plus claires / plus foncées)
 */
export function generateSimilarTones(hex: string): string[] {
  try {
    const { h, s, l } = hexToHsl(hex);
    
    // On génère 5 variations de luminosité
    // Par exemple : -20%, -10%, +10%, +20% et une variation de saturation
    const variations = [
      { h, s, l: Math.max(0, l - 20) },
      { h, s, l: Math.max(0, l - 10) },
      { h, s: Math.min(100, s + 15), l }, // Plus saturé
      { h, s, l: Math.min(100, l + 10) },
      { h, s, l: Math.min(100, l + 20) },
    ];

    return variations.map(v => hslToHex(v.h, v.s, v.l));
  } catch (e) {
    return [];
  }
}
