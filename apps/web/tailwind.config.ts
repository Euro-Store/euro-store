import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4a017',
          light:   '#f2c94c',
          deep:    '#a87400',
          muted:   'rgba(212,160,23,0.15)',
        },
        dark: {
          base:     '#0a0a0a',
          surface:  '#121212',
          elevated: '#1a1a1a',
          border:   '#2a2a2a',
          text:     '#f5f5f5',
          muted:    '#a0a0a0',
        },
        light: {
          base:     '#f7f5ef',
          surface:  '#ffffff',
          elevated: '#f0ede4',
          border:   '#e5e7eb',
          text:     '#111111',
          muted:    '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn:  '8px',
        pill: '9999px',
      },
      boxShadow: {
        card:        '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover':'0 8px 28px rgba(0,0,0,0.11)',
        gold:        '0 0 0 2px rgba(212,160,23,0.40)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0'  },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
      },
      animation: {
        shimmer:   'shimmer 1.6s infinite linear',
        fadeUp:    'fadeUp 0.3s ease-out',
        slideDown: 'slideDown 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
