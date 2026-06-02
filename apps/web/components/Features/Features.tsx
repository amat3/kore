'use client'

/**
 * KORE — Features Section §02
 *
 * 4 pilares del producto con scroll reveal.
 * GSAP ScrollTrigger: cards aparecen con stagger al entrar en viewport.
 * Fondo marfil (light) / obsidiana (dark) — contrasta con el hero oscuro.
 */

import { useEffect, useRef } from 'react'
import styled                 from '@emotion/styled'
import { keyframes }          from '@emotion/react'
import gsap                   from 'gsap'
import { ScrollTrigger }      from 'gsap/ScrollTrigger'
import { Text }               from '@kore/ui-web'

gsap.registerPlugin(ScrollTrigger)

// ── Animación del icono ───────────────────────────────────────────────────
const float = keyframes`
  0%, 100% { transform: translateY(0px);  }
  50%       { transform: translateY(-6px); }
`

// ── Data ──────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id:       'workouts',
    emoji:    '🏋️',
    overline: 'Entrenamientos',
    title:    'Fuerza desde el primer día',
    body:     'Sesiones de fuerza y cardio con vídeo guiado. Cada entrenamiento, adaptado a tu nivel y tiempo disponible.',
    accent:   '#B05E3A',
    delay:    0,
  },
  {
    id:       'habits',
    emoji:    '🔥',
    overline: 'Hábitos',
    title:    'La constancia como superpoder',
    body:     'Racha diaria y seguimiento de consistencia. Porque los resultados llegan cuando el hábito se convierte en identidad.',
    accent:   '#E25C1A',
    delay:    0.12,
  },
  {
    id:       'nutrition',
    emoji:    '🥗',
    overline: 'Nutrición',
    title:    'Come con propósito',
    body:     'Recetas y menús adaptados con buscador multifiltro por tiempo, ingrediente y objetivo. Comer bien nunca fue tan sencillo.',
    accent:   '#4D7C0F',
    delay:    0.24,
  },
  {
    id:       'community',
    emoji:    '👥',
    overline: 'Comunidad',
    title:    'Más fuertes juntas',
    body:     'Conecta y sigue a otras usuarias. Comparte tus logros, inspírate en los suyos y construye tu tribu KORE.',
    accent:   '#6D28D9',
    delay:    0.36,
  },
]

// ── Componente ────────────────────────────────────────────────────────────
const Features = () => {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading reveal
      gsap.from(headingRef.current, {
        y:          40,
        autoAlpha:  0,
        duration:   0.8,
        ease:       'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start:   'top 85%',
        },
      })

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.kore-feature-card')
      if (cards) {
        gsap.from(cards, {
          y:          60,
          autoAlpha:  0,
          duration:   0.7,
          stagger:    0.12,
          ease:       'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start:   'top 80%',
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
          <SectionOverline variant="overline" as="span">Por qué KORE</SectionOverline>
          <SectionTitle variant="h1" as="h2">
            Todo lo que necesitas,<br />
            <em>en un solo lugar</em>
          </SectionTitle>
          <SectionSubtitle variant="body-light">
            Diseñado para mujeres que entrenan con intención y viven con propósito.
          </SectionSubtitle>
        </HeadingWrapper>

        {/* Cards grid */}
        <CardsGrid ref={cardsRef}>
          {FEATURES.map(feature => (
            <FeatureCard
              key={feature.id}
              className="kore-feature-card"
              $accent={feature.accent}
            >
              <EmojiWrapper $accent={feature.accent}>
                <Emoji>{feature.emoji}</Emoji>
              </EmojiWrapper>

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
  padding-block:    clamp(4rem, 10vw, 8rem);
  width:            100%;
`

const Container = styled.div`
  max-width:      1200px;
  width:          100%;
  margin:         0 auto;
  padding-inline: var(--spacing-l);

  @media (min-width: 600px)  { padding-inline: var(--spacing-2xl); }
  @media (min-width: 1200px) { padding-inline: var(--spacing-3xl); }
`

const HeadingWrapper = styled.div`
  max-width:     600px;
  margin-bottom: clamp(2.5rem, 6vw, 5rem);
  visibility:    visible;
`

const SectionOverline = styled(Text)`
  display:       block;
  margin-bottom: var(--spacing-m);
`

const SectionTitle = styled(Text)`
  font-size: clamp(2rem, 5vw, 4rem);
  margin:    0 0 var(--spacing-l);
  em {
    font-style:  italic;
    font-weight: var(--font-weight-semibold);
    color:       var(--foreground-accent-on-surface);
  }
`

const SectionSubtitle = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const CardsGrid = styled.div`
  display:               grid;
  grid-template-columns: 1fr;
  gap:                   var(--spacing-m);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const FeatureCard = styled.div<{ $accent: string }>`
  position:       relative;
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-m);
  padding:        var(--spacing-xl);
  background:     var(--background-surface-solid);
  border-radius:  var(--corners-default-card);
  border:         0.5px solid var(--stroke-secondary-on-surface);
  overflow:       hidden;
  transition:     transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
  visibility:     visible;

  @media (hover: hover) {
    &:hover {
      transform:    translateY(-4px);
      border-color: ${({ $accent }) => $accent}40;
      box-shadow:   0 12px 40px ${({ $accent }) => $accent}15;
    }
  }
`

const EmojiWrapper = styled.div<{ $accent: string }>`
  width:            var(--sizing-3xl);
  height:           var(--sizing-3xl);
  border-radius:    var(--radius-m);
  background-color: ${({ $accent }) => $accent}15;
  display:          flex;
  align-items:      center;
  justify-content:  center;
  flex-shrink:      0;
`

const Emoji = styled.span`
  font-size:  24px;
  line-height: 1;
  animation:  ${float} 4s ease-in-out infinite;
`

const CardContent = styled.div`
  display:        flex;
  flex-direction: column;
  gap:            var(--spacing-xs);
  flex:           1;
`

const CardOverline = styled(Text)<{ $color: string }>`
  color: ${({ $color }) => $color};
`

const CardTitle = styled(Text)`
  letter-spacing: var(--letter-spacing-dense);
  line-height:    var(--line-height-dense);
  margin:         0;
`

const CardBody = styled(Text)`
  color: var(--foreground-secondary-on-surface);
`

const AccentLine = styled.div<{ $accent: string }>`
  position:         absolute;
  bottom:           0;
  left:             0;
  right:            0;
  height:           var(--borders-thick);
  background:       linear-gradient(
    to right,
    ${({ $accent }) => $accent},
    transparent
  );
  transform:        scaleX(0);
  transform-origin: left;
  transition:       transform 300ms ease;

  .kore-feature-card:hover & {
    transform: scaleX(1);
  }
`

export default Features
