/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#040706', // rich black with an emerald undertone
        bone: '#f2f5f2',
        accent: '#00d68f', // emerald
        accent2: '#ffc93c', // gold
        deep: '#0b7a5c', // deep emerald
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
