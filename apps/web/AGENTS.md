<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Instrucciones operativas — apps/web

## Antes de dar una tarea por terminada

1. Ejecutar `npx tsc --noEmit` desde `apps/web/` — resolver **todos** los errores antes de continuar
2. Si modificaste cualquier archivo en `packages/ui-web/src/`, ejecutar `cd packages/ui-web && npx tsup`
3. Hacer commit con el formato: `<gitmoji> <type>: <header corto>\n\n<descripción del porqué>`

---

## Errores conocidos que NO son bugs de código

| Error | Causa | Acción |
|-------|-------|--------|
| Hydration mismatch en `MetadataWrapper` (`hidden={null}` vs `hidden={true}`) | Bug interno de Next.js 16.2.6 / React 19.2 con Turbopack | Ignorar — no tiene fix de aplicación |
| `Encountered a script tag while rendering React component` | React 19 advierte sobre `<script>` inline en JSX, incluyendo los de `next/script` | Ignorar — es informativo, el script funciona correctamente |

---

## Patrones obligatorios

### Framer Motion — Variants
Siempre tipar explícitamente con `Variants`. Sin la anotación, TypeScript infiere `ease` como `string` y falla:

```typescript
// ✅ Correcto
import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ❌ Falla — TypeScript no puede inferir el tipo de ease
const fadeUp = {
  visible: { transition: { ease: 'easeOut' } },
}
```

### Emotion — keyframes
`keyframes` interpolado en un string plano da error en desarrollo. Siempre envolver con `css`:

```typescript
// ✅ Correcto
import { css, keyframes } from '@emotion/react'

const shimmer = keyframes`...`

const skeletonBase = css`
  animation: ${shimmer} 1.4s ease infinite;
`

// ❌ Error: keyframes output got interpolated into plain string
const skeletonBase = `
  animation: ${shimmer} 1.4s ease infinite;
`
```

### Emotion — CSS compartido entre styled components
Cuando un bloque CSS se reutiliza en múltiples `styled.x`, definirlo como `css\`\``:

```typescript
const baseStyles = css`
  padding:       var(--spacing-m);
  border-radius: var(--corners-default-card);
`

const CardA = styled.div`${baseStyles} background: red;`
const CardB = styled.div`${baseStyles} background: blue;`
```

---

## Iconos — nombres válidos de Lucide

Lucide **no tiene iconos de marcas**. Sustituciones confirmadas:

| ❌ No existe | ✅ Usar |
|-------------|---------|
| `Linkedin`  | `Link2` |
| `Github`    | `Code`  |
| `CheckCircle` | `CircleCheck` |

Verificar nombres con: `node -e "const {icons}=require('./node_modules/lucide-react'); console.log(Object.keys(icons).filter(n => /pattern/i.test(n)))"`

---

## Layout y providers

### Root layout — debe ser SÍNCRONO
Hacer el root layout `async` (con `await cookies()`) causa hydration mismatch en `MetadataWrapper` con React 19.2. Mantener siempre síncrono:

```typescript
// ✅ Correcto
export default function RootLayout({ children }) { ... }

// ❌ Causa hydration mismatch en MetadataWrapper
export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  ...
}
```

### globals.css — debe estar importado en layout.tsx
Sin este import el reset CSS no se aplica y el navegador añade 8px de margen:

```typescript
// apps/web/app/layout.tsx
import '@kore/tokens/css'
import './globals.css'   // ← obligatorio
```

### Dark mode — ThemeProvider
- Lee `localStorage` + `prefers-color-scheme` en `useEffect`
- Persiste en cookie `kore-theme` (para uso futuro server-side)
- `suppressHydrationWarning` en `<html>` absorbe el cambio de `data-theme`

---

## Scroll anchors

Para CTAs que hacen scroll a una sección, poner el `id` en el `HeadingWrapper` (no en el `Section` o `Container` exterior). Así el scroll lleva al contenido visible, no al padding superior de la sección:

```tsx
// ✅ El anchor lleva directamente al título
<HeadingWrapper id="catalog">
  <SectionTitle>Entrenamientos</SectionTitle>
</HeadingWrapper>

// ❌ Añade todo el padding-block de la sección encima
<div id="catalog">
  <Section>
    <HeadingWrapper>...</HeadingWrapper>
  </Section>
</div>
```

---

## Controlled inputs en @kore/ui-web

`SearchInput` con `value` controlado requiere `onChange`. Usar `onSearch` que dispara en cada tecla:

```tsx
// ✅ onSearch actúa como onChange — búsqueda en vivo
<SearchInput
  value={search}
  onSearch={setSearch}    // dispara en cada tecla + Escape
/>
```

---

## @kore/ui-web — flujo de desarrollo

Cambios en `packages/ui-web/src/` NO se reflejan en `apps/web` hasta rebuildar:

```bash
cd packages/ui-web && npx tsup   # rebuild dist/ (~3s)
```

El dist compilado está en `packages/ui-web/dist/`. El web app importa desde ahí, no desde `src/`.
