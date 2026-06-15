import { useMemo }              from 'react'
import { LinearGradient }       from 'expo-linear-gradient'
import styled                   from '@emotion/native'
import { useTranslation }       from 'react-i18next'
import * as LucideIcons         from 'lucide-react-native'
import dayjs                    from 'dayjs'
import { colors, spacing, corners, typeScale, letterSpacing, tints } from '@kore/tokens'
import { Fonts }                from '@/constants/fonts'

const MotivationalBanner = () => {
  const { t } = useTranslation()

  const quotes = t('home.motivationalQuotes', { returnObjects: true }) as string[]
  const quote  = useMemo(() => quotes[dayjs().day() % quotes.length], [quotes])

  return (
    <Gradient
      colors={[colors.accentDark, colors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      accessibilityRole="text"
      accessibilityLabel={quote}
    >
      <LucideIcons.Sparkles size={20} color={tints.white['60']} style={{ marginBottom: spacing.s }} />
      <Label>{t('home.motivationalLabel')}</Label>
      <Quote>{quote}</Quote>
    </Gradient>
  )
}

// ── Styled ───────────────────────────────────────────────────────────────
const Gradient = styled(LinearGradient)`
  padding:       ${`${spacing.l}px`};
  border-radius: ${`${corners.m}px`};
`

const Label = styled.Text`
  font-family:    ${Fonts.uiSemiBold};
  font-size:      ${`${typeScale.mobile.xs}px`};
  letter-spacing: ${`${typeScale.mobile.xs * letterSpacing.spacious}px`};
  text-transform: uppercase;
  color:          ${tints.white['60']};
  margin-bottom:  ${`${spacing['2xs']}px`};
`

const Quote = styled.Text`
  font-family: ${Fonts.displayRegular};
  font-size:   ${`${typeScale.mobile.xl}px`};
  line-height: ${`${typeScale.mobile.xl * 1.3}px`};
  color:       ${colors.light};
`

export default MotivationalBanner
