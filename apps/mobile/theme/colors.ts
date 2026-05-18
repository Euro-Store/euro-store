export const colors = {
  gold:    '#d4a017',
  goldLight: '#f2c94c',
  goldDeep:  '#a87400',
  dark: { base:'#0a0a0a', surface:'#121212', elevated:'#1a1a1a', border:'#2a2a2a', text:'#f5f5f5', muted:'#a0a0a0' },
  light:{ base:'#f7f5ef', surface:'#ffffff',  elevated:'#f0ede4', border:'#e5e7eb', text:'#111111', muted:'#6b7280' },
} as const

export type ColorScheme = 'light' | 'dark'
