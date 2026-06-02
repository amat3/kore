<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Instrucciones operativas — apps/web

## Antes de dar una tarea por terminada

1. Ejecutar `npx tsc --noEmit` desde `apps/web/` — resolver **todos** los errores antes de continuar
2. Si modificaste cualquier archivo en `packages/ui-web/src/` o `packages/tokens/src/`:
   - Ejecutar `cd packages/ui-web && npx tsup` (o el package correspondiente)
   - **Commitear el `dist/` resultante** — Vercel necesita los dist en el repo porque el Turborepo remote cache no restaura archivos a disco en producción
3. Si añadiste o cambiaste un componente en `packages/ui-web/src/`:
   - Actualizar su story en `*.stories.tsx` (nueva variante → nueva Story + añadir al `argTypes.options` + incluir en `FullScale`)
   - Revisar `DesignSystemShowcase` en `/portfolio` y actualizar:
     - El **bloque del componente** si ya está, o añadir uno nuevo si no existe
     - Las **stats** al final (`{ num: '15', label: 'Componentes' }`, `{ num: '164', label: 'CSS vars' }`)
4. Hacer commit: `<gitmoji> <type>: <header corto>\n\n<descripción del porqué>`

---

## Errores conocidos que NO son bugs de código

| Error                                                                        | Causa                                                       | Acción                                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| Hydration mismatch en `MetadataWrapper` (`hidden={null}` vs `hidden={true}`) | Bug interno de Next.js 16.2.6 / React 19.2 con Turbopack    | Ignorar                                                     |
| `Encountered a script tag while rendering React component`                   | React 19 advierte sobre `<script>` inline                   | Ignorar — funciona correctamente                            |
| `createContext only works in Client Components`                              | Emotion / Context importado en Server Component             | Añadir `'use client'` en línea 1 del componente             |
| `Export X doesn't exist in target module`                                    | Componente usa `export default` pero se importa con `{ X }` | Cambiar a `import X from '...'` o `export { default as X }` |

---

## Patrones obligatorios

### 'use client' — primera línea absoluta

Debe ir ANTES de cualquier comentario, JSDoc o import. Next.js App Router lo ignora si hay algo antes:

```typescript
// ✅ Correcto
'use client'
/**
 * @description Mi componente
 */
import styled from '@emotion/styled'

// ❌ Next.js ignora el directive
/**
 * @description Mi componente
 */
;('use client')
import styled from '@emotion/styled'
```

### Server Components + Emotion

No mezclar `export const metadata` con imports de `@emotion/styled` en el mismo archivo. Separarlos:

```typescript
// ✅ page.tsx — Server Component puro
import MyComponent from '@/components/MyComponent'

export const metadata = { title: 'KORE' }

export default function Page() {
  return (
    <main style={{ minHeight: '100svh' }}>  {/* inline styles OK */}
      <MyComponent />
    </main>
  )
}

// ✅ MyComponent.tsx — Client Component con Emotion
'use client'
import styled from '@emotion/styled'
```

### Framer Motion — Variants tipados

Siempre tipar explícitamente con `Variants`. Sin la anotación TypeScript infiere `ease` como `string` y falla:

```typescript
// ✅ Correcto
import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

### Emotion — keyframes siempre con css``

`keyframes` interpolado en string plano da error en desarrollo:

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

```typescript
const baseStyles = css`
  padding: var(--spacing-m);
  border-radius: var(--corners-default-card);
`

const CardA = styled.div`
  ${baseStyles} background: red;
`
const CardB = styled.div`
  ${baseStyles} background: blue;
`
```

### Emotion — forwardRef en Link de Next.js

Para pasar `ref` a un `styled(Link)` y usarlo con GSAP:

```typescript
const LinkBase = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
  (props, ref) => <Link {...props} ref={ref} />
)
LinkBase.displayName = 'LinkBase'

const StyledLink = styled(LinkBase)`...`
```

---

## Iconos — nombres válidos de Lucide

Lucide **no tiene iconos de marcas**. Sustituciones confirmadas:

| ❌ No existe  | ✅ Usar       |
| ------------- | ------------- |
| `Linkedin`    | `Link2`       |
| `Github`      | `Code`        |
| `CheckCircle` | `CircleCheck` |
| `AlertCircle` | `CircleAlert` |

Verificar nombres:

```bash
node -e "const {icons}=require('./node_modules/lucide-react'); console.log(Object.keys(icons).filter(n => /pattern/i.test(n)))"
```

---

## Layout y providers

### Root layout — nunca añadir `<head>` manual

Next.js gestiona el `<head>` internamente a través de su sistema de metadata y el `MetadataWrapper`. Añadir `<head>` en JSX causa hydration mismatch en todas las páginas:

```tsx
// ❌ Rompe MetadataWrapper en Next.js 16 App Router
<html>
  <head>
    <link rel="preconnect" href="..." />
  </head>
  <body>...</body>
</html>

// ✅ Correcto — sin <head> manual
<html>
  <body>...</body>
</html>
```

Para añadir `<link>` al head usar el export `metadata` de Next.js. Para preconnect no hay soporte directo en la API de metadata — aceptar la limitación.

### Root layout — debe ser SÍNCRONO

```typescript
// ✅ Correcto
export default function RootLayout({ children }) { ... }

// ❌ Causa hydration mismatch en MetadataWrapper
export default async function RootLayout({ children }) { ... }
```

### Orden de providers en layout.tsx

```typescript
<ThemeProvider>
  <AuthProvider>
    <Header />        {/* Header minimal — solo logo + ThemeToggle */}
    {children}
  </AuthProvider>
</ThemeProvider>
```

### globals.css — obligatorio en layout.tsx

```typescript
import '@kore/tokens/css'
import './globals.css' // ← sin esto el browser añade 8px de margen en body
```

### Dark mode

- `ThemeProvider` lee `localStorage` + `prefers-color-scheme` en `useEffect`
- Script anti-flash en `<head>` antes de hidratación
- `suppressHydrationWarning` en `<html>`
- `data-theme="dark"` en `document.documentElement`

---

## Arquitectura de rutas

| Ruta         | Layout                | Header                                           |
| ------------ | --------------------- | ------------------------------------------------ |
| `/`          | root layout           | minimal (logo + ThemeToggle flotante en Hero)    |
| `/portfolio` | root layout           | minimal (ThemeToggle en PortfolioHero)           |
| `/login`     | root layout           | minimal                                          |
| `/register`  | root layout           | minimal                                          |
| `/workouts`  | `workouts/layout.tsx` | AppHeader (logo + Avatar + logout + ThemeToggle) |

### Protección de rutas

La lógica de auth va en el **layout**, no en la página:

```typescript
// ✅ workouts/layout.tsx
useEffect(() => {
  if (!loading && !user) router.replace('/login')
}, [user, loading, router])
```

---

## Scroll

### Anti-scroll-restore

```typescript
// layout.tsx — produce el warning "Encountered a script tag" de React 19, ignorar
<script dangerouslySetInnerHTML={{ __html: 'history.scrollRestoration = "manual"' }} />
```

### Scroll anchors

Poner el `id` en el `HeadingWrapper`, no en el `Section` exterior:

```tsx
// ✅ El anchor lleva directamente al contenido visible
<HeadingWrapper id="catalog">
  <SectionTitle>Entrenamientos</SectionTitle>
</HeadingWrapper>

// ❌ Añade todo el padding-block encima
<div id="catalog">
  <Section>...</Section>
</div>
```

---

## Firebase

### Reglas Firestore actuales

| Colección      | Permisos                       |
|----------------|--------------------------------|
| `workouts`     | read: true · write: false      |
| `contacts`     | read: false · create: true     |
| `users/{uid}`  | read/create: auth.uid === uid  |

### Auth disponible

```typescript
import { useAuth } from '@/providers/AuthProvider'
const { user, loading, login, register, loginGoogle, logout } = useAuth()
```

### Códigos de error de Firebase Auth

```typescript
catch (err: unknown) {  // ← siempre unknown, nunca any
  const code = (err as { code?: string })?.code
  // 'auth/invalid-credential'   → credenciales incorrectas
  // 'auth/email-already-in-use' → email duplicado
}
```

---

## Controlled inputs en @kore/ui-web

`SearchInput` con `value` controlado requiere `onSearch` que dispara en cada tecla:

```tsx
<SearchInput
  value={search}
  onSearch={setSearch} // dispara en cada tecla + Escape
/>
```

---

## @kore/ui-web — flujo de desarrollo

Cambios en `packages/ui-web/src/` NO se reflejan en `apps/web` hasta rebuildar:

```bash
cd packages/ui-web && npx tsup   # rebuild dist/ (~3s)
```

Tras rebuild, Next.js detecta el cambio y recarga automáticamente.

---

## GSAP en Next.js App Router

```typescript
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger) // fuera del componente

const MyComponent = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // animaciones aquí
    }, containerRef)

    return () => ctx.revert() // cleanup obligatorio
  }, [])
}
```

- Siempre `gsap.context()` para scope y cleanup
- `ctx.revert()` en el return del useEffect
- `autoAlpha` en lugar de `opacity` + `visibility` combinados

---

## Deploy en Vercel

### Flujo correcto

```bash
# 1. Tras cambios en packages, rebuildar y commitear el dist
cd packages/ui-web && npx tsup
# o
cd packages/tokens && npm run build

# 2. Commitear TODO — código fuente + dist
git add packages/ui-web/dist packages/tokens/dist
git commit -m "..."

# 3. Push a main → Vercel hace auto-deploy
git push origin main
```

### Por qué hay que commitear el dist

Turborepo usa remote cache en Vercel pero **no restaura los archivos a disco** en el entorno de build — solo reproduce los logs del build anterior. Por tanto, `packages/tokens/dist/kore.css` y `packages/ui-web/dist/` deben estar en el repo para que el build de `apps/web` pueda importarlos.

### Qué está en `.gitignore` y qué no

| Path | En git | Por qué |
|------|--------|---------|
| `packages/tokens/dist/` | ✅ sí | Vercel lo necesita disponible desde el clone |
| `packages/ui-web/dist/` | ✅ sí | Ídem |
| `apps/web/.next/` | ❌ no | Output de Next.js, Vercel lo genera |
| `apps/*/dist/` | ❌ no | Apps no son packages npm |

### Errores conocidos del deploy

| Error | Causa | Solución |
|-------|-------|----------|
| `Can't resolve '@kore/tokens/css'` | dist no commiteado | `git add packages/tokens/dist && git push` |
| `Can't resolve '@kore/ui-web'` | dist no commiteado | `git add packages/ui-web/dist && git push` |
