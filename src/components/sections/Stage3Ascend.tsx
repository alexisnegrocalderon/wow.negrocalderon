'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// This stage appears during the bright cloud/peach sky — needs dark backdrop on text
const MILESTONES = [
  { year: '2010', text: '11 años como Flight Attendant — primeras clases, destinos imposibles, gente que construye imperios.', accent: false },
  { year: '2015', text: 'Aprendí que la experiencia es el producto. No el vuelo. La sensación.', accent: true },
  { year: '2021', text: 'Aterrizaje. Pandemia. Un nuevo despegue en otra pista.', accent: false },
  { year: 'HOY',  text: 'Diseño. Branding. Web. IA. Automatización. El mismo nivel de detalle, ahora en cada píxel.', accent: true },
]

export function Stage3Ascend() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef   = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    itemsRef.current.forEach((item, i) => {
      if (!item) return
      gsap.from(item, {
        opacity: 0,
        x: i % 2 === 0 ? -55 : 55,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 75%', once: true },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '180vh', padding: '15vh 2rem', alignItems: 'flex-start' }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <span className="label-text" style={{ display: 'block', marginBottom: '6vh' }}>
          03 — ASCEND
        </span>

        <h2
          className="display-md"
          style={{
            marginBottom: '8vh',
            maxWidth: '600px',
            textShadow: '0 2px 30px rgba(0,0,0,0.7)',
          }}
        >
          Detrás de cada marca
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.55)' }}>
            hay un vuelo que contar.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5vh' }}>
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                alignItems: 'start',
                paddingBottom: '5vh',
                borderBottom: i < MILESTONES.length - 1
                  ? '1px solid rgba(240,237,232,0.10)'
                  : 'none',
                // Glass backdrop so text is readable on bright cloud sky
                background: 'linear-gradient(to right, rgba(5,5,15,0.55) 0%, rgba(5,5,15,0.15) 70%, transparent 100%)',
                padding: '1.5rem',
                marginLeft: '-1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(240,237,232,0.4)',
                  paddingTop: '0.15rem',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}
              >
                {m.year}
              </span>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.65rem)',
                  fontWeight: 300,
                  lineHeight: 1.4,
                  color: m.accent ? 'rgba(240,237,232,0.92)' : 'rgba(240,237,232,0.62)',
                  fontFamily: m.accent
                    ? 'var(--font-cormorant), Georgia, serif'
                    : 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontStyle: m.accent ? 'italic' : 'normal',
                  textShadow: '0 1px 12px rgba(0,0,0,0.5)',
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
