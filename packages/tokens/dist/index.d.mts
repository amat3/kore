/**
 * @kore/tokens — Light Theme
 *
 * Tokens semánticos para modo claro.
 * Consumir estos en componentes, nunca los primitivos directamente.
 */
declare const lightTheme: {
    readonly background: {
        readonly surfaceLow: "#F7F4F1";
        readonly surfaceGlass: "rgba(0, 0, 0, 0.05)";
        readonly surfaceSolid: "#EDE9E4";
        readonly surfaceBright: "rgba(255, 255, 255, 0.8)";
        readonly surfaceDim: "rgba(0, 0, 0, 0.1)";
        readonly inverseSurface: "#3D3A38";
        readonly inverseSurfaceAlt: "#1A1A1A";
        readonly accentSolid: "#B05E3A";
        readonly accentDim: "rgba(176, 94, 58, 0.1)";
        readonly accentLight: "#F5EAE0";
        readonly errorSolid: "#D95F5F";
        readonly errorDim: "rgba(217, 95, 95, 0.2)";
        readonly successSolid: "#4CAF7D";
        readonly successDim: "rgba(76, 175, 125, 0.2)";
        readonly scrimHeavy: "rgba(0, 0, 0, 0.7)";
        readonly scrimMid: "rgba(0, 0, 0, 0.5)";
        readonly scrimSoft: "rgba(0, 0, 0, 0.2)";
        readonly headerDefault: "rgba(255, 255, 255, 0.8)";
        readonly barsSolid: "#EDE9E4";
        readonly barsGlass: "rgba(255, 255, 255, 0.6)";
        readonly controlDefault: "rgba(0, 0, 0, 0.1)";
        readonly inputDefault: "rgba(255, 255, 255, 0.8)";
        readonly actionHover: "rgba(0, 0, 0, 0.1)";
        readonly actionPush: "rgba(0, 0, 0, 0.2)";
        readonly actionSelected: "rgba(176, 94, 58, 0.1)";
    };
    readonly foreground: {
        readonly primaryOnSurface: "#1A1A1A";
        readonly secondaryOnSurface: "#6B6560";
        readonly tertiaryOnSurface: "#C4BDB9";
        readonly primaryOnInverse: "#F7F4F1";
        readonly secondaryOnInverse: "rgba(255, 255, 255, 0.7)";
        readonly primaryOnAccent: "#F7F4F1";
        readonly accentOnSurface: "#B05E3A";
        readonly accentDarkOnSurface: "#7A3D22";
        readonly errorOnSurface: "#B02020";
        readonly successOnSurface: "#2E7D52";
    };
    readonly stroke: {
        readonly primaryOnSurface: "rgba(0, 0, 0, 0.7)";
        readonly secondaryOnSurface: "rgba(0, 0, 0, 0.2)";
        readonly tertiaryOnSurface: "rgba(0, 0, 0, 0.05)";
        readonly accent: "#B05E3A";
        readonly accentDim: "rgba(176, 94, 58, 0.2)";
        readonly focus: "#B05E3A";
        readonly error: "#D95F5F";
        readonly success: "#4CAF7D";
    };
    readonly gradient: {
        readonly surfaceStart: "rgba(247, 244, 241, 0)";
        readonly surfaceEnd: "rgba(247, 244, 241, 0.8)";
        readonly accentStart: "rgba(176, 94, 58, 0.2)";
        readonly accentEnd: "rgba(176, 94, 58, 0.8)";
    };
};
type LightTheme = typeof lightTheme;

/**
 * @kore/tokens — Color Primitives
 *
 * Valores raw de color. NO usar directamente en componentes.
 * Consumir siempre los tokens semánticos (themes/light | themes/dark).
 *
 * Escala: 50 (más claro) → 900 (más oscuro)
 */
declare const colorPrimitives: {
    readonly terracota: {
        readonly 900: "#4A1E0A";
        readonly 800: "#7A3D22";
        readonly 700: "#8F4A2A";
        readonly 600: "#A05232";
        readonly 500: "#B05E3A";
        readonly 400: "#C47B5A";
        readonly 300: "#D99A7E";
        readonly 200: "#E8C4AA";
        readonly 100: "#F0D9C8";
        readonly 50: "#F5EAE0";
    };
    readonly neutral: {
        readonly 950: "#0D0D0D";
        readonly 900: "#1A1A1A";
        readonly 800: "#2D2A28";
        readonly 700: "#3D3A38";
        readonly 600: "#4F4B48";
        readonly 500: "#6B6560";
        readonly 400: "#8A8480";
        readonly 300: "#C4BDB9";
        readonly 200: "#D8D3CF";
        readonly 100: "#EDE9E4";
        readonly 50: "#F7F4F1";
    };
    readonly error: {
        readonly main: "#D95F5F";
        readonly dark: "#B02020";
        readonly light: "#F7BEBE";
    };
    readonly success: {
        readonly main: "#4CAF7D";
        readonly dark: "#2E7D52";
        readonly light: "#AADFC2";
    };
};
declare const tints: {
    readonly terracota: {
        readonly 80: "rgba(176, 94, 58, 0.8)";
        readonly 40: "rgba(176, 94, 58, 0.4)";
        readonly 20: "rgba(176, 94, 58, 0.2)";
        readonly 10: "rgba(176, 94, 58, 0.1)";
    };
    readonly black: {
        readonly 90: "rgba(0, 0, 0, 0.9)";
        readonly 80: "rgba(0, 0, 0, 0.8)";
        readonly 70: "rgba(0, 0, 0, 0.7)";
        readonly 60: "rgba(0, 0, 0, 0.6)";
        readonly 50: "rgba(0, 0, 0, 0.5)";
        readonly 40: "rgba(0, 0, 0, 0.4)";
        readonly 30: "rgba(0, 0, 0, 0.3)";
        readonly 20: "rgba(0, 0, 0, 0.2)";
        readonly 10: "rgba(0, 0, 0, 0.1)";
        readonly 5: "rgba(0, 0, 0, 0.05)";
    };
    readonly white: {
        readonly 90: "rgba(255, 255, 255, 0.9)";
        readonly 80: "rgba(255, 255, 255, 0.8)";
        readonly 70: "rgba(255, 255, 255, 0.7)";
        readonly 60: "rgba(255, 255, 255, 0.6)";
        readonly 50: "rgba(255, 255, 255, 0.5)";
        readonly 40: "rgba(255, 255, 255, 0.4)";
        readonly 30: "rgba(255, 255, 255, 0.3)";
        readonly 20: "rgba(255, 255, 255, 0.2)";
        readonly 10: "rgba(255, 255, 255, 0.1)";
        readonly 5: "rgba(255, 255, 255, 0.05)";
    };
    readonly error: {
        readonly 20: "rgba(217, 95, 95, 0.2)";
    };
    readonly success: {
        readonly 20: "rgba(76, 175, 125, 0.2)";
    };
};
type ColorPrimitives = typeof colorPrimitives;
type Tints = typeof tints;

/**
 * @kore/tokens — Dark Theme
 *
 * Tokens semánticos para modo oscuro.
 * Misma estructura que lightTheme para intercambiabilidad.
 */
declare const darkTheme: {
    readonly background: {
        readonly surfaceLow: "#1A1A1A";
        readonly surfaceGlass: "rgba(255, 255, 255, 0.05)";
        readonly surfaceSolid: "#3D3A38";
        readonly surfaceBright: "rgba(255, 255, 255, 0.1)";
        readonly surfaceDim: "rgba(0, 0, 0, 0.2)";
        readonly inverseSurface: "#6B6560";
        readonly inverseSurfaceAlt: "#F7F4F1";
        readonly accentSolid: "#B05E3A";
        readonly accentDim: "rgba(176, 94, 58, 0.1)";
        readonly accentLight: "rgba(176, 94, 58, 0.2)";
        readonly errorSolid: "#D95F5F";
        readonly errorDim: "rgba(217, 95, 95, 0.2)";
        readonly successSolid: "#4CAF7D";
        readonly successDim: "rgba(76, 175, 125, 0.2)";
        readonly scrimHeavy: "rgba(0, 0, 0, 0.8)";
        readonly scrimMid: "rgba(0, 0, 0, 0.6)";
        readonly scrimSoft: "rgba(0, 0, 0, 0.3)";
        readonly headerDefault: "rgba(0, 0, 0, 0.2)";
        readonly barsSolid: "#3D3A38";
        readonly barsGlass: "rgba(0, 0, 0, 0.1)";
        readonly controlDefault: "rgba(255, 255, 255, 0.1)";
        readonly inputDefault: "rgba(255, 255, 255, 0.05)";
        readonly actionHover: "rgba(255, 255, 255, 0.1)";
        readonly actionPush: "rgba(255, 255, 255, 0.2)";
        readonly actionSelected: "rgba(176, 94, 58, 0.1)";
    };
    readonly foreground: {
        readonly primaryOnSurface: "#F7F4F1";
        readonly secondaryOnSurface: "#C4BDB9";
        readonly tertiaryOnSurface: "#6B6560";
        readonly primaryOnInverse: "#1A1A1A";
        readonly secondaryOnInverse: "rgba(0, 0, 0, 0.7)";
        readonly primaryOnAccent: "#F7F4F1";
        readonly accentOnSurface: "#F0D9C8";
        readonly accentDarkOnSurface: "#B05E3A";
        readonly errorOnSurface: "#F7BEBE";
        readonly successOnSurface: "#AADFC2";
    };
    readonly stroke: {
        readonly primaryOnSurface: "rgba(255, 255, 255, 0.7)";
        readonly secondaryOnSurface: "rgba(255, 255, 255, 0.1)";
        readonly tertiaryOnSurface: "rgba(255, 255, 255, 0.05)";
        readonly accent: "#B05E3A";
        readonly accentDim: "rgba(176, 94, 58, 0.2)";
        readonly focus: "#F0D9C8";
        readonly error: "#D95F5F";
        readonly success: "#4CAF7D";
    };
    readonly gradient: {
        readonly surfaceStart: "rgba(26, 26, 26, 0)";
        readonly surfaceEnd: "rgba(26, 26, 26, 0.8)";
        readonly accentStart: "rgba(176, 94, 58, 0.1)";
        readonly accentEnd: "rgba(176, 94, 58, 0.4)";
    };
};
type DarkTheme = typeof darkTheme;

/**
 * @kore/tokens — Dimension Tokens
 *
 * Spacing, sizing, corners y breakpoints.
 * En RN usar directamente como números, en web el script genera CSS vars.
 */
declare const spacing: {
    readonly '3xs': 2;
    readonly '2xs': 4;
    readonly xs: 8;
    readonly s: 12;
    readonly m: 16;
    readonly l: 24;
    readonly xl: 32;
    readonly '2xl': 40;
    readonly '3xl': 56;
    readonly '4xl': 64;
    readonly '5xl': 72;
    readonly '6xl': 80;
};
declare const sizing: {
    readonly s: 12;
    readonly m: 16;
    readonly l: 20;
    readonly xl: 32;
    readonly '2xl': 40;
    readonly '3xl': 48;
    readonly '4xl': 56;
    readonly '5xl': 72;
    readonly '6xl': 96;
    readonly '7xl': 120;
};
declare const radius: {
    readonly none: 0;
    readonly xs: 4;
    readonly s: 8;
    readonly m: 12;
    readonly l: 16;
    readonly xl: 20;
    readonly '2xl': 24;
    readonly full: 9999;
};
declare const borders: {
    readonly thin: 1;
    readonly thick: 2;
    readonly block: 4;
};
declare const breakpoints: {
    readonly mobile: 0;
    readonly tablet: 600;
    readonly desktop: 1200;
    readonly wide: 1800;
};
declare const zIndex: {
    readonly base: 0;
    readonly raised: 10;
    readonly overlay: 100;
    readonly modal: 200;
    readonly toast: 300;
    readonly tooltip: 400;
};
declare const containers: {
    readonly s: 480;
    readonly m: 640;
    readonly l: 960;
    readonly xl: 1200;
    readonly '2xl': 1400;
};
declare const layout: {
    readonly mobile: {
        readonly gutter: 16;
        readonly sectionGap: 64;
        readonly sectionPad: 48;
    };
    readonly tablet: {
        readonly gutter: 40;
        readonly sectionGap: 80;
        readonly sectionPad: 64;
    };
    readonly desktop: {
        readonly gutter: 56;
        readonly sectionGap: 96;
        readonly sectionPad: 80;
    };
    readonly wide: {
        readonly gutter: 80;
        readonly sectionGap: 120;
        readonly sectionPad: 96;
    };
};
type Spacing = typeof spacing;
type Sizing = typeof sizing;
type Radius = typeof radius;
type Borders = typeof borders;
type Breakpoints = typeof breakpoints;

/**
 * @kore/tokens — Typography Tokens
 *
 * Escala tipográfica, familias, pesos y roles semánticos.
 * La escala de tamaños varía por plataforma — el script genera los CSS vars
 * con media queries; en RN se usa la escala mobile directamente.
 */
declare const fontFamily: {
    readonly display: "\"Cormorant Garamond\", Georgia, serif";
    readonly ui: "\"DM Sans\", system-ui, sans-serif";
};
declare const fontWeight: {
    readonly light: 300;
    readonly regular: 400;
    readonly semibold: 600;
    readonly bold: 700;
};
declare const letterSpacing: {
    readonly veryDense: -0.04;
    readonly dense: -0.02;
    readonly moderate: 0;
    readonly spacious: 0.08;
    readonly wide: 0.14;
};
declare const lineHeight: {
    readonly veryDense: 1;
    readonly dense: 1.1;
    readonly moderate: 1.25;
    readonly spacious: 1.5;
    readonly loose: 1.7;
};
declare const typeScale: {
    readonly mobile: {
        readonly '2xs': 9;
        readonly xs: 11;
        readonly s: 13;
        readonly m: 16;
        readonly l: 18;
        readonly xl: 20;
        readonly '2xl': 24;
        readonly '3xl': 28;
        readonly '4xl': 36;
        readonly '5xl': 44;
    };
    readonly tablet: {
        readonly '2xs': 10;
        readonly xs: 12;
        readonly s: 14;
        readonly m: 16;
        readonly l: 20;
        readonly xl: 24;
        readonly '2xl': 32;
        readonly '3xl': 44;
        readonly '4xl': 56;
        readonly '5xl': 72;
    };
    readonly desktop: {
        readonly '2xs': 10;
        readonly xs: 12;
        readonly s: 14;
        readonly m: 16;
        readonly l: 20;
        readonly xl: 24;
        readonly '2xl': 32;
        readonly '3xl': 44;
        readonly '4xl': 56;
        readonly '5xl': 72;
    };
    readonly wide: {
        readonly '2xs': 14;
        readonly xs: 16;
        readonly s: 20;
        readonly m: 24;
        readonly l: 32;
        readonly xl: 44;
        readonly '2xl': 56;
        readonly '3xl': 72;
        readonly '4xl': 96;
        readonly '5xl': 120;
    };
};
declare const typeRoles: {
    readonly display: {
        readonly family: "\"Cormorant Garamond\", Georgia, serif";
        readonly weight: 300;
        readonly scale: "5xl";
        readonly lineHeight: 1;
        readonly letterSpacing: -0.04;
        readonly transform: "none";
    };
    readonly h1: {
        readonly family: "\"Cormorant Garamond\", Georgia, serif";
        readonly weight: 300;
        readonly scale: "4xl";
        readonly lineHeight: 1.1;
        readonly letterSpacing: -0.02;
        readonly transform: "none";
    };
    readonly h2: {
        readonly family: "\"Cormorant Garamond\", Georgia, serif";
        readonly weight: 600;
        readonly scale: "3xl";
        readonly lineHeight: 1.1;
        readonly letterSpacing: -0.02;
        readonly transform: "none";
    };
    readonly h3: {
        readonly family: "\"Cormorant Garamond\", Georgia, serif";
        readonly weight: 600;
        readonly scale: "2xl";
        readonly lineHeight: 1.25;
        readonly letterSpacing: 0;
        readonly transform: "none";
    };
    readonly overline: {
        readonly family: "\"DM Sans\", system-ui, sans-serif";
        readonly weight: 600;
        readonly scale: "xs";
        readonly lineHeight: 1.25;
        readonly letterSpacing: 0.14;
        readonly transform: "uppercase";
    };
    readonly body: {
        readonly family: "\"DM Sans\", system-ui, sans-serif";
        readonly weight: 400;
        readonly scale: "m";
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
        readonly transform: "none";
    };
    readonly bodySmall: {
        readonly family: "\"DM Sans\", system-ui, sans-serif";
        readonly weight: 400;
        readonly scale: "s";
        readonly lineHeight: 1.5;
        readonly letterSpacing: 0;
        readonly transform: "none";
    };
    readonly caption: {
        readonly family: "\"DM Sans\", system-ui, sans-serif";
        readonly weight: 300;
        readonly scale: "xs";
        readonly lineHeight: 1.25;
        readonly letterSpacing: 0;
        readonly transform: "none";
    };
    readonly button: {
        readonly family: "\"DM Sans\", system-ui, sans-serif";
        readonly weight: 600;
        readonly scale: "s";
        readonly lineHeight: 1.25;
        readonly letterSpacing: 0.08;
        readonly transform: "uppercase";
    };
};
type FontFamily = typeof fontFamily;
type FontWeight = typeof fontWeight;
type TypeScale = typeof typeScale;
type TypeRoles = typeof typeRoles;

type Theme = typeof lightTheme;

export { type Borders, type Breakpoints, type ColorPrimitives, type DarkTheme, type FontFamily, type FontWeight, type LightTheme, type Radius, type Sizing, type Spacing, type Theme, type Tints, type TypeRoles, type TypeScale, borders, breakpoints, colorPrimitives, containers, darkTheme, fontFamily, fontWeight, layout, letterSpacing, lightTheme, lineHeight, radius, sizing, spacing, tints, typeRoles, typeScale, zIndex };
