# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

# Instrucciones operativas — apps/mobile

## Antes de dar una tarea por terminada

1. Ejecutar `npx tsc --noEmit` desde `apps/mobile/` — resolver todos los errores
2. Verificar que el componente funciona en iOS y Android (comportamientos nativos difieren)
3. Hacer commit: `<gitmoji> <type>: <header corto>\n\n<descripción del porqué>`

---

## Comandos del día a día

```bash
# Desde apps/mobile/
npx expo start                  # dev server (Expo Go)
npx expo start --ios            # simulador iOS
npx expo start --android        # emulador Android
npx expo prebuild               # genera carpetas ios/ y android/ (nativo)
npx tsc --noEmit                # verificar TypeScript
```

---

## Configuración obligatoria

### Alias `@/` — babel-plugin-module-resolver

Metro `resolver.alias` solo hace match exacto — **no soporta prefijos** como `@/*`.
Para que `@/hooks/foo` resuelva a `apps/mobile/hooks/foo` se usa Babel:

```bash
npm install --save-dev babel-plugin-module-resolver
```

```javascript
// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root:       ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
        alias:      { '@': '.' },
      },
    ],
    'react-native-reanimated/plugin', // ← siempre el último
  ],
}
```

Tras cualquier cambio en `babel.config.js` reiniciar con `npx expo start --clear`.

### Reanimated — babel.config.js

`react-native-reanimated/plugin` debe ser el **último** plugin de Babel (ver config completa arriba).

### SafeAreaProvider — wrap en el root

```typescript
// app/_layout.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
```

---

## Errores conocidos / preventivos

| Error | Causa | Solución |
|-------|-------|----------|
| `Reanimated: useSharedValue` fuera de componente | Shared values deben crearse dentro del componente | Mover `useSharedValue` dentro del cuerpo del componente |
| `SafeAreaInsets` devuelve 0 | `SafeAreaProvider` no envuelve el árbol | Verificar que está en `app/_layout.tsx` |
| Animación jerky en Android | `useNativeDriver` implícito en Reanimated funciona diferente | Usar siempre Reanimated, nunca Animated API de RN |
| `StyleSheet` props en `@emotion/native` | Emotion Native no acepta todas las props de StyleSheet | Usar solo props CSS válidas en styled components |
| Metro bundle error tras cambiar babel | Cache de Metro desactualizada | `npx expo start --clear` |
| `Unable to resolve "@/hooks/..."` | `resolver.alias` de Metro no soporta prefijos | Usar `babel-plugin-module-resolver` (ver sección abajo) |
| `Type 'ColorValue' not assignable to 'string'` en `tabBarIcon` | Expo Router pasa `ColorValue` (no `string`) al `color` de los iconos de tabs | Tipar el prop como `ColorValue` y hacer cast a `string` al pasarlo a Lucide |

---

## Patrones de Expo Router

### Tab bar con iconos Lucide

`tabBarIcon` recibe `color: ColorValue` (no `string`). Lucide espera `string`, así que castear:

```typescript
import type { ColorValue }  from 'react-native'
import * as LucideIcons     from 'lucide-react-native'

type TabIconProps = { color: ColorValue; size: number }

const HomeIcon = ({ color, size }: TabIconProps) =>
  <LucideIcons.House size={size} color={color as string} />

// En el layout:
<Tabs.Screen name="index" options={{ tabBarIcon: HomeIcon }} />
```

### Navegación programática

```typescript
// Navegación programática
import { useRouter } from 'expo-router'
const router = useRouter()
router.push('/workout/123')
router.replace('/login')     // sin back
router.back()

// Links declarativos
import { Link } from 'expo-router'
<Link href="/workouts">Ver entrenamientos</Link>

// Params de ruta
import { useLocalSearchParams } from 'expo-router'
const { id } = useLocalSearchParams<{ id: string }>()
```

---

## Fuentes — nunca usar fontFamily de @kore/tokens en mobile

`fontFamily` en `@kore/tokens` son CSS font stacks (`'"Cormorant Garamond", Georgia, serif'`) — **no funcionan en React Native** y causan crash en Android.

En RN cada peso de fuente es una familia separada. Usar siempre `@/constants/fonts`:

```typescript
import { Fonts } from '@/constants/fonts'

// ✅ Correcto — nombre exacto del archivo de fuente
fontFamily: Fonts.displaySemiBold  // 'CormorantGaramond_600SemiBold'
fontFamily: Fonts.uiRegular        // 'DMSans_400Regular'

// ❌ Crash — CSS stack, solo web
fontFamily: fontFamily.display     // '"Cormorant Garamond", Georgia, serif'

// ❌ Inútil — en RN el peso ya está en el nombre de la familia
fontFamily: Fonts.uiRegular, fontWeight: '600'  // no aplica el bold
```

Las fuentes se cargan en `app/_layout.tsx` con `useFonts` de `expo-font` y `SplashScreen.preventAutoHideAsync()`.

---

## Tokens — diferencia con web

En mobile los tokens son **objetos JS**, no CSS vars:

```typescript
// ✅ Mobile — objetos JS de @kore/tokens
import { colors, spacing } from '@kore/tokens'
const styles = { padding: spacing.m, color: colors.accent }

// ❌ No funciona en mobile — CSS vars solo en web
style={{ padding: 'var(--spacing-m)' }}
```

---

## Gestos y feedback táctil

```typescript
// Siempre Pressable sobre TouchableOpacity
import { Pressable } from 'react-native'

<Pressable
  onPress={onPress}
  onPressIn={() => { scale.value = withSpring(0.97) }}
  onPressOut={() => { scale.value = withSpring(1) }}
  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
  accessibilityRole="button"
  accessibilityLabel="..."
  style={{ minHeight: 44, minWidth: 44 }}
>
```

---

## Diferencias iOS / Android a tener en cuenta

| Comportamiento | iOS | Android |
|----------------|-----|---------|
| Safe area top  | Dynamic Island / notch | Status bar variable |
| Safe area bottom | Home indicator (34px) | Gesture nav o botones |
| Fuentes        | Carga automática | Requiere `expo-font` |
| Sombras        | `shadow*` props | `elevation` prop |
| Overflow hidden | Funciona | No corta con `borderRadius` — usar `overflow: 'hidden'` explícito en hijo |

```typescript
// Sombras cross-platform
const shadowStyle = Platform.select({
  ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 8 },
  android: { elevation: 4 },
})
```
