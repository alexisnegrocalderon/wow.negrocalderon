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
  const tagline = service.description.length > 55
    ? service.description.slice(0, 55) + '…'
    : service.description

  return (
    <div
      onClick={onClick}
      data-cursor="pointer"
      style={{
        position: 'relative',
        width: '300px',
        height: '130px',
        flexShrink: 0,
        cursor: 'none',
        ...style,
      }}
    >
      {isSelected && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '0.6rem',
            right: '0.6rem',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'rgba(212,175,90,0.9)',
            color: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            zIndex: 2,
          }}
        >
          ✓
        </span>
      )}

      <div
        className="glass"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'row',
          background: isSelected
            ? 'linear-gradient(135deg, rgba(212,175,90,0.22), rgba(8,7,6,0.75))'
            : isCenter
            ? 'linear-gradient(135deg, rgba(212,175,90,0.1), rgba(8,7,6,0.65))'
            : 'rgba(8,7,6,0.55)',
          borderColor: isSelected
            ? 'rgba(212,175,90,0.7)'
            : isCenter
            ? 'rgba(212,175,90,0.3)'
            : 'rgba(212,175,90,0.1)',
          boxShadow: isSelected
            ? '0 0 0 1px rgba(212,175,90,0.5), 0 0 50px rgba(212,175,90,0.28), 0 20px 50px rgba(0,0,0,0.5)'
            : isCenter
            ? '0 0 30px rgba(212,175,90,0.14), 0 16px 40px rgba(0,0,0,0.45)'
            : '0 12px 35px rgba(0,0,0,0.45)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
          overflow: 'hidden',
        }}
      >
        {/* Left zone — icon + number */}
        <div
          style={{
            width: '76px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            borderRight: '1px dashed rgba(212,175,90,0.28)',
            padding: '0.75rem 0',
          }}
        >
          <div style={{ position: 'relative' }}>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-8px',
                background: 'radial-gradient(circle, rgba(212,175,90,0.35), transparent 70%)',
                filter: 'blur(6px)',
                zIndex: 0,
              }}
            />
            <span style={{ position: 'relative', display: 'block', zIndex: 1 }}>
              <ServiceIcon icon={service.icon} size={24} />
            </span>
          </div>
          <span
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              color: 'rgba(212,175,90,0.7)',
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              fontWeight: 500,
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Right zone — name + tagline + price */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0.75rem 0.9rem 0.75rem 0.85rem',
            gap: '0.3rem',
            minWidth: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.2,
              color: 'rgba(240,237,232,0.95)',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {service.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              fontSize: '0.6rem',
              lineHeight: 1.4,
              color: 'rgba(240,237,232,0.45)',
              margin: 0,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {tagline}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: 'rgba(212,175,90,0.65)',
              margin: 0,
              marginTop: '0.1rem',
            }}
          >
            {service.price}
          </p>
        </div>
      </div>
    </div>
  )
}
