/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#d4a017', light: '#f2c94c', deep: '#a87400' },
        dark: { base: '#0a0a0a', surface: '#121212', elevated: '#1a1a1a', border: '#2a2a2a', text: '#f5f5f5', muted: '#a0a0a0' },
        light: { base: '#f7f5ef', surface: '#ffffff', elevated: '#f0ede4', border: '#e5e7eb', text: '#111111', muted: '#6b7280' },
      },
    },
  },
  plugins: [],
}
