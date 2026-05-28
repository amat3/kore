/**
 * @kore/tokens — build-tokens.ts
 *
 * Script de generación de CSS custom properties desde TypeScript.
 * Corre con: tsx src/scripts/build-tokens.ts
 *
 * Output: dist/kore.css
 *
 * Arquitectura:
 *   primitives.ts + themes/*.ts  → CSS vars semánticas (light/dark)
 *   dimension.ts                 → CSS vars de spacing/sizing/radius
 *   typography.ts                → CSS vars de tipo + media queries
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

import { lightTheme }   from '../themes/light'
import { darkTheme }    from '../themes/dark'
import { spacing, sizing, radius, borders, breakpoints, zIndex, containers } from '../dimension'
import { fontFamily, fontWeight, letterSpacing, lineHeight, typeScale } from '../typography'

// ── Helpers ──────────────────────────────────────────────────────────────

/** Convierte camelCase a kebab-case */
const toKebab = (str: string): string =>
  str.replace(/([A-Z])/g, '-$1').toLowerCase()

/** Convierte un objeto plano anidado en CSS custom properties */
function flattenToVars(
  obj: Record<string, unknown>,
  prefix: string,
  unit = ''
): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const varName = `--${prefix}-${toKebab(key)}`

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      lines.push(flattenToVars(value as Record<string, unknown>, `${prefix}-${toKebab(key)}`, unit))
    } else {
      const cssValue = unit && typeof value === 'number'
        ? `${value}${unit}`
        : String(value)
      lines.push(`  ${varName}: ${cssValue};`)
    }
  }

  return lines.join('\n')
}

/** Indenta un bloque de texto */
const indent = (str: string, spaces = 2): string =>
  str.split('\n').map(l => l ? ' '.repeat(spaces) + l : l).join('\n')

// ── Generador principal ───────────────────────────────────────────────────

function generateCSS(): string {
  const sections: string[] = []

  // 1. Header
  sections.push(`/* ================================================================
   KORE Design Tokens — kore.css
   Auto-generado por packages/tokens/src/scripts/build-tokens.ts
   NO editar manualmente — editar los archivos TypeScript fuente.
   ================================================================ */
`)

  // 2. Primitivos globales (invariantes, sin tema)
  sections.push(`/* ── Google Fonts import ─────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
`)

  // 3. Light theme (root default)
  const lightBg   = flattenToVars(lightTheme.background as unknown as Record<string, unknown>, 'background')
  const lightFg   = flattenToVars(lightTheme.foreground as unknown as Record<string, unknown>, 'foreground')
  const lightSt   = flattenToVars(lightTheme.stroke as unknown as Record<string, unknown>, 'stroke')
  const lightGr   = flattenToVars(lightTheme.gradient as unknown as Record<string, unknown>, 'gradient')

  sections.push(`/* ── Light theme (default) ───────────────────────────────────── */
:root,
[data-theme="light"] {
${lightBg}

${lightFg}

${lightSt}

${lightGr}
}
`)

  // 4. Dark theme
  const darkBg    = flattenToVars(darkTheme.background as unknown as Record<string, unknown>, 'background')
  const darkFg    = flattenToVars(darkTheme.foreground as unknown as Record<string, unknown>, 'foreground')
  const darkSt    = flattenToVars(darkTheme.stroke as unknown as Record<string, unknown>, 'stroke')
  const darkGr    = flattenToVars(darkTheme.gradient as unknown as Record<string, unknown>, 'gradient')

  sections.push(`/* ── Dark theme ──────────────────────────────────────────────── */
[data-theme="dark"] {
${darkBg}

${darkFg}

${darkSt}

${darkGr}
}

/* System dark fallback */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${indent(darkBg, 4)}

${indent(darkFg, 4)}

${indent(darkSt, 4)}

${indent(darkGr, 4)}
  }
}
`)

  // 5. Dimension tokens (invariantes)
  const spacingVars    = flattenToVars(spacing as unknown as Record<string, unknown>, 'spacing', 'px')
  const sizingVars     = flattenToVars(sizing as unknown as Record<string, unknown>, 'sizing', 'px')
  const radiusVars     = flattenToVars(radius as unknown as Record<string, unknown>, 'radius', 'px')
  const bordersVars    = flattenToVars(borders as unknown as Record<string, unknown>, 'borders', 'px')
  const zIndexVars     = flattenToVars(zIndex as unknown as Record<string, unknown>, 'z')
  const containersVars = flattenToVars(containers as unknown as Record<string, unknown>, 'container', 'px')

  sections.push(`/* ── Dimension tokens ────────────────────────────────────────── */
:root {
${spacingVars}

${sizingVars}

${radiusVars}

${bordersVars}

${zIndexVars}

${containersVars}
}
`)

  // 6. Typography — invariantes
  const fontFamilyVars    = flattenToVars(fontFamily as unknown as Record<string, unknown>, 'font-family')
  const fontWeightVars    = flattenToVars(fontWeight as unknown as Record<string, unknown>, 'font-weight')
  const letterSpacingVars = Object.entries(letterSpacing)
    .map(([k, v]) => `  --letter-spacing-${toKebab(k)}: ${v}em;`)
    .join('\n')
  const lineHeightVars    = flattenToVars(lineHeight as unknown as Record<string, unknown>, 'line-height')

  sections.push(`/* ── Typography — invariantes ────────────────────────────────── */
:root {
${fontFamilyVars}

${fontWeightVars}

${letterSpacingVars}

${lineHeightVars}
}
`)

  // 7. Typography — escala responsive con media queries
  const scales: [string, keyof typeof typeScale, string][] = [
    ['mobile',  'mobile',  `(max-width: ${breakpoints.tablet - 1}px)`],
    ['tablet',  'tablet',  `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`],
    ['desktop', 'desktop', `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.wide - 1}px)`],
    ['wide',    'wide',    `(min-width: ${breakpoints.wide}px)`],
  ]

  const scaleBlocks = scales.map(([label, key, mq]) => {
    const vars = Object.entries(typeScale[key])
      .map(([k, v]) => `  --scale-${k}: ${v}px;`)
      .join('\n')
    return `/* Scale: ${label} */\n@media ${mq} {\n  :root {\n${vars.split('\n').map(l => '  ' + l).join('\n')}\n  }\n}`
  }).join('\n\n')

  sections.push(`/* ── Typography — escala responsive ──────────────────────────── */
${scaleBlocks}
`)

  return sections.join('\n')
}

// ── Ejecución ─────────────────────────────────────────────────────────────

const distDir = join(process.cwd(), 'dist')
const outPath = join(distDir, 'kore.css')

mkdirSync(distDir, { recursive: true })
writeFileSync(outPath, generateCSS(), 'utf-8')

console.log(`✅ @kore/tokens — kore.css generado en ${outPath}`)
console.log(`   Light theme:  ${Object.keys(lightTheme.background).length + Object.keys(lightTheme.foreground).length + Object.keys(lightTheme.stroke).length} vars`)
console.log(`   Dark theme:   ${Object.keys(darkTheme.background).length + Object.keys(darkTheme.foreground).length + Object.keys(darkTheme.stroke).length} vars`)
console.log(`   Spacing:      ${Object.keys(spacing).length} tokens`)
console.log(`   Radius:       ${Object.keys(radius).length} tokens`)
console.log(`   Type scales:  4 breakpoints × ${Object.keys(typeScale.mobile).length} sizes`)
