import { ScrollView, View, FlatList }  from 'react-native'
import Animated, { FadeInDown }        from 'react-native-reanimated'
import { useSafeAreaInsets }            from 'react-native-safe-area-context'
import { useTranslation }               from 'react-i18next'
import dayjs                            from 'dayjs'
import 'dayjs/locale/es'
import styled                           from '@emotion/native'
import { colors, spacing, corners, typeScale, letterSpacing } from '@kore/tokens'
import { Fonts }                        from '@/constants/fonts'
import { useThemeColors }               from '@/hooks/useThemeColors'
import { useAuth }                      from '@/providers/AuthProvider'
import { Text }                         from '@/components/atoms'
import { WeeklyChart }                  from '@/components/molecules'
import { useActivity }                  from '@/services/useActivity'
import type { Session }                 from '@/services/useActivity'

dayjs.locale('es')

// ── Tarjeta de stat ────────────────────────────────────────────────────────
const StatCard = ({ value, label, accent, fg, secondary, border }: {
  value: string; label: string
  accent: string; fg: string; secondary: string; border: string
}) => (
  <StatBox $border={border}>
    <StatValue $color={accent}>{value}</StatValue>
    <StatLabel $color={secondary}>{label}</StatLabel>
  </StatBox>
)

// ── Item de sesión ─────────────────────────────────────────────────────────
const SessionItem = ({ item, border, fg, secondary }: {
  item: Session; border: string; fg: string; secondary: string
}) => (
  <SessionRow $border={border}>
    <View style={{ flex: 1, gap: 2 }}>
      <SessionTitle $color={fg} numberOfLines={1}>{item.workoutTitle}</SessionTitle>
      <SessionMeta $color={secondary}>
        {item.category} · {item.duration} min · {dayjs(item.date).format('D MMM')}
      </SessionMeta>
    </View>
  </SessionRow>
)

// ── Componente principal ───────────────────────────────────────────────────
export default function ActivityScreen() {
  const { user }  = useAuth()
  const theme     = useThemeColors()
  const insets    = useSafeAreaInsets()
  const { t }     = useTranslation()

  const { stats, grouped, loading } = useActivity(user?.uid)

  // Mock data — se sustituye por datos reales cuando el usuario registre sesiones
  const weeklyData  = stats.totalSessions > 0 ? stats.weeklyMinutes : [0, 45, 20, 0, 30, 45, 0]
  const streak      = stats.totalSessions > 0 ? stats.streak        : 7
  const totalSes    = stats.totalSessions > 0 ? stats.totalSessions : 12
  const totalMin    = stats.totalMinutes  > 0 ? stats.totalMinutes  : 340

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{
        paddingTop:    insets.top + spacing.l,
        paddingBottom: insets.bottom + spacing['3xl'],
        gap:           spacing.xl,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabecera */}
      <Animated.View entering={FadeInDown.duration(350).delay(0)}>
        <Pad>
          <Text variant="h1">{t('activity.title')}</Text>
        </Pad>
      </Animated.View>

      {/* Stats */}
      <Animated.View entering={FadeInDown.duration(350).delay(60)}>
        <Pad>
          <StatsRow>
            <StatCard
              value={String(totalSes)}    label="sesiones"
              accent={colors.accent}      fg={theme.foreground}
              secondary={theme.foregroundSecondary} border={theme.border}
            />
            <StatCard
              value={String(totalMin)}    label="minutos"
              accent={colors.accent}      fg={theme.foreground}
              secondary={theme.foregroundSecondary} border={theme.border}
            />
            <StatCard
              value={String(streak)}      label="racha"
              accent={colors.accent}      fg={theme.foreground}
              secondary={theme.foregroundSecondary} border={theme.border}
            />
          </StatsRow>
        </Pad>
      </Animated.View>

      {/* Gráfica semanal */}
      <Animated.View entering={FadeInDown.duration(350).delay(120)}>
        <Pad>
          <SectionTitle $color={theme.foreground}>Esta semana</SectionTitle>
          <ChartCard $border={theme.border} $bg={theme.backgroundCard}>
            <WeeklyChart
              data={weeklyData}
              accent={colors.accent}
              fg={theme.foregroundSecondary}
              border={theme.border}
            />
          </ChartCard>
        </Pad>
      </Animated.View>

      {/* Historial */}
      <Animated.View entering={FadeInDown.duration(350).delay(180)}>
        <Pad>
          <SectionTitle $color={theme.foreground}>Historial</SectionTitle>
          {grouped.length === 0 && !loading ? (
            <Text variant="body" color={theme.foregroundSecondary}>
              Aún no hay sesiones registradas.
            </Text>
          ) : (
            grouped.map(group => (
              <View key={group.month} style={{ marginBottom: spacing.m }}>
                <Text variant="overline" color={theme.foregroundTertiary} style={{ marginBottom: spacing.s }}>
                  {group.month.charAt(0).toUpperCase() + group.month.slice(1)}
                </Text>
                <FlatList
                  data={group.items}
                  keyExtractor={s => s.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <SessionItem
                      item={item}
                      border={theme.border}
                      fg={theme.foreground}
                      secondary={theme.foregroundSecondary}
                    />
                  )}
                />
              </View>
            ))
          )}
        </Pad>
      </Animated.View>
    </ScrollView>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Pad = styled.View`
  padding-horizontal: ${`${spacing.l}px`};
`

const StatsRow = styled.View`
  flex-direction: row;
  gap:            ${`${spacing.m}px`};
  align-items:    center;
`

const StatBox = styled.View<{ $border: string }>`
  flex:               1;
  padding:            ${`${spacing.m}px`};
  border-radius:      ${`${corners.m}px`};
  border-width:       0.5px;
  border-color:       ${({ $border }) => $border};
  gap:                ${`${spacing['2xs']}px`};
`

const StatValue = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${`${typeScale.mobile['2xl']}px`};
  line-height: ${`${typeScale.mobile['2xl'] * 1.1}px`};
  color:       ${({ $color }) => $color};
`

const StatLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiRegular};
  font-size:      ${`${typeScale.mobile.xs}px`};
  letter-spacing: ${`${typeScale.mobile.xs * letterSpacing.spacious}px`};
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
`

const SectionTitle = styled.Text<{ $color: string }>`
  font-family:   ${Fonts.displaySemiBold};
  font-size:     ${`${typeScale.mobile.xl}px`};
  color:         ${({ $color }) => $color};
  margin-bottom: ${`${spacing.m}px`};
`

const ChartCard = styled.View<{ $border: string; $bg: string }>`
  border-radius:  ${`${corners.m}px`};
  border-width:   0.5px;
  border-color:   ${({ $border }) => $border};
  background-color: ${({ $bg }) => $bg};
  padding:        ${`${spacing.l}px`};
  align-items:    center;
`


const SessionRow = styled.View<{ $border: string }>`
  flex-direction: row;
  align-items:    center;
  padding-vertical: ${`${spacing.m}px`};
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ $border }) => $border};
`

const SessionTitle = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiRegular};
  font-size:   ${`${typeScale.mobile.m}px`};
  color:       ${({ $color }) => $color};
`

const SessionMeta = styled.Text<{ $color: string }>`
  font-family: ${Fonts.uiLight};
  font-size:   ${`${typeScale.mobile.xs}px`};
  color:       ${({ $color }) => $color};
`
