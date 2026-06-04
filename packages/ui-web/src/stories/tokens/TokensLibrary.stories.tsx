/**
 * @kore/ui-web — Design Tokens Library
 *
 * Referencia completa de todos los tokens del sistema.
 * Click en cualquier token para copiar el CSS var al portapapeles.
 */

import { useState, useCallback } from 'react'
import type { Meta, StoryObj }   from '@storybook/react'
import styled, { CSSObject }    from '@emotion/styled'
import { spacing, radius, borders, containers, typeScale, layout, breakpoints } from '@kore/tokens'

// ── Copy hook ─────────────────────────────────────────────────────────────

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = useCallback((value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(value)
      setTimeout(() => setCopied(null), 1500)
    })
  }, [])

  return { copy, copied }
}

// ── Token chip genérico ───────────────────────────────────────────────────

const TokenRow = styled.div`
  display:         flex;
  align-items:     center;
  gap:             12px;
  padding:         8px 12px;
  border-radius:   8px;
  cursor:          pointer;
  transition:      background 150ms;
  user-select:     none;
  &:hover { background: rgba(0,0,0,0.05); }
`

const CopyFeedback = styled.span<{ $visible: boolean }>`
  font-size:    10px;
  color:        #4CAF7D;
  font-family:  monospace;
  opacity:      ${({ $visible }) => $visible ? 1 : 0};
  transition:   opacity 200ms;
  margin-left:  auto;
  flex-shrink:  0;
`

const VarName = styled.span`
  font-family: monospace;
  font-size:   12px;
  color:       #6B6560;
  flex:        1;
`

// ── Colores ───────────────────────────────────────────────────────────────

const COLOR_GROUPS = [
  {
    label: 'Backgrounds — surface',
    tokens: [
      '--background-surface-low',
      '--background-surface-solid',
      '--background-surface-glass',
      '--background-surface-bright',
      '--background-surface-dim',
    ],
  },
  {
    label: 'Backgrounds — accent & status',
    tokens: [
      '--background-accent-solid',
      '--background-accent-dim',
      '--background-accent-light',
      '--background-error-solid',
      '--background-error-dim',
      '--background-success-solid',
      '--background-success-dim',
    ],
  },
  {
    label: 'Backgrounds — scrims & bars',
    tokens: [
      '--background-scrim-heavy',
      '--background-scrim-mid',
      '--background-scrim-soft',
      '--background-bars-glass',
      '--background-bars-solid',
    ],
  },
  {
    label: 'Backgrounds — interactive',
    tokens: [
      '--background-action-hover',
      '--background-action-push',
      '--background-action-selected',
      '--background-control-default',
      '--background-input-default',
    ],
  },
  {
    label: 'Foregrounds — on surface',
    tokens: [
      '--foreground-primary-on-surface',
      '--foreground-secondary-on-surface',
      '--foreground-tertiary-on-surface',
      '--foreground-accent-on-surface',
      '--foreground-error-on-surface',
      '--foreground-success-on-surface',
    ],
  },
  {
    label: 'Foregrounds — on inverse & accent',
    tokens: [
      '--foreground-primary-on-inverse',
      '--foreground-secondary-on-inverse',
      '--foreground-primary-on-accent',
    ],
  },
  {
    label: 'Strokes',
    tokens: [
      '--stroke-primary-on-surface',
      '--stroke-secondary-on-surface',
      '--stroke-tertiary-on-surface',
      '--stroke-accent',
      '--stroke-accent-dim',
      '--stroke-focus',
      '--stroke-error',
      '--stroke-success',
    ],
  },
]

const ColorSwatch = styled.div`
  width:         28px;
  height:        28px;
  border-radius: 6px;
  border:        1px solid rgba(0,0,0,0.12);
  flex-shrink:   0;
`

const GroupLabel = styled.p`
  font-family:    sans-serif;
  font-size:      11px;
  font-weight:    600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color:          #C4BDB9;
  margin:         24px 0 4px;
`

function ColorsStory() {
  const { copy, copied } = useCopy()
  return (
    <div style={{ maxWidth: 480, padding: 24 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 18, marginBottom: 4 }}>Color tokens</h2>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#6B6560', marginBottom: 24 }}>
        Click en cualquier token para copiar <code>var(--nombre)</code>
      </p>
      {COLOR_GROUPS.map(group => (
        <div key={group.label}>
          <GroupLabel>{group.label}</GroupLabel>
          {group.tokens.map(token => (
            <TokenRow key={token} onClick={() => copy(`var(${token})`)}>
              <ColorSwatch style={{ background: `var(${token})` }} />
              <VarName>{token}</VarName>
              <CopyFeedback $visible={copied === `var(${token})`}>✓ copiado</CopyFeedback>
            </TokenRow>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Tipografía ────────────────────────────────────────────────────────────

const SCALE_KEYS = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const
type ScaleKey = typeof SCALE_KEYS[number]

const BpHeader = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(4, 1fr);
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 4px;
`

const BpLabel = styled.span`
  font-family: sans-serif;
  font-size:   10px;
  font-weight: 600;
  color:       #C4BDB9;
  text-align:  center;
`

const TypoRow = styled.div`
  display:       grid;
  grid-template-columns: 120px repeat(4, 1fr);
  gap:           8px;
  padding:       6px 12px;
  border-radius: 8px;
  cursor:        pointer;
  transition:    background 150ms;
  &:hover { background: rgba(0,0,0,0.05); }
`

const ScaleCell = styled.span<{ $active?: boolean }>`
  font-family: monospace;
  font-size:   12px;
  text-align:  center;
  color:       ${({ $active }) => $active ? '#B05E3A' : '#6B6560'};
  font-weight: ${({ $active }) => $active ? 600 : 400};
`

function TypographyStory() {
  const { copy, copied } = useCopy()
  const bps = ['mobile', 'tablet', 'desktop', 'wide'] as const

  return (
    <div style={{ maxWidth: 640, padding: 24 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 18, marginBottom: 4 }}>Typography scale</h2>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#6B6560', marginBottom: 24 }}>
        Click en un token para copiar <code>var(--scale-*)</code> — los valores cambian por breakpoint automáticamente
      </p>
      <BpHeader>
        <span />
        {bps.map(bp => <BpLabel key={bp}>{bp}</BpLabel>)}
      </BpHeader>
      {SCALE_KEYS.map(key => (
        <TypoRow key={key} onClick={() => copy(`var(--scale-${key})`)}>
          <ScaleCell style={{ textAlign: 'left' }}>
            --scale-{key}
            {copied === `var(--scale-${key})` && <span style={{ color: '#4CAF7D', marginLeft: 8 }}>✓</span>}
          </ScaleCell>
          {bps.map(bp => (
            <ScaleCell key={bp} $active={bp === 'desktop'}>
              {typeScale[bp][key as ScaleKey]}px
            </ScaleCell>
          ))}
        </TypoRow>
      ))}
    </div>
  )
}

// ── Espaciado ─────────────────────────────────────────────────────────────

const SPACING_KEYS = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const

const SpacingBarWrap = styled.div`
  display:     flex;
  align-items: center;
  gap:         12px;
  flex:        1;
`

const SpacingBarViz = styled.div<{ $size: number }>`
  height:        10px;
  width:         ${({ $size }) => Math.min($size * 1.5, 200)}px;
  border-radius: 999px;
  background:    #B05E3A;
  opacity:       0.6;
  flex-shrink:   0;
`

function SpacingStory() {
  const { copy, copied } = useCopy()
  return (
    <div style={{ maxWidth: 560, padding: 24 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 18, marginBottom: 4 }}>Spacing scale</h2>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#6B6560', marginBottom: 24 }}>
        Escala fija — no cambia por breakpoint. Click para copiar <code>var(--spacing-*)</code>
      </p>
      {SPACING_KEYS.map(key => {
        const val = spacing[key as keyof typeof spacing]
        const token = `var(--spacing-${key})`
        return (
          <TokenRow key={key} onClick={() => copy(token)}>
            <SpacingBarWrap>
              <SpacingBarViz $size={val} />
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#6B6560' }}>{val}px</span>
            </SpacingBarWrap>
            <VarName>--spacing-{key}</VarName>
            <CopyFeedback $visible={copied === token}>✓ copiado</CopyFeedback>
          </TokenRow>
        )
      })}
    </div>
  )
}

// ── Forma ─────────────────────────────────────────────────────────────────

const RADIUS_KEYS = ['none', 'xs', 's', 'm', 'l', 'xl', '2xl', 'full'] as const

const RadiusPreview = styled.div<{ $r: number }>`
  width:         32px;
  height:        32px;
  background:    rgba(176,94,58,0.2);
  border:        1px solid rgba(176,94,58,0.5);
  border-radius: ${({ $r }) => Math.min($r, 16)}px;
  flex-shrink:   0;
`

function ShapeStory() {
  const { copy, copied } = useCopy()
  return (
    <div style={{ maxWidth: 480, padding: 24 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 18, marginBottom: 24 }}>Shape tokens</h2>

      <GroupLabel>Border radius</GroupLabel>
      {RADIUS_KEYS.map(key => {
        const val = radius[key as keyof typeof radius]
        const token = `var(--radius-${key})`
        return (
          <TokenRow key={key} onClick={() => copy(token)}>
            <RadiusPreview $r={val === 9999 ? 16 : val} />
            <VarName>--radius-{key} <span style={{ color: '#C4BDB9' }}>{val === 9999 ? '∞' : `${val}px`}</span></VarName>
            <CopyFeedback $visible={copied === token}>✓ copiado</CopyFeedback>
          </TokenRow>
        )
      })}

      <GroupLabel>Borders</GroupLabel>
      {(['thin', 'thick', 'block'] as const).map(key => {
        const val = borders[key]
        const token = `var(--borders-${key})`
        return (
          <TokenRow key={key} onClick={() => copy(token)}>
            <div style={{ width: 48, height: val, background: '#B05E3A', borderRadius: 999, flexShrink: 0 }} />
            <VarName>--borders-{key} <span style={{ color: '#C4BDB9' }}>{val}px</span></VarName>
            <CopyFeedback $visible={copied === token}>✓ copiado</CopyFeedback>
          </TokenRow>
        )
      })}

      <GroupLabel>Containers</GroupLabel>
      {(['s', 'm', 'l', 'xl', '2xl'] as const).map(key => {
        const val = containers[key as keyof typeof containers]
        const token = `var(--container-${key})`
        return (
          <TokenRow key={key} onClick={() => copy(token)}>
            <div style={{ width: Math.round(val / 10), height: 10, background: 'rgba(176,94,58,0.3)', border: '1px solid rgba(176,94,58,0.5)', borderRadius: 4, flexShrink: 0 }} />
            <VarName>--container-{key} <span style={{ color: '#C4BDB9' }}>{val}px</span></VarName>
            <CopyFeedback $visible={copied === token}>✓ copiado</CopyFeedback>
          </TokenRow>
        )
      })}
    </div>
  )
}

// ── Layout tokens ─────────────────────────────────────────────────────────

const LAYOUT_TOKENS = ['gutter', 'section-gap', 'section-pad'] as const

function LayoutStory() {
  const { copy, copied } = useCopy()
  const bps = ['mobile', 'tablet', 'desktop', 'wide'] as const
  const bpLabels = [`< ${breakpoints.tablet}px`, `${breakpoints.tablet}–${breakpoints.desktop - 1}`, `${breakpoints.desktop}–${breakpoints.wide - 1}`, `≥ ${breakpoints.wide}px`]

  const layoutData = {
    'gutter':      { mobile: layout.mobile.gutter,     tablet: layout.tablet.gutter,     desktop: layout.desktop.gutter,     wide: layout.wide.gutter     },
    'section-gap': { mobile: layout.mobile.sectionGap, tablet: layout.tablet.sectionGap, desktop: layout.desktop.sectionGap, wide: layout.wide.sectionGap },
    'section-pad': { mobile: layout.mobile.sectionPad, tablet: layout.tablet.sectionPad, desktop: layout.desktop.sectionPad, wide: layout.wide.sectionPad },
  }

  return (
    <div style={{ maxWidth: 640, padding: 24 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 18, marginBottom: 4 }}>Layout tokens</h2>
      <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#6B6560', marginBottom: 24 }}>
        Tokens responsive para contenedores y secciones — nunca para componentes internos.
      </p>
      <BpHeader>
        <span />
        {bpLabels.map((l, i) => <BpLabel key={i}>{l}</BpLabel>)}
      </BpHeader>
      {LAYOUT_TOKENS.map(key => {
        const token = `var(--layout-${key})`
        return (
          <TypoRow key={key} onClick={() => copy(token)}>
            <ScaleCell style={{ textAlign: 'left' }}>
              --layout-{key}
              {copied === token && <span style={{ color: '#4CAF7D', marginLeft: 8 }}>✓</span>}
            </ScaleCell>
            {bps.map(bp => (
              <ScaleCell key={bp} $active={bp === 'desktop'}>
                {layoutData[key][bp]}px
              </ScaleCell>
            ))}
          </TypoRow>
        )
      })}
    </div>
  )
}

// ── Meta y exports ────────────────────────────────────────────────────────

const meta: Meta = {
  title:      'KORE/Tokens',
  parameters: { layout: 'padded' },
}
export default meta

export const Colors:     StoryObj = { name: 'Colors',     render: () => <ColorsStory />     }
export const Typography: StoryObj = { name: 'Typography',  render: () => <TypographyStory /> }
export const Spacing:    StoryObj = { name: 'Spacing',     render: () => <SpacingStory />    }
export const Shape:      StoryObj = { name: 'Shape',       render: () => <ShapeStory />      }
export const Layout:     StoryObj = { name: 'Layout',      render: () => <LayoutStory />     }
