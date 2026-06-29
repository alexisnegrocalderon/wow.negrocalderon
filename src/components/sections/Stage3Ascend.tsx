'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const MILESTONES = [
  { year: '2010', text: 'Flight Attendant. 11 años en las alturas.', accent: false },
  { year: '2015', text: 'Primera clase. Caras de personas que construyen imperios.', accent: true },
  { year: '2021', text: 'Aterrizaje. Un nuevo despegue.', accent: false },
  { year: 'HOY', text: 'Diseño. Branding. Web. IA. Automatización.', accent: true },
]

export function Stage3Ascend() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    itemsRef.current.forEach((item, i) => {
      if (!item) return
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -60 : 60,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          once: true,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '180vh',
        padding: '15vh 2rem',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <span
          className="label-text"
          style={{ display: 'block', marginBottom: '6vh' }}
        >
          03 — ASCEND
        </span>

        <h2
          className="display-md"
          style={{ marginBottom: '8vh', maxWidth: '600px' }}
        >
          Detrás de cada marca
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.5)' }}>
            hay un vuelo que contar.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6vh' }}>
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                alignItems: 'start',
                paddingBottom: '6vh',
                borderBottom: i < MILESTONES.length - 1
                  ? '1px solid rgba(240,237,232,0.06)'
                  : 'none',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(240,237,232,0.3)',
                  paddingTop: '0.15rem',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}
              >
                {m.year}
              </span>
              <p
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
                  fontWeight: 300,
                  lineHeight: 1.3,
                  color: m.accent ? 'rgba(240,237,232,0.85)' : 'rgba(240,237,232,0.55)',
                  fontFamily: m.accent
                    ? 'var(--font-cormorant), Georgia, serif'
                    : 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontStyle: m.accent ? 'italic' : 'normal',
                }}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
