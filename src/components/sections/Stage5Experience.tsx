'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PROJECTS = [
  {
    id: '001',
    name: 'PROYECTO AURA',
    category: 'Branding + Landing Page',
    description: 'Identidad visual completa para una consultora de bienestar. De cero a presencia premium en 3 semanas.',
    color: 'rgba(180, 165, 145, 0.12)',
  },
  {
    id: '002',
    name: 'PROYECTO APEX',
    category: 'Sitio Web + Automatización',
    description: 'E-commerce con funnel automatizado para agencia de viajes de lujo. CTR +340%.',
    color: 'rgba(120, 140, 180, 0.12)',
  },
  {
    id: '003',
    name: 'PROYECTO ETHER',
    category: 'Landing Page + Copy',
    description: 'Lanzamiento de producto digital. 1,200 leads en las primeras 72 horas.',
    color: 'rgba(160, 190, 160, 0.1)',
  },
]

export function Stage5Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.from(card, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 78%',
          once: true,
        },
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '160vh',
        padding: '15vh 2rem',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cabin interior backdrop — we've just broken through the clouds */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/cabin-interior.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 38%',
          opacity: 0.5,
          filter: 'saturate(0.8) brightness(0.78)',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.75) 55%, rgba(5,5,5,0.92) 100%)',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 1 }}>
        <span
          className="label-text"
          style={{ display: 'block', marginBottom: '2rem' }}
        >
          04 — THE EXPERIENCE
        </span>

        <h2 className="display-md" style={{ marginBottom: '8vh' }}>
          Cada proyecto
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.5)' }}>
            es un mundo.
          </em>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5px',
          }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="pointer"
              style={{
                background: hoveredId === p.id ? p.color : 'transparent',
                border: '1px solid rgba(240,237,232,0.07)',
                padding: '2.5rem',
                cursor: 'none',
                transition: 'background 0.5s ease, border-color 0.4s ease',
                borderColor: hoveredId === p.id
                  ? 'rgba(240,237,232,0.18)'
                  : 'rgba(240,237,232,0.07)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Breathing glow on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-50%',
                  background: `radial-gradient(circle at 50% 50%, ${p.color}, transparent 70%)`,
                  opacity: hoveredId === p.id ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                  pointerEvents: 'none',
                  animation: hoveredId === p.id ? 'float 4s ease-in-out infinite' : 'none',
                }}
              />

              <span
                style={{
                  display: 'block',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(240,237,232,0.2)',
                  marginBottom: '2rem',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.id}
              </span>

              <h3
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: 'rgba(240,237,232,0.85)',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.name}
              </h3>

              <span
                style={{
                  display: 'block',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,232,0.35)',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.category}
              </span>

              <p
                className="body-text"
                style={{
                  opacity: hoveredId === p.id ? 1 : 0,
                  transform: hoveredId === p.id ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className="body-text"
          style={{
            marginTop: '4rem',
            textAlign: 'center',
            opacity: 0.35,
          }}
        >
          Más proyectos en progreso — tu marca podría ser el siguiente.
        </p>
      </div>
    </section>
  )
}
