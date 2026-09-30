export const brand = {
  navy: '#0B3D91',
  navyDeep: '#071D3D',
  gold: '#FFC107',
  surface: '#F7F9FC',
  muted: '#607089',
} as const

export const supportedLocales = ['pt', 'en'] as const
export type Locale = (typeof supportedLocales)[number]
export const defaultLocale: Locale = 'pt'
