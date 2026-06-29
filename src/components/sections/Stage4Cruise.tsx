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

export function Stage4Cruise() {
  const sectionRef   = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const setActiveService = useSceneStore((s) => s.setActiveService)
  const cardsRef     = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.from(card, {
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 80%', once: true },
      })
    })
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
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <span className="label-text" style={{ display: 'block', marginBottom: '2rem' }}>
          04 — CRUISE
        </span>

        <h2 className="display-md" style={{ marginBottom: '8vh', textShadow: '0 2px 25px rgba(0,0,0,0.5)' }}>
          Cada destino,
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.5)' }}>
            una experiencia distinta.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleHover(null)}
              data-cursor="pointer"
              style={{
                padding: `2.5rem 0 2.5rem ${activeIdx === i ? '1.5rem' : '0'}`,
                borderBottom: '1px solid rgba(240,237,232,0.07)',
                cursor: 'none',
                transition: 'padding-left 0.4s ease, background 0.3s ease',
                background: activeIdx === i
                  ? 'linear-gradient(to right, rgba(5,5,15,0.4) 0%, transparent 80%)'
                  : 'transparent',
                display: 'grid',
                gridTemplateColumns: '60px 1fr auto',
                gap: '2rem',
                alignItems: 'start',
              }}
            >
              <span style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'rgba(240,237,232,0.25)',
                paddingTop: '0.2rem',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}>
                {s.number}
              </span>

              <div>
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                  color: activeIdx === i ? 'rgba(240,237,232,0.95)' : 'rgba(240,237,232,0.72)',
                  transition: 'color 0.3s ease',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  textShadow: '0 1px 15px rgba(0,0,0,0.4)',
                }}>
                  {s.name}
                </h3>
                <p className="body-text" style={{
                  maxWidth: '460px',
                  opacity: activeIdx === i ? 1 : 0,
                  transform: activeIdx === i ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  marginBottom: '1rem',
                }}>
                  {s.description}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  opacity: activeIdx === i ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}>
                  {s.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '0.3rem 0.7rem',
                      border: '1px solid rgba(240,237,232,0.14)',
                      color: 'rgba(240,237,232,0.45)',
                      fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span style={{
                fontSize: '0.75rem',
                color: 'rgba(240,237,232,0.28)',
                whiteSpace: 'nowrap',
                paddingTop: '0.35rem',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}>
                {s.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
