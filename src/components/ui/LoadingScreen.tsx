'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useSceneStore } from '@/store/sceneStore'
import { soundSystem } from '@/lib/sound'

const LINE1 = 'No estás entrando a un sitio web.'
const LINE2 = 'Estás por despegar.'

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLParagraphElement>(null)
  const text2Ref = useRef<HTMLParagraphElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)

  const [phase, setPhase] = useState<'idle' | 'line' | 'text1' | 'text2' | 'enter' | 'done'>('idle')
  const { setIsEntered } = useSceneStore()

  // Animate characters one by one
  const revealText = (el: HTMLElement, text: string, onDone?: () => void) => {
    el.innerHTML = text
      .split('')
      .map((c, i) =>
        c === ' '
          ? `<span style="display:inline-block; width:0.3em">&nbsp;</span>`
          : `<span class="char" style="animation-delay:${i * 55}ms">${c}</span>`
      )
      .join('')
    const duration = text.length * 55 + 500
    setTimeout(() => onDone?.(), duration)
  }

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 })

    // Phase 1: line expands
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power3.inOut',
      onStart: () => setPhase('line'),
    })

    // Phase 2: first text
    tl.add(() => {
      setPhase('text1')
      if (text1Ref.current) {
        gsap.to(text1Ref.current, { opacity: 1, duration: 0.3 })
        revealText(text1Ref.current, LINE1, () => {
          // Phase 3: pause then fade out text1, show text2
          gsap.to(text1Ref.current!, {
            opacity: 0,
            duration: 0.6,
            delay: 1,
            onComplete: () => {
              setPhase('text2')
              if (text2Ref.current) {
                gsap.to(text2Ref.current, { opacity: 1, duration: 0.3 })
                revealText(text2Ref.current, LINE2, () => {
                  // Phase 4: show enter button
                  setTimeout(() => setPhase('enter'), 800)
                })
              }
            },
          })
        })
      }
    }, '+=0.3')

    return () => { tl.kill() }
  }, [])

  // Show enter button when phase is 'enter'
  useEffect(() => {
    if (phase === 'enter' && enterRef.current) {
      gsap.to(enterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }
  }, [phase])

  const handleEnter = async () => {
    setPhase('done')

    await soundSystem.init()
    soundSystem.unmute()
    useSceneStore.getState().toggleSound()

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsEntered(true)
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
      },
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
      }}
    >
      {/* Thin light ribbon */}
      <div
        ref={lineRef}
        style={{
          width: '40vw',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(240,237,232,0.8) 50%, transparent)',
          transformOrigin: 'center',
          transform: 'scaleX(0)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          boxShadow: '0 0 20px rgba(240,237,232,0.3), 0 0 60px rgba(240,237,232,0.1)',
        }}
      />

      {/* Text container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% calc(-50% + 4rem)',
          textAlign: 'center',
          minHeight: '3rem',
        }}
      >
        <p
          ref={text1Ref}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            color: 'rgba(240,237,232,0.85)',
            letterSpacing: '0.02em',
            opacity: 0,
          }}
        />
        <p
          ref={text2Ref}
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            fontWeight: 300,
            color: 'rgba(240,237,232,0.85)',
            letterSpacing: '0.02em',
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: '50%',
            translate: '-50% 0',
            whiteSpace: 'nowrap',
          }}
        />
      </div>

      {/* Enter button */}
      <button
        ref={enterRef}
        onClick={handleEnter}
        style={{
          position: 'absolute',
          bottom: '12vh',
          left: '50%',
          translate: '-50% 0',
          opacity: 0,
          transform: 'translateY(20px)',
          background: 'transparent',
          border: '1px solid rgba(240,237,232,0.2)',
          color: 'rgba(240,237,232,0.6)',
          padding: '0.9rem 2.8rem',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          cursor: 'none',
          transition: 'border-color 0.3s ease, color 0.3s ease',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        }}
        onMouseEnter={(e) => {
          ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(240,237,232,0.6)'
          ;(e.target as HTMLButtonElement).style.color = 'rgba(240,237,232,0.95)'
        }}
        onMouseLeave={(e) => {
          ;(e.target as HTMLButtonElement).style.borderColor = 'rgba(240,237,232,0.2)'
          ;(e.target as HTMLButtonElement).style.color = 'rgba(240,237,232,0.6)'
        }}
      >
        Embarcar
      </button>

      {/* Stage label */}
      {phase !== 'done' && (
        <span
          style={{
            position: 'absolute',
            bottom: '3vh',
            left: '50%',
            translate: '-50% 0',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,232,0.15)',
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          }}
        >
          NEGR0CALDERON
        </span>
      )}
    </div>
  )
}
