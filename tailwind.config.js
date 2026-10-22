/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0E0E10',
          50: '#1a1a1e',
          100: '#141416',
          200: '#0E0E10',
          300: '#080809',
        },
        orange: {
          DEFAULT: '#FF6A00',
          50: '#fff3e8',
          100: '#ffe0c2',
          200: '#ffbb80',
          300: '#ff9033',
          400: '#FF6A00',
          500: '#d45600',
          600: '#a84300',
        },
        steel: {
          50: '#f4f5f6',
          100: '#dde0e3',
          200: '#b8bec5',
          300: '#8e99a4',
          400: '#848f9b', // ≥4.5:1 on charcoal (AA small text)
          500: '#7a8693', // ≥4.5:1 on charcoal
          600: '#3a4450',
          700: '#272f38',
          800: '#161c22',
          900: '#0a0d10',
        },
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', '"Noto Sans Devanagari"', 'sans-serif'],
        inter: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      // numeric weight classes (font-700) used across components; 900 maps to 800, the heaviest loaded file
      fontWeight: { 300: '300', 400: '400', 500: '500', 600: '600', 700: '700', 800: '800', 900: '800' },
    },
  },
  plugins: [],
};
