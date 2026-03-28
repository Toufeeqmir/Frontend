/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        haat: {
          cream: '#fdf8f3',
          blush: '#f5e6e0',
          rose: '#c45c5c',
          deep: '#5c3d3d',
          gold: '#c9a227',
          sage: '#7d9b84',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(92, 61, 61, 0.12)',
        card: '0 8px 32px -8px rgba(92, 61, 61, 0.15)',
      },
    },
  },
  plugins: [],
}
