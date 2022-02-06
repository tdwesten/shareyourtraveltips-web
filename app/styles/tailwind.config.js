const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{hbs,ts,js}',
    './app/index.html',
    './app/game/controller.ts',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
