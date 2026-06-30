'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'framer-motion'
import { useSceneStore } from '@/store/sceneStore'
import { SERVICES, type Service } from '@/lib/servicesData'
import { ServiceCard } from './ServiceCard'
import { ServiceDetailPanel } from './ServiceDetailPanel'

const RADIUS = 300
const ANGLE_STEP = 32
const DRAG_STEP_PX = 150
const LAST_INDEX = SERVICES.length - 1

type ServicesCarouselProps = {
  selected: Set<string>
  onToggleSelect: (number: string) => void
  isMobile: boolean
}

export function ServicesCarousel({ selected, onToggleSelect, isMobile }: ServicesCarouselProps) {
  const track = useMotionValue(0)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const dragStartTrack = useRef(0)

  const [settledIndex, setSettledIndex] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const setActiveService = useSceneStore((s) => s.setActiveService)

  const stopActive = () => {
    controlsRef.current?.stop()
    controlsRef.current = null
  }

  const commitSettled = (i: number) => {
    const clamped = Math.max(0, Math.min(LAST_INDEX, Math.round(i)))
    setSettledIndex(clamped)
    setActiveService(clamped)
  }

  const goTo = (i: number, opts?: { openDetail?: boolean }) => {
    stopActive()
    const target = Math.max(0, Math.min(LAST_INDEX, i))
    controlsRef.current = animate(track, target, {
      type: 'spring',
      stiffness: 300,
      damping: 32,
      mass: 0.9,
      onComplete: () => {
        commitSettled(target)
        if (opts?.openDetail) setDetailOpen(true)
      },
    })
  }

  const handleCardClick = (i: number) => {
    if (isDragging) return
    if (isMobile) {
      commitSettled(i)
      setDetailOpen(true)
      return
    }
    goTo(i, { openDetail: true })
  }

  const handleDragStart = () => {
    stopActive()
    setIsDragging(true)
    dragStartTrack.current = track.get()
  }

  const handleDrag = (_: unknown, info: PanInfo) => {
    track.set(dragStartTrack.current - info.offset.x / DRAG_STEP_PX)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false)
    const velocity = -info.velocity.x / DRAG_STEP_PX
    controlsRef.current = animate(track, track.get(), {
      type: 'inertia',
      velocity,
      power: 0.5,
      timeConstant: 350,
      bounceStiffness: 400,
      bounceDamping: 40,
      restDelta: 0.001,
      min: 0,
      max: LAST_INDEX,
      modifyTarget: (v) => Math.round(Math.max(0, Math.min(LAST_INDEX, v))),
      onComplete: () => commitSettled(track.get()),
    })
  }

  useEffect(() => () => stopActive(), [])

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
            isCenter={i === settledIndex}
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
                service={detailOpen ? SERVICES[settledIndex] : null}
                isSelected={selected.has(SERVICES[settledIndex].number)}
                onToggleSelect={() => {
                  const wasSelected = selected.has(SERVICES[settledIndex].number)
                  onToggleSelect(SERVICES[settledIndex].number)
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
      <div style={{ position: 'relative', height: '520px' }}>
        <div style={{ position: 'absolute', inset: 0, perspective: '1300px' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'min(960px, 92vw)',
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
            {SERVICES.map((s, i) => (
              <CoverflowCard
                key={s.number}
                index={i}
                service={s}
                track={track}
                isSelected={selected.has(s.number)}
                isCenter={i === settledIndex}
                detailOpen={detailOpen}
                onClick={() => handleCardClick(i)}
              />
            ))}
          </motion.div>
        </div>

        <button
          onClick={() => goTo(settledIndex - 1)}
          disabled={settledIndex === 0}
          data-cursor="pointer"
          aria-label="Anterior"
          style={{
            ...arrowStyle,
            left: '0.5rem',
            opacity: settledIndex === 0 ? 0.2 : 0.7,
          }}
        >
          ←
        </button>
        <button
          onClick={() => goTo(settledIndex + 1)}
          disabled={settledIndex === LAST_INDEX}
          data-cursor="pointer"
          aria-label="Siguiente"
          style={{
            ...arrowStyle,
            right: '0.5rem',
            opacity: settledIndex === LAST_INDEX ? 0.2 : 0.7,
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
              service={detailOpen ? SERVICES[settledIndex] : null}
              isSelected={selected.has(SERVICES[settledIndex].number)}
              onToggleSelect={() => {
                const wasSelected = selected.has(SERVICES[settledIndex].number)
                onToggleSelect(SERVICES[settledIndex].number)
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

type CoverflowCardProps = {
  index: number
  service: Service
  track: MotionValue<number>
  isSelected: boolean
  isCenter: boolean
  detailOpen: boolean
  onClick: () => void
}

function CoverflowCard({ index, service, track, isSelected, isCenter, detailOpen, onClick }: CoverflowCardProps) {
  const continuousIndex = useTransform(track, (t) => index - t)

  const transformStr = useTransform(continuousIndex, (ci) => {
    const angle = ci * ANGLE_STEP
    const rad = (angle * Math.PI) / 180
    const translateX = Math.sin(rad) * RADIUS
    const translateZ = Math.cos(rad) * RADIUS - RADIUS
    const absDist = Math.abs(ci)
    const scale = Math.max(0.55, 1 - absDist * 0.18)
    return `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-angle}deg) scale(${scale})`
  })

  const opacity = useTransform(continuousIndex, (ci) => {
    const absDist = Math.abs(ci)
    let o = Math.max(0, 1 - absDist * 0.35)
    if (detailOpen) o *= isCenter ? 0.2 : 0.12
    return o
  })

  const zIndex = useTransform(continuousIndex, (ci) => Math.round(100 - Math.abs(ci) * 10))

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '190px',
        height: '240px',
        marginLeft: '-95px',
        marginTop: '-120px',
        transform: transformStr,
        opacity,
        zIndex,
        pointerEvents: detailOpen ? 'none' : 'auto',
      }}
    >
      <ServiceCard
        service={service}
        isSelected={isSelected}
        isCenter={isCenter}
        onClick={onClick}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
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
