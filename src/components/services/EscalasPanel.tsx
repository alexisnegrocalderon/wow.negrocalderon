'use client'

import type { Service } from '@/lib/servicesData'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { buildServicesWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

type EscalasPanelProps = {
  selected: Service[]
  onRemove: (number: string) => void
}

function parseBasePrice(price: string): number {
  const match = price.match(/\$(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

export function EscalasPanel({ selected, onRemove }: EscalasPanelProps) {
  const total = selected.reduce((sum, s) => sum + parseBasePrice(s.price), 0)

  const handleQuote = () => {
    const message = buildServicesWhatsAppMessage(selected)
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="glass"
      style={{
        borderRadius: '14px',
        padding: '1.5rem',
        background: 'rgba(8,7,6,0.62)',
        position: 'sticky',
        top: '12vh',
      }}
    >
      {/* Heading */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}
      >
        <span style={{ fontSize: '1rem' }}>✈</span>
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,232,0.55)',
          }}
        >
          Escalas del vuelo
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(240,237,232,0.08)',
          marginBottom: '1.1rem',
        }}
      />

      {/* Empty state */}
      {selected.length === 0 && (
        <div
          style={{
            border: '1px dashed rgba(240,237,232,0.12)',
            borderRadius: '8px',
            padding: '1.5rem 1rem',
            textAlign: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              fontSize: '0.68rem',
              lineHeight: 1.6,
              color: 'rgba(240,237,232,0.3)',
              margin: 0,
            }}
          >
            Selecciona tus escalas para
            <br />
            armar tu itinerario.
          </p>
        </div>
      )}

      {/* Selected items */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.1rem' }}>
          {selected.map((s) => (
            <div
              key={s.number}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ServiceIcon icon={s.icon} size={14} />
              <span
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontSize: '0.7rem',
                  color: 'rgba(240,237,232,0.8)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {s.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  fontSize: '0.62rem',
                  color: 'rgba(212,175,90,0.65)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {s.price}
              </span>
              <button
                onClick={() => onRemove(s.number)}
                data-cursor="pointer"
                aria-label={`Quitar ${s.name}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(240,237,232,0.3)',
                  cursor: 'none',
                  fontSize: '0.6rem',
                  padding: '0 0.1rem',
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              height: '1px',
              background: 'rgba(240,237,232,0.08)',
              margin: '0.5rem 0',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(240,237,232,0.35)',
              }}
            >
              Inversión estimada
            </span>
            <span
              style={{
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'rgba(212,175,90,0.9)',
              }}
            >
              desde ${total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleQuote}
        disabled={selected.length === 0}
        data-cursor="pointer"
        style={{
          width: '100%',
          padding: '0.9rem 1rem',
          background: selected.length > 0 ? 'rgba(212,175,90,0.9)' : 'rgba(212,175,90,0.15)',
          border: '1px solid rgba(212,175,90,0.65)',
          color: selected.length > 0 ? '#0a0a0a' : 'rgba(212,175,90,0.35)',
          fontSize: '0.62rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          cursor: selected.length > 0 ? 'none' : 'default',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          transition: 'all 0.25s ease',
          marginTop: selected.length === 0 ? 0 : '0',
        }}
      >
        Itinerario seleccionado →
      </button>
    </div>
  )
}
