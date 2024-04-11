
const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: colors.slate[800],
        textDark: colors.slate[200],
        primary: colors.emerald[300],
        'primary-dark': colors.emerald[600],
        complimentry: colors.violet[500],
        'complimentry-dark': colors.violet[600],
        accent: colors.emerald[100],
        "accent-dark": colors.emerald[400],
      },
      fontSize: {
        sm: 'clamp(0.8rem, 1vw, 1.3rem)',
        base: 'clamp(1rem, 1.2vw, 1.5rem)',
        lg: 'clamp(1.125rem, 1.4vw, 1.75rem)',
        xl: 'clamp(1.25rem, 1.5vw, 1.75rem)',
        '2xl': 'clamp(1.563rem, 1.8vw, 2rem)',
        '3xl': 'clamp(1.953rem, 2.2vw, 2.5rem)',
        '4xl': 'clamp(2.441rem, 2.5vw, 3rem)',
        '5xl': 'clamp(3.052rem, 3vw, 3.5rem)',
      }
    },
  },
  plugins: [require('daisyui')],

}

