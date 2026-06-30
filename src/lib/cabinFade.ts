export type CabinFadeCurve = {
  cabinOpacity: (p: number) => number
  veilOpacity: (p: number) => number
}

// Builds a triangular fade curve (fade in, hold full, fade out) plus a brief
// whiteout "veil" pulse right as the curve reaches full opacity — used to
// sync a cabin-interior visual to a specific scroll-progress window.
export function makeCabinFade(
  fadeInStart: number,
  fullStart: number,
  fullEnd: number,
  fadeOutEnd: number
): CabinFadeCurve {
  return {
    cabinOpacity(p: number) {
      if (p <= fadeInStart || p >= fadeOutEnd) return 0
      if (p < fullStart) return (p - fadeInStart) / (fullStart - fadeInStart)
      if (p > fullEnd) return 1 - (p - fullEnd) / (fadeOutEnd - fullEnd)
      return 1
    },
    veilOpacity(p: number) {
      const width = 0.03
      const d = Math.abs(p - fullStart)
      if (d > width) return 0
      return (1 - d / width) * 0.6
    },
  }
}

// Scroll-progress range where the Section 7 cabin interior is on screen.
// Lines up with the start/end of the CabinServices section (see page.tsx).
export const FADE_IN_START = 0.60
export const FULL_START    = 0.6552
export const FULL_END      = 0.80
export const FADE_OUT_END  = 0.8276

export const { cabinOpacity, veilOpacity } = makeCabinFade(
  FADE_IN_START,
  FULL_START,
  FULL_END,
  FADE_OUT_END
)

// Scroll-progress range where Section 3's cabin background is on screen.
// Measured directly against rendered scroll position (not the STAGES array,
// which doesn't account for Stage2TakeOff's GSAP pin adding extra scroll
// distance): Section 3 is actually on screen from ~0.25 to ~0.39.
export const SECTION3_FADE_IN_START = 0.25
export const SECTION3_FULL_START    = 0.28
export const SECTION3_FULL_END      = 0.36
export const SECTION3_FADE_OUT_END  = 0.39

export const section3CabinFade = makeCabinFade(
  SECTION3_FADE_IN_START,
  SECTION3_FULL_START,
  SECTION3_FULL_END,
  SECTION3_FADE_OUT_END
)
