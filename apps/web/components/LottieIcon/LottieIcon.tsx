'use client'

import { useEffect, useRef } from 'react'

export interface LottieIconProps {
  src:        string
  size?:      number
  loop?:      boolean
  fallback?:  React.ReactNode
  className?: string
}

const LottieIcon = ({
  src,
  size     = 48,
  loop     = true,
  fallback,
  className,
}: LottieIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasError     = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    let anim: { destroy: () => void } | null = null

    // Import dinámico dentro de useEffect — nunca se evalúa en el servidor
    import('lottie-web').then(({ default: lottie }) => {
      if (!containerRef.current || hasError.current) return
      anim = lottie.loadAnimation({
        container:  containerRef.current,
        renderer:   'svg',
        loop,
        autoplay:   true,
        path:       src,
      })
    }).catch(() => {
      hasError.current = true
    })

    return () => { anim?.destroy() }
  }, [src, loop])

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, display: 'inline-flex' }}
      className={className}
    />
  )
}

export default LottieIcon
