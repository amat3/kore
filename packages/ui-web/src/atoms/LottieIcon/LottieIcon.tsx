'use client'

import React, { useEffect, useRef, useState } from 'react'

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface LottieIconProps {
  src:          string
  size?:        number
  loop?:        boolean
  autoplay?:    boolean
  playOnHover?: boolean
  fallback?:    React.ReactNode
  className?:   string
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Player, setPlayer]          = useState<React.ComponentType<any> | null>(null)
  const [animationData, setData]     = useState<object | null>(null)
  const [error, setError]            = useState(false)
  const lottieRef                    = useRef<{ play: () => void; stop: () => void } | null>(null)

  // Importar lottie-react solo en el cliente para evitar el require() en SSR
  useEffect(() => {
    import('lottie-react')
      .then(mod => setPlayer(() => mod.default as React.ComponentType<any>))
      .catch(() => setError(true))
  }, [])

  useEffect(() => {
    if (!Player) return
    fetch(src)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json() })
      .then(setData)
      .catch(() => setError(true))
  }, [src, Player])

  if (error || !Player || !animationData) {
    return fallback ? (
      <span style={{ display: 'inline-flex', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        {fallback}
      </span>
    ) : null
  }

  return (
    <Player
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
