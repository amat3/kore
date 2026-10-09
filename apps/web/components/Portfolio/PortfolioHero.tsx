'use client'

import { useCallback }  from 'react'
import Link             from 'next/link'
import styled           from '@emotion/styled'
import { keyframes }    from '@emotion/react'
import { breakpoints }  from '@kore/tokens'
import { Text }         from '@kore/ui-web'
import ThemeToggle      from '@/components/ThemeToggle/ThemeToggle'
import SymbolHead       from './SymbolHead'

const PortfolioHero = () => {
  // Next.js App Router intercepta <a> sin target="_blank" para mailto:/tel:
  const handleProtoLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = e.currentTarget.href
  }, [])

  return (
    <Section>
      <Container>
        <BackLink href="/">← Ver la app KORE</BackLink>

        <FloatingToggle>
          <ThemeToggle />
        </FloatingToggle>

        <HeroGrid>
          {/* ── Columna texto ── */}
          <TextCol>
            <Overline variant="overline" as="span">
              Portfolio técnico
            </Overline>

            <Title variant="h1">Juan Antonio Amate</Title>

            <RoleRow>
              <Role variant="overline" as="p">
                Frontend Developer · React, Next.js & React Native
              </Role>
              <Availability variant="overline" as="span">
                <AvailabilityDot aria-hidden="true" />
                Disponible
              </Availability>
            </RoleRow>

            <Description variant="body-light">
              Desarrollador frontend con React, Next.js y TypeScript, especializado en design systems
              y productos mobile-first que llegan a producción. Lo que ves aquí — tokens semánticos
              compartidos entre web y móvil, monorepo Turborepo, componentes documentados con
              Storybook y animaciones GSAP — es parte del proyecto <strong>KORE</strong>. Disponible
              de inmediato, en remoto.
            </Description>

            <Links>
              <PrimaryLink
                href="https://linkedin.com/in/juanan-amate-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mi perfil en LinkedIn
              </PrimaryLink>
              <SecondaryLink href="https://github.com/amat3" target="_blank" rel="noopener noreferrer">
                Lo que hago / GitHub
              </SecondaryLink>
              <SecondaryLink href="mailto:juanantamate@gmail.com" onClick={handleProtoLink}>
                Escríbeme un email
              </SecondaryLink>
            </Links>

          </TextCol>

          {/* ── Columna visual ── */}
          <VisualCol>
            <SymbolHead />
          </VisualCol>
        </HeroGrid>

        <StatsRow>
          {[
            { num: '2',    label: 'Paquetes compartidos' },
            { num: '15',   label: 'Componentes'    },
            { num: '190',  label: 'Design tokens'  },
            { num: '100%', label: 'TypeScript'     },
          ].map((s) => (
            <StatItem key={s.label}>
              <StatNum variant="display" as="span">{s.num}</StatNum>
              <StatLabel variant="overline" as="span">{s.label}</StatLabel>
            </StatItem>
          ))}
        </StatsRow>
      </Container>
    </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-top:      calc(56px + var(--layout-section-pad));
  padding-bottom:   var(--layout-section-pad);
`

const Container = styled.div`
  max-width:    var(--container-xl);
  margin:       0 auto;
  padding-inline: var(--layout-gutter);
`

const BackLink = styled(Link)`
  display:       inline-flex;
  align-items:   center;
  gap:           var(--spacing-xs);
  font-family:   var(--font-family-ui);
  font-size:     var(--scale-s);
  font-weight:   var(--font-weight-semibold);
  color:         var(--foreground-accent-on-surface);
  text-decoration: none;
  margin-bottom: var(--spacing-2xl);
  transition:    opacity 150ms;
  &:hover { opacity: 0.7; }
`

const FloatingToggle = styled.div`
  position: absolute;
  top:      var(--spacing-l);
  right:    var(--spacing-l);
  z-index:  10;

  @media (min-width: ${breakpoints.tablet}px) {
    top:   var(--spacing-xl);
    right: var(--spacing-2xl);
  }
`

const HeroGrid = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xl);

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    align-items:    stretch;
    gap:            var(--spacing-3xl);
  }
`

const TextCol = styled.div`
  flex:      1.5;
  min-width: 0;
  order:     1;
`

const VisualCol = styled.div`
  flex:            1;
  display:         flex;
  justify-content: center;
  align-items:     center;
  order:           0;

  @media (min-width: ${breakpoints.desktop}px) {
    order: 2;
  }
`

// "Disponible": green dot with a soft pulse (still under reduced motion)
const pulse = keyframes`
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(2.6); opacity: 0; }
`

const AvailabilityDot = styled.span`
  position:      relative;
  width:         8px;
  height:        8px;
  border-radius: 50%;
  background:    var(--background-success-solid);

  &::after {
    content:       '';
    position:      absolute;
    inset:         0;
    border-radius: 50%;
    background:    var(--background-success-solid);
    animation:     ${pulse} 1.8s ease-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; opacity: 0; }
  }
`

const Overline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const Title = styled(Text)`
  /* nowrap keeps the name on one line: 2.25rem is what fits a 320px screen */
  font-size:   clamp(2.25rem, 6vw, 5rem);
  line-height: 1.05;
  margin:      0 0 var(--spacing-s);
  white-space: nowrap;
`

// Role + availability on one line; when the width runs out, "Disponible" wraps below
const RoleRow = styled.div`
  display:     flex;
  flex-wrap:   wrap;
  align-items: center;
  gap:         var(--spacing-xs) var(--spacing-m);
  margin:      0 0 var(--spacing-xl);
`

const Role = styled(Text)`
  margin:    0;
  font-size: var(--scale-s);
`

const Availability = styled(Text)`
  display:     inline-flex;
  align-items: center;
  gap:         var(--spacing-xs);
  color:       var(--foreground-success-on-surface);
  /* A step below the role (scale-s) and in sentence case, not uppercase like the role */
  font-size:      var(--scale-xs);
  text-transform: capitalize;
  letter-spacing: var(--letter-spacing-moderate);
`

const Description = styled(Text)`
  font-size:   var(--scale-l);
  color:       var(--foreground-secondary-on-surface);
  margin:      0 0 var(--spacing-2xl);
  strong {
    color:       var(--foreground-primary-on-surface);
    font-weight: var(--font-weight-semibold);
  }
`

const Links = styled.div`
  display:       flex;
  flex-wrap:     wrap;
  align-items:   center;
  gap:           var(--spacing-s);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`

const PrimaryLink = styled.a`
  display:          inline-flex;
  align-items:      center;
  padding:          var(--spacing-s) var(--spacing-l);
  border-radius:    var(--radius-full);
  background:       var(--background-accent-solid);
  color:            var(--foreground-primary-on-accent);
  font-family:      var(--font-family-ui);
  font-size:        var(--scale-s);
  font-weight:      var(--font-weight-semibold);
  letter-spacing:   var(--letter-spacing-spacious);
  text-decoration:  none;
  transition:       background 150ms;
  @media (hover: hover) {
    &:hover { background: color-mix(in srgb, var(--background-accent-solid), black 12%); }
  }
`

const SecondaryLink = styled.a`
  display:         inline-flex;
  align-items:     center;
  padding:         var(--spacing-s) var(--spacing-l);
  border-radius:   var(--radius-full);
  border:          0.5px solid var(--stroke-secondary-on-surface);
  background:      transparent;
  color:           var(--foreground-secondary-on-surface);
  font-family:     var(--font-family-ui);
  font-size:       var(--scale-s);
  font-weight:     var(--font-weight-regular);
  text-decoration: none;
  transition:      border-color 150ms, color 150ms;
  @media (hover: hover) {
    &:hover {
      border-color: var(--stroke-accent);
      color:        var(--foreground-accent-on-surface);
    }
  }
`

const StatsRow = styled.div`
  display:               grid;
  /* minmax(0, ...): a cell may shrink below its content instead of widening the page */
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap:                   var(--spacing-m);
  margin-top:            var(--spacing-2xl);

  /* Four cells need ~768px; below that, two per row */
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const StatItem = styled.div`
  display:          flex;
  flex-direction:   column;
  gap:              var(--spacing-2xs);
  padding:          var(--spacing-m);
  border-radius:    var(--corners-default-card);
  border:           0.5px solid var(--stroke-secondary-on-surface);
  background:       var(--background-surface-solid);

  @media (min-width: 768px) {
    padding: var(--spacing-l);
  }
`

const StatNum = styled(Text)`
  font-size:  clamp(1.5rem, 3vw, 2.5rem);
  color:      var(--foreground-accent-on-surface);
  line-height: 1;
`

const StatLabel = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

export default PortfolioHero
