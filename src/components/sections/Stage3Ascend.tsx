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

export function Stage3Ascend() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const setActiveService = useSceneStore((s) => s.setActiveService)
  const setSelectedServices = useSceneStore((s) => s.setSelectedServices)

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

  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const handleRequestQuote = () => {
    setSelectedServices(Array.from(selected).map((i) => SERVICES[i].name))
    document.getElementById('mission-control')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '180vh', padding: '15vh 2rem', alignItems: 'flex-start' }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <span className="label-text" style={{ display: 'block', marginBottom: '6vh' }}>
          03 — SERVICIOS
        </span>

        <h2
          className="display-md"
          style={{
            marginBottom: '8vh',
            maxWidth: '600px',
            textShadow: '0 2px 30px rgba(0,0,0,0.7)',
          }}
        >
          Elige tu vuelo.
          <br />
          <em className="editorial" style={{ color: 'rgba(240,237,232,0.55)' }}>
            Cada ventana, un servicio.
          </em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6vh' }}>
          {SERVICES.map((s, i) => {
            const isSelected = selected.has(i)
            return (
              <div
                key={i}
                ref={(el) => { if (el) itemsRef.current[i] = el }}
              >
                <div
                  className="glass"
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => toggleSelect(i)}
                  data-cursor="pointer"
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    padding: '2rem',
                    cursor: 'none',
                    background: 'rgba(5,5,10,0.55)',
                    borderColor: isSelected ? 'rgba(212,175,90,0.65)' : undefined,
                    boxShadow: isSelected
                      ? '0 0 0 1px rgba(212,175,90,0.35), 0 20px 60px rgba(0,0,0,0.35)'
                      : '0 20px 60px rgba(0,0,0,0.25)',
                    animation: `float ${6 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.35}s`,
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: `1px solid ${isSelected ? 'rgba(212,175,90,0.9)' : 'rgba(240,237,232,0.25)'}`,
                      background: isSelected ? 'rgba(212,175,90,0.9)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: '#0a0a0a',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </span>

                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(240,237,232,0.4)',
                      fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    }}
                  >
                    {s.number}
                  </span>

                  <p
                    style={{
                      fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)',
                      fontWeight: 300,
                      lineHeight: 1.3,
                      margin: '0.6rem 0',
                      color: isSelected || s.accent ? 'rgba(240,237,232,0.95)' : 'rgba(240,237,232,0.7)',
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
                    style={{ maxWidth: '480px', marginBottom: '1rem' }}
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
            )
          })}
        </div>

        <div
          style={{
            marginTop: '6vh',
            opacity: selected.size > 0 ? 1 : 0,
            pointerEvents: selected.size > 0 ? 'auto' : 'none',
            transform: selected.size > 0 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <button
            onClick={handleRequestQuote}
            data-cursor="pointer"
            style={{
              background: 'rgba(212,175,90,0.08)',
              border: '1px solid rgba(212,175,90,0.45)',
              color: 'rgba(240,237,232,0.92)',
              padding: '1rem 2rem',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'none',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            Solicitar presupuesto ({selected.size}) →
          </button>
        </div>
      </div>
    </section>
  )
}
