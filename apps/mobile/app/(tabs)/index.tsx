import { ScrollView, View, FlatList, Pressable } from 'react-native'
import Animated, { FadeInDown }                  from 'react-native-reanimated'
import { useRouter }                              from 'expo-router'
import { useSafeAreaInsets }                      from 'react-native-safe-area-context'
import { useTranslation }                         from 'react-i18next'
import dayjs                                      from 'dayjs'
import 'dayjs/locale/es'
import styled                                     from '@emotion/native'
import { spacing, colors, corners, typeScale, fontFamily, fontWeight } from '@kore/tokens'
import { useAuth }                                from '@/providers/AuthProvider'
import { useThemeColors }                         from '@/hooks/useThemeColors'
import { Text }                                   from '@/components/atoms'
import { StreakBadge, WorkoutCard }               from '@/components/molecules'
import type { WorkoutLevel }                      from '@/components/molecules'

dayjs.locale('es')

// ── Mock data — se reemplazará por Firestore en JUA-72 ────────────────────
const MOCK_STREAK = 7

const MOCK_WORKOUTS: Array<{
  id:       string
  title:    string
  category: string
  duration: number
  level:    WorkoutLevel
  imageSrc: string
}> = [
  {
    id:       '1',
    title:    'Fuerza total cuerpo completo',
    category: 'Fuerza',
    duration: 45,
    level:    'intermediate',
    imageSrc: '',
  },
  {
    id:       '2',
    title:    'HIIT explosivo',
    category: 'Cardio',
    duration: 30,
    level:    'advanced',
    imageSrc: '',
  },
  {
    id:       '3',
    title:    'Yoga matutino',
    category: 'Flexibilidad',
    duration: 20,
    level:    'beginner',
    imageSrc: '',
  },
]

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

      {/* ── Racha ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(80)}>
        <Section style={{ marginTop: spacing.xl }}>
          <SectionHeader>
            <SectionTitle $color={theme.foreground}>Racha actual</SectionTitle>
          </SectionHeader>
          <StreakRow>
            <StreakBadge
              count={MOCK_STREAK}
              variant={MOCK_STREAK > 0 ? 'active' : 'inactive'}
              label={t('home.streak', { days: '' }).replace(/\d+\s/, '').trim()}
              size="lg"
            />
          </StreakRow>
        </Section>
      </Animated.View>

      {/* ── Entrenamientos recientes ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(160)}>
        <View style={{ marginTop: spacing.xl }}>
          <Section>
            <SectionHeader>
              <SectionTitle $color={theme.foreground}>Entrenamientos</SectionTitle>
              <Pressable
                onPress={() => router.push('/(tabs)/workouts')}
                accessibilityRole="button"
                accessibilityLabel="Ver catálogo completo"
                hitSlop={8}
              >
                <LinkText $color={colors.accent}>Ver todo</LinkText>
              </Pressable>
            </SectionHeader>
          </Section>

          <FlatList
            data={MOCK_WORKOUTS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingHorizontal: spacing.l,
              gap:               spacing.m,
            }}
            renderItem={({ item }) => (
              <CardWrapper>
                <WorkoutCard
                  title={item.title}
                  category={item.category}
                  duration={item.duration}
                  level={item.level}
                  imageSrc={item.imageSrc || undefined}
                  onPress={() => router.push(`/workout/${item.id}`)}
                />
              </CardWrapper>
            )}
          />
        </View>
      </Animated.View>

      {/* ── CTA catálogo ── */}
      <Animated.View entering={FadeInDown.duration(400).delay(240)}>
        <Section style={{ marginTop: spacing.xl }}>
          <CTAButton
            onPress={() => router.push('/(tabs)/workouts')}
            $accent={colors.accent}
            accessibilityRole="button"
            accessibilityLabel="Ir al catálogo de entrenamientos"
          >
            <CTAText>Explorar catálogo completo</CTAText>
          </CTAButton>
        </Section>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Section = styled.View`
  padding-horizontal: ${spacing.l}px;
`

const SectionHeader = styled.View`
  flex-direction:  row;
  align-items:     center;
  justify-content: space-between;
  margin-bottom:   ${spacing.m}px;
`

const SectionTitle = styled.Text<{ $color: string }>`
  font-family: ${fontFamily.display};
  font-size:   ${typeScale.mobile.xl}px;
  font-weight: ${fontWeight.semibold};
  color:       ${({ $color }) => $color};
  line-height: ${typeScale.mobile.xl * 1.2}px;
`

const DateText = styled.Text<{ $color: string }>`
  font-family: ${fontFamily.ui};
  font-size:   ${typeScale.mobile.s}px;
  color:       ${({ $color }) => $color};
`

const StreakRow = styled.View`
  flex-direction: row;
  align-items:    center;
`

const CardWrapper = styled.View`
  width: 220px;
`

const LinkText = styled.Text<{ $color: string }>`
  font-family: ${fontFamily.ui};
  font-size:   ${typeScale.mobile.s}px;
  font-weight: ${fontWeight.semibold};
  color:       ${({ $color }) => $color};
`

const CTAButton = styled.Pressable<{ $accent: string }>`
  align-items:      center;
  justify-content:  center;
  padding-vertical: ${spacing.m}px;
  border-radius:    ${corners.xl}px;
  background-color: ${({ $accent }) => $accent};
  min-height:       48px;
`

const CTAText = styled.Text`
  font-family: ${fontFamily.ui};
  font-size:   ${typeScale.mobile.m}px;
  font-weight: ${fontWeight.semibold};
  color:       #F7F4F1;
  letter-spacing: 0.3px;
`
