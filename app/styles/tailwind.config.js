const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{hbs,ts,js}',
    './app/index.html',
    './app/game/controller.ts',
  ],
  safelist: [
    {
      pattern: /^ember-power-select-/,
    },
    {
      pattern: /^bg-/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
  extend: {
    zIndex: {
      1000: '1000',
    },
  },
  plugins: [
    require('tailwindcss-ember-power-select').plugin(({ theme }) => {
      return {
        borderColor: theme('colors.gray.300'),
        focusBorderColor: theme('colors.orange.500'),
        highlightedBackgroundColor: theme('colors.orange.500'),
        triggerFocusBoxShadow: theme('colors.orange.500'),
      };
    }),
    require('@tailwindcss/forms'),
  ],
};
