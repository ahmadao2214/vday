import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { tokens as defaultTokens, themes as defaultThemes } from '@tamagui/config/v3'

const headingFont = createInterFont({
  size: {
    6: 15,
    7: 20,
    8: 24,
    9: 32,
    10: 40,
    11: 48,
    12: 56,
  },
  weight: {
    6: '700',
    7: '700',
    8: '700',
    9: '800',
    10: '800',
  },
})

const bodyFont = createInterFont(
  {
    weight: {
      1: '400',
      2: '500',
      3: '600',
    },
  },
  { sizeLineHeight: (size) => Math.round(size * 1.1 + 10) }
)

const valentineTokens = {
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    background: '#FFF0F3',
    primary: '#E11D48',
    primaryLight: '#FB7185',
    primaryDark: '#881337',
    accent: '#FDA4AF',
    white: '#FFFFFF',
    gray: '#9CA3AF',
    grayLight: '#E5E7EB',
    textDark: '#881337',
    textLight: '#FFFFFF',
  },
}

const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: valentineTokens,
  themes: {
    ...defaultThemes,
    valentine: {
      background: '#FFF0F3',
      color: '#881337',
      primary: '#E11D48',
      primaryLight: '#FB7185',
      accent: '#FDA4AF',
    },
  },
  shorthands,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
