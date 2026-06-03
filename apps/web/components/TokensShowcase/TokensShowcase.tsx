'use client'

import { useState }              from 'react'
import styled                    from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Text, Icon }            from '@kore/ui-web'
import { typeScale, spacing }    from '@kore/tokens'

// ── Variantes ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Data ──────────────────────────────────────────────────────────────────
const SCALE_KEYS = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const
type ScaleKey = typeof SCALE_KEYS[number]

const BREAKPOINTS = [
  { key: 'mobile',  label: 'Mobile',    sub: '< 600px'   },
  { key: 'tablet',  label: 'Tablet',    sub: '600–1199px' },
  { key: 'desktop', label: 'Desktop',   sub: '1200–1799px' },
  { key: 'wide',    label: 'Ultrawide', sub: '≥ 1800px'  },
] as const

const COLOR_GROUPS = [
  {
    label: 'Backgrounds',
    tokens: [
      '--background-surface-low',
      '--background-surface-solid',
      '--background-accent-solid',
      '--background-accent-dim',
      '--background-error-dim',
      '--background-success-dim',
    ],
  },
  {
    label: 'Foregrounds',
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
    label: 'Strokes',
    tokens: [
      '--stroke-secondary-on-surface',
      '--stroke-accent',
      '--stroke-accent-dim',
      '--stroke-error',
      '--stroke-success',
    ],
  },
]

const SPACING_KEYS = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] as const

// ── Componente ────────────────────────────────────────────────────────────
const TokensShowcase = () => {
  const [isDark, setIsDark] = useState(false)

  return (
  <Section>
    <Container>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >

        {/* Heading */}
        <motion.div variants={fadeUp}>
          <SectionOverline variant="overline" as="span">Design Tokens</SectionOverline>
          <SectionTitle variant="h1" as="h2">
            Un sistema, <em>dos plataformas</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            <code>@kore/tokens</code> genera <strong>CSS custom properties</strong> para web
            y <strong>objetos JS</strong> para React Native desde la misma fuente de verdad.
            164 tokens semánticos que garantizan consistencia visual en todos los contextos.
          </SectionSubtitle>
        </motion.div>

        {/* ── Escala tipográfica ── */}
        <motion.div variants={fadeUp}>
          <BlockTitle variant="overline" as="h3">Escala tipográfica — responsive</BlockTitle>
          <BlockSubtitle variant="body-sm">
            Los tokens <code>--scale-*</code> cambian automáticamente con el viewport.
          </BlockSubtitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th align="left">Token</Th>
                  {BREAKPOINTS.map(bp => (
                    <Th key={bp.key} align="center">
                      <div>{bp.label}</div>
                      <BpSub>{bp.sub}</BpSub>
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCALE_KEYS.map((key) => (
                  <tr key={key}>
                    <Td>
                      <TokenName>--scale-{key}</TokenName>
                    </Td>
                    {BREAKPOINTS.map(bp => {
                      const val = typeScale[bp.key][key as ScaleKey]
                      return (
                        <TdCenter key={bp.key}>
                          <SizeBar $size={val} $active={bp.key === 'desktop'} />
                          <SizeValue>{val}px</SizeValue>
                        </TdCenter>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </motion.div>

        {/* ── Tokens de color ── */}
        <motion.div variants={fadeUp}>
          <ColorHeader>
            <div>
              <BlockTitle variant="overline" as="h3">
                Tokens semánticos — {isDark ? 'dark' : 'light'} theme
              </BlockTitle>
              <BlockSubtitle variant="body-sm">
                Los mismos nombres en ambos temas. El valor cambia, el contrato no.
              </BlockSubtitle>
            </div>
            <ThemeToggleBtn
              type="button"
              onClick={() => setIsDark(d => !d)}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <Icon name={isDark ? 'Sun' : 'Moon'} size="sm" color="inherit" />
              {isDark ? 'Light' : 'Dark'}
            </ThemeToggleBtn>
          </ColorHeader>

          <TokenCanvas $isDark={isDark}>
            {COLOR_GROUPS.map(group => (
              <TokenGroup key={group.label}>
                <TokenGroupLabel>{group.label}</TokenGroupLabel>
                <TokenChipGrid>
                  {group.tokens.map(token => (
                    <TokenChip key={token}>
                      <ChipSwatch style={{ background: `var(${token})` }} />
                      <ChipName>{token.replace('--', '')}</ChipName>
                    </TokenChip>
                  ))}
                </TokenChipGrid>
              </TokenGroup>
            ))}
          </TokenCanvas>
        </motion.div>

        {/* ── Espaciado ── */}
        <motion.div variants={fadeUp}>
          <BlockTitle variant="overline" as="h3">Escala de espaciado</BlockTitle>
          <BlockSubtitle variant="body-sm">
            13 pasos de <code>2px</code> a <code>80px</code> — web y mobile comparten los mismos valores.
          </BlockSubtitle>
          <SpacingGrid>
            {SPACING_KEYS.map(key => {
              const val = spacing[key]
              return (
                <SpacingItem key={key}>
                  <SpacingBar $size={val} />
                  <SpacingMeta>
                    <TokenName>--spacing-{key}</TokenName>
                    <SizeValue>{val}px</SizeValue>
                  </SpacingMeta>
                </SpacingItem>
              )
            })}
          </SpacingGrid>
        </motion.div>

      </motion.div>
    </Container>
  </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block:    clamp(4rem, 10vw, 8rem);
  border-top:       0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width:      1200px;
  margin:         0 auto;
  padding-inline: var(--spacing-l);
  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size:   clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
  margin:      0 0 var(--spacing-m);
  em {
    font-style:  italic;
    font-weight: var(--font-weight-semibold);
    color:       var(--foreground-accent-on-surface);
  }
`

const SectionSubtitle = styled(Text)`
  color:         var(--foreground-secondary-on-surface);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  max-width:     680px;
  code {
    font-family:   monospace;
    font-size:     0.9em;
    padding:       2px 6px;
    border-radius: var(--radius-xs);
    background:    var(--background-surface-solid);
    color:         var(--foreground-accent-on-surface);
  }
  strong {
    font-weight: var(--font-weight-semibold);
    color:       var(--foreground-primary-on-surface);
  }
`

const BlockTitle = styled(Text)`
  color:         var(--foreground-secondary-on-surface);
  margin-bottom: var(--spacing-xs);
`

const BlockSubtitle = styled(Text)`
  color:         var(--foreground-tertiary-on-surface);
  margin-bottom: var(--spacing-xl);
  code {
    font-family:   monospace;
    font-size:     0.9em;
    color:         var(--foreground-accent-on-surface);
  }
`

// ── Tabla tipográfica ──────────────────────────────────────────────────────
const TableWrapper = styled.div`
  overflow-x:    auto;
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`

const Table = styled.table`
  width:           100%;
  border-collapse: collapse;
  background:      var(--background-surface-solid);
  font-family:     var(--font-family-ui);
`

const Th = styled.th<{ align?: string }>`
  padding:        var(--spacing-m) var(--spacing-l);
  text-align:     ${({ align }) => align ?? 'left'};
  font-size:      var(--scale-xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color:          var(--foreground-tertiary-on-surface);
  border-bottom:  0.5px solid var(--stroke-secondary-on-surface);
  white-space:    nowrap;
`

const Td = styled.td`
  padding:       var(--spacing-s) var(--spacing-l);
  border-bottom: 0.5px solid var(--stroke-tertiary-on-surface);
  vertical-align: middle;
`

const TdCenter = styled(Td)`
  text-align: center;
`

const BpSub = styled.div`
  font-size:      var(--scale-2xs);
  font-weight:    var(--font-weight-regular);
  text-transform: none;
  letter-spacing: normal;
  margin-top:     2px;
  opacity:        0.6;
`

const TokenName = styled.span`
  font-family: monospace;
  font-size:   var(--scale-xs);
  color:       var(--foreground-accent-on-surface);
`

const SizeBar = styled.div<{ $size: number; $active?: boolean }>`
  height:        4px;
  width:         ${({ $size }) => Math.min($size * 1.2, 80)}px;
  border-radius: var(--radius-full);
  background:    ${({ $active }) =>
    $active ? 'var(--background-accent-solid)' : 'var(--stroke-secondary-on-surface)'};
  margin:        0 auto var(--spacing-2xs);
  transition:    width 300ms ease;
`

const SizeValue = styled.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-xs);
  color:       var(--foreground-secondary-on-surface);
`

// ── Tokens de color ────────────────────────────────────────────────────────
const ColorHeader = styled.div`
  display:         flex;
  align-items:     flex-start;
  justify-content: space-between;
  gap:             var(--spacing-l);
  flex-wrap:       wrap;
  margin-bottom:   var(--spacing-l);
`

const ThemeToggleBtn = styled.button`
  display:        flex;
  align-items:    center;
  gap:            var(--spacing-xs);
  padding:        var(--spacing-xs) var(--spacing-m);
  border-radius:  var(--radius-full);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  background:     var(--background-surface-solid);
  color:          var(--foreground-secondary-on-surface);
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-s);
  font-weight:    var(--font-weight-semibold);
  cursor:         pointer;
  transition:     border-color 150ms, color 150ms;
  flex-shrink:    0;
  &:hover {
    border-color: var(--stroke-accent);
    color:        var(--foreground-accent-on-surface);
  }
`

const TokenCanvas = styled.div<{ $isDark: boolean }>`
  background:    ${({ $isDark }) => $isDark ? '#1A1A1A' : 'var(--background-surface-solid)'};
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  padding:       var(--spacing-xl);
  display:       flex;
  flex-direction: column;
  gap:           var(--spacing-xl);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  transition:    background 300ms ease;
`

const TokenGroup = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
`

const TokenGroupLabel = styled.span`
  font-family:    var(--font-family-ui);
  font-size:      var(--scale-xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color:          var(--foreground-tertiary-on-surface);
`

const TokenChipGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap:                   var(--spacing-s);
`

const TokenChip = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-s);
`

const ChipSwatch = styled.div`
  width:         var(--spacing-l);
  height:        var(--spacing-l);
  border-radius: var(--radius-xs);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  flex-shrink:   0;
`

const ChipName = styled.span`
  font-family: monospace;
  font-size:   10px;
  color:       var(--foreground-secondary-on-surface);
  line-height: 1.3;
`

// ── Espaciado ──────────────────────────────────────────────────────────────
const SpacingGrid = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
`

const SpacingItem = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-l);
`

const SpacingBar = styled.div<{ $size: number }>`
  height:        var(--spacing-m);
  width:         ${({ $size }) => $size * 2}px;
  border-radius: var(--radius-xs);
  background:    var(--background-accent-dim);
  border:        0.5px solid var(--stroke-accent-dim);
  flex-shrink:   0;
`

const SpacingMeta = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-m);
`

export default TokensShowcase
