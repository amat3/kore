'use client'

import styled                    from '@emotion/styled'
import { motion, type Variants } from 'framer-motion'
import { Text }                  from '@kore/ui-web'
import { typeScale, spacing, radius, colorPrimitives } from '@kore/tokens'

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
    label: 'Brand',
    tokens: [
      { name: 'Terracota 500', value: colorPrimitives.terracota[500] },
      { name: 'Terracota 300', value: colorPrimitives.terracota[300] },
      { name: 'Terracota 100', value: colorPrimitives.terracota[100] },
    ],
  },
  {
    label: 'Neutros',
    tokens: [
      { name: 'Obsidiana',  value: colorPrimitives.neutral[900] },
      { name: 'Gris cálido', value: colorPrimitives.neutral[500] },
      { name: 'Marfil',     value: colorPrimitives.neutral[50]  },
    ],
  },
  {
    label: 'Estado',
    tokens: [
      { name: 'Error',    value: colorPrimitives.error.main    },
      { name: 'Success',  value: colorPrimitives.success.main  },
    ],
  },
] as const

const SPACING_KEYS = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] as const

// ── Componente ────────────────────────────────────────────────────────────
const TokensShowcase = () => (
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
                {SCALE_KEYS.map((key, i) => (
                  <tr key={key}>
                    <Td>
                      <TokenName>--scale-{key}</TokenName>
                    </Td>
                    {BREAKPOINTS.map(bp => {
                      const val = typeScale[bp.key][key as ScaleKey]
                      const isM = bp.key === 'mobile'
                      return (
                        <TdCenter key={bp.key}>
                          <SizeBar
                            $size={val}
                            $active={bp.key === 'desktop'}
                          />
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

        {/* ── Paleta de color ── */}
        <motion.div variants={fadeUp}>
          <BlockTitle variant="overline" as="h3">Paleta de color — primitivos</BlockTitle>
          <BlockSubtitle variant="body-sm">
            Valores raw usados para construir los tokens semánticos de cada tema.
          </BlockSubtitle>
          <ColorGrid>
            {COLOR_GROUPS.map(group => (
              <ColorGroup key={group.label}>
                <GroupLabel variant="caption" as="span">{group.label}</GroupLabel>
                <ColorSwatches>
                  {group.tokens.map(token => (
                    <SwatchItem key={token.name}>
                      <Swatch style={{ background: token.value }} />
                      <SwatchName>{token.name}</SwatchName>
                      <SwatchValue>{token.value}</SwatchValue>
                    </SwatchItem>
                  ))}
                </ColorSwatches>
              </ColorGroup>
            ))}
          </ColorGrid>
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

// ── Paleta de color ────────────────────────────────────────────────────────
const ColorGrid = styled.div`
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap:                   var(--spacing-xl);
  margin-bottom:         clamp(2.5rem, 5vw, 4rem);
`

const ColorGroup = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
`

const GroupLabel = styled(Text)`
  color:          var(--foreground-tertiary-on-surface);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
`

const ColorSwatches = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-s);
`

const SwatchItem = styled.div`
  display:     flex;
  align-items: center;
  gap:         var(--spacing-m);
`

const Swatch = styled.div`
  width:         var(--spacing-2xl);
  height:        var(--spacing-2xl);
  border-radius: var(--radius-s);
  border:        0.5px solid var(--stroke-secondary-on-surface);
  flex-shrink:   0;
`

const SwatchName = styled.span`
  font-family: var(--font-family-ui);
  font-size:   var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color:       var(--foreground-primary-on-surface);
  flex:        1;
`

const SwatchValue = styled.span`
  font-family: monospace;
  font-size:   var(--scale-xs);
  color:       var(--foreground-tertiary-on-surface);
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
