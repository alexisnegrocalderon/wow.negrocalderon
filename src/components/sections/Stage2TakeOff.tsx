'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Stage2TakeOff() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const word3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Words fly in from depth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
        },
      })

      tl.from(word1Ref.current, {
        z: -300,
        opacity: 0,
        scale: 0.3,
        duration: 1,
        ease: 'power2.out',
      })
        .from(
          word2Ref.current,
          { z: -300, opacity: 0, scale: 0.3, duration: 1, ease: 'power2.out' },
          '-=0.5'
        )
        .from(
          word3Ref.current,
          { z: -300, opacity: 0, scale: 0.3, duration: 1, ease: 'power2.out' },
          '-=0.5'
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            scale: 1.2,
            duration: 0.5,
          },
          '+=0.2'
        )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="stage-section"
      style={{ minHeight: '100vh', perspective: '800px' }}
    >
      <span
        className="label-text"
        style={{
          position: 'absolute',
          top: '8vh',
          left: '2rem',
        }}
      >
        02 — TAKE OFF
      </span>

      <div
        ref={containerRef}
        style={{
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            lineHeight: 0.9,
          }}
        >
          <span
            ref={word1Ref}
            className="display-xl"
            style={{
              display: 'block',
              fontWeight: 300,
            }}
          >
            Velocidad.
          </span>
          <span
            ref={word2Ref}
            className="display-xl editorial"
            style={{
              display: 'block',
              color: 'rgba(240,237,232,0.4)',
              fontWeight: 300,
            }}
          >
            Dirección.
          </span>
          <span
            ref={word3Ref}
            className="display-xl"
            style={{
              display: 'block',
              fontWeight: 300,
            }}
          >
            Impacto.
          </span>
        </div>
      </div>
    </section>
  )
}
