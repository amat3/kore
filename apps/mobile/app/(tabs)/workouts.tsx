import { useState, useCallback, useEffect } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import Animated, { FadeIn }                 from 'react-native-reanimated'
import { useRouter, useLocalSearchParams }   from 'expo-router'
import { useSafeAreaInsets }                 from 'react-native-safe-area-context'
import { useTranslation }                    from 'react-i18next'
import { spacing, colors, layout }           from '@kore/tokens'
import { Fonts }                             from '@/constants/fonts'
import { useThemeColors }                    from '@/hooks/useThemeColors'
import { useFavorites }                      from '@/hooks/useFavorites'
import { Text }                              from '@/components/atoms'
import { WorkoutCard, FilterBar }            from '@/components/molecules'
import { useWorkouts }                       from '@/services/useWorkouts'
import type { FilterItem }                   from '@/components/molecules'

export default function WorkoutsScreen() {
  const theme  = useThemeColors()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { t }  = useTranslation()

  const { category: categoryParam } = useLocalSearchParams<{ category?: string }>()

  const [search,           setSearch]           = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  )

  useEffect(() => {
    if (categoryParam) setActiveCategories([categoryParam])
  }, [categoryParam])

  const { workouts, loading, error, categories } = useWorkouts({
    search,
    categories: activeCategories,
  })

  const { favorites, toggleFavorite } = useFavorites()

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
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:        insets.top + layout.mobile.sectionPad,
        paddingBottom:     insets.bottom + spacing['3xl'],
        paddingHorizontal: spacing.m,
        gap:               spacing.m,
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={{ gap: spacing.xl }}>
          <View style={{ gap: spacing.m }}>
            <Text variant="overline" color={theme.accent}>{t('workouts.title')}</Text>
            <Text variant="h1">
              {t('workouts.headingPrefix')}{' '}
              <Text variant="h1" color={theme.accent} style={{ fontFamily: Fonts.displaySemiBoldItalic }}>
                {t('workouts.headingEmphasis')}
              </Text>
            </Text>
            <Text variant="body-light" color={theme.foregroundSecondary}>
              {t('workouts.subtitle')}
            </Text>
          </View>
          <FilterBar
            filters={filters}
            searchValue={search}
            onSearch={setSearch}
            onFilterToggle={toggleCategory}
            searchPlaceholder={t('workouts.search')}
          />
          {!loading && !error && workouts.length > 0 && (
            <Text variant="body-sm" color={theme.foregroundTertiary}>
              {t('workouts.resultsCount', { count: workouts.length })}
            </Text>
          )}
        </View>
      }
      ListEmptyComponent={
        loading ? (
          <View style={{ alignItems: 'center', marginTop: spacing['3xl'] }}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        ) : error ? (
          <View style={{ alignItems: 'center', marginTop: spacing['3xl'], paddingHorizontal: spacing.xl }}>
            <Text variant="body" color={theme.errorFg} style={{ textAlign: 'center' }}>
              {t('workouts.error')}
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', gap: spacing.s, marginTop: spacing['3xl'], paddingHorizontal: spacing.xl }}>
            <Text style={{ fontSize: 40 }}>🔍</Text>
            <Text variant="h3">{t('workouts.emptyTitle')}</Text>
            <Text variant="body" color={theme.foregroundSecondary} style={{ textAlign: 'center' }}>
              {t('workouts.emptyText')}
            </Text>
          </View>
        )
      }
      renderItem={({ item }) => (
        <Animated.View entering={FadeIn.duration(300)}>
          <WorkoutCard
            title={item.title}
            category={item.category}
            duration={item.duration}
            level={item.level}
            imageSrc={item.imageSrc}
            favorited={favorites.includes(item.id)}
            onFavorite={() => toggleFavorite(item.id)}
            onPress={() => router.push(`/workout/${item.id}`)}
          />
        </Animated.View>
      )}
    />
  )
}
