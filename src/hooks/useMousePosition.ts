'use client'

import { useEffect } from 'react'
import { useSceneStore } from '@/store/sceneStore'

export function useMouseTracker() {
  const setMouse = useSceneStore((s) => s.setMouse)

  useEffect(() => {
    let rafId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      targetX = (t.clientX / window.innerWidth) * 2 - 1
      targetY = -((t.clientY / window.innerHeight) * 2 - 1)
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.06)
      currentY = lerp(currentY, targetY, 0.06)
      setMouse(currentX, currentY)
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouch)
      cancelAnimationFrame(rafId)
    }
  }, [setMouse])
}
