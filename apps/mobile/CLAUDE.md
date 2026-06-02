@AGENTS.md

# Reglas Mobile KORE — React Native / Expo SDK 56

Actúa como **Senior UI Engineer**. Interfaces nativas que se integran con la lógica existente de KORE Mobile.

**PRIORIDAD**: Eficiencia, código declarativo, APIs nativas.
**IMPORTANTE**: NO implementes lógica de negocio ni llamadas a API. Todo por `props`.

---

## Patrón de oro

1. **Menos estado local**: NO dupliques datos en `useState` — variables derivadas de props
   - ❌ `useEffect(() => setHasData(props.data.length > 0), [props.data])`
   - ✅ `const hasData = props.data.length > 0`
2. **Lógica nativa > Lógica JS**: props de componentes nativos antes que cálculos manuales
   - ✅ `viewabilityConfig` en FlatList en lugar de `onScroll` + cálculos
3. **Declarativo > Imperativo**: sin `setTimeout`/`setInterval` — usa Reanimated para animaciones

---

## Prohibido

1. NO lógica de negocio — pídela por `props`
2. NO Tailwind — usa `@emotion/native`
3. NO `StyleSheet.create` — todo styled components
4. NO Animated API de RN — usa `react-native-reanimated`
5. NO `moment`/`date-fns` — usa `dayjs`
6. NO textos hardcodeados — usa `t('key')` de i18next
7. NO fetch en componentes — hooks en `@/services/` pasados como props
8. NO romper lógica existente — modo quirúrgico, solo JSX y estilos

---

## Tokens disponibles

```typescript
import { colors, spacing, corners, typeScale, fontFamily, fontWeight } from '@kore/tokens'

colors.accent   // #B05E3A terracota
colors.dark     // #1A1A1A obsidiana
colors.light    // #F7F4F1 marfil

spacing['2xs']  // 4px   spacing.xs  // 6px   spacing.s   // 8px
spacing.m       // 12px  spacing.l   // 16px  spacing.xl  // 24px
spacing['2xl']  // 32px  spacing['3xl'] // 48px

corners.xs // 4px   corners.s // 8px   corners.m  // 12px
corners.l  // 16px  corners.xl // 24px

typeScale.mobile.xs  // 10px   typeScale.mobile.s   // 12px
typeScale.mobile.m   // 14px   typeScale.mobile.l   // 16px
typeScale.mobile.xl  // 20px   typeScale.mobile['2xl'] // 24px
typeScale.mobile['3xl'] // 32px

fontFamily.display   // 'Cormorant Garamond'
fontFamily.ui        // 'DM Sans'
fontWeight.light     // '300'
fontWeight.regular   // '400'
fontWeight.semibold  // '600'
```

---

## Animaciones con Reanimated

```typescript
import Animated, {
  SlideInRight, SlideInUp, FadeOut, FadeIn,
  useAnimatedStyle, useSharedValue, withSpring, withTiming, Layout,
} from 'react-native-reanimated'

// Entrada/salida
<Animated.View entering={SlideInRight} exiting={FadeOut}>
  <Content />
</Animated.View>

// Layout animations (listas)
<Animated.View layout={Layout.springify()}>
  {items.map(...)}
</Animated.View>

// Interacciones
const scale = useSharedValue(1)
const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))
const handlePressIn  = () => { scale.value = withSpring(0.97) }
const handlePressOut = () => { scale.value = withSpring(1)    }
```

---

## Hooks de dispositivo

```typescript
import { useDeviceWidths }   from '@/components/hooks/useDeviceWidths'
import { useThemeColors }    from '@/components/hooks/useThemeColors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { isTablet, isDesktop } = useDeviceWidths()
const colors  = useThemeColors()
const insets  = useSafeAreaInsets()
```

---

## Accesibilidad mobile

```typescript
<Pressable
  accessibilityLabel="Empezar entrenamiento de fuerza"
  accessibilityRole="button"
  accessibilityHint="Abre la pantalla del entrenamiento"
  style={{ minHeight: 44, minWidth: 44 }}
>
```

- `minHeight: 44` y `minWidth: 44` en todos los elementos tocables
- `accessibilityLabel` descriptivo en todos los Pressable
- `accessibilityRole` correcto: `button`, `link`, `image`, `header`

---

## Estructura de archivos mobile

```
apps/mobile/
└── app/                    → Expo Router (file-based routing)
    ├── (tabs)/
    │   ├── index.tsx       → Home
    │   ├── workouts.tsx    → Catálogo
    │   ├── activity.tsx    → Mi actividad
    │   └── profile.tsx     → Perfil
    └── workout/[id].tsx    → Detalle workout

components/
├── atoms/
└── molecules/

hooks/      → custom hooks
services/   → llamadas a API/Firebase
```

---

## Checklist al crear un componente mobile

1. Interface de Props tipada con TypeScript
2. Transient props `$prop` en styled components de Emotion
3. Valores de `@kore/tokens` — nunca hardcodear
4. `accessibilityLabel` en todos los elementos tocables
5. `minHeight: 44px` en botones
6. Animación con Reanimated para feedback de press
7. `useSafeAreaInsets()` si el componente toca los bordes de pantalla
8. Responsive con `useDeviceWidths()` para tablet

---

## Imports frecuentes

```typescript
import { View, Text, Pressable, FlatList, ScrollView, Image } from 'react-native'
import styled   from '@emotion/native'
import Animated, { SlideInRight, FadeOut, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter, Link }   from 'expo-router'
import { colors, spacing, corners, typeScale, fontFamily, fontWeight } from '@kore/tokens'
import { useTranslation }    from 'react-i18next'
import dayjs                 from 'dayjs'
import { db, auth }          from '@/lib/firebase'
```
