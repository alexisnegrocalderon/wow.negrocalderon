'use client'

import { useSceneStore } from '@/store/sceneStore'
import { soundSystem } from '@/lib/sound'

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSceneStore()

  const handleToggle = () => {
    soundSystem.toggle()
    toggleSound()
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        background: 'transparent',
        border: 'none',
        color: 'rgba(240,237,232,0.3)',
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'none',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'color 0.3s ease',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,237,232,0.7)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,237,232,0.3)'
      }}
    >
      {/* Wave bars */}
      <span style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '12px' }}>
        {[4, 8, 12, 8, 4].map((h, i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '2px',
              height: `${soundEnabled ? h : 3}px`,
              background: 'currentColor',
              borderRadius: '1px',
              transition: 'height 0.3s ease',
            }}
          />
        ))}
      </span>
      {soundEnabled ? 'SOM' : 'MUDO'}
    </button>
  )
}
