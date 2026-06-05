'use client'

/**
 * KORE — Features Section §02
 *
 * 4 pilares del producto con scroll reveal.
 * GSAP ScrollTrigger: cards aparecen con stagger al entrar en viewport.
 * Fondo marfil (light) / obsidiana (dark) — contrasta con el hero oscuro.
 */

import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Text } from '@kore/ui-web'
import LottieIcon from '@/components/LottieIcon/LottieIcon'
import { breakpoints, colorPrimitives } from '@kore/tokens'

gsap.registerPlugin(ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 'workouts',
    emoji: '🏋️',
    lottie: '/lottie/workout.json',
    overline: 'Entrenamientos',
    title: 'Fuerza desde el primer día',
    body: 'Sesiones de fuerza y cardio con vídeo guiado. Cada entrenamiento, adaptado a tu nivel y tiempo disponible.',
    accent: colorPrimitives.terracota[500],
    delay: 0,
  },
  {
    id: 'habits',
    emoji: '🔥',
    lottie: '/lottie/fire.json',
    overline: 'Hábitos',
    title: 'La constancia como superpoder',
    body: 'Racha diaria y seguimiento de consistencia. Porque los resultados llegan cuando el hábito se convierte en identidad.',
    accent: '#E25C1A',
    delay: 0.12,
  },
  {
    id: 'nutrition',
    emoji: '🥗',
    lottie: '/lottie/nutrition.json',
    overline: 'Nutrición',
    title: 'Come con propósito',
    body: 'Recetas y menús adaptados con buscador multifiltro por tiempo, ingrediente y objetivo. Comer bien nunca fue tan sencillo.',
    accent: '#4D7C0F',
    delay: 0.24,
  },
  {
    id: 'community',
    emoji: '👥',
    lottie: '/lottie/community.json',
    overline: 'Comunidad',
    title: 'Más fuertes juntas',
    body: 'Conecta y sigue a otras usuarias. Comparte tus logros, inspírate en los suyos y construye tu tribu KORE.',
    accent: '#6D28D9',
    delay: 0.36,
  },
]

// ── Componente ────────────────────────────────────────────────────────────
const Features = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 90%',
        },
      })

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.kore-feature-card')
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 90%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef}>
      <Container>
        {/* Heading */}
        <HeadingWrapper ref={headingRef}>
          <SectionOverline variant="overline" as="span">
            ¿Por qué KORE?
          </SectionOverline>
          <SectionTitle variant="h1" as="h2">
            Todo lo que necesitas,
            <br />
            <em>en un solo lugar</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            Diseñado para mujeres que entrenan con intención y viven con propósito.
          </SectionSubtitle>
        </HeadingWrapper>

        {/* Cards grid */}
        <CardsGrid ref={cardsRef}>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} className="kore-feature-card" $accent={feature.accent}>
              <LottieIcon src={feature.lottie} size={40} loop />

              <CardContent>
                <CardOverline variant="overline" as="span" $color={feature.accent}>
                  {feature.overline}
                </CardOverline>
                <CardTitle variant="h3">{feature.title}</CardTitle>
                <CardBody variant="body-sm">{feature.body}</CardBody>
              </CardContent>

              <AccentLine $accent={feature.accent} />
            </FeatureCard>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  )
}

// ── Styled ────────────────────────────────────────────────────────────────
const Section = styled.section`
  background-color: var(--background-surface-low);
  padding-block: var(--layout-section-pad);
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  max-width: var(--container-xl);
  display: flex;
  flex-direction: column;
  padding-inline: var(--layout-gutter);
  margin-inline: auto;
  gap: clamp(2rem, 4vw, 3rem);
`

const HeadingWrapper = styled.div`
  max-width: var(--container-m);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
`

const SectionOverline = styled(Text)``

const SectionTitle = styled(Text)`
  font-size: clamp(2rem, 5vw, 4rem);
  em {
    font-style: italic;
    font-weight: var(--font-weight-semibold);
    color: var(--foreground-accent-on-surface);
  }
`

const SectionSubtitle = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-m);

  @media (min-width: ${breakpoints.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const FeatureCard = styled.div<{ $accent: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: var(--spacing-xl);
  background: var(--background-surface-solid);
  border-radius: var(--corners-default-card);
  border: var(--borders-thin) solid var(--stroke-secondary-on-surface);
  overflow: hidden;
  transition:
    transform 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
  visibility: visible;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      border-color: ${({ $accent }) => $accent}40;
      box-shadow: 0 12px 40px ${({ $accent }) => $accent}15;
    }
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
`

const CardOverline = styled(Text)<{ $color: string }>`
  color: ${({ $color }) => $color};
`

const CardTitle = styled(Text)`
  letter-spacing: var(--letter-spacing-dense);
  line-height: var(--line-height-dense);
`

const CardBody = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const AccentLine = styled.div<{ $accent: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--borders-thick);
  background: linear-gradient(to right, ${({ $accent }) => $accent}, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms ease;

  .kore-feature-card:hover & {
    transform: scaleX(1);
  }
`

export default Features
