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
        babiel: {
          black: {
            100: '#999999',
            200: '#333333',
            300: '#111111',
          },
          gray: {
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#D0D0D0',
          },
          turquoise: {
            100: '#E5F7F6',
            200: '#BFEAE9',
            300: '#7FD5D4',
            400: '#00ACA9',
          },
          purple: {
            100: '#EFE8F2',
            200: '#D8C8E0',
            300: '#B291C1',
            400: '#662483',
          },
          orange: {
            100: '#FEF2E5',
            200: '#FBDEBF',
            300: '#F7BD7F',
            400: '#EF7D00',
          },
          green: {
            100: '#E5F5EB',
            200: '#BFE7CD',
            300: '#7FD09C',
            400: '#00A13A',
          },
          magenta: {
            100: '#F7E6F2',
            200: '#EBC3DF',
            300: '#D788BF',
            400: '#AF1280',
          },
          amber: {
            100: '#FFF6E5',
            200: '#FDE9BF',
            300: '#FBD27F',
            400: '#F7A600',
          },
          petrol: {
            100: '#E5EEF0',
            200: '#BFD6DA',
            300: '#7FACB5',
            400: '#005B6D',
          },
          apple: {
            100: '#F1F8E9',
            200: '#DCEDC9',
            300: '#BADB94',
            400: '#76B82A',
          },
          red: {
            100: '#FDEBE6',
            200: '#F9CFC3',
            300: '#F39F87',
            400: '#E74011',
          },
          yellow: {
            100: '#FFFAE5',
            200: '#FFF2BF',
            300: '#FFE57F',
            400: '#FFCC00',
          },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
