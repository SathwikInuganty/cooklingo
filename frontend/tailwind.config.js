
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'smooth': '0 10px 30px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
