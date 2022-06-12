const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'whitesmoke': '#f5f5f5',
        'accent': 'FFBCA2',
      },
      screens: {
        'sm': { 'max': '520px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }
        'md': { 'min': '520px', 'max': '768px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        'lg': { 'min': '768px' },
        // => @media (min-width: 768px and max-width: 1023px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

