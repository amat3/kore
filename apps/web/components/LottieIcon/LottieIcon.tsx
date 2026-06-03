'use client'

import dynamic              from 'next/dynamic'
import { useEffect, useState } from 'react'
import type { LottieComponentProps } from 'lottie-react'

// next/dynamic con ssr:false garantiza que lottie-react nunca se evalúa en el servidor
const Lottie = dynamic(() => import('lottie-react'), { ssr: false }) as React.ComponentType<LottieComponentProps>

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
  const [animationData, setData] = useState<object | null>(null)
  const [error, setError]        = useState(false)
  const [playing, setPlaying]    = useState(!playOnHover)

  useEffect(() => {
    fetch(src)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json() })
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
    <span
      style={{ display: 'inline-flex', width: size, height: size }}
      onMouseEnter={() => playOnHover && setPlaying(true)}
      onMouseLeave={() => playOnHover && setPlaying(false)}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && playing}
        style={{ width: size, height: size }}
        className={className}
      />
    </span>
  )
}

export default LottieIcon
