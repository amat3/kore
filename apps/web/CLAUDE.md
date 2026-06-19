@AGENTS.md

# Reglas Web KORE — Next.js 16 / React 19

Actúa como **Senior UI Engineer**. Interfaces de alto rendimiento, accesibles y visualmente perfectas.

**PRIORIDAD**: Eficiencia, código declarativo, APIs web modernas.
**IMPORTANTE**: NO implementes lógica de negocio ni llamadas a API. Todo por `props`.

---

## Patrón de oro

1. **Estado derivado > useState**: calcula variables directamente de las props
2. **CSS-in-JS con propósito**: styled components para estructura y lógica visual
3. **React 19 ready**: evita `useMemo` innecesarios · usa `React.use()` para promesas

---

## Prohibido

1. NO lógica de negocio — pídela por `props`
2. NO Tailwind — usa `@emotion/styled`
3. NO píxeles fijos en tipografía — usa CSS vars de `@kore/tokens`
4. NO `moment`/`date-fns` — usa `dayjs`
5. NO textos hardcodeados — usa `t('key')` de i18next
6. NO romper lógica existente — modo quirúrgico, solo toca JSX y estilos
7. NO hardcodear colores — usa siempre CSS vars de `@kore/tokens`

---

## Tokens disponibles

```css
/* Fondos */
var(--background-surface-low)
var(--background-surface-solid)
var(--background-accent-solid)
var(--background-accent-dim)
var(--background-error-dim)
var(--background-success-dim)

/* Textos */
var(--foreground-primary-on-surface)
var(--foreground-secondary-on-surface)
var(--foreground-tertiary-on-surface)
var(--foreground-accent-on-surface)
var(--foreground-error-on-surface)
var(--foreground-success-on-surface)

/* Bordes */
var(--stroke-secondary-on-surface)
var(--stroke-accent)
var(--stroke-accent-dim)
var(--stroke-focus)
var(--stroke-error)

/* Tipografía */
var(--font-family-display)        /* Cormorant Garamond */
var(--font-family-ui)             /* DM Sans */
var(--font-weight-light)          /* 300 */
var(--font-weight-regular)        /* 400 */
var(--font-weight-semibold)       /* 600 */
var(--scale-2xs) … var(--scale-5xl)
var(--letter-spacing-moderate) … var(--letter-spacing-wide)
var(--line-height-dense) … var(--line-height-spacious)

/* Espaciado y forma */
var(--spacing-2xs) … var(--spacing-3xl)
var(--radius-xs) … var(--radius-full)
var(--corners-default-card)
var(--corners-default-field)

/* Glass identity (feat/glass-identity) */
var(--background-glass-surface)   /* marfil 55% light / obsidiana 50% dark */
var(--background-glass-warm)      /* terracota tint 5% light / 10% dark */
var(--stroke-glass)               /* borde terracota 15% light / 25% dark */
var(--stroke-glass-subtle)        /* borde marfil 10% */
var(--stroke-glass-glow)          /* glow terracota 18% light / 20% dark */
var(--blur-soft)                  /* 4px */
var(--blur-medium)                /* 12px */
var(--blur-heavy)                 /* 16px */
var(--blur-ultra)                 /* 24px */
var(--shadow-glass-sm)            /* 0 2px 12px terracota 8% */
var(--shadow-glass-md)            /* 0 4px 24px terracota 12% */
var(--shadow-glass-lg)            /* 0 8px 48px terracota 18% */
var(--shadow-glass-inset)         /* inset 0 1px 0 marfil 10% */
```

---

## Átomos disponibles en @kore/ui-web

```typescript
import {
  Text, Heading1, Heading2, Heading3, Overline, Body, BodySm, Caption,
  Button,      // solid | outlined | ghost · sm | md | lg · loading · disabled
  Badge,       // default | accent | success | error | warning | solid
  Icon,        // Lucide icons — prop name con autocompletado TypeScript
  Input,       // default | error | success | disabled · label · helper · clearable
  SearchInput, // Input con lupa · onChange dispara onSearch · Escape limpia
  Tag,         // default | selected | solid · dismissible · onClick
  TagGroup,
  Avatar,      // imagen o iniciales · xs-2xl · status dot · ring
  AvatarGroup,
  Card,        // contenedor base interactivo
  Spinner,     // loading CSS, hereda color con currentColor
  StatCard,    // value + label + icon + trend
} from '@kore/ui-web'
```

## Moléculas disponibles en @kore/ui-web

```typescript
import {
  WorkoutCard, // imagen 4:3 · overline terracota · Cormorant título · completed · favorited
  FilterBar,   // SearchInput + TagGroup · layout stacked/inline · hideSearch · hideTags
  StreakBadge, // active | inactive | record · contador animado rAF
  NavBar,      // mobile bottom pill · desktop top sticky · items configurables
} from '@kore/ui-web'
```

> Tras editar cualquier componente en `packages/ui-web/src/`, ejecutar `cd packages/ui-web && npx tsup` para regenerar el dist.

---

## Ejemplo de componente KORE

```typescript
'use client'

import styled from '@emotion/styled'
import { Button, Icon } from '@kore/ui-web'

export interface WorkoutBannerProps {
  title:    string
  variant?: 'default' | 'featured'
  onStart?: () => void
}

const WorkoutBanner = ({ title, variant = 'default', onStart }: WorkoutBannerProps) => (
  <Wrapper $variant={variant}>
    <Title>{title}</Title>
    <Button variant="solid" size="md"
      leftIcon={<Icon name="Play" size="sm" color="inherit" />}
      onClick={onStart}
    >
      Empezar
    </Button>
  </Wrapper>
)

const Wrapper = styled.div<{ $variant: 'default' | 'featured' }>`
  display:          flex;
  align-items:      center;
  justify-content:  space-between;
  padding:          var(--spacing-l);
  border-radius:    var(--corners-default-card);
  border:           0.5px solid var(--stroke-secondary-on-surface);
  background-color: ${({ $variant }) =>
    $variant === 'featured'
      ? 'var(--background-accent-dim)'
      : 'var(--background-surface-solid)'};
  transition: background-color 150ms;
`

const Title = styled.h3`
  font-family:    var(--font-family-display);
  font-size:      var(--scale-2xl);
  font-weight:    var(--font-weight-semibold);
  color:          var(--foreground-primary-on-surface);
  letter-spacing: var(--letter-spacing-dense);
  margin:         0;
`

export default WorkoutBanner
```

---

## Responsividad

```css
@media (min-width: 600px)  { /* tablet  */ }
@media (min-width: 768px)  { /* desktop */ }
@media (min-width: 1200px) { /* wide    */ }
@media (hover: hover)      { &:hover { /* solo dispositivos con puntero */ } }

font-size: clamp(2rem, 5vw, 4rem); /* tipografía fluida */
```

---

## Accesibilidad

- Landmarks semánticos: `<nav>`, `<main>`, `<header>`, `<article>`, `<footer>`
- `type="button"` en todos los botones que no son submit
- `aria-label` en botones solo con icono
- Nunca eliminar `outline` sin `:focus-visible` alternativo
- `aria-invalid` en inputs con error · `aria-busy` en botones loading
- `role="alert"` en mensajes de error

---

## Storybook

```typescript
const meta: Meta<typeof Component> = {
  title:      'KORE/Atoms/NombreComponente',  // o Molecules/
  component:  Component,
  tags:       ['autodocs'],
  parameters: { layout: 'centered' },         // 'padded' si es fluid
}

export const Default:     Story = { args: { variant: 'default' } }
export const Loading:     Story = { args: { isLoading: true    } }
export const Disabled:    Story = { args: { disabled: true     } }
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ( /* grid con todas las variantes */ )
}
```

---

## Checklist al crear un componente

1. `'use client'` en línea 1 si usa hooks o eventos
2. Interface de Props tipada con TypeScript
3. Transient props `$prop` en todos los styled components
4. CSS vars de `@kore/tokens` — nunca valores hardcodeados
5. Estados: hover, active, focus-visible, disabled
6. Dark mode automático (los tokens cambian solos)
7. Story en `packages/ui-web/src/atoms/` o `molecules/`
8. Export en `packages/ui-web/src/index.ts`

---

## Imports frecuentes

```typescript
import styled              from '@emotion/styled'
import { css, keyframes }  from '@emotion/react'   // keyframes SIEMPRE dentro de css``
import { motion, type Variants } from 'framer-motion'  // Variants tipadas explícitamente
import gsap                from 'gsap'
import { ScrollTrigger }   from 'gsap/ScrollTrigger'
import Link                from 'next/link'
import { useRouter }       from 'next/navigation'
import { useTranslation }  from 'react-i18next'
import '@/i18n'
```
