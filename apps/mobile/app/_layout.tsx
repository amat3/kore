import { useEffect }             from 'react'
import { Stack, useRouter, useSegments } from 'expo-router'
import { SafeAreaProvider }      from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import '@/i18n'

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
