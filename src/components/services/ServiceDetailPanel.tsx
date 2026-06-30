'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Service } from '@/lib/servicesData'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

type ServiceDetailPanelProps = {
  service: Service | null
  isSelected: boolean
  onToggleSelect: () => void
  onClose: () => void
}

export function ServiceDetailPanel({ service, isSelected, onToggleSelect, onClose }: ServiceDetailPanelProps) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="glass"
          style={{
            position: 'relative',
            width: 'min(520px, 100%)',
            margin: '0 auto',
            borderRadius: '16px',
            padding: '2.25rem',
            background: 'rgba(8,7,6,0.78)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          <button
            onClick={onClose}
            data-cursor="pointer"
            aria-label="Cerrar"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid rgba(240,237,232,0.2)',
              background: 'transparent',
              color: 'rgba(240,237,232,0.7)',
              cursor: 'none',
              fontSize: '0.85rem',
            }}
          >
            ✕
          </button>

          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'rgba(240,237,232,0.4)',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            }}
          >
            {service.number}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.6rem 0 1.2rem' }}>
            <ServiceIcon icon={service.icon} size={28} />
            <h3
              style={{
                fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)',
                fontWeight: 300,
                color: 'rgba(240,237,232,0.95)',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              {service.name}
            </h3>
          </div>

          <p className="body-text" style={{ marginBottom: '1.5rem' }}>
            {service.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {service.checklist.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'rgba(212,175,90,0.85)', fontSize: '0.75rem' }}>✓</span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(240,237,232,0.7)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p
            className="label-text"
            style={{ marginBottom: '0.6rem', fontSize: '0.6rem' }}
          >
            IDEAL PARA
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {service.idealPara.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  padding: '0.35rem 0.8rem',
                  border: '1px solid rgba(240,237,232,0.16)',
                  color: 'rgba(240,237,232,0.5)',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'rgba(240,237,232,0.5)',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              }}
            >
              {service.price}
            </span>

            <button
              onClick={onToggleSelect}
              data-cursor="pointer"
              style={{
                background: isSelected ? 'rgba(212,175,90,0.08)' : 'rgba(212,175,90,0.9)',
                border: '1px solid rgba(212,175,90,0.65)',
                color: isSelected ? 'rgba(212,175,90,0.9)' : '#0a0a0a',
                padding: '0.85rem 1.6rem',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'none',
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                transition: 'all 0.25s ease',
              }}
            >
              {isSelected ? '✓ Agregado — Quitar' : '+ Agregar servicio'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
