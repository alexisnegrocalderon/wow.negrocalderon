'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '@/lib/servicesData'
import { ServicesCarousel } from '@/components/services/ServicesCarousel'
import { SelectedServicesBar } from '@/components/services/SelectedServicesBar'

export function Stage3Ascend() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    setIsMobile(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!headingRef.current) return
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 75%', once: true },
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  const toggleSelect = (number: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(number)) next.delete(number)
      else next.add(number)
      return next
    })
  }

  const selectedServices = SERVICES.filter((s) => selected.has(s.number))

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '180vh', padding: '15vh 2rem', alignItems: 'flex-start' }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          position: 'sticky',
          top: '12vh',
        }}
      >
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '4vh' }}>
          <span className="label-text" style={{ display: 'block', marginBottom: '1rem' }}>
            03 — SERVICIOS
          </span>

          <h2
            className="display-md"
            style={{
              marginBottom: '0.75rem',
              textShadow: '0 2px 30px rgba(0,0,0,0.7)',
            }}
          >
            Elige tu destino.
          </h2>

          <p className="editorial" style={{ color: 'rgba(240,237,232,0.55)', fontSize: '1.1rem' }}>
            Cada servicio es una puerta a nuevas oportunidades.
          </p>
        </div>

        <ServicesCarousel selected={selected} onToggleSelect={toggleSelect} isMobile={isMobile} />
      </div>

      <SelectedServicesBar sectionRef={sectionRef} selected={selectedServices} onRemove={toggleSelect} />
    </section>
  )
}
