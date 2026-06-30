'use client'

import { SERVICES } from '@/lib/servicesData'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

type ServicesListProps = {
  selected: Set<string>
  onToggle: (number: string) => void
}

export function ServicesList({ selected, onToggle }: ServicesListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      {SERVICES.map((s) => {
        const isSelected = selected.has(s.number)
        const tagline = s.description.length > 62
          ? s.description.slice(0, 62) + '…'
          : s.description

        return (
          <div
            key={s.number}
            onClick={() => onToggle(s.number)}
            data-cursor="pointer"
            className="glass"
            style={{
              borderRadius: '10px',
              padding: '1rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'none',
              borderColor: isSelected
                ? 'rgba(212,175,90,0.55)'
                : 'rgba(240,237,232,0.08)',
              borderLeft: isSelected
                ? '3px solid rgba(212,175,90,0.7)'
                : '3px solid transparent',
              background: isSelected
                ? 'linear-gradient(135deg, rgba(212,175,90,0.1), rgba(8,7,6,0.65))'
                : 'rgba(8,7,6,0.45)',
              transition: 'border-color 0.25s ease, background 0.25s ease',
            }}
          >
            {/* Left — icon + number */}
            <div
              style={{
                width: '44px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <ServiceIcon icon={s.icon} size={20} />
              <span
                style={{
                  fontSize: '0.5rem',
                  letterSpacing: '0.16em',
                  color: 'rgba(212,175,90,0.7)',
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontWeight: 500,
                }}
              >
                {s.number}
              </span>
            </div>

            {/* Center — name + tagline */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '1.1rem',
                  lineHeight: 1.2,
                  color: 'rgba(240,237,232,0.95)',
                  margin: 0,
                  marginBottom: '0.2rem',
                }}
              >
                {s.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontSize: '0.62rem',
                  lineHeight: 1.45,
                  color: 'rgba(240,237,232,0.4)',
                  margin: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Price */}
            <span
              style={{
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.06em',
                color: 'rgba(212,175,90,0.7)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {s.price}
            </span>

            {/* Toggle button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle(s.number)
              }}
              data-cursor="pointer"
              aria-label={isSelected ? `Quitar ${s.name}` : `Agregar ${s.name}`}
              style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: isSelected
                  ? '1px solid rgba(212,175,90,0.6)'
                  : '1px solid rgba(212,175,90,0.85)',
                background: isSelected
                  ? 'rgba(212,175,90,0.1)'
                  : 'rgba(212,175,90,0.85)',
                color: isSelected ? 'rgba(212,175,90,0.9)' : '#0a0a0a',
                cursor: 'none',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {isSelected ? '✓' : '+'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
