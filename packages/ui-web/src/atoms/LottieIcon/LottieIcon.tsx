'use client'

import React, { useEffect, useRef, useState } from 'react'
import LottiePlayer from 'lottie-react'

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface LottieIconProps {
  /** URL al archivo JSON de Lottie (desde /public) */
  src:          string
  /** Tamaño en px — default 48 */
  size?:        number
  /** Loop infinito — default true */
  loop?:        boolean
  /** Autoplay al montar — default true */
  autoplay?:    boolean
  /** Reproducir solo al hacer hover */
  playOnHover?: boolean
  /** Nodo a mostrar si el JSON no carga */
  fallback?:    React.ReactNode
  className?:   string
}

// Cast necesario — lottie-react tiene incompatibilidad de tipos con React 19
const Lottie = LottiePlayer as unknown as React.ComponentType<{
  animationData: object
  loop:          boolean
  autoplay:      boolean
  style?:        React.CSSProperties
  className?:    string
  lottieRef?:    React.MutableRefObject<{ play: () => void; stop: () => void } | null>
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}>

// ── Componente ────────────────────────────────────────────────────────────

const LottieIcon = ({
  src,
  size        = 48,
  loop        = true,
  autoplay    = true,
  playOnHover = false,
  fallback,
  className,
}: LottieIconProps) => {
  const lottieRef                = useRef<{ play: () => void; stop: () => void } | null>(null)
  const [animationData, setData] = useState<object | null>(null)
  const [error, setError]        = useState(false)

  useEffect(() => {
    fetch(src)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(setData)
      .catch(() => setError(true))
  }, [src])

  if (error || !animationData) {
    return fallback ? (
      <span style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {fallback}
      </span>
    ) : null
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay && !playOnHover}
      style={{ width: size, height: size }}
      className={className}
      onMouseEnter={() => playOnHover && lottieRef.current?.play()}
      onMouseLeave={() => playOnHover && lottieRef.current?.stop()}
    />
  )
}

export default LottieIcon
