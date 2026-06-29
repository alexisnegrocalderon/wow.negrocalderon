'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSceneStore } from '@/store/sceneStore'

export function Stage6Turbulence() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)
  const setTurbulence = useSceneStore((s) => s.setTurbulence)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true

        // Fire the turbulence sequence
        const tl = gsap.timeline()

        // Ramp up turbulence in WebGL
        tl.to({}, {
          duration: 0.1,
          onStart: () => setTurbulence(1),
        })

        // Shake the text layer
        tl.to(textRef.current, {
          x: () => (Math.random() - 0.5) * 20,
          y: () => (Math.random() - 0.5) * 20,
          rotation: () => (Math.random() - 0.5) * 3,
          duration: 0.08,
          ease: 'none',
          repeat: 8,
          yoyo: true,
        })

        // Hold turbulence
        tl.to({}, { duration: 0.8 })

        // Ramp down
        tl.to({}, {
          duration: 0.5,
          onStart: () => {
            gsap.to({ t: 1 }, {
              t: 0,
              duration: 1.2,
              ease: 'power2.out',
              onUpdate: function () {
                setTurbulence(this.targets()[0].t as number)
              },
              onComplete: () => setTurbulence(0),
            })
          },
        })

        // Restore text position
        tl.to(textRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [setTurbulence])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <span
        className="label-text"
        style={{
          position: 'absolute',
          top: '8vh',
          left: '2rem',
        }}
      >
        06 — TURBULENCE
      </span>

      <div
        ref={textRef}
        style={{ textAlign: 'center', padding: '0 2rem' }}
      >
        <p
          className="editorial"
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
            fontWeight: 300,
            color: 'rgba(240,237,232,0.7)',
            lineHeight: 1.5,
            maxWidth: '600px',
          }}
        >
          Los mejores viajes tienen
          <br />
          <span style={{ color: 'rgba(240,237,232,0.95)' }}>
            un momento de tensión.
          </span>
          <br />
          Lo que importa es cómo aterrizas.
        </p>
      </div>
    </section>
  )
}
