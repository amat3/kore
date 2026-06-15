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
| `npx expo run:android` → "No Android connected device found" tras reiniciar el Mac | `ANDROID_HOME`/`ANDROID_SDK_ROOT` y el PATH a `platform-tools`/`emulator` no persisten entre sesiones de shell si no están en `~/.zshrc` | Añadir a `~/.zshrc`: `export ANDROID_HOME="$HOME/Library/Android/sdk"`, `export ANDROID_SDK_ROOT="$ANDROID_HOME"`, `export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"` |
| Emulador Android arranca con pantalla en negro (pero `adb shell getprop sys.boot_completed` = 1) | Backend gráfico (OpenGL/Metal) del emulador queda colgado tras un reinicio de macOS | `adb emu kill`, luego relanzar con `emulator -avd <nombre> -gpu swiftshader_indirect -no-snapshot` (renderizado por software) |

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

## Tokens semánticos — usar lightTheme/darkTheme, nunca strings hardcodeados

`@kore/tokens` exporta `lightTheme` y `darkTheme` con todos los valores semánticos del design system. **Nunca escribir RGBA hardcodeados** — el token ya existe.

```typescript
import { lightTheme, darkTheme, tints } from '@kore/tokens'

// ✅ Correcto
const light = {
  backgroundInput:     lightTheme.background.inputDefault,     // rgba(255,255,255,0.8)
  foregroundSecondary: lightTheme.foreground.secondaryOnSurface,
  accent:              lightTheme.foreground.accentOnSurface,
  accentDim:           lightTheme.stroke.accentDim,            // rgba(176,94,58,0.2)
  border:              lightTheme.stroke.secondaryOnSurface,
  errorBorder:         lightTheme.stroke.error,                // para borde de campo
  errorFg:             lightTheme.foreground.errorOnSurface,   // para texto e iconos
  errorDim:            lightTheme.background.errorDim,         // para fondo tintado
}

// ❌ Hardcodeado — roto si cambia el design system
const light = {
  accentDim: 'rgba(176, 94, 58, 0.2)',
  border:    'rgba(26,26,26,0.12)',
  errorDim:  'rgba(217, 95, 95, 0.15)',
}
```

### Distinción stroke vs foreground para error/success

El design system tiene **dos colores distintos** para error y success:

| Token | Valor (light) | Uso |
|-------|---------------|-----|
| `stroke.error` / `colors.error` | `#D95F5F` | Borde del campo |
| `foreground.errorOnSurface` | `#B02020` | Texto e iconos (mejor contraste) |
| `stroke.success` / `colors.success` | `#4CAF7D` | Borde del campo |
| `foreground.successOnSurface` | `#2E7D52` | Texto e iconos |

En dark mode, `foreground.errorOnSurface` = `#F7BEBE` (más claro para contraste inverso).

### Estructura de lightTheme / darkTheme

```typescript
lightTheme.background.{
  surfaceLow, surfaceGlass, surfaceSolid, surfaceBright,
  inputDefault, accentDim, errorDim, successDim, ...
}
lightTheme.foreground.{
  primaryOnSurface, secondaryOnSurface, tertiaryOnSurface,
  accentOnSurface, errorOnSurface, successOnSurface, ...
}
lightTheme.stroke.{
  secondaryOnSurface, primaryOnSurface, accent, accentDim,
  error, success, focus, ...
}
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

---

## Google Sign-In (@react-native-google-signin/google-signin)

Implementado en `hooks/useGoogleAuth.ts` + `AuthProvider.loginGoogle(idToken)`. Usa el SDK nativo de Google (`GoogleSignin.signIn()`) para obtener un `idToken`, que luego se pasa a `signInWithCredential(auth, GoogleAuthProvider.credential(idToken))` de Firebase.

**IMPORTANTE — esto es un módulo nativo: NO funciona en Expo Go.** Hace falta un *development build* (`npx expo run:ios` / `npx expo run:android`, o un dev-client de EAS).

### Configuración necesaria (una sola vez)

1. En [Firebase Console](https://console.firebase.google.com/) → proyecto `kore-app-7e80d` → Project settings:
   - Añadir app **Android** (package `com.juanantoamate.kore`) si no existe → descargar `google-services.json` → colocar en `apps/mobile/google-services.json`
   - Añadir app **iOS** (bundle id `com.juanantoamate.kore`) si no existe → descargar `GoogleService-Info.plist` → colocar en `apps/mobile/GoogleService-Info.plist`
   - Ambos archivos van **gitignored** (contienen IDs de proyecto, no secretos críticos pero no se commitean)
2. En `app.json`, dentro de `expo.android` y `expo.ios` añadir:
   ```json
   "android": { "googleServicesFile": "./google-services.json" },
   "ios":     { "googleServicesFile": "./GoogleService-Info.plist" }
   ```
3. En Firebase Console → Authentication → Sign-in method → habilitar **Google** como proveedor.
4. Copiar el **Web client ID** (Firebase Console → Project settings → General → tu app Web, o el "Web client (auto created by Google Service)" en Google Cloud Console → Credentials) → `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` en `.env.local`.
5. Copiar el **iOS client ID** (del `GoogleService-Info.plist`, campo `CLIENT_ID`) → `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`.
6. Generar los proyectos nativos: `npx expo prebuild` (crea `ios/` y `android/` — gitignorados, se regeneran).
7. Ejecutar con dev build: `npx expo run:ios` o `npx expo run:android` (NO Expo Go).

### Notas

- `GoogleSignin.configure({ webClientId, iosClientId })` se llama una vez al importar `useGoogleAuth.ts`.
- `isSuccessResponse` / `isErrorWithCode` / `statusCodes.SIGN_IN_CANCELLED` del paquete permiten distinguir cancelación del usuario de errores reales.
- JUA-71 (Done) descartó Google Auth originalmente — esta es una decisión posterior que lo reincorpora.

---

## Pantallas de auth — alinear con el breakpoint mobile de web

**Principio**: web en su breakpoint mobile (`Wrapper` con `max-width: 420px` en `apps/web/components/Auth/LoginForm.tsx` / `RegisterForm.tsx`) es la referencia de diseño para las pantallas nativas de auth. Mismo copy, mismo orden de layout, mismos componentes — "clonar" web, no reinventar.

Aplicado en `app/login.tsx` y `app/register.tsx`:

- **Orden**: KoreWordmark → `Text variant="h1"` (título) → `Text variant="body-light"` (subtítulo) → `GoogleButton` (PRIMERO, antes del form) → divider "o con email" → campos del form (`Input` atom, no `TextInput` crudo) → banner de error (CircleAlert + `theme.errorDim`/`errorFg`) → botón submit en mayúsculas con letter-spacing → footer
- `register.tsx` añade el campo **Confirmar contraseña** y valida `password` con la misma regex que web (`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/`, mínimo 8 caracteres) — antes solo pedía 6 caracteres sin complejidad
- Los textos salen de `i18n` (`auth.loginTitle`, `auth.loginSubtitle`, `auth.registerTitle`, `auth.registerSubtitle`, `auth.signIn`, `auth.confirmPassword`, `auth.noAccount`, `auth.haveAccount`, etc.) — copy idéntico al de los `<Title>`/`<Subtitle>`/`<SubmitButton>`/`<Footer>` de web

### Diferencias intencionales (no son inconsistencias)

- **"Olvidé mi contraseña"**: solo en `login.tsx` mobile, debajo del submit — web no lo tiene en este formulario, pero en mobile facilita el flujo sin un modal
- **Footer con `Link` anidado**: igual que web, el texto normal usa `theme.foregroundSecondary` y solo la parte tappable ("Regístrate gratis" / "Inicia sesión") usa `theme.accent` + `Fonts.uiSemiBold` — un `Link` de Expo Router anidado dentro de un `Text` funciona igual que un `<a>` dentro de un `<p>` en web. Las claves i18n se dividieron en `*Prefix`/`*Action` para poder estilar cada parte por separado
- **Animaciones**: web usa Framer Motion (`motion.div` stagger); mobile usaría Reanimated (`entering={FadeIn}` etc.) si se añade — no implementado aún en esta pasada
