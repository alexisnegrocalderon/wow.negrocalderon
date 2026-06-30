'use client'

import type { Service } from '@/lib/servicesData'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

type ServiceCardProps = {
  service: Service
  isSelected: boolean
  isCenter: boolean
  style?: React.CSSProperties
  onClick: () => void
}

export function ServiceCard({ service, isSelected, isCenter, style, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      data-cursor="pointer"
      style={{
        position: 'relative',
        width: '150px',
        height: '190px',
        flexShrink: 0,
        cursor: 'none',
        ...style,
      }}
    >
      <div
        className="glass"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          padding: '1.25rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          background: isCenter ? 'rgba(10,9,7,0.35)' : 'rgba(10,9,7,0.22)',
          borderColor: isSelected
            ? 'rgba(212,175,90,0.7)'
            : isCenter
            ? 'rgba(212,175,90,0.3)'
            : 'rgba(212,175,90,0.1)',
          boxShadow: isSelected
            ? '0 0 0 1px rgba(212,175,90,0.45), 0 0 45px rgba(212,175,90,0.28), 0 20px 50px rgba(0,0,0,0.4)'
            : isCenter
            ? '0 0 30px rgba(212,175,90,0.14), 0 16px 40px rgba(0,0,0,0.3)'
            : '0 16px 40px rgba(0,0,0,0.3)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        }}
      >
        {isSelected && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'rgba(212,175,90,0.9)',
              color: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
            }}
          >
            ✓
          </span>
        )}

        <div style={{ position: 'relative' }}>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: '-10px',
              background: 'radial-gradient(circle, rgba(212,175,90,0.4), transparent 70%)',
              filter: 'blur(7px)',
              zIndex: 0,
            }}
          />
          <span style={{ position: 'relative', display: 'block', zIndex: 1 }}>
            <ServiceIcon icon={service.icon} size={24} />
          </span>
        </div>

        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(240,237,232,0.4)',
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            marginTop: '0.9rem',
          }}
        >
          {service.number}
        </span>

        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 400,
            lineHeight: 1.3,
            marginTop: '0.4rem',
            color: 'rgba(240,237,232,0.9)',
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}
        >
          {service.name}
        </p>
      </div>
    </div>
  )
}
