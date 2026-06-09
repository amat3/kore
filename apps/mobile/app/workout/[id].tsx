import { View, Pressable, ScrollView }  from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets }             from 'react-native-safe-area-context'
import { useThemeColors }                from '@/hooks/useThemeColors'
import { Text }                          from '@/components/atoms'
import { colors, spacing }              from '@kore/tokens'

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router  = useRouter()
  const insets  = useSafeAreaInsets()
  const theme   = useThemeColors()

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}>
        <View style={{ paddingTop: insets.top + spacing.l, paddingHorizontal: spacing.l }}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Volver"
            style={{ marginBottom: spacing.l, minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
          >
            <Text variant="body" color={colors.accent}>← Volver</Text>
          </Pressable>
          <Text variant="h1">Detalle workout</Text>
          <Text variant="body-sm" color={theme.foregroundSecondary} style={{ marginTop: spacing.s }}>
            ID: {id} · JUA-70 — en construcción
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
