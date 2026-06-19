"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  blur: () => blur,
  borders: () => borders,
  brand: () => brand,
  breakpoints: () => breakpoints,
  colorPrimitives: () => colorPrimitives,
  colors: () => colors,
  containers: () => containers,
  corners: () => corners,
  darkTheme: () => darkTheme,
  fontFamily: () => fontFamily,
  fontWeight: () => fontWeight,
  layout: () => layout,
  letterSpacing: () => letterSpacing,
  lightTheme: () => lightTheme,
  lineHeight: () => lineHeight,
  radius: () => radius,
  shadow: () => shadow,
  sizing: () => sizing,
  spacing: () => spacing,
  tints: () => tints,
  typeRoles: () => typeRoles,
  typeScale: () => typeScale,
  zIndex: () => zIndex
});
module.exports = __toCommonJS(index_exports);

// src/primitives.ts
var colorPrimitives = {
  // ── Terracota — acento primario KORE ─────────────────────
  terracota: {
    900: "#4A1E0A",
    800: "#7A3D22",
    700: "#8F4A2A",
    600: "#A05232",
    500: "#B05E3A",
    // main
    400: "#C47B5A",
    300: "#D99A7E",
    200: "#E8C4AA",
    100: "#F0D9C8",
    // light
    50: "#F5EAE0"
    // xlight
  },
  // ── Neutros cálidos ───────────────────────────────────────
  neutral: {
    950: "#0D0D0D",
    900: "#1A1A1A",
    // obsidian
    800: "#2D2A28",
    700: "#3D3A38",
    // grey-dark
    600: "#4F4B48",
    500: "#6B6560",
    // grey-warm
    400: "#8A8480",
    300: "#C4BDB9",
    // grey-light
    200: "#D8D3CF",
    100: "#EDE9E4",
    // grey-ultralight
    50: "#F7F4F1"
    // ivory / white
  },
  // ── Auxiliares — Error ────────────────────────────────────
  error: {
    main: "#D95F5F",
    dark: "#B02020",
    light: "#F7BEBE"
  },
  // ── Auxiliares — Success ──────────────────────────────────
  success: {
    main: "#4CAF7D",
    dark: "#2E7D52",
    light: "#AADFC2"
  }
};
var tints = {
  terracota: {
    80: "rgba(176, 94, 58, 0.8)",
    40: "rgba(176, 94, 58, 0.4)",
    25: "rgba(176, 94, 58, 0.25)",
    20: "rgba(176, 94, 58, 0.2)",
    18: "rgba(176, 94, 58, 0.18)",
    15: "rgba(176, 94, 58, 0.15)",
    12: "rgba(176, 94, 58, 0.12)",
    10: "rgba(176, 94, 58, 0.1)",
    8: "rgba(176, 94, 58, 0.08)",
    5: "rgba(176, 94, 58, 0.05)"
  },
  // Marfil (#F7F4F1 = neutral[50]) — para superficies glass en light mode
  ivory: {
    55: "rgba(247, 244, 241, 0.55)",
    10: "rgba(247, 244, 241, 0.10)"
  },
  black: {
    90: "rgba(0, 0, 0, 0.9)",
    80: "rgba(0, 0, 0, 0.8)",
    70: "rgba(0, 0, 0, 0.7)",
    60: "rgba(0, 0, 0, 0.6)",
    50: "rgba(0, 0, 0, 0.5)",
    40: "rgba(0, 0, 0, 0.4)",
    30: "rgba(0, 0, 0, 0.3)",
    20: "rgba(0, 0, 0, 0.2)",
    10: "rgba(0, 0, 0, 0.1)",
    5: "rgba(0, 0, 0, 0.05)"
  },
  white: {
    90: "rgba(255, 255, 255, 0.9)",
    80: "rgba(255, 255, 255, 0.8)",
    70: "rgba(255, 255, 255, 0.7)",
    60: "rgba(255, 255, 255, 0.6)",
    50: "rgba(255, 255, 255, 0.5)",
    40: "rgba(255, 255, 255, 0.4)",
    30: "rgba(255, 255, 255, 0.3)",
    20: "rgba(255, 255, 255, 0.2)",
    10: "rgba(255, 255, 255, 0.1)",
    5: "rgba(255, 255, 255, 0.05)"
  },
  error: { 20: "rgba(217, 95, 95, 0.2)" },
  success: { 20: "rgba(76, 175, 125, 0.2)" }
};

// src/dimension.ts
var spacing = {
  "3xs": 2,
  "2xs": 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 56,
  "4xl": 64,
  "5xl": 72,
  "6xl": 80
};
var sizing = {
  s: 12,
  m: 16,
  l: 20,
  // control xsmall
  xl: 32,
  // control small
  "2xl": 40,
  // control mid
  "3xl": 48,
  // control big
  "4xl": 56,
  "5xl": 72,
  "6xl": 96,
  "7xl": 120
};
var radius = {
  none: 0,
  xs: 4,
  // default, borders sutiles
  s: 8,
  m: 12,
  // inputs, campos
  l: 16,
  xl: 20,
  // cards
  "2xl": 24,
  full: 9999
  // pill, circular
};
var borders = {
  thin: 1,
  thick: 2,
  block: 4
};
var breakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 1200,
  wide: 1800
};
var zIndex = {
  base: 0,
  raised: 10,
  overlay: 100,
  modal: 200,
  toast: 300,
  tooltip: 400
};
var containers = {
  s: 480,
  m: 640,
  l: 960,
  xl: 1200,
  "2xl": 1400
};
var layout = {
  mobile: {
    gutter: 16,
    // padding horizontal de contenedores
    sectionGap: 64,
    // espacio vertical entre secciones
    sectionPad: 48
    // padding-block de cada sección
  },
  tablet: {
    gutter: 40,
    sectionGap: 80,
    sectionPad: 64
  },
  desktop: {
    gutter: 56,
    sectionGap: 96,
    sectionPad: 80
  },
  wide: {
    gutter: 80,
    sectionGap: 120,
    sectionPad: 96
  }
};

// src/themes/light.ts
var ivory = tints.ivory;
var lightTheme = {
  // ── Backgrounds ─────────────────────────────────────────────
  background: {
    surfaceLow: colorPrimitives.neutral[50],
    // página principal
    surfaceGlass: tints.black[5],
    surfaceSolid: colorPrimitives.neutral[100],
    // cards, secciones
    surfaceBright: tints.white[80],
    surfaceDim: tints.black[10],
    inverseSurface: colorPrimitives.neutral[700],
    inverseSurfaceAlt: colorPrimitives.neutral[900],
    accentSolid: colorPrimitives.terracota[500],
    accentDim: tints.terracota[10],
    accentLight: colorPrimitives.terracota[50],
    errorSolid: colorPrimitives.error.main,
    errorDim: tints.error[20],
    successSolid: colorPrimitives.success.main,
    successDim: tints.success[20],
    scrimHeavy: tints.black[70],
    scrimMid: tints.black[50],
    scrimSoft: tints.black[20],
    headerDefault: tints.white[80],
    barsSolid: colorPrimitives.neutral[100],
    barsGlass: tints.white[60],
    controlDefault: tints.black[10],
    inputDefault: tints.white[80],
    actionHover: tints.black[10],
    actionPush: tints.black[20],
    actionSelected: tints.terracota[10],
    // ── Glass identity ────────────────────────────────────────
    glassSurface: ivory[55],
    // marfil translúcido — superficie principal
    glassWarm: tints.terracota[5]
    // tinte terracota sutil sobre glass
  },
  // ── Foregrounds ──────────────────────────────────────────────
  foreground: {
    primaryOnSurface: colorPrimitives.neutral[900],
    secondaryOnSurface: colorPrimitives.neutral[500],
    tertiaryOnSurface: colorPrimitives.neutral[300],
    primaryOnInverse: colorPrimitives.neutral[50],
    secondaryOnInverse: tints.white[70],
    primaryOnAccent: colorPrimitives.neutral[50],
    accentOnSurface: colorPrimitives.terracota[500],
    accentDarkOnSurface: colorPrimitives.terracota[800],
    errorOnSurface: colorPrimitives.error.dark,
    successOnSurface: colorPrimitives.success.dark
  },
  // ── Strokes ──────────────────────────────────────────────────
  stroke: {
    primaryOnSurface: tints.black[70],
    secondaryOnSurface: tints.black[20],
    tertiaryOnSurface: tints.black[5],
    accent: colorPrimitives.terracota[500],
    accentDim: tints.terracota[20],
    focus: colorPrimitives.terracota[500],
    error: colorPrimitives.error.main,
    success: colorPrimitives.success.main,
    // ── Glass identity ────────────────────────────────────────
    glass: tints.terracota[15],
    // borde glass principal
    glassSubtle: ivory[10],
    // borde glass secundario
    glassGlow: tints.terracota[18]
    // glow terracota para focus/hover
  },
  // ── Gradients ────────────────────────────────────────────────
  gradient: {
    surfaceStart: "rgba(247, 244, 241, 0)",
    surfaceEnd: "rgba(247, 244, 241, 0.8)",
    accentStart: tints.terracota[20],
    accentEnd: tints.terracota[80]
  }
};

// src/themes/dark.ts
var ivory2 = tints.ivory;
var darkTheme = {
  // ── Backgrounds ─────────────────────────────────────────────
  background: {
    surfaceLow: colorPrimitives.neutral[900],
    // página principal
    surfaceGlass: tints.white[5],
    surfaceSolid: colorPrimitives.neutral[700],
    // cards, secciones
    surfaceBright: tints.white[10],
    surfaceDim: tints.black[20],
    inverseSurface: colorPrimitives.neutral[500],
    inverseSurfaceAlt: colorPrimitives.neutral[50],
    accentSolid: colorPrimitives.terracota[500],
    accentDim: tints.terracota[10],
    accentLight: tints.terracota[20],
    errorSolid: colorPrimitives.error.main,
    errorDim: tints.error[20],
    successSolid: colorPrimitives.success.main,
    successDim: tints.success[20],
    scrimHeavy: tints.black[80],
    scrimMid: tints.black[60],
    scrimSoft: tints.black[30],
    headerDefault: tints.black[20],
    barsSolid: colorPrimitives.neutral[700],
    barsGlass: tints.black[10],
    controlDefault: tints.white[10],
    inputDefault: tints.white[5],
    actionHover: tints.white[10],
    actionPush: tints.white[20],
    actionSelected: tints.terracota[10],
    // ── Glass identity ────────────────────────────────────────
    glassSurface: tints.black[50],
    // obsidiana translúcida — superficie principal
    glassWarm: tints.terracota[10]
    // tinte terracota sobre glass oscuro
  },
  // ── Foregrounds ──────────────────────────────────────────────
  foreground: {
    primaryOnSurface: colorPrimitives.neutral[50],
    secondaryOnSurface: colorPrimitives.neutral[300],
    tertiaryOnSurface: colorPrimitives.neutral[500],
    primaryOnInverse: colorPrimitives.neutral[900],
    secondaryOnInverse: tints.black[70],
    primaryOnAccent: colorPrimitives.neutral[50],
    accentOnSurface: colorPrimitives.terracota[100],
    accentDarkOnSurface: colorPrimitives.terracota[500],
    errorOnSurface: colorPrimitives.error.light,
    successOnSurface: colorPrimitives.success.light
  },
  // ── Strokes ──────────────────────────────────────────────────
  stroke: {
    primaryOnSurface: tints.white[70],
    secondaryOnSurface: tints.white[10],
    tertiaryOnSurface: tints.white[5],
    accent: colorPrimitives.terracota[500],
    accentDim: tints.terracota[20],
    focus: colorPrimitives.terracota[100],
    error: colorPrimitives.error.main,
    success: colorPrimitives.success.main,
    // ── Glass identity ────────────────────────────────────────
    glass: tints.terracota[25],
    // borde glass principal (más visible en dark)
    glassSubtle: ivory2[10],
    // borde glass secundario
    glassGlow: tints.terracota[20]
    // glow terracota para focus/hover
  },
  // ── Gradients ────────────────────────────────────────────────
  gradient: {
    surfaceStart: "rgba(26, 26, 26, 0)",
    surfaceEnd: "rgba(26, 26, 26, 0.8)",
    accentStart: tints.terracota[10],
    accentEnd: tints.terracota[40]
  }
};

// src/effects.ts
var blur = {
  soft: "4px",
  medium: "12px",
  heavy: "16px",
  ultra: "24px"
};
var shadow = {
  glassSm: `0 2px 12px ${tints.terracota[8]}`,
  glassMd: `0 4px 24px ${tints.terracota[12]}`,
  glassLg: `0 8px 48px ${tints.terracota[18]}`,
  glassInset: `inset 0 1px 0 ${tints.ivory[10]}`
};
var brand = {
  terracota: colorPrimitives.terracota[500],
  // #B05E3A — acento principal
  terracotaLight: colorPrimitives.terracota[300],
  // #D99A7E — variante clara
  terracotaDark: colorPrimitives.terracota[800],
  // #7A3D22 — variante oscura
  obsidian: colorPrimitives.neutral[900],
  // #1A1A1A — fondo oscuro
  ivory: colorPrimitives.neutral[50]
  // #F7F4F1 — fondo claro
};

// src/typography.ts
var fontFamily = {
  display: '"Cormorant Garamond", Georgia, serif',
  ui: '"DM Sans", system-ui, sans-serif'
};
var fontWeight = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700
};
var letterSpacing = {
  veryDense: -0.04,
  // em
  dense: -0.02,
  moderate: 0,
  spacious: 0.08,
  wide: 0.14
};
var lineHeight = {
  veryDense: 1,
  dense: 1.2,
  moderate: 1.25,
  spacious: 1.5,
  loose: 1.7
};
var typeScale = {
  mobile: {
    "2xs": 9,
    xs: 11,
    s: 13,
    m: 16,
    l: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 36,
    "5xl": 44
  },
  tablet: {
    "2xs": 10,
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 44,
    "4xl": 56,
    "5xl": 72
  },
  desktop: {
    "2xs": 10,
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 44,
    "4xl": 56,
    "5xl": 72
  },
  wide: {
    "2xs": 14,
    xs: 16,
    s: 20,
    m: 24,
    l: 32,
    xl: 44,
    "2xl": 40,
    "3xl": 52,
    "4xl": 64,
    "5xl": 80
  }
};
var typeRoles = {
  display: {
    family: fontFamily.display,
    weight: fontWeight.light,
    scale: "5xl",
    lineHeight: lineHeight.veryDense,
    letterSpacing: letterSpacing.veryDense,
    transform: "none"
  },
  h1: {
    family: fontFamily.display,
    weight: fontWeight.light,
    scale: "4xl",
    lineHeight: lineHeight.dense,
    letterSpacing: letterSpacing.dense,
    transform: "none"
  },
  h2: {
    family: fontFamily.display,
    weight: fontWeight.semibold,
    scale: "3xl",
    lineHeight: lineHeight.dense,
    letterSpacing: letterSpacing.dense,
    transform: "none"
  },
  h3: {
    family: fontFamily.display,
    weight: fontWeight.semibold,
    scale: "2xl",
    lineHeight: lineHeight.moderate,
    letterSpacing: letterSpacing.moderate,
    transform: "none"
  },
  overline: {
    family: fontFamily.ui,
    weight: fontWeight.semibold,
    scale: "xs",
    lineHeight: lineHeight.moderate,
    letterSpacing: letterSpacing.wide,
    transform: "uppercase"
  },
  body: {
    family: fontFamily.ui,
    weight: fontWeight.regular,
    scale: "m",
    lineHeight: lineHeight.spacious,
    letterSpacing: letterSpacing.moderate,
    transform: "none"
  },
  bodySmall: {
    family: fontFamily.ui,
    weight: fontWeight.regular,
    scale: "s",
    lineHeight: lineHeight.spacious,
    letterSpacing: letterSpacing.moderate,
    transform: "none"
  },
  caption: {
    family: fontFamily.ui,
    weight: fontWeight.light,
    scale: "xs",
    lineHeight: lineHeight.moderate,
    letterSpacing: letterSpacing.moderate,
    transform: "none"
  },
  button: {
    family: fontFamily.ui,
    weight: fontWeight.semibold,
    scale: "s",
    lineHeight: lineHeight.moderate,
    letterSpacing: letterSpacing.spacious,
    transform: "uppercase"
  }
};

// src/index.ts
var colors = {
  accent: colorPrimitives.terracota[500],
  accentDark: colorPrimitives.terracota[600],
  accentLight: colorPrimitives.terracota[100],
  dark: colorPrimitives.neutral[900],
  light: colorPrimitives.neutral[50],
  error: colorPrimitives.error.main,
  errorDark: colorPrimitives.error.dark,
  success: colorPrimitives.success.main
};
var corners = radius;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blur,
  borders,
  brand,
  breakpoints,
  colorPrimitives,
  colors,
  containers,
  corners,
  darkTheme,
  fontFamily,
  fontWeight,
  layout,
  letterSpacing,
  lightTheme,
  lineHeight,
  radius,
  shadow,
  sizing,
  spacing,
  tints,
  typeRoles,
  typeScale,
  zIndex
});
//# sourceMappingURL=index.js.map