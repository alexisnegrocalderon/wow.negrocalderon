'use client'

import { useEffect, useRef } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import { cabinOpacity as defaultCabinOpacity, type CabinFadeCurve } from '@/lib/cabinFade'

type CabinPhotoProps = {
  fade?: CabinFadeCurve
  maxOpacity?: number
  backgroundPosition?: string
  zIndex?: number
}

export function CabinPhoto({
  fade,
  maxOpacity = 0.65,
  backgroundPosition = 'center 42%',
  zIndex = 2,
}: CabinPhotoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const getOpacity = fade ? fade.cabinOpacity : defaultCabinOpacity

  useEffect(() => {
    let raf: number
    const tick = () => {
      const p = useSceneStore.getState().scrollProgress
      if (rootRef.current) rootRef.current.style.opacity = String(getOpacity(p) * maxOpacity)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [getOpacity, maxOpacity])

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        opacity: 0,
        pointerEvents: 'none',
        backgroundImage: 'url(/images/cabin-interior.webp)',
        backgroundSize: 'cover',
        backgroundPosition,
        filter: 'saturate(0.9) brightness(0.85)',
      }}
    />
  )
}
