import { View, Pressable }    from 'react-native'
import { useSafeAreaInsets }  from 'react-native-safe-area-context'
import { useThemeColors }     from '@/hooks/useThemeColors'
import { useAuth }            from '@/providers/AuthProvider'
import { Text }               from '@/components/atoms'
import { spacing }            from '@kore/tokens'

export default function ProfileScreen() {
  const insets           = useSafeAreaInsets()
  const theme            = useThemeColors()
  const { user, logout } = useAuth()

  return (
    <View style={{
      flex:              1,
      paddingTop:        insets.top + spacing.l,
      paddingHorizontal: spacing.l,
      backgroundColor:   theme.background,
    }}>
      <Text variant="h1">Perfil</Text>
      <Text variant="body" color={theme.foregroundSecondary} style={{ marginTop: spacing.s }}>
        {user?.email ?? '—'}
      </Text>
      <Pressable
        onPress={logout}
        accessibilityRole="button"
        accessibilityLabel="Cerrar sesión"
        style={{ marginTop: spacing.xl }}
      >
        <Text variant="body" color={theme.accent}>Cerrar sesión</Text>
      </Pressable>
    </View>
  )
}
