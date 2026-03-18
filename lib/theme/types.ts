// ============================================================
// Theme Engine — Core Types & Default Theme
// ============================================================

/** All customizable color variables mapped to CSS custom properties */
export interface ThemeColors {
  // General
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;

  // Card
  card: string;
  cardForeground: string;

  // Popover
  popover: string;
  popoverForeground: string;

  // Footer
  footer: string;
  footerForeground: string;
  footerBottom: string;
  footerBottomForeground: string;
}

/** Font configuration — one font per text category */
export interface ThemeFonts {
  /** Main headings (Hero H1, section H2…) */
  heading: string;
  /** Product / category titles */
  product: string;
  /** Prices */
  price: string;
  /** Navigation, body text, footer text */
  body: string;
  /** Logo / decorative script font */
  script: string;
}

/** Font category metadata for UI and CSS mapping */
export interface FontCategory {
  id: keyof ThemeFonts;
  label: string;
  cssVar: string;
}

export const FONT_CATEGORIES: FontCategory[] = [
  { id: "heading", label: "Titres principaux", cssVar: "--font-heading" },
  { id: "product", label: "Titres produits", cssVar: "--font-product" },
  { id: "price",   label: "Prix",             cssVar: "--font-price" },
  { id: "body",    label: "Navigation / Corps", cssVar: "--font-body" },
  { id: "script",  label: "Logo / Script",    cssVar: "--font-script" },
];

export const FONT_CSS_VAR_MAP: Record<keyof ThemeFonts, string> = {
  heading: "--theme-font-heading",
  product: "--theme-font-product",
  price:   "--theme-font-price",
  body:    "--theme-font-body",
  script:  "--theme-font-script",
};

/** Curated list of popular Google Fonts (no API key needed) */
export const AVAILABLE_FONTS = [
  // Serif
  { name: "Cormorant Garamond", category: "serif" },
  { name: "Playfair Display",   category: "serif" },
  { name: "Lora",               category: "serif" },
  { name: "Merriweather",       category: "serif" },
  { name: "EB Garamond",        category: "serif" },
  { name: "Crimson Text",       category: "serif" },
  { name: "Libre Baskerville",  category: "serif" },
  // Sans-Serif
  { name: "Inter",              category: "sans-serif" },
  { name: "Montserrat",         category: "sans-serif" },
  { name: "Poppins",            category: "sans-serif" },
  { name: "Raleway",            category: "sans-serif" },
  { name: "Open Sans",          category: "sans-serif" },
  { name: "Lato",               category: "sans-serif" },
  { name: "Outfit",             category: "sans-serif" },
  { name: "Work Sans",          category: "sans-serif" },
  // Display / Script
  { name: "Great Vibes",        category: "script" },
  { name: "Dancing Script",     category: "script" },
  { name: "Pacifico",           category: "script" },
  { name: "Sacramento",         category: "script" },
  { name: "Satisfy",            category: "script" },
] as const;

/** Complete theme definition */
export interface Theme {
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
}

/** The overarching state combining the global theme and section overrides */
export interface ThemeState {
  global: Theme;
  sections: Record<string, Partial<ThemeColors>>;
}

export const AVAILABLE_SECTIONS = [
  { id: "global", label: "Général (Toute la page)" }, // Special ID for the root theme
  { id: "header", label: "En-tête (Header)" },
  { id: "hero", label: "Bannière (Hero)" },
  { id: "categories", label: "Catégories" },
  { id: "products", label: "Produits" },
  { id: "trends", label: "Tendances" },
  { id: "info", label: "Barre d'info" },
  { id: "footer", label: "Pied de page (Footer)" },
];

// ============================================================
// Mapping: ThemeColors keys <-> CSS variable names
// ============================================================

export const COLOR_CSS_VAR_MAP: Record<keyof ThemeColors, string> = {
  background: "--background",
  foreground: "--foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  border: "--border",
  input: "--input",
  ring: "--ring",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  footer: "--footer",
  footerForeground: "--footer-foreground",
  footerBottom: "--footer-bottom",
  footerBottomForeground: "--footer-bottom-foreground",
};

/** Human-readable labels for color groups (French) */
export const COLOR_GROUPS = {
  general: {
    label: "Général",
    keys: [
      "background",
      "foreground",
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
      "muted",
      "mutedForeground",
      "accent",
      "accentForeground",
      "border",
      "ring",
    ] as (keyof ThemeColors)[],
  },
  card: {
    label: "Cartes",
    keys: ["card", "cardForeground"] as (keyof ThemeColors)[],
  },
  footer: {
    label: "Footer",
    keys: [
      "footer",
      "footerForeground",
      "footerBottom",
      "footerBottomForeground",
    ] as (keyof ThemeColors)[],
  },
} as const;

/** Human-readable labels for individual colors (French) */
export const COLOR_LABELS: Record<keyof ThemeColors, string> = {
  background: "Fond",
  foreground: "Texte",
  primary: "Primaire",
  primaryForeground: "Texte primaire",
  secondary: "Secondaire",
  secondaryForeground: "Texte secondaire",
  muted: "Atténué",
  mutedForeground: "Texte atténué",
  accent: "Accent",
  accentForeground: "Texte accent",
  destructive: "Destructif",
  border: "Bordures",
  input: "Champs",
  ring: "Anneau focus",
  card: "Fond carte",
  cardForeground: "Texte carte",
  popover: "Fond popover",
  popoverForeground: "Texte popover",
  footer: "Fond footer",
  footerForeground: "Texte footer",
  footerBottom: "Fond copyright",
  footerBottomForeground: "Texte copyright",
};

// ============================================================
// Default Theme — Rabarany color scheme
// ============================================================

export const DEFAULT_THEME: Theme = {
  name: "Rabarany",
  colors: {
    background: "#d0c4bf",
    foreground: "#2c2321",
    primary: "#2c2321",
    primaryForeground: "#f5f0ee",
    secondary: "#c9b8b3",
    secondaryForeground: "#2c2321",
    muted: "#bfb0aa",
    mutedForeground: "#5a4a44",
    accent: "#c9b8b3",
    accentForeground: "#2c2321",
    destructive: "#b91c1c",
    border: "#b5a59f",
    input: "#b5a59f",
    ring: "#8b7d76",
    card: "#ffffff",
    cardForeground: "#2c2321",
    popover: "#ffffff",
    popoverForeground: "#2c2321",
    footer: "#c9bdb7",
    footerForeground: "#2c2321",
    footerBottom: "#6b5d56",
    footerBottomForeground: "#f5f0ee",
  },
  fonts: {
    heading: "Cormorant Garamond",
    product: "Cormorant Garamond",
    price: "Cormorant Garamond",
    body: "Cormorant Garamond",
    script: "Great Vibes",
  },
};

export const DEFAULT_THEME_STATE: ThemeState = {
  global: DEFAULT_THEME,
  sections: {}, // No section overrides by default
};
