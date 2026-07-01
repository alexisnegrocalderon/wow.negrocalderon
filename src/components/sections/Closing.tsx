'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_CONFIG } from '@/config'

export function Closing() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 65%',
        once: true,
      },
    })

    tl.from(line1Ref.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power4.out',
    })
      .from(
        line2Ref.current,
        { opacity: 0, y: 50, duration: 1.2, ease: 'power4.out' },
        '-=0.7'
      )
      .from(
        ctaRef.current,
        { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      )
      .from(
        footerRef.current,
        { opacity: 0, duration: 0.8 },
        '-=0.2'
      )

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '100vh',
        padding: '0 2rem',
        justifyContent: 'flex-end',
        paddingBottom: '15vh',
      }}
    >
      {/* Big farewell */}
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div ref={line1Ref}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                fontWeight: 300,
                color: 'rgba(240,237,232,0.35)',
                letterSpacing: '0.01em',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}
            >
              Gracias por volar con
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '5vh', overflow: 'hidden' }}>
          <div ref={line2Ref}>
            <p
              style={{
                fontSize: 'clamp(3rem, 9vw, 11rem)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: 'rgba(240,237,232,0.9)',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}
            >
              NEGR0
              <br />
              CALDERON.
            </p>
          </div>
        </div>

        <div ref={ctaRef}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <p
              className="editorial"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                color: 'rgba(240,237,232,0.6)',
              }}
            >
              Ahora es el turno de que
              <span style={{ color: 'rgba(240,237,232,0.9)' }}>
                {' '}tu marca despegue.
              </span>
            </p>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'transparent',
              border: '1px solid rgba(240,237,232,0.25)',
              color: 'rgba(240,237,232,0.8)',
              padding: '1.1rem 2.5rem',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(240,237,232,0.06)'
              el.style.borderColor = 'rgba(240,237,232,0.6)'
              el.style.color = 'rgba(240,237,232,0.95)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(240,237,232,0.25)'
              el.style.color = 'rgba(240,237,232,0.8)'
            }}
          >
            ✈️ &nbsp;Puerta de embarque — WhatsApp
          </a>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          style={{
            marginTop: '8vh',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(240,237,232,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span className="label-text" style={{ fontSize: '0.5rem' }}>
            © 2024 NEGR0CALDERON — EXPERIENCIAS DIGITALES PREMIUM
          </span>
          <span className="label-text" style={{ fontSize: '0.5rem' }}>
            DISEÑO. BRANDING. WEB. IA. ✈
          </span>
        </div>
      </div>
    </section>
  )
}
