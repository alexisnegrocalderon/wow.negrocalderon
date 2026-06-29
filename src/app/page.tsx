'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { LenisProvider } from '@/components/providers/LenisProvider'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SoundToggle } from '@/components/ui/SoundToggle'
import { Stage1Boarding } from '@/components/sections/Stage1Boarding'
import { Stage2TakeOff } from '@/components/sections/Stage2TakeOff'
import { Stage3Ascend } from '@/components/sections/Stage3Ascend'
import { Stage4Cruise } from '@/components/sections/Stage4Cruise'
import { Stage5Experience } from '@/components/sections/Stage5Experience'
import { Stage6Turbulence } from '@/components/sections/Stage6Turbulence'
import { Stage7Destination } from '@/components/sections/Stage7Destination'
import { Stage8MissionControl } from '@/components/sections/Stage8MissionControl'
import { Closing } from '@/components/sections/Closing'
import { useSceneStore } from '@/store/sceneStore'
import { useMouseTracker } from '@/hooks/useMousePosition'

gsap.registerPlugin(ScrollTrigger)

// Dynamic import: Three.js canvas must be client-only
const MainCanvas = dynamic(() => import('@/components/canvas/MainCanvas'), {
  ssr: false,
  loading: () => null,
})

function ScrollTracker() {
  const { setScrollProgress, setScrollVelocity, setCurrentStage } = useSceneStore()
  const journeyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = journeyRef.current
    if (!el) return

    // Stage breakpoints (cumulative scroll progress thresholds)
    const STAGES = [0, 0.08, 0.17, 0.30, 0.52, 0.66, 0.77, 0.88, 0.95, 1]

    let lastProgress = 0
    let lastTime = performance.now()

    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress
        setScrollProgress(p)

        // Velocity
        const now = performance.now()
        const dt = Math.max(now - lastTime, 1)
        const vel = ((p - lastProgress) / dt) * 1000
        setScrollVelocity(vel)
        lastProgress = p
        lastTime = now

        // Current stage
        const stage = STAGES.findIndex((s, i) => {
          const next = STAGES[i + 1] ?? 1
          return p >= s && p < next
        })
        setCurrentStage(Math.max(0, stage))
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [setScrollProgress, setScrollVelocity, setCurrentStage])

  return <div ref={journeyRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
}

export default function Home() {
  useMouseTracker()

  return (
    <LenisProvider>
      {/* Fixed WebGL canvas — always behind everything */}
      <MainCanvas />

      {/* Fixed UI layer */}
      <LoadingScreen />
      <CustomCursor />
      <SoundToggle />

      {/* Scroll journey */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
        }}
      >
        <ScrollTracker />

        <Stage1Boarding />
        <Stage2TakeOff />
        <Stage3Ascend />
        <Stage4Cruise />
        <Stage5Experience />
        <Stage6Turbulence />
        <Stage7Destination />
        <Stage8MissionControl />
        <Closing />
      </main>
    </LenisProvider>
  )
}
