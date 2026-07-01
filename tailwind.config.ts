import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        light: '#f0ede8',
        muted: 'rgba(240,237,232,0.4)',
        ghost: 'rgba(240,237,232,0.1)',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultrawide: '0.4em',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'scale-x': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(240,237,232,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(240,237,232,0.25)' },
        },
      },
      animation: {
        flicker: 'flicker 3s ease-in-out infinite',
        'scale-x': 'scale-x 1.5s ease-out forwards',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
