import { useState, useCallback }            from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import Animated, { FadeIn }                 from 'react-native-reanimated'
import { useRouter }                         from 'expo-router'
import { useSafeAreaInsets }                 from 'react-native-safe-area-context'
import { useTranslation }                    from 'react-i18next'
import { spacing, colors }                   from '@kore/tokens'
import { useThemeColors }                    from '@/hooks/useThemeColors'
import { Text }                              from '@/components/atoms'
import { WorkoutCard, FilterBar }            from '@/components/molecules'
import { useWorkouts }                       from '@/services/useWorkouts'
import type { FilterItem }                   from '@/components/molecules'

export default function WorkoutsScreen() {
  const theme  = useThemeColors()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { t }  = useTranslation()

  const [search,           setSearch]           = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])

  const { workouts, loading, categories } = useWorkouts({
    search,
    categories: activeCategories,
  })

  const filters: FilterItem[] = categories.map(cat => ({
    id:       cat,
    label:    cat,
    selected: activeCategories.includes(cat),
  }))

  const toggleCategory = useCallback((id: string) => {
    setActiveCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }, [])

  return (
    <FlatList
      data={workouts}
      keyExtractor={item => item.id}
      numColumns={2}
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:        insets.top + spacing.l,
        paddingBottom:     insets.bottom + spacing['3xl'],
        paddingHorizontal: spacing.l,
        gap:               spacing.m,
      }}
      columnWrapperStyle={{ gap: spacing.m }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ gap: spacing.m, marginBottom: spacing.s }}>
          <Text variant="h1">{t('workouts.title')}</Text>
          <FilterBar
            filters={filters}
            searchValue={search}
            onSearch={setSearch}
            onFilterToggle={toggleCategory}
            searchPlaceholder={t('workouts.search')}
          />
        </View>
      }
      ListEmptyComponent={
        loading ? (
          <View style={{ alignItems: 'center', marginTop: spacing['3xl'] }}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : (
          <View style={{ alignItems: 'center', marginTop: spacing['3xl'] }}>
            <Text variant="body" color={theme.foregroundSecondary}>
              {t('workouts.empty')}
            </Text>
          </View>
        )
      }
      renderItem={({ item }) => (
        <Animated.View entering={FadeIn.duration(300)} style={{ flex: 1 }}>
          <WorkoutCard
            title={item.title}
            category={item.category}
            duration={item.duration}
            level={item.level}
            imageSrc={item.imageSrc}
            onPress={() => router.push(`/workout/${item.id}`)}
          />
        </Animated.View>
      )}
    />
  )
}
