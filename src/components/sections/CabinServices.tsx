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
    accent: false,
  },
  {
    number: '02',
    name: 'Sitios Web',
    description: 'Tu mundo digital completo. Arquitectura premium, multi-página, rendimiento optimizado.',
    detail: 'desde $1,200',
    tags: ['Multi-página', 'SEO técnico', 'CMS', 'Performance'],
    accent: true,
  },
  {
    number: '03',
    name: 'Branding',
    description: 'Identidad que deja huella. Logo, paleta, tipografía y un sistema visual que vive en todo.',
    detail: 'desde $600',
    tags: ['Logo', 'Manual de marca', 'Sistema visual', 'Assets'],
    accent: false,
  },
  {
    number: '04',
    name: 'Automatización IA',
    description: 'Procesos que trabajan mientras duermes. CRM, email flows, chatbots, integraciones.',
    detail: 'desde $800',
    tags: ['n8n / Make', 'Chatbot', 'Email flows', 'CRM'],
    accent: true,
  },
  {
    number: '05',
    name: 'Contenido',
    description: 'Copy que vende sin sonar a vendedor. Web, email, redes. Con intención y con voz.',
    detail: 'desde $400',
    tags: ['Copywriting', 'Email', 'Redes sociales', 'SEO content'],
    accent: false,
  },
]

export function CabinServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const setActiveService = useSceneStore((s) => s.setActiveService)

  useEffect(() => {
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

  const handleHover = (i: number | null) => {
    setActiveIdx(i)
    setActiveService(i)
  }

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{
        minHeight: '200vh',
        padding: '15vh 2rem',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 1 }}>
        <span className="label-text" style={{ display: 'block', marginBottom: '6vh' }}>
          07 — CABIN
        </span>

        <h2
          className="display-md"
          style={{ marginBottom: '8vh', maxWidth: '600px', textShadow: '0 2px 30px rgba(0,0,0,0.7)' }}
        >
          Estás a bordo.
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.55)' }}>
            Aquí está cada servicio.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5vh' }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
              data-cursor="pointer"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                alignItems: 'start',
                paddingBottom: '5vh',
                borderBottom: i < SERVICES.length - 1
                  ? '1px solid rgba(240,237,232,0.10)'
                  : 'none',
                background: 'linear-gradient(to right, rgba(5,5,15,0.55) 0%, rgba(5,5,15,0.15) 70%, transparent 100%)',
                padding: '1.5rem',
                marginLeft: '-1.5rem',
                cursor: 'none',
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
                {s.number}
              </span>

              <div>
                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)',
                    fontWeight: 300,
                    lineHeight: 1.3,
                    marginBottom: '0.6rem',
                    color: activeIdx === i || s.accent ? 'rgba(240,237,232,0.92)' : 'rgba(240,237,232,0.62)',
                    fontFamily: s.accent
                      ? 'var(--font-cormorant), Georgia, serif'
                      : 'var(--font-space-grotesk), system-ui, sans-serif',
                    fontStyle: s.accent ? 'italic' : 'normal',
                    textShadow: '0 1px 12px rgba(0,0,0,0.5)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {s.name}
                </p>

                <p
                  className="body-text"
                  style={{ maxWidth: '480px', marginBottom: '1rem', textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
                >
                  {s.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
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
                    color: 'rgba(240,237,232,0.4)',
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
