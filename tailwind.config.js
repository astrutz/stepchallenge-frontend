/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Noto', 'sans-serif'],
    },
    extend: {
      colors: {
        gold: '#DAA520',
        silver: '#A9A9A9',
        bronze: '#CD7F32',
        primary: {
          100: '#8fb578',
          200: '#68a161',
          300: '#659f5e',
          400: '#2d7948',
          500: '#2e4f2e',
          600: '#013020',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
