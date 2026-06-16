'use client'

import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'
import { breakpoints } from '@kore/tokens'

// ── Datos ──────────────────────────────────────────────────────────────────
const CHARS = [
  'π', 'β', 'Σ', 'Ψ', 'Ω', 'φ', 'δ', 'α', 'ρ', 'Δ', 'Γ', 'Λ', 'Π', 'θ', 'μ', 'ε',
  '∞', '√', '∑', '∫', '≈', '≤', '≥', '≠', '∈', '∀', '∃', '∂',
  '½', '¼', '¾', '%', '‰',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '+', '−', '×', '÷', '=', '<', '>', '·', '*',
  'x', 'y', 'n', 'e', 'i', 'a',
]

const COLORS = [
  '#B05E3A', '#C8714A', '#D4845A',
  '#5B8DD9', '#7BA7E0', '#4A7CC7',
  '#F2CC8F', '#F4A261', '#F97316',
  '#81B29A', '#9B89B4', '#6B9AC4',
  '#10B981', '#8B5CF6', '#EC4899',
  '#06B6D4', '#EAB308', '#EF4444',
]

// Path de silueta de cabeza (SVGRepo) — viewBox "-2.89 -2.89 34.65 34.65"
const HEAD_PATH = `M7.137,21.848l-0.355,7.025h10.137l0.777-3.23c0,0,0.439,0.738,3.06,0.96c2.619,0.222,2.3-2.976,2.3-2.976s1.744-0.77,1.744-1.346c0-0.578-1.032-1.322-1.032-1.322s1.109,0.199,1.512-0.268c0.399-0.467-0.49-2.154-0.49-2.154s1.368-0.035,2.175-0.922c0.805-0.887-2.539-3.509-2.539-5.199c1.892-9.269-5.64-13.511-13.998-12.176c-8.36,1.333-8.046,6.39-8.538,8.803C0.912,15.09,7.137,21.848,7.137,21.848z`

// ── Tipos ──────────────────────────────────────────────────────────────────
interface CharDef {
  id:          number
  char:        string
  x:           number
  y:           number
  size:        number
  color:       string
  baseOpacity: number
}

const COUNT = 900
const rnd   = (min: number, max: number) => min + Math.random() * (max - min)

// ── Componente ─────────────────────────────────────────────────────────────
const SymbolHead = () => {
  const svgRef   = useRef<SVGSVGElement>(null)
  const charsRef = useRef<(SVGTextElement | null)[]>([])
  const [chars, setChars] = useState<CharDef[]>([])

  useEffect(() => {
    const id = setTimeout(() => {
      setChars(
        Array.from({ length: COUNT }, (_, i) => ({
          id:          i,
          char:        CHARS[Math.floor(Math.random() * CHARS.length)],
          x:           rnd(-1, 29),
          y:           rnd(-2, 30),
          size:        rnd(0.45, 1.6),
          color:       COLORS[Math.floor(Math.random() * COLORS.length)],
          baseOpacity: rnd(0.38, 0.62),
        }))
      )
    }, 0)
    return () => clearTimeout(id)
  }, [])

  // GSAP — señales de red neuronal: origen aleatorio → propagación espacial a vecinos
  useEffect(() => {
    if (!chars.length || !svgRef.current) return

    const ctx = gsap.context(() => {
      const elements = charsRef.current.filter((el): el is SVGTextElement => el !== null)

      const propagate = () => {
        const srcIdx = Math.floor(Math.random() * chars.length)
        const src    = chars[srcIdx]
        if (!src) return

        // Vecinos ordenados por distancia — la señal viaja del más cercano al más lejano
        const signal = chars
          .map((c, i) => ({ el: elements[i], dist: Math.hypot(c.x - src.x, c.y - src.y) }))
          .filter(({ el, dist }) => el && dist < 5.5)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 6)
          .map(({ el }) => el as SVGTextElement)

        if (!signal.length) return

        gsap.to(signal, {
          opacity:  1,
          duration: 0.14,
          ease:     'power2.out',
          stagger:  { each: 0.045, from: 'start' },
          yoyo:     true,
          repeat:   1,
          onComplete: () => gsap.delayedCall(rnd(0.03, 0.15), propagate),
        })
      }

      // 4 señales concurrentes con arranque escalonado
      for (let i = 0; i < 4; i++) {
        gsap.delayedCall(i * 0.1, propagate)
      }
    }, svgRef)

    return () => ctx.revert()
  }, [chars])

  return (
    <Wrapper>
      <SVGEl ref={svgRef} viewBox="-2.89 -2.89 34.65 34.65" aria-hidden="true" role="presentation">
        <defs>
          <clipPath id="symbol-head-clip">
            <path d={HEAD_PATH} />
          </clipPath>
        </defs>

        {/* Fondo suave */}
        <path d={HEAD_PATH} fill="var(--background-accent-dim)" opacity="0.05" />

        {/* Caracteres estáticos — el clipPath recorta los que quedan fuera */}
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
  max-width: 300px;
  height:    auto;
  overflow:  visible;

  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 100%;
  }
`

export default SymbolHead
