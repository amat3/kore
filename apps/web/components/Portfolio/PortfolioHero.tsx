'use client'

/**
 * Portfolio Hero — cabecera de /portfolio
 *
 * Contexto para el reclutador: quién es Juanan, qué va a ver,
 * link de vuelta al producto KORE.
 */

import Link from 'next/link'
import styled from '@emotion/styled'
import { Text } from '@kore/ui-web'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

const PortfolioHero = () => (
  <Section>
    <Container>
      {/* Breadcrumb de vuelta al producto */}
      <BackLink href="/">← Ver la app KORE</BackLink>

      <FloatingToggle>
        <ThemeToggle />
      </FloatingToggle>

      {/* Identidad */}
      <Overline variant="overline" as="span">
        Portfolio técnico
      </Overline>

      <Title variant="h1">Juan Antonio Amate</Title>

      <Role variant="overline" as="p">
        Mid Frontend Developer · React / React Native
      </Role>

      <Description variant="body-light">
        Especialista en UI, design systems y animaciones avanzadas. Lo que ves aquí — tokens
        semánticos, monorrepo Turborepo, componentes documentados con Storybook y animaciones GSAP —
        está construido desde cero con React 19 y Next.js 16 como parte del proyecto{' '}
        <strong>KORE</strong>.
      </Description>

      {/* Links */}
      <Links>
        <PrimaryLink
          href="https://linkedin.com/in/juanan-amate-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </PrimaryLink>
        <SecondaryLink href="https://github.com/amat3" target="_blank" rel="noopener noreferrer">
          GitHub / amat3
        </SecondaryLink>
        <SecondaryLink href="mailto:juanantamate@gmail.com">juanantamate@gmail.com</SecondaryLink>
      </Links>

      {/* Stats rápidos del proyecto */}
      <StatsRow>
        {[
          { num: '2', label: 'Packages npm' },
          { num: '15', label: 'Componentes' },
          { num: '164', label: 'Design tokens' },
          { num: '100%', label: 'TypeScript' },
        ].map((s) => (
          <StatItem key={s.label}>
            <StatNum variant="display" as="span">
              {s.num}
            </StatNum>
            <StatLabel variant="overline" as="span">
              {s.label}
            </StatLabel>
          </StatItem>
        ))}
      </StatsRow>
    </Container>
  </Section>
)

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-top:    calc(56px + var(--layout-section-pad));
  padding-bottom: var(--layout-section-pad);
  border-bottom: 0.5px solid var(--stroke-secondary-on-surface);
`

const Container = styled.div`
  max-width: var(--container-xl);
  margin: 0 auto;
  padding-inline: var(--layout-gutter);
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground-accent-on-surface);
  text-decoration: none;
  margin-bottom: var(--spacing-2xl);
  transition: opacity 150ms;
  &:hover {
    opacity: 0.7;
  }
`

const FloatingToggle = styled.div`
  position: absolute;
  top: var(--spacing-l);
  right: var(--spacing-l);
  z-index: 10;

  @media (min-width: 600px) {
    top: var(--spacing-xl);
    right: var(--spacing-2xl);
  }
`

const Overline = styled(Text)`
  display: block;
  margin-bottom: var(--spacing-m);
`

const Title = styled(Text)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  margin: 0 0 var(--spacing-s);
`

const Role = styled(Text)`
  font-size: var(--scale-m);
  margin: 0 0 var(--spacing-xl);
`

const Description = styled(Text)`
  font-size: var(--scale-l);
  color: var(--foreground-secondary-on-surface);
  margin: 0 0 var(--spacing-2xl);
  max-width: 680px;
  strong {
    color: var(--foreground-primary-on-surface);
    font-weight: var(--font-weight-semibold);
  }
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-s);
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
`

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-l);
  border-radius: var(--radius-full);
  background: var(--background-accent-solid);
  color: var(--foreground-primary-on-accent);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  text-decoration: none;
  transition: background 150ms;
  &:hover {
    background: color-mix(in srgb, var(--background-accent-solid), black 12%);
  }
`

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-s) var(--spacing-l);
  border-radius: var(--radius-full);
  border: 0.5px solid var(--stroke-secondary-on-surface);
  background: transparent;
  color: var(--foreground-secondary-on-surface);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-regular);
  text-decoration: none;
  transition:
    border-color 150ms,
    color 150ms;
  &:hover {
    border-color: var(--stroke-accent);
    color: var(--foreground-accent-on-surface);
  }
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-m);

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
  padding: var(--spacing-l);
  border-radius: var(--corners-default-card);
  border: 0.5px solid var(--stroke-secondary-on-surface);
  background: var(--background-surface-solid);
`

const StatNum = styled(Text)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--foreground-accent-on-surface);
  line-height: 1;
`

const StatLabel = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

export default PortfolioHero
