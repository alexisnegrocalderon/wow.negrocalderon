'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Stage7Destination() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 60%',
        once: true,
      },
    })

    tl.from(line1Ref.current, {
      opacity: 0,
      y: 60,
      skewY: 3,
      duration: 1.3,
      ease: 'power4.out',
    })
      .from(
        line2Ref.current,
        { opacity: 0, y: 60, skewY: 3, duration: 1.3, ease: 'power4.out' },
        '-=0.8'
      )
      .from(
        subRef.current,
        { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      )

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '120vh',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <span
          className="label-text"
          style={{ display: 'block', marginBottom: '6vh' }}
        >
          07 — DESTINATION
        </span>

        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <div ref={line1Ref}>
            <p
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'rgba(240,237,232,0.9)',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}
            >
              No construyo páginas.
            </p>
          </div>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '6vh' }}>
          <div ref={line2Ref}>
            <p
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'rgba(240,237,232,0.9)',
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'italic',
              }}
            >
              Construyo experiencias.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(240,237,232,0.2)',
            }}
          />
          <p ref={subRef} className="body-text">
            Cada píxel con intención. Cada interacción con propósito.
            <br />
            Tu marca merece una experiencia que se recuerde.
          </p>
        </div>
      </div>
    </section>
  )
}
