'use client'

import { useEffect, useRef } from 'react'
import { useSceneStore } from '@/store/sceneStore'

// Peaks mid-Ascend (0.17 → 0.30), right where the sky hits full whiteout —
// the moment we're flying straight through the cloud bank after takeoff.
const PEAK = 0.235
const WIDTH = 0.075

function veilOpacity(p: number) {
  const d = Math.abs(p - PEAK)
  if (d > WIDTH) return 0
  return (1 - d / WIDTH) * 0.9
}

export function CloudBreakVeil() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const p = useSceneStore.getState().scrollProgress
      if (ref.current) ref.current.style.opacity = String(veilOpacity(p))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 4,
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(255,255,250,0.98), rgba(255,248,238,0.5) 50%, transparent 78%)',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
