import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      ...defaultTheme.screens,
      'xl': '1024',
    },

    extend: {
      fontFamily: {
        sans: ['Google Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      keyframes: {
        'draw-stroke': {
          '0%': { 'stroke-dashoffset': '1649.099' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'remove-fill': {
          '0%': { fill: 'rgba(52,52,52,1)' },
          '100%': { fill: 'rgba(52,52,52,0)' },
        },
        'translate-in': {
          '0%': { opacity: '0', transform: 'translateX(var(--tw-translate-x))' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-color': {
          '0%, 50%, 100%': { color: 'inherit' },
          '25%, 75%': { color: '#43CB9D' },
        },
      },
      animation: {
        'draw-stroke': 'draw-stroke 1.5s ease-out forwards',
        'remove-fill': 'remove-fill 0.01s ease-out forwards',
        '404-in': 'translate-in 1s linear forwards',
        'pulse-color': 'pulse-color 1s linear 3.1s forwards',
      },
    },
  },
  plugins: [typography],
}