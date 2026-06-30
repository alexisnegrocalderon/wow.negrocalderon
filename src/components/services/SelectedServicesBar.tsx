'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Service } from '@/lib/servicesData'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { buildServicesWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

type SelectedServicesBarProps = {
  sectionRef: React.RefObject<HTMLElement>
  selected: Service[]
  onRemove: (number: string) => void
}

export function SelectedServicesBar({ sectionRef, selected, onRemove }: SelectedServicesBarProps) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionRef])

  const visible = inView && selected.length > 0

  const handleQuote = () => {
    const message = buildServicesWhatsAppMessage(selected)
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="glass"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: '2rem',
            transform: 'translateX(-50%)',
            zIndex: 50,
            width: 'min(680px, calc(100vw - 2rem))',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            background: 'rgba(8,7,6,0.82)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
            {selected.map((s) => (
              <span
                key={s.number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(240,237,232,0.16)',
                  borderRadius: '999px',
                  padding: '0.35rem 0.5rem 0.35rem 0.65rem',
                  fontSize: '0.7rem',
                  color: 'rgba(240,237,232,0.75)',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}
              >
                <ServiceIcon icon={s.icon} size={13} />
                {s.name}
                <button
                  onClick={() => onRemove(s.number)}
                  data-cursor="pointer"
                  aria-label={`Quitar ${s.name}`}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(240,237,232,0.4)',
                    cursor: 'none',
                    fontSize: '0.65rem',
                    padding: 0,
                    marginLeft: '0.15rem',
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleQuote}
            data-cursor="pointer"
            style={{
              background: 'rgba(212,175,90,0.9)',
              border: '1px solid rgba(212,175,90,0.9)',
              color: '#0a0a0a',
              padding: '0.8rem 1.4rem',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'none',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            Ver plan &amp; presupuesto →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
