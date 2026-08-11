/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#040706', // rich black with an emerald undertone
        bone: '#f2f5f2',
        accent: '#2f6bff', // electric blue
        accent2: '#22e5ff', // neon cyan
        deep: '#17348f', // deep blue
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
