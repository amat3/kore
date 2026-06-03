'use client'

import dynamic           from 'next/dynamic'
import { useEffect, useState } from 'react'

// next/dynamic con ssr:false excluye lottie-react del bundle SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// ── Tipos ─────────────────────────────────────────────────────────────────

export interface LottieIconProps {
  src:        string
  size?:      number
  loop?:      boolean
  fallback?:  React.ReactNode
  className?: string
}

// ── Componente ────────────────────────────────────────────────────────────

const LottieIcon = ({
  src,
  size     = 48,
  loop     = true,
  fallback,
  className,
}: LottieIconProps) => {
  const [animationData, setData] = useState<object | null>(null)
  const [error, setError]        = useState(false)

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
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay
      style={{ width: size, height: size }}
      className={className}
    />
  )
}

export default LottieIcon
