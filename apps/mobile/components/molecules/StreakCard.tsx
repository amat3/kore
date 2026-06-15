import { View }            from 'react-native'
import styled              from '@emotion/native'
import { useTranslation }  from 'react-i18next'
import { colors, spacing, corners, typeScale, letterSpacing } from '@kore/tokens'
import { Fonts }           from '@/constants/fonts'
import { useThemeColors }  from '@/hooks/useThemeColors'
import StreakBadge         from './StreakBadge'
import WeeklyChart          from './WeeklyChart'

export interface StreakCardProps {
  streak:        number
  weeklyMinutes: number[]   // 7 valores, lun…dom
}

const StreakCard = ({ streak, weeklyMinutes }: StreakCardProps) => {
  const theme = useThemeColors()
  const { t } = useTranslation()

  const totalThisWeek = weeklyMinutes.reduce((acc, m) => acc + m, 0)

  return (
    <Card $bg={theme.backgroundCard} $border={theme.border}>
      <Header>
        <StreakBadge
          count={streak}
          variant={streak > 0 ? 'active' : 'inactive'}
          label={t('home.streakLabel')}
          size="lg"
        />
        <WeekSummary>
          <SummaryLabel $color={theme.foregroundTertiary}>{t('home.thisWeek')}</SummaryLabel>
          <SummaryValue $color={theme.foreground}>
            {totalThisWeek} {t('profile.minutes')}
          </SummaryValue>
        </WeekSummary>
      </Header>

      <WeeklyChart
        data={weeklyMinutes}
        accent={colors.accent}
        fg={theme.foregroundSecondary}
        border={theme.border}
      />
    </Card>
  )
}

// ── Styled ───────────────────────────────────────────────────────────────
const Card = styled.View<{ $bg: string; $border: string }>`
  padding:          ${`${spacing.l}px`};
  border-radius:    ${`${corners.m}px`};
  background-color: ${({ $bg }) => $bg};
  border-width:     0.5px;
  border-color:     ${({ $border }) => $border};
  gap:              ${`${spacing.l}px`};
`

const Header = styled.View`
  flex-direction:  row;
  align-items:     center;
  justify-content: space-between;
`

const WeekSummary = styled(View)`
  align-items: flex-end;
  gap:         ${`${spacing['2xs']}px`};
`

const SummaryLabel = styled.Text<{ $color: string }>`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${`${typeScale.mobile.xs}px`};
  letter-spacing: ${`${typeScale.mobile.xs * letterSpacing.spacious}px`};
  text-transform: uppercase;
  color:          ${({ $color }) => $color};
`

const SummaryValue = styled.Text<{ $color: string }>`
  font-family: ${Fonts.displaySemiBold};
  font-size:   ${`${typeScale.mobile['2xl']}px`};
  color:       ${({ $color }) => $color};
`

export default StreakCard
