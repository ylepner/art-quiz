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
        'md': { 'min': '521px', 'max': '768px' },
        'lg': { 'min': '769px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

