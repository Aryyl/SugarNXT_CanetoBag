/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        surface: '#FFFFFF',
        primary: {
          50: '#EBF4FF',
          100: '#E1EFFE',
          500: '#3F83F8',
          600: '#1C64F2',
          700: '#1A56DB',
        },
        success: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          500: '#0E9F6E',
          700: '#046C4E',
        },
        warning: {
          50: '#FDF8F6',
          100: '#FDF6B2',
          500: '#ECE81A',
          600: '#D03801',
          700: '#B43403',
        },
        danger: {
          50: '#FDF2F2',
          100: '#FDE8E8',
          500: '#F05252',
          600: '#E02424',
          700: '#C81E1E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
