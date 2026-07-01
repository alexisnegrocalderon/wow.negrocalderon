'use client'

import { useEffect, useRef } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import { cabinOpacity, veilOpacity } from '@/lib/cabinFade'

export function CabinFrame() {
  const rootRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const p = useSceneStore.getState().scrollProgress
      if (rootRef.current) rootRef.current.style.opacity = String(cabinOpacity(p))
      if (veilRef.current) veilRef.current.style.opacity = String(veilOpacity(p))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {/* Whiteout veil — breaking through the cloud layer */}
      <div
        ref={veilRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 5,
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(255,250,245,0.95), rgba(255,235,220,0.35) 55%, transparent 80%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Cabin interior bezels */}
      <div
        ref={rootRef}
        style={{ position: 'fixed', inset: 0, zIndex: 6, opacity: 0, pointerEvents: 'none' }}
      >
        {/* Ceiling */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '9vh',
            background: 'linear-gradient(to bottom, #0a0a0c 0%, #1c1c20 75%, transparent 100%)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
          }}
        />
        {/* Floor / seat-back hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '15vh',
            background: 'linear-gradient(to top, #08080a 0%, #18181c 65%, transparent 100%)',
            boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
          }}
        />
        {/* Fuselage curvature — left */}
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: '7vw',
            background: 'linear-gradient(to right, #0a0a0c 0%, transparent 100%)',
          }}
        />
        {/* Fuselage curvature — right */}
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0,
            width: '7vw',
            background: 'linear-gradient(to left, #0a0a0c 0%, transparent 100%)',
          }}
        />
      </div>
    </>
  )
}
