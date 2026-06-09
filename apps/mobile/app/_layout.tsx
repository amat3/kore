import { useEffect }               from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { SafeAreaProvider }          from 'react-native-safe-area-context'
import { GestureHandlerRootView }    from 'react-native-gesture-handler'
import { useFonts }                  from 'expo-font'
import * as SplashScreen             from 'expo-splash-screen'
import {
  CormorantGaramond_300Light,
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
}                                    from '@expo-google-fonts/cormorant-garamond'
import {
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_600SemiBold,
}                                    from '@expo-google-fonts/dm-sans'
import { AuthProvider, useAuth }     from '@/providers/AuthProvider'
import '@/i18n'

SplashScreen.preventAutoHideAsync()

const AuthGuard = () => {
  const { user, loading } = useAuth()
  const router            = useRouter()
  const segments          = useSegments()

  useEffect(() => {
    if (loading) return
    const inAuthGroup = segments[0] === '(tabs)'
    if (!user && inAuthGroup) {
      router.replace('/login')
    } else if (user && !inAuthGroup) {
      router.replace('/(tabs)/')
    }
  }, [user, loading, segments, router])

  return null
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_400Regular,
    CormorantGaramond_600SemiBold,
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_600SemiBold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <AuthGuard />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen
              name="workout/[id]"
              options={{ presentation: 'card', animation: 'slide_from_right' }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
