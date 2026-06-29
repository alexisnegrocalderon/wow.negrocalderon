import { create } from 'zustand'

interface SceneState {
  scrollProgress: number
  scrollVelocity: number
  currentStage: number
  mouse: { x: number; y: number }
  turbulence: number
  soundEnabled: boolean
  isEntered: boolean
  activeService: number | null

  setScrollProgress: (p: number) => void
  setScrollVelocity: (v: number) => void
  setCurrentStage: (s: number) => void
  setMouse: (x: number, y: number) => void
  setTurbulence: (v: number) => void
  toggleSound: () => void
  setIsEntered: (v: boolean) => void
  setActiveService: (i: number | null) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  currentStage: 0,
  mouse: { x: 0, y: 0 },
  turbulence: 0,
  soundEnabled: false,
  isEntered: false,
  activeService: null,

  setScrollProgress: (p) => set({ scrollProgress: p }),
  setScrollVelocity: (v) => set({ scrollVelocity: v }),
  setCurrentStage: (s) => set({ currentStage: s }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setTurbulence: (v) => set({ turbulence: v }),
  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),
  setIsEntered: (v) => set({ isEntered: v }),
  setActiveService: (i) => set({ activeService: i }),
}))
