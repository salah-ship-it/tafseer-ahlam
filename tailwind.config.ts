import type { Config } from 'tailwindcss'

const config = {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0b1026',
          light: '#131a3d',
          dark: '#07091a',
        },
        gold: {
          DEFAULT: '#d9b25f',
          light: '#e8c97a',
          dark: '#c4983d',
        },
        cream: '#e8dcc8',
        muted: '#8a8a9b',
      },
      fontFamily: {
        amiri: ['var(--font-amiri)', 'Georgia', 'serif'],
        tajawal: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config

export default config
