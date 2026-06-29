'use client'

import { Canvas } from '@react-three/fiber'
import { ParticleSystem } from './ParticleSystem'
import { Suspense } from 'react'

export default function MainCanvas() {
  return (
    <div
      id="canvas-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{
          fov: 60,
          near: 0.05,
          far: 120,
          position: [0, 0, 5],
        }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
        style={{ background: '#050505' }}
        frameloop="always"
      >
        <fog attach="fog" args={['#050505', 30, 80]} />
        <Suspense fallback={null}>
          <ParticleSystem />
        </Suspense>
      </Canvas>
    </div>
  )
}
