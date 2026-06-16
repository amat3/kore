'use client'

import { useEffect, useRef, useState } from 'react'
import styled                           from '@emotion/styled'
import gsap                             from 'gsap'
import { breakpoints }                  from '@kore/tokens'

// ── Datos ──────────────────────────────────────────────────────────────────
const CHARS = [
  'π', 'β', 'Σ', 'Ψ', 'Ω', 'φ', 'δ', 'α', 'ρ', 'Δ', 'Γ', 'Λ', 'Π', 'θ', 'μ', 'ε',
  '∞', '√', '∑', '∫', '≈', '≤', '≥', '≠', '∈', '∀', '∃', '∂',
  '½', '¼', '¾', '%', '‰',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '−', '×', '÷', '=', '<', '>', '·', '*',
  'x', 'y', 'n', 'e', 'i', 'a',
]

// Paleta amplia — elemento decorativo, no UI
const COLORS = [
  '#B05E3A', '#C8714A', '#D4845A',
  '#5B8DD9', '#7BA7E0', '#4A7CC7',
  '#F2CC8F', '#F4A261', '#F97316',
  '#81B29A', '#9B89B4', '#6B9AC4',
  '#10B981', '#8B5CF6', '#EC4899',
  '#06B6D4', '#EAB308', '#EF4444',
]

// Silueta frontal de cabeza humana (viewBox 0 0 400 480)
const HEAD_PATH = [
  'M 200 32',
  'C 278 32 345 90 348 180',
  'C 350 258 320 325 275 370',
  'C 252 395 232 415 218 438',
  'C 212 450 206 458 200 460',
  'C 194 458 188 450 182 438',
  'C 168 415 148 395 125 370',
  'C 80 325 50 258 52 180',
  'C 55 90 122 32 200 32 Z',
].join(' ')

// ── Tipos ──────────────────────────────────────────────────────────────────
interface CharDef {
  id:         number
  char:       string
  x:          number
  y:          number
  size:       number
  color:      string
  baseOpacity: number
  peakScale:  number
  dur:        number
  delay:      number
}

const COUNT = 210
const rnd   = (min: number, max: number) => min + Math.random() * (max - min)

// ── Componente ─────────────────────────────────────────────────────────────
const SymbolHead = () => {
  const svgRef   = useRef<SVGSVGElement>(null)
  const charsRef = useRef<(SVGTextElement | null)[]>([])
  const [chars, setChars] = useState<CharDef[]>([])

  // Generación solo en cliente — evita hydration mismatch
  useEffect(() => {
    setChars(
      Array.from({ length: COUNT }, (_, i) => ({
        id:          i,
        char:        CHARS[Math.floor(Math.random() * CHARS.length)],
        x:           rnd(25, 375),
        y:           rnd(35, 460),
        size:        rnd(9, 34),
        color:       COLORS[Math.floor(Math.random() * COLORS.length)],
        baseOpacity: rnd(0.18, 0.48),
        peakScale:   rnd(1.35, 2.1),
        dur:         rnd(0.6, 2.2),
        delay:       rnd(0, 6.5),
      }))
    )
  }, [])

  // GSAP — cada carácter pulsa de forma independiente y asíncrona
  useEffect(() => {
    if (!chars.length || !svgRef.current) return

    const ctx = gsap.context(() => {
      charsRef.current.forEach((el, i) => {
        if (!el) return
        const c = chars[i]
        if (!c) return

        gsap.fromTo(
          el,
          { opacity: c.baseOpacity, scale: 1 },
          {
            opacity:  rnd(0.85, 1),
            scale:    c.peakScale,
            duration: c.dur,
            repeat:   -1,
            yoyo:     true,
            delay:    c.delay,
            ease:     'sine.inOut',
          }
        )
      })
    }, svgRef)

    return () => ctx.revert()
  }, [chars])

  return (
    <Wrapper>
      <SVGEl
        ref={svgRef}
        viewBox="0 0 400 490"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <clipPath id="symbol-head-clip">
            <path d={HEAD_PATH} />
          </clipPath>
        </defs>

        {/* Contorno siempre visible mientras cargan los chars */}
        <path
          d={HEAD_PATH}
          fill="none"
          stroke="var(--stroke-secondary-on-surface)"
          strokeWidth="1.5"
          opacity="0.35"
        />

        {/* Caracteres — solo client-side */}
        {chars.length > 0 && (
          <g clipPath="url(#symbol-head-clip)">
            {chars.map((c, i) => (
              <text
                key={c.id}
                ref={el => { charsRef.current[i] = el }}
                x={c.x}
                y={c.y}
                fontSize={c.size}
                fill={c.color}
                opacity={c.baseOpacity}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                {c.char}
              </text>
            ))}
          </g>
        )}
      </SVGEl>
    </Wrapper>
  )
}

// ── Styled ─────────────────────────────────────────────────────────────────
const Wrapper = styled.div`
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           100%;
`

const SVGEl = styled.svg`
  width:     100%;
  max-width: 360px;
  height:    auto;
  overflow:  visible;

  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 420px;
  }
`

export default SymbolHead
