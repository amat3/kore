import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeColors }    from '@/hooks/useThemeColors'
import { Text }              from '@/components/atoms'
import { spacing }           from '@kore/tokens'

export default function WorkoutsScreen() {
  const insets = useSafeAreaInsets()
  const theme  = useThemeColors()

  return (
    <View style={{
      flex:              1,
      paddingTop:        insets.top + spacing.l,
      paddingHorizontal: spacing.l,
      backgroundColor:   theme.background,
    }}>
      <Text variant="h1">Entrenamientos</Text>
      <Text variant="body" color={theme.foregroundSecondary} style={{ marginTop: spacing.s }}>
        JUA-69 — en construcción
      </Text>
    </View>
  )
}
