import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0a0b',
        'bg-mid': '#110815',
        indigo: '#0a0014',
        accent: '#e07a6e',
        'accent-hot': '#ff6eb4',
        cyan: '#00f5ff',
        'cyan-dim': '#00c8d4',
        surface: 'rgba(255,255,255,0.04)',
        'surface-2': 'rgba(255,255,255,0.07)',
        border: 'rgba(255,255,255,0.08)',
        'border-soft': 'rgba(255,255,255,0.05)',
        text: '#b8b0ac',
        dim: '#5a5258',
        white: '#f0ece8',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(to bottom, #0d0a0b 0%, #110815 40%, #0a0014 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'cursor-blink': 'cursorBlink 1.1s step-end infinite',
        'scroll-pulse': 'scrollPulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}

export default config
