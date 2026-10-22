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
          400: '#6b7885',
          500: '#4f5c6b',
          600: '#3a4450',
          700: '#272f38',
          800: '#161c22',
          900: '#0a0d10',
        },
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'ember': 'ember 3s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,106,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255,106,0,0.8)' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-60px) scale(0)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
