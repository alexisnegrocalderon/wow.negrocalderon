'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSceneStore } from '@/store/sceneStore'

const SERVICES = [
  {
    number: '01',
    name: 'Landing Pages',
    description: 'Una página que convierte. Diseñada para un objetivo, un mensaje, una acción. Nada sobra.',
    detail: 'desde $350',
    tags: ['Conversión', 'Copy estratégico', 'Mobile-first', 'SEO'],
  },
  {
    number: '02',
    name: 'Sitios Web',
    description: 'Tu mundo digital completo. Arquitectura premium, multi-página, rendimiento optimizado.',
    detail: 'desde $1,200',
    tags: ['Multi-página', 'SEO técnico', 'CMS', 'Performance'],
  },
  {
    number: '03',
    name: 'Branding',
    description: 'Identidad que deja huella. Logo, paleta, tipografía y un sistema visual que vive en todo.',
    detail: 'desde $600',
    tags: ['Logo', 'Manual de marca', 'Sistema visual', 'Assets'],
  },
  {
    number: '04',
    name: 'Automatización IA',
    description: 'Procesos que trabajan mientras duermes. CRM, email flows, chatbots, integraciones.',
    detail: 'desde $800',
    tags: ['n8n / Make', 'Chatbot', 'Email flows', 'CRM'],
  },
  {
    number: '05',
    name: 'Contenido',
    description: 'Copy que vende sin sonar a vendedor. Web, email, redes. Con intención y con voz.',
    detail: 'desde $400',
    tags: ['Copywriting', 'Email', 'Redes sociales', 'SEO content'],
  },
]

export function CabinServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const setActiveService = useSceneStore((s) => s.setActiveService)
  const rowsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return
      gsap.from(row, {
        opacity: 0,
        y: 50,
        scale: 0.94,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: { trigger: row, start: 'top 82%', once: true },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const handleHover = (i: number | null) => {
    setActiveIdx(i)
    setActiveService(i)
  }

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '200vh', padding: '15vh 2rem', alignItems: 'flex-start' }}
    >
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <span className="label-text" style={{ display: 'block', marginBottom: '2rem' }}>
          07 — CABIN
        </span>

        <h2 className="display-md" style={{ marginBottom: '8vh', textShadow: '0 2px 25px rgba(0,0,0,0.6)' }}>
          Mira por la ventana.
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.55)' }}>
            Ahí está tu próximo servicio.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8vh' }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) rowsRef.current[i] = el }}
              className="cabin-row"
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
              data-cursor="pointer"
              style={{
                display: 'flex',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 4rem)',
                cursor: 'none',
              }}
            >
              {/* Window */}
              <div
                className="cabin-window"
                style={{
                  width: 'clamp(160px, 22vw, 260px)',
                  height: 'clamp(220px, 28vw, 340px)',
                  flexShrink: 0,
                  position: 'relative',
                  transform: activeIdx === i ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '14%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  {s.number}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'left' : 'right' }}>
                <h3
                  style={{
                    fontSize: 'clamp(1.3rem, 2.6vw, 2.1rem)',
                    fontWeight: 300,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                    color: activeIdx === i ? 'rgba(240,237,232,0.95)' : 'rgba(240,237,232,0.72)',
                    transition: 'color 0.3s ease',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    textShadow: '0 1px 15px rgba(0,0,0,0.5)',
                  }}
                >
                  {s.name}
                </h3>

                <p
                  className="body-text"
                  style={{
                    maxWidth: '420px',
                    marginLeft: i % 2 === 0 ? 0 : 'auto',
                    opacity: activeIdx === i ? 1 : 0,
                    transform: activeIdx === i ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    marginBottom: '1rem',
                  }}
                >
                  {s.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                    opacity: activeIdx === i ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    marginBottom: '1rem',
                  }}
                >
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.55rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.7rem',
                        border: '1px solid rgba(240,237,232,0.14)',
                        color: 'rgba(240,237,232,0.45)',
                        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(240,237,232,0.32)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  {s.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
