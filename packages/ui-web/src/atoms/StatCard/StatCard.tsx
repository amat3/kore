'use client'

import styled from '@emotion/styled'
import { css } from '@emotion/react'

// ── Tipos ─────────────────────────────────────────────────────────────────

export type StatTrend = 'up' | 'down' | 'neutral'

export interface StatCardProps {
  /** Valor principal — número o texto */
  value:        string | number
  /** Etiqueta descriptiva */
  label:        string
  /** Icono decorativo (usa <Icon name="..." />) */
  icon?:        React.ReactNode
  /** Dirección del cambio respecto al periodo anterior */
  trend?:       StatTrend
  /** Texto del cambio — p. ej. "+12%" o "3 más" */
  trendValue?:  string
  className?:   string
}

// ── Componente ────────────────────────────────────────────────────────────

const StatCard = ({
  value,
  label,
  icon,
  trend      = 'neutral',
  trendValue,
  className,
}: StatCardProps) => (
  <Wrapper className={className}>
    <TopRow>
      <Label>{label}</Label>
      {icon && <IconSlot aria-hidden="true">{icon}</IconSlot>}
    </TopRow>

    <Value>{value}</Value>

    {trendValue && (
      <TrendRow>
        <TrendIndicator $trend={trend} aria-label={`Tendencia: ${trendValue}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '–'}
        </TrendIndicator>
        <TrendText $trend={trend}>{trendValue}</TrendText>
      </TrendRow>
    )}
  </Wrapper>
)

// ── Styled ────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xl);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  transition:     border-color 150ms, box-shadow 150ms;

  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent-dim);
      box-shadow:   0 4px 16px color-mix(in srgb, var(--background-accent-solid) 8%, transparent);
    }
  }
`

const TopRow = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: space-between;
`

const Label = styled.span`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color:          var(--foreground-tertiary-on-surface);
`

const IconSlot = styled.span`
  color:      var(--foreground-accent-on-surface);
  flex-shrink: 0;
`

const Value = styled.p`
  font-family:    var(--font-family-display);
  font-size:      var(--scale-4xl);
  font-weight:    var(--font-weight-light);
  letter-spacing: var(--letter-spacing-dense);
  color:          var(--foreground-primary-on-surface);
  line-height:    1;
  margin:         0;
`

const trendColor = ($trend: StatTrend) => css`
  color: ${
    $trend === 'up'   ? 'var(--foreground-success-on-surface)' :
    $trend === 'down' ? 'var(--foreground-error-on-surface)'   :
                        'var(--foreground-tertiary-on-surface)'
  };
`

const TrendRow = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-2xs);
  margin-top:  var(--spacing-2xs);
`

const TrendIndicator = styled.span<{ $trend: StatTrend }>`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-semibold);
  ${({ $trend }) => trendColor($trend)}
`

const TrendText = styled.span<{ $trend: StatTrend }>`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  font-weight: var(--font-weight-regular);
  ${({ $trend }) => trendColor($trend)}
`

export default StatCard
