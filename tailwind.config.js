/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // white theme: page/card surfaces (white + cool light greys) and the text colour
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F4F6F8',
          200: '#FFFFFF',
          300: '#F4F6F8',
        },
        ink: '#15171A',
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
        // inverted for the light theme: low numbers = dark text, high numbers = light borders/fills.
        // 300/400/500 are ≥4.5:1 on paper (AA small text).
        steel: {
          50: '#0f1215',
          100: '#1d2227',
          200: '#2a3037',
          300: '#434c56',
          400: '#525c67',
          500: '#5d6772',
          600: '#b9c0c7',
          700: '#d6dbe0',
          800: '#e6e9ec',
          900: '#f2f4f5',
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
