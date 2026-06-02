# KORE — Contexto de proyecto

KORE es el portfolio de Juan Antonio Amate (Mid Frontend Developer, React/React Native).
Doble propósito: app de fitness funcional + showcase técnico para reclutadores.

## Workspace

```
kore/
├── packages/tokens/   → @kore/tokens  (design tokens → CSS vars + JS objects)
├── packages/ui-web/   → @kore/ui-web  (React + Emotion + Storybook)
├── apps/web/          → Next.js 16.2.6, React 19  →  reglas en apps/web/CLAUDE.md
└── apps/mobile/       → Expo SDK 56 (pendiente)   →  reglas en apps/mobile/CLAUDE.md
```

## Stack

| Capa         | Tecnología                                      |
|--------------|-------------------------------------------------|
| Monorepo     | Turborepo                                       |
| Web          | Next.js 16.2.6 · React 19 · TypeScript          |
| Estilos      | Emotion (`@emotion/styled`)                     |
| Design sys.  | @kore/tokens + @kore/ui-web + Storybook 8       |
| Animaciones  | GSAP + ScrollTrigger · Framer Motion            |
| BD / Auth    | Firebase Firestore + Firebase Auth              |
| Formularios  | react-hook-form                                 |
| Iconos       | Lucide React                                    |
| i18n         | i18next + react-i18next                         |
| Charts       | Recharts                                        |
| Email        | EmailJS                                         |

## Brand

- **Accent**: Terracota `#B05E3A`
- **Dark bg**: Obsidiana `#1A1A1A`
- **Light bg**: Marfil `#F7F4F1`
- **Display**: Cormorant Garamond (`--font-family-display`)
- **UI**: DM Sans (`--font-family-ui`)

## Firebase

```typescript
import { auth, db } from '@/lib/firebase'   // apps/web/lib/firebase.ts
```

| Colección       | Permisos                        |
|-----------------|---------------------------------|
| `workouts`      | read: true · write: false       |
| `contacts`      | read: false · create: true      |
| `users/{uid}`   | read/create: auth.uid === uid   |

```typescript
import { useAuth } from '@/providers/AuthProvider'
const { user, loading, login, register, loginGoogle, logout } = useAuth()
```

## Rutas web

| Ruta         | Descripción                          |
|--------------|--------------------------------------|
| `/`          | Landing producto KORE                |
| `/portfolio` | Portfolio técnico para reclutadores  |
| `/login`     | Formulario de login                  |
| `/register`  | Formulario de registro               |
| `/workouts`  | Catálogo (requiere auth)             |

## Comandos

```bash
npx turbo dev                                          # levantar todo
npx turbo build --filter=@kore/tokens                 # build tokens
cd packages/ui-web && npx tsup                        # build ui-web
cd packages/ui-web && npx storybook dev -p 6006       # storybook
cd apps/web && npx tsx scripts/seed-firestore.ts      # seed BD
```

## Git

- Repo: `github.com/amat3/kore` · Branch activo: `feat/web-app`
- Formato de commits: `<gitmoji> <type>: <header>\n\n<descripción del porqué>`

## Decisiones de arquitectura

1. `/` producto · `/portfolio` showcase — no mezclar
2. Context sobre Redux para Auth (estado simple)
3. `@media (hover: hover)` — hover solo en dispositivos con puntero
4. CSS vars de @kore/tokens — nunca hardcodear colores ni tamaños
5. `WorkoutCard` consume `Card` — Card es el átomo base de todas las cards
