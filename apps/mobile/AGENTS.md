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

### Reanimated — babel.config.js

`react-native-reanimated/plugin` debe ser el **último** plugin de Babel:

```javascript
// babel.config.js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // ... otros plugins ...
    'react-native-reanimated/plugin',  // ← siempre el último
  ],
}
```

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

---

## Patrones de Expo Router

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
