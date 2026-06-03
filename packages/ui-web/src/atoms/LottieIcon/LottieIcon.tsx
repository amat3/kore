'use client'

import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Lottie = require('lottie-react').default as React.ComponentType<{
  animationData: object | null
  loop:          boolean
  autoplay:      boolean
  style?:        React.CSSProperties
  className?:    string
  lottieRef?:    React.RefObject<{ play: () => void; stop: () => void }>
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}>

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface LottieIconProps {
  /** URL al archivo JSON de Lottie (desde /public) */
  src:        string
  /** Tamaño en px — default 48 */
  size?:      number
  /** Loop infinito — default true */
  loop?:      boolean
  /** Autoplay al montar — default true */
  autoplay?:  boolean
  /** Reproducir solo al hacer hover */
  playOnHover?: boolean
  /** Nodo a mostrar si el JSON no carga */
  fallback?:  React.ReactNode
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────────

const LottieIcon = ({
  src,
  size      = 48,
  loop      = true,
  autoplay  = true,
  playOnHover = false,
  fallback,
  className,
}: LottieIconProps) => {
  const lottieRef                     = useRef<{ play: () => void; stop: () => void }>(null)
  const [animationData, setData]      = useState<object | null>(null)
  const [error, setError]             = useState(false)

  useEffect(() => {
    fetch(src)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(setData)
      .catch(() => setError(true))
  }, [src])

  if (error || (!animationData && !error)) {
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
