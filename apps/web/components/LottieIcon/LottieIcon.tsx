'use client'

import { useEffect, useRef } from 'react'

export interface LottieIconProps {
  src:        string
  size?:      number
  loop?:      boolean
  className?: string
}

const LottieIcon = ({
  src,
  size     = 48,
  loop     = true,
  className,
}: LottieIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef      = useRef<{ destroy: () => void } | null>(null)
  const cancelRef    = useRef(false)

  useEffect(() => {
    cancelRef.current = false

    import('lottie-web').then(({ default: lottie }) => {
      if (cancelRef.current || !containerRef.current) return

      // Limpiar animación anterior (React Strict Mode ejecuta effects dos veces)
      animRef.current?.destroy()
      containerRef.current.innerHTML = ''

      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer:  'svg',
        loop,
        autoplay:  true,
        path:      src,
      })
    })

    return () => {
      cancelRef.current = true
      animRef.current?.destroy()
      animRef.current = null
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [src, loop])

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={className}
    />
  )
}

export default LottieIcon
