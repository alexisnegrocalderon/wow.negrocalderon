'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Stage1Boarding() {
  const sectionRef  = useRef<HTMLElement>(null)
  const labelRef    = useRef<HTMLSpanElement>(null)
  const headRef     = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    })
    tl.from(labelRef.current, { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out' })
      .from(headRef.current,  { opacity: 0, y: 44, duration: 1.3, ease: 'power3.out' }, '-=0.4')
      .from(subRef.current,   { opacity: 0, y: 20, duration: 0.9, ease: 'power2.out' }, '-=0.6')
      .from(scrollHintRef.current, { opacity: 0, duration: 0.8 }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '100vh', padding: '0 2rem' }}
    >
      <div style={{ maxWidth: '900px', width: '100%', paddingTop: '8vh' }}>
        <span ref={labelRef} className="label-text" style={{ display: 'block', marginBottom: '2.5rem' }}>
          01 — BOARDING
        </span>

        <h1
          ref={headRef}
          className="display-xl"
          style={{
            marginBottom: '2rem',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(4rem, 11vw, 14rem)',
          }}
        >
          Tu marca
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(240,237,232,0.6)' }}>
            merece despegar.
          </em>
        </h1>

        <p ref={subRef} className="body-text" style={{ maxWidth: '440px' }}>
          Soy Alexis Negrocalderon. 11 años sobrevolando el mundo como Flight Attendant.
          <br />
          Hoy vuelo marcas hacia donde merecen estar.
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '5vh',
          left: '50%',
          translate: '-50% 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span className="label-text" style={{ fontSize: '0.5rem' }}>SCROLL</span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(240,237,232,0.35), transparent)',
            animation: 'float 2.5s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
