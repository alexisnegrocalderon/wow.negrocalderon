'use client'

import { useEffect, useRef } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import { cabinOpacity } from '@/lib/cabinFade'

export function CabinPhoto() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const p = useSceneStore.getState().scrollProgress
      if (rootRef.current) rootRef.current.style.opacity = String(cabinOpacity(p) * 0.65)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        opacity: 0,
        pointerEvents: 'none',
        backgroundImage: 'url(/images/cabin-interior.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 42%',
        filter: 'saturate(0.9) brightness(0.85)',
      }}
    />
  )
}
