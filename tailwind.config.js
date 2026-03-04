const { colors } = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: {
          light: '#FFFFFF',
          dark: '#0D0D0D',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1A1A1A',
        },
        'text-primary': '#1A1F36',
        'text-secondary': '#697386',
        'text-dark-primary': '#F5F5F5',
        'text-dark-secondary': '#9CA3AF',
        'border-light': '#E5E7EB',
        'border-dark': '#2D2D2D',
        accent: '#1A1F36',
      },
      animation: {
        'rgb-shift': 'rgbShift 500ms linear infinite',
      },
      keyframes: {
        rgbShift: {
          '0%': { backgroundColor: 'rgb(241, 249, 241)' },
          '25%': { backgroundColor: 'rgb(249, 249, 241)' },
          '50%': { backgroundColor: 'rgb(249, 241, 241)' },
          '75%': { backgroundColor: 'rgb(249, 241, 249)' },
          '100%': { backgroundColor: 'rgb(241, 249, 241)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
