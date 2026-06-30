'use client'

import { useRef, useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { useSceneStore } from '@/store/sceneStore'
import { SERVICES } from '@/lib/servicesData'
import { ServiceCard } from './ServiceCard'
import { ServiceDetailPanel } from './ServiceDetailPanel'

const RADIUS = 260
const ANGLE_STEP = 32
const DRAG_STEP_PX = 120

type ServicesCarouselProps = {
  selected: Set<string>
  onToggleSelect: (number: string) => void
  isMobile: boolean
}

export function ServicesCarousel({ selected, onToggleSelect, isMobile }: ServicesCarouselProps) {
  const [centerIndex, setCenterIndex] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const setActiveService = useSceneStore((s) => s.setActiveService)

  const dragStartIndex = useRef(0)

  const clampIndex = (i: number) => Math.max(0, Math.min(SERVICES.length - 1, i))

  const goTo = (i: number) => {
    const next = clampIndex(i)
    setCenterIndex(next)
    setActiveService(next)
  }

  const handleCardClick = (i: number) => {
    if (isDragging) return
    goTo(i)
    setDetailOpen(true)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    dragStartIndex.current = centerIndex
  }

  const handleDrag = (_: unknown, info: PanInfo) => {
    setDragOffset(info.offset.x)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const steps = -info.offset.x / DRAG_STEP_PX
    const velocitySteps = -info.velocity.x / 900
    const total = Math.round(steps + velocitySteps)
    goTo(dragStartIndex.current + total)
    setDragOffset(0)
    setIsDragging(false)
  }

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '1rem 0 1.5rem',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={s.number}
            service={s}
            isSelected={selected.has(s.number)}
            isCenter={i === centerIndex}
            onClick={() => handleCardClick(i)}
            style={{ scrollSnapAlign: 'center' }}
          />
        ))}

        {detailOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'rgba(0,0,0,0.6)',
            }}
            onClick={() => setDetailOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%' }}>
              <ServiceDetailPanel
                service={detailOpen ? SERVICES[centerIndex] : null}
                isSelected={selected.has(SERVICES[centerIndex].number)}
                onToggleSelect={() => {
                  const wasSelected = selected.has(SERVICES[centerIndex].number)
                  onToggleSelect(SERVICES[centerIndex].number)
                  if (!wasSelected) setDetailOpen(false)
                }}
                onClose={() => setDetailOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ position: 'relative', height: '440px' }}>
        <div style={{ position: 'absolute', inset: 0, perspective: '1300px' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'min(900px, 92vw)',
              height: '64px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,90,0.35)',
              boxShadow: '0 0 40px rgba(212,175,90,0.22), 0 0 90px rgba(212,175,90,0.1)',
              opacity: detailOpen ? 0 : 0.6,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'grab' }}
          >
            {SERVICES.map((s, i) => {
              const continuousIndex = i - centerIndex + dragOffset / -DRAG_STEP_PX
              const angle = continuousIndex * ANGLE_STEP
              const rad = (angle * Math.PI) / 180
              const translateX = Math.sin(rad) * RADIUS
              const translateZ = Math.cos(rad) * RADIUS - RADIUS
              const absDist = Math.abs(continuousIndex)
              const scale = Math.max(0.55, 1 - absDist * 0.18)
              let opacity = Math.max(0, 1 - absDist * 0.35)
              if (detailOpen) opacity *= i === centerIndex ? 0.2 : 0.12

              return (
                <ServiceCard
                  key={s.number}
                  service={s}
                  isSelected={selected.has(s.number)}
                  isCenter={i === centerIndex}
                  onClick={() => handleCardClick(i)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginLeft: '-75px',
                    marginTop: '-95px',
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-angle}deg) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(100 - absDist * 10),
                    pointerEvents: detailOpen || absDist > 3 ? 'none' : 'auto',
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
                  }}
                />
              )
            })}
          </motion.div>
        </div>

        <button
          onClick={() => goTo(centerIndex - 1)}
          disabled={centerIndex === 0}
          data-cursor="pointer"
          aria-label="Anterior"
          style={{
            ...arrowStyle,
            left: '0.5rem',
            opacity: centerIndex === 0 ? 0.2 : 0.7,
          }}
        >
          ←
        </button>
        <button
          onClick={() => goTo(centerIndex + 1)}
          disabled={centerIndex === SERVICES.length - 1}
          data-cursor="pointer"
          aria-label="Siguiente"
          style={{
            ...arrowStyle,
            right: '0.5rem',
            opacity: centerIndex === SERVICES.length - 1 ? 0.2 : 0.7,
          }}
        >
          →
        </button>

        {detailOpen && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
            }}
          >
            <ServiceDetailPanel
              service={detailOpen ? SERVICES[centerIndex] : null}
              isSelected={selected.has(SERVICES[centerIndex].number)}
              onToggleSelect={() => {
                const wasSelected = selected.has(SERVICES[centerIndex].number)
                onToggleSelect(SERVICES[centerIndex].number)
                if (!wasSelected) setDetailOpen(false)
              }}
              onClose={() => setDetailOpen(false)}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          marginTop: '1rem',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(212,175,90,0.75)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          style={{ animation: 'swipe-hint 1.8s ease-in-out infinite' }}
        >
          <path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3" />
        </svg>
        <p className="label-text" style={{ fontSize: '0.6rem', opacity: 0.6 }}>
          Desliza para explorar
        </p>
      </div>
    </div>
  )
}

const arrowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid rgba(240,237,232,0.2)',
  background: 'rgba(5,5,10,0.4)',
  color: 'rgba(240,237,232,0.8)',
  cursor: 'none',
  fontSize: '1rem',
  zIndex: 30,
}
