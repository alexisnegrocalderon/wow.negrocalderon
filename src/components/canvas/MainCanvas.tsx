'use client'

import { Canvas } from '@react-three/fiber'
import { ParticleSystem } from './ParticleSystem'
import { SkyPlane } from './SkyPlane'
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
        camera={{ fov: 60, near: 0.05, far: 120, position: [0, 0, 5] }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1]}
        // No background color — SkyPlane fills the screen in WebGL
        onCreated={({ gl }) => {
          gl.setClearColor(0x050505, 1)
        }}
        frameloop="always"
      >
        {/* Sky renders first (renderOrder=-100) */}
        <SkyPlane />
        {/* Fog reacts to stage darkness — will be overridden by sky anyway */}
        <fog attach="fog" args={['#050505', 35, 90]} />
        <Suspense fallback={null}>
          <ParticleSystem />
        </Suspense>
      </Canvas>
    </div>
  )
}
