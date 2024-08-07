/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
    }),
    extend: {
      fontFamily: {
        worksans: ['Work Sans', 'sans-serif'],
      },
      colors: {
        pink: {
          light: 'hsl(275, 100%, 97%)',
        },
        purple: {
          grayish: 'hsl(292, 16%, 49%)',
          dark: 'hsl(292, 42%, 14%)',
        }
      },
      screens: {
        xs: '375px',
      }
    },
  },
  plugins: [],
}