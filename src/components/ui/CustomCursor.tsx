'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let dotX = -100
    let dotY = -100
    let ringX = -100
    let ringY = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, dotX, 0.1)
      ringY = lerp(ringY, dotY, 0.1)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const onEnterInteractive = () => {
      ringRef.current?.style.setProperty('transform-origin', 'center')
      if (ringRef.current) {
        ringRef.current.style.width = '50px'
        ringRef.current.style.height = '50px'
        ringRef.current.style.borderColor = 'rgba(240,237,232,0.4)'
        ringRef.current.style.marginLeft = '-25px'
        ringRef.current.style.marginTop = '-25px'
      }
    }

    const onLeaveInteractive = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.borderColor = 'rgba(240,237,232,0.2)'
        ringRef.current.style.marginLeft = '0px'
        ringRef.current.style.marginTop = '0px'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(240,237,232,0.9)',
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform',
          top: 0,
          left: 0,
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(240,237,232,0.2)',
          zIndex: 9998,
          pointerEvents: 'none',
          willChange: 'transform',
          top: 0,
          left: 0,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  )
}
