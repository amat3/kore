'use client'

/**
 * KORE — Hero Section
 *
 * Animaciones GSAP:
 * 1. Overline entra desde arriba (stagger)
 * 2. Wordmark "KORE" — cada letra cae con spring
 * 3. Claim, CTAs y Link slide up en secuencia
 * 4. Scroll indicator pulsa en loop
 * 5. Parallax suave en scroll
 */

import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

// ── Animación CSS — scroll indicator ─────────────────────────────────────
const bounce = keyframes`
  0%, 100% { transform: translateY(0);   opacity: 1;   }
  50%       { transform: translateY(8px); opacity: 0.4; }
`

// ── Componente ────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)
  const claimRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const recruiterRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 0. Estado inicial — todo invisible
      gsap.set(
        [
          overlineRef.current,
          lettersRef.current?.children,
          claimRef.current,
          ctasRef.current,
          scrollRef.current,
        ],
        { autoAlpha: 0 }
      )

      gsap.set(overlineRef.current, { y: -20 })
      gsap.set(lettersRef.current?.children ?? [], { y: -80 })
      gsap.set(claimRef.current, { y: 30 })
      gsap.set(ctasRef.current, { y: 30 })
      gsap.set(recruiterRef.current, { autoAlpha: 0, y: 20 })

      // 1. Overline
      tl.to(
        overlineRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        },
        0.3
      )

      // 2. Letras KORE — stagger con spring
      tl.to(
        lettersRef.current?.children ?? [],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.4)',
        },
        0.5
      )

      // 3. Claim
      tl.to(
        claimRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
        },
        1.0
      )

      // 4. CTAs
      tl.to(
        ctasRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        },
        1.2
      )

      // 5. Link
      tl.to(
        recruiterRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        },
        1.5
      )

      // 6. Scroll indicator
      tl.to(
        scrollRef.current,
        {
          autoAlpha: 1,
          duration: 0.5,
        },
        1.6
      )

      // 7. Parallax en scroll — fondo se mueve más lento
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <HeroSection ref={containerRef}>
      {/* Fondo con gradiente */}
      <Background ref={bgRef}>
        <GradientOverlay />
      </Background>

      <FloatingToggle>
        <ThemeToggle />
      </FloatingToggle>

      {/* Contenido */}
      <Content>
        {/* Overline */}
        <Overline ref={overlineRef}>Fuerza · Origen</Overline>

        {/* Wordmark KORE — letras individuales */}
        <WordmarkWrapper ref={lettersRef}>
          {'KORE'.split('').map((letter, i) => (
            <Letter key={i}>{letter}</Letter>
          ))}
        </WordmarkWrapper>

        {/* Claim */}
        <Claim ref={claimRef}>Entrena sin límites.</Claim>

        {/* CTAs */}
        <CTAs ref={ctasRef}>
          <CTAPrimary href="/register">Empezar ahora</CTAPrimary>
          <CTASecondary
            onClick={() =>
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
            }
            type="button"
          >
            Ver entrenamientos →
          </CTASecondary>
        </CTAs>

        {/* Puente reclutador */}
        <RecruiterLink href="/portfolio" ref={recruiterRef}>
          ¿Eres reclutador? Ver portfolio técnico →
        </RecruiterLink>
      </Content>

      {/* Scroll indicator */}
      <ScrollIndicator ref={scrollRef}>
        <ScrollLine />
        <ScrollLabel>Scroll</ScrollLabel>
      </ScrollIndicator>
    </HeroSection>
  )
}

// ── Styled components ─────────────────────────────────────────────────────
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #1a1a1a;
`

const Background = styled.div`
  position: absolute;
  inset: -20% 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2a28 40%, #3d3a38 70%, #1a1a1a 100%);
  will-change: transform;
`

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 60% 40%, rgba(176, 94, 58, 0.15) 0%, transparent 60%);
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

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-inline: var(--spacing-l);
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    padding-inline: var(--spacing-2xl);
  }

  @media (min-width: 1200px) {
    padding-inline: var(--spacing-3xl);
  }
`

const Overline = styled.div`
  font-family: var(--font-family-ui);
  font-size: var(--scale-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: #b05e3a;
  margin-bottom: var(--spacing-l);
  visibility: hidden;
`

const WordmarkWrapper = styled.div`
  display: flex;
  margin-bottom: var(--spacing-xl);
  line-height: 0.85;
  overflow: visible;
`

const Letter = styled.span`
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-light);
  font-size: clamp(5rem, 18vw, 16rem);
  letter-spacing: var(--letter-spacing-wide);
  color: #f7f4f1;
  display: inline-block;
  visibility: hidden;
  line-height: 1;
`

const Claim = styled.p`
  font-family: var(--font-family-display);
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: var(--font-weight-light);
  letter-spacing: var(--letter-spacing-dense);
  color: rgba(247, 244, 241, 0.7);
  margin: 0 0 var(--spacing-2xl);
  visibility: hidden;
  max-width: 600px;
`

const CTAs = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-l);
  flex-wrap: wrap;
  visibility: hidden;
`

const CTAPrimary = styled(Link)`
  background: #b05e3a;
  color: #f7f4f1;
  border: none;
  border-radius: var(--radius-full);
  padding: var(--spacing-m) var(--spacing-2xl);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-spacious);
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition:
    background 200ms ease,
    transform 200ms ease;

  &:hover {
    background: color-mix(in srgb, #b05e3a, black 15%);
    transform: translateY(-1px);
  }
  &:active {
    transform: scale(0.98);
  }
`

const CTASecondary = styled.button`
  background: transparent;
  color: rgba(247, 244, 241, 0.6);
  border: none;
  padding: 0;
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-moderate);
  cursor: pointer;
  transition: color 200ms ease;

  &:hover {
    color: #f7f4f1;
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: var(--spacing-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  visibility: hidden;
`

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #b05e3a, transparent);
  animation: ${bounce} 2s ease-in-out infinite;
`

const ScrollLabel = styled.span`
  font-family: var(--font-family-ui);
  font-size: var(--scale-2xs);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: rgba(247, 244, 241, 0.3);
`

const RecruiterLinkBase = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
  (props, ref) => <Link {...props} ref={ref} />
)
RecruiterLinkBase.displayName = 'RecruiterLink'

const RecruiterLink = styled(RecruiterLinkBase)`
  display: inline-flex;
  margin-top: var(--spacing-xl);
  font-family: var(--font-family-ui);
  font-size: var(--scale-s);
  font-weight: var(--font-weight-regular);
  color: rgba(247, 244, 241, 0.4);
  text-decoration: none;
  letter-spacing: var(--letter-spacing-moderate);
  transition: color 200ms;
  visibility: hidden;

  &:hover {
    color: rgba(247, 244, 241, 0.8);
  }
`

export default Hero
