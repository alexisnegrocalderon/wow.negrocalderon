'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSceneStore } from '@/store/sceneStore'
import { soundSystem } from '@/lib/sound'

const LINE1 = 'No estás entrando a un sitio web.'
const LINE2 = 'Estás por despegar.'

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const topRef       = useRef<HTMLDivElement>(null)
  const botRef       = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const text1Ref     = useRef<HTMLParagraphElement>(null)
  const text2Ref     = useRef<HTMLParagraphElement>(null)

  const { setIsEntered } = useSceneStore()

  const revealChars = (el: HTMLElement, text: string) => {
    el.innerHTML = text
      .split('')
      .map((c, i) =>
        c === ' '
          ? `<span style="display:inline-block;width:0.32em">&nbsp;</span>`
          : `<span style="display:inline-block;opacity:0;animation:char-reveal 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 65}ms forwards">${c}</span>`
      )
      .join('')
  }

  useEffect(() => {
    // Prevent accidental scroll during intro
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Audio: unlock on first user gesture
    const unlock = async () => {
      try {
        await soundSystem.init()
        soundSystem.unmute()
        useSceneStore.getState().toggleSound()
      } catch (_) { /* browser may block */ }
    }
    document.addEventListener('mousemove',  unlock, { once: true, passive: true })
    document.addEventListener('touchstart', unlock, { once: true, passive: true })
    document.addEventListener('click',      unlock, { once: true })

    const tl = gsap.timeline({ delay: 0.4 })

    // ── 1. Light ribbon expands from center ──────────────────────────────────
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.9, ease: 'power3.inOut' }
    )

    // ── 2. First text appears character by character ──────────────────────────
    tl.fromTo(
      text1Ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.15,
        onComplete: () => { if (text1Ref.current) revealChars(text1Ref.current, LINE1) },
      },
      '+=0.35'
    )

    // ── 3. Fade out first text ────────────────────────────────────────────────
    tl.to(text1Ref.current, { opacity: 0, duration: 0.55, ease: 'power2.in' }, '+=2.9')

    // ── 4. Second text ────────────────────────────────────────────────────────
    tl.fromTo(
      text2Ref.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.15,
        onComplete: () => { if (text2Ref.current) revealChars(text2Ref.current, LINE2) },
      },
      '+=0.25'
    )

    // ── 5. Fade out second text ───────────────────────────────────────────────
    tl.to(text2Ref.current, { opacity: 0, duration: 0.55, ease: 'power2.in' }, '+=2.1')

    // ── 6. Ribbon intensifies — the door is about to open ────────────────────
    tl.to(
      lineRef.current,
      {
        boxShadow: '0 0 30px rgba(240,237,232,0.95), 0 0 80px rgba(240,237,232,0.4), 0 0 180px rgba(240,237,232,0.18)',
        height: '2px',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '+=0.35'
    )

    // ── 7. THE SPLIT — smooth automatic open ─────────────────────────────────
    tl.to(topRef.current, { yPercent: -100, duration: 1.6, ease: 'power4.inOut' }, '+=0.15')
    tl.to(botRef.current, { yPercent:  100, duration: 1.6, ease: 'power4.inOut' }, '<')
    tl.to(lineRef.current, { opacity: 0, duration: 0.5 }, '<+=0.5')

    // ── 8. Done ───────────────────────────────────────────────────────────────
    tl.add(() => {
      document.body.style.overflow = prev || ''
      setIsEntered(true)
      if (containerRef.current) containerRef.current.style.display = 'none'
    })

    return () => {
      tl.kill()
      document.body.style.overflow = prev || ''
      document.removeEventListener('mousemove',  unlock)
      document.removeEventListener('touchstart', unlock)
      document.removeEventListener('click',      unlock)
    }
  }, [setIsEntered])

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>

      {/* ── Top panel ─────────────────────────────────────────────────────── */}
      <div
        ref={topRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: '#050505',
          zIndex: 2,
          transformOrigin: 'top center',
        }}
      />

      {/* ── Bottom panel ──────────────────────────────────────────────────── */}
      <div
        ref={botRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: '#050505',
          zIndex: 2,
          transformOrigin: 'bottom center',
        }}
      />

      {/* ── Light ribbon at the seam ──────────────────────────────────────── */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '8%',
          right: '8%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(240,237,232,0.9) 12%, rgba(240,237,232,0.9) 88%, transparent)',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
          opacity: 0,
          boxShadow: '0 0 18px rgba(240,237,232,0.5), 0 0 55px rgba(240,237,232,0.2)',
          zIndex: 3,
        }}
      />

      {/* ── Texts — centered, above both panels ───────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(50% - 1.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        {[text1Ref, text2Ref].map((ref, idx) => (
          <p
            key={idx}
            ref={ref}
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 5.4vw, 3.6rem)',
              fontWeight: 300,
              color: 'rgba(240,237,232,0.92)',
              letterSpacing: '0.01em',
              textShadow: '0 6px 60px rgba(240,237,232,0.2)',
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          />
        ))}
      </div>

      {/* ── Brand watermark ───────────────────────────────────────────────── */}
      <span
        style={{
          position: 'absolute',
          bottom: '3vh',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.54rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: 'rgba(240,237,232,0.11)',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        NEGR0CALDERON
      </span>
    </div>
  )
}
