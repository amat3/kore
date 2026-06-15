import { ScrollView, View, Pressable }            from 'react-native'
import Animated, { FadeInDown }                  from 'react-native-reanimated'
import { useRouter }                              from 'expo-router'
import { useSafeAreaInsets }                      from 'react-native-safe-area-context'
import { useTranslation }                         from 'react-i18next'
import dayjs                                      from 'dayjs'
import 'dayjs/locale/es'
import styled                                     from '@emotion/native'
import { spacing, colors, typeScale } from '@kore/tokens'
import { Fonts } from '@/constants/fonts'
import { useAuth }                                from '@/providers/AuthProvider'
import { useThemeColors }                         from '@/hooks/useThemeColors'
import { Text, Button }                           from '@/components/atoms'
import { StreakCard, CategoryCarousel, MotivationalBanner } from '@/components/molecules'
import { useWorkouts }                            from '@/services/useWorkouts'
import { useActivity }                            from '@/services/useActivity'

dayjs.locale('es')

// ── Componente ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { user }   = useAuth()
  const theme      = useThemeColors()
  const { t }      = useTranslation()
  const insets     = useSafeAreaInsets()
  const router     = useRouter()

  const firstName  = user?.displayName?.split(' ')[0]
    ?? user?.email?.split('@')[0]
    ?? 'atleta'

  const today = dayjs().format('dddd, D [de] MMMM')

  const { stats } = useActivity(user?.uid)
  // Mock fallback — se sustituye por datos reales cuando el usuario registre sesiones
  const weeklyMinutes = stats.totalSessions > 0 ? stats.weeklyMinutes : [0, 45, 20, 0, 30, 45, 0]
  const streak        = stats.totalSessions > 0 ? stats.streak        : 7

  const { workouts, categories } = useWorkouts()
  const categoryItems = categories.map(name => ({
    name,
    count: workouts.filter(w => w.category === name).length,
  }))

  const goToCategory = (category: string) => {
    router.push({ pathname: '/(tabs)/workouts', params: { category } })
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:    insets.top + spacing.l,
        paddingBottom: insets.bottom + spacing['3xl'],
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Cabecera ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(0)}>
        <Section>
          <DateText $color={theme.foregroundTertiary}>
            {today.charAt(0).toUpperCase() + today.slice(1)}
          </DateText>
          <Text variant="h1" style={{ marginTop: spacing['2xs'] }}>
            {t('home.greeting', { name: firstName })}
          </Text>
        </Section>
      </Animated.View>

      {/* ── Frase motivacional ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(40)}>
        <Section style={{ marginTop: spacing.xl }}>
          <MotivationalBanner />
        </Section>
      </Animated.View>

      {/* ── Racha ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(80)}>
        <Section style={{ marginTop: spacing.xl }}>
          <StreakCard streak={streak} weeklyMinutes={weeklyMinutes} />
        </Section>
      </Animated.View>

      {/* ── Categorías ── */}
      {categoryItems.length > 0 && (
        <Animated.View entering={FadeInDown.duration(400).delay(160)}>
          <Section style={{ marginTop: spacing.xl }}>
            <SectionHeader>
              <SectionTitle $color={theme.foreground}>{t('home.categoriesTitle')}</SectionTitle>
              <Pressable
                onPress={() => router.push('/(tabs)/workouts')}
                accessibilityRole="button"
                accessibilityLabel="Ver catálogo completo"
                hitSlop={8}
              >
                <LinkText $color={colors.accent}>Ver todo</LinkText>
              </Pressable>
            </SectionHeader>
            <CategoryCarousel categories={categoryItems} onSelectCategory={goToCategory} />
          </Section>
        </Animated.View>
      )}

      {/* ── CTA catálogo ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(240)}>
        <Section style={{ marginTop: spacing.xl }}>
          <Button
            variant="solid"
            size="xl"
            uppercase
            onPress={() => router.push('/(tabs)/workouts')}
            accessibilityLabel="Ir al catálogo de entrenamientos"
          >
            Explorar catálogo completo
          </Button>
        </Section>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Section = styled.View`
  padding-horizontal: ${`${spacing.l}px`};
`

const SectionHeader = styled.View`
  flex-direction:  row;
  align-items:     center;
  justify-content: space-between;
  margin-bottom:   ${`${spacing.m}px`};
`

const SectionTitle = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${`${typeScale.mobile.xl}px`};
  color:       ${({ $color }) => $color};
  line-height: ${`${typeScale.mobile.xl * 1.2}px`};
`

const DateText = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${`${typeScale.mobile.s}px`};
  color:       ${({ $color }) => $color};
`

const LinkText = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiSemiBold};
  font-size:   ${`${typeScale.mobile.s}px`};
  color:       ${({ $color }) => $color};
`
