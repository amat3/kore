'use client'

import { useState, useEffect }   from 'react'
import styled                    from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Text, Icon }            from '@kore/ui-web'
import { typeScale, spacing, radius, borders, containers, layout, breakpoints } from '@kore/tokens'

// ── Variantes ─────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ── Hook: breakpoint activo ───────────────────────────────────────────────
type BpKey = 'mobile' | 'tablet' | 'desktop' | 'wide'

const useActiveBreakpoint = (): BpKey => {
  const getBreakpoint = (): BpKey => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.matchMedia(`(min-width: ${breakpoints.wide}px)`).matches)    return 'wide'
    if (window.matchMedia(`(min-width: ${breakpoints.desktop}px)`).matches) return 'desktop'
    if (window.matchMedia(`(min-width: ${breakpoints.tablet}px)`).matches)  return 'tablet'
    return 'mobile'
  }

  const [active, setActive] = useState<BpKey>(getBreakpoint)

  useEffect(() => {
    const queries = [
      { mq: window.matchMedia(`(min-width: ${breakpoints.wide}px)`),    bp: 'wide'    as BpKey },
      { mq: window.matchMedia(`(min-width: ${breakpoints.desktop}px)`), bp: 'desktop' as BpKey },
      { mq: window.matchMedia(`(min-width: ${breakpoints.tablet}px)`),  bp: 'tablet'  as BpKey },
    ]
    const handler = () => setActive(getBreakpoint())
    queries.forEach(({ mq }) => mq.addEventListener('change', handler))
    return ()  => queries.forEach(({ mq }) => mq.removeEventListener('change', handler))
  }, [])

  return active
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

const SPACING_KEYS   = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] as const
const RADIUS_KEYS    = ['none', 'xs', 's', 'm', 'l', 'xl', '2xl', 'full'] as const
const CONTAINER_KEYS = ['s', 'm', 'l', 'xl', '2xl'] as const
const BORDER_KEYS    = ['thin', 'thick', 'block'] as const

const LAYOUT_TOKENS = [
  { key: 'gutter',     label: '--layout-gutter',      desc: 'Padding horizontal de contenedores' },
  { key: 'sectionGap', label: '--layout-section-gap',  desc: 'Espacio vertical entre secciones' },
  { key: 'sectionPad', label: '--layout-section-pad',  desc: 'Padding-block de cada sección' },
] as const

const LAYOUT_BPS: { key: BpKey; label: string; sub: string }[] = [
  { key: 'mobile',  label: 'Mobile',    sub: `< ${breakpoints.tablet}px`                          },
  { key: 'tablet',  label: 'Tablet',    sub: `${breakpoints.tablet}–${breakpoints.desktop - 1}px` },
  { key: 'desktop', label: 'Desktop',   sub: `${breakpoints.desktop}–${breakpoints.wide - 1}px`   },
  { key: 'wide',    label: 'Ultrawide', sub: `≥ ${breakpoints.wide}px`                            },
]

// ── Componente ────────────────────────────────────────────────────────────
const TokensShowcase = () => {
  const [isDark, setIsDark]   = useState(false)
  const activeBreakpoint      = useActiveBreakpoint()
  const isMobile              = activeBreakpoint === 'mobile'
  const visibleBreakpoints    = isMobile ? BREAKPOINTS.filter(bp => bp.key === 'mobile')    : BREAKPOINTS
  const visibleLayoutBps      = isMobile ? LAYOUT_BPS.filter(bp => bp.key === 'mobile')     : LAYOUT_BPS

  return (
  <Section>
    <Container>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 4rem)' }}
      >

        {/* Heading */}
        <motion.div variants={fadeUp}>
          <SectionOverline variant="overline" as="span">Design Tokens</SectionOverline>
          <SectionTitle variant="h1" as="h2">
            167 <em>decisiones de diseño</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            <code>@kore/tokens</code> genera <strong>CSS custom properties</strong> para web
            y <strong>objetos JS</strong> para React Native desde la misma fuente de verdad.
            167 tokens semánticos que garantizan consistencia visual en todos los contextos.
          </SectionSubtitle>
        </motion.div>

        {/* ── Escala tipográfica ── */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-l)' }}>
          <div>
            <BlockTitle variant="overline" as="h3">Escala tipográfica — responsive</BlockTitle>
            <BlockSubtitle variant="body-sm">
              Los tokens <code>--scale-*</code> cambian automáticamente con el viewport.
            </BlockSubtitle>
          </div>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th align="left">Token</Th>
                  {visibleBreakpoints.map(bp => (
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
                    {visibleBreakpoints.map(bp => {
                      const val = typeScale[bp.key][key as ScaleKey]
                      return (
                        <TdCenter key={bp.key}>
                          <SizeBar $size={val} $active={bp.key === activeBreakpoint} />
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
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-l)' }}>
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
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-l)' }}>
          <div>
            <BlockTitle variant="overline" as="h3">Escala de espaciado</BlockTitle>
            <BlockSubtitle variant="body-sm">
              13 pasos de <code>2px</code> a <code>80px</code> — web y mobile comparten los mismos valores.
            </BlockSubtitle>
          </div>
          <TokenBlock>
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
          </TokenBlock>
        </motion.div>

        {/* ── Forma y estructura ── */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-l)' }}>
          <div>
            <BlockTitle variant="overline" as="h3">Forma y estructura</BlockTitle>
            <BlockSubtitle variant="body-sm">
              Radius, bordes y anchos máximos — los mismos valores en web y mobile.
            </BlockSubtitle>
          </div>
          <TokenBlock>
            {/* Radius */}
            <ShapeSubtitle variant="caption" as="span">Border radius</ShapeSubtitle>
            <RadiusGrid>
              {RADIUS_KEYS.map(key => {
                const val = radius[key]
                const displayVal = val === 9999 ? '∞' : `${val}px`
                const visualRadius = Math.min(val, 20)
                return (
                  <RadiusItem key={key}>
                    <RadiusBox $radius={visualRadius} />
                    <TokenName>--radius-{key}</TokenName>
                    <SizeValue>{displayVal}</SizeValue>
                  </RadiusItem>
                )
              })}
            </RadiusGrid>

            {/* Borders */}
            <ShapeSubtitleSpaced variant="caption" as="span">Borders</ShapeSubtitleSpaced>
            <BordersRow>
              {BORDER_KEYS.map(key => (
                <BorderItem key={key}>
                  <BorderLine $width={borders[key]} />
                  <TokenName>--borders-{key}</TokenName>
                  <SizeValue>{borders[key]}px</SizeValue>
                </BorderItem>
              ))}
            </BordersRow>

            {/* Containers */}
            <ShapeSubtitleSpaced variant="caption" as="span">Containers (max-width)</ShapeSubtitleSpaced>
            <ContainersGrid>
              {CONTAINER_KEYS.map(key => {
                const val = containers[key as keyof typeof containers]
                return (
                  <ContainerItem key={key}>
                    <ContainerBar $width={val} />
                    <SpacingMeta>
                      <TokenName>--container-{key}</TokenName>
                      <SizeValue>{val}px</SizeValue>
                    </SpacingMeta>
                  </ContainerItem>
                )
              })}
            </ContainersGrid>
          </TokenBlock>
        </motion.div>

        {/* ── Layout tokens ── */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-l)' }}>
          <div>
            <BlockTitle variant="overline" as="h3">Layout tokens — responsive</BlockTitle>
            <BlockSubtitle variant="body-sm">
              Separados del spacing base. Exclusivos para contenedores y secciones
              — nunca para componentes internos. El spacing base siempre es fijo.
            </BlockSubtitle>
          </div>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th align="left">Token</Th>
                  <UsoTh align="left">Uso</UsoTh>
                  {visibleLayoutBps.map(bp => (
                    <Th key={bp.key} align="center">
                      <div>{bp.label}</div>
                      <BpSub>{bp.sub}</BpSub>
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LAYOUT_TOKENS.map(token => (
                  <tr key={token.key}>
                    <Td><TokenName>{token.label}</TokenName></Td>
                    <UsoTd><span style={{ fontFamily: 'var(--font-family-ui)', fontSize: 'var(--scale-xs)', color: 'var(--foreground-tertiary-on-surface)' }}>{token.desc}</span></UsoTd>
                    {visibleLayoutBps.map(bp => (
                      <TdCenter key={bp.key}>
                        <SizeBar
                          $size={layout[bp.key][token.key] / 2}
                          $active={bp.key === activeBreakpoint}
                        />
                        <SizeValue>{layout[bp.key][token.key]}px</SizeValue>
                      </TdCenter>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </motion.div>

      </motion.div>
    </Container>
  </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block:    var(--layout-section-pad);
`

const Container = styled.div`
  max-width:      var(--container-xl);
  margin:         0 auto;
  padding-inline: var(--layout-gutter);
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
  color:     var(--foreground-secondary-on-surface);
  max-width: 680px;
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
  color: var(--foreground-tertiary-on-surface);
  code {
    font-family: monospace;
    font-size:   0.9em;
    color:       var(--foreground-accent-on-surface);
  }
`

// ── Tabla tipográfica ──────────────────────────────────────────────────────
const TableWrapper = styled.div`
  background:    var(--background-surface-solid);
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  overflow:      hidden;
`

const Table = styled.table`
  width:           100%;
  border-collapse: collapse;
  font-family:     var(--font-family-ui);
  table-layout:    fixed;
`

const Th = styled.th<{ align?: string }>`
  padding:        var(--spacing-s) var(--spacing-m);
  text-align:     ${({ align }) => align ?? 'left'};
  font-size:      var(--scale-2xs);
  font-weight:    var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color:          var(--foreground-tertiary-on-surface);
  border-bottom:  0.5px solid var(--stroke-secondary-on-surface);

  @media (min-width: ${breakpoints.tablet}px) {
    padding:   var(--spacing-m) var(--spacing-l);
    font-size: var(--scale-xs);
  }
`

const Td = styled.td`
  padding:        var(--spacing-s) var(--spacing-m);
  border-bottom:  0.5px solid var(--stroke-tertiary-on-surface);
  vertical-align: middle;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: var(--spacing-s) var(--spacing-l);
  }
`

const TdCenter = styled(Td)`
  text-align: center;
`

const UsoTh = styled(Th)`
  display: none;
  @media (min-width: ${breakpoints.desktop}px) {
    display: table-cell;
    width: 40%;
  }
`

const UsoTd = styled(Td)`
  display: none;
  @media (min-width: ${breakpoints.desktop}px) {
    display: table-cell;
  }
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
  background:     ${({ $isDark }) => $isDark ? '#1A1A1A' : 'var(--background-surface-solid)'};
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  padding:        var(--spacing-l);
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xl);
  transition:     background 300ms ease;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: var(--spacing-xl);
  }
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

// ── Token block (caja compartida) ─────────────────────────────────────────
const TokenBlock = styled.div`
  background:    var(--background-surface-solid);
  border-radius: var(--corners-default-card);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  padding:       var(--spacing-l);

  @media (min-width: ${breakpoints.tablet}px) {
    padding: var(--spacing-xl);
  }
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

// ── Forma y estructura ────────────────────────────────────────────────────
const ShapeSubtitle = styled(Text)`
  color:          var(--foreground-tertiary-on-surface);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  display:        block;
  margin-bottom:  var(--spacing-m);
`

const ShapeSubtitleSpaced = styled(ShapeSubtitle)`
  margin-top: var(--spacing-xl);
`

const RadiusGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap:                   var(--spacing-m);
  margin-bottom:         var(--spacing-m);
`

const RadiusItem = styled.div`
  display:        flex;
  flex-direction: column;
  align-items:    center;
  gap:            var(--spacing-xs);
  text-align:     center;
`

const RadiusBox = styled.div<{ $radius: number }>`
  width:            48px;
  height:           48px;
  background:       var(--background-accent-dim);
  border:           0.5px solid var(--stroke-accent-dim);
  border-radius:    ${({ $radius }) => $radius}px;
`

const BordersRow = styled.div`
  display:       flex;
  flex-wrap:     wrap;
  gap:           var(--spacing-2xl);
  align-items:   center;
  margin-bottom: var(--spacing-m);
`

const BorderItem = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
`

const BorderLine = styled.div<{ $width: number }>`
  width:      120px;
  height:     ${({ $width }) => $width}px;
  background: var(--foreground-accent-on-surface);
  border-radius: var(--radius-full);
`

const ContainersGrid = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
`

const ContainerItem = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-l);
`

const ContainerBar = styled.div<{ $width: number }>`
  height:        var(--spacing-m);
  width:         ${({ $width }) => Math.round($width / 14)}px;
  border-radius: var(--radius-xs);
  background:    var(--background-accent-dim);
  border:        0.5px solid var(--stroke-accent-dim);
  flex-shrink:   0;
`

export default TokensShowcase
