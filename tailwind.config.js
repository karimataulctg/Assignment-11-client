/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunflower-yellow': '#FFC107',
        'dark-sunflower-yellow': '#FFB300',
        'light-grey': '#E0E0E0',
        'dark-charcoal': '#212121',
        'deep-blue': '#0033A0',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark"],
  },
}
