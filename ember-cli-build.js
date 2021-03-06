const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    tests: false,
    postcssOptions: {
      compile: {
        cacheInclude: [/.*\.(css|scss|hbs)$/, /.tailwind\.config\.js$/],
        map: false,
        plugins: [tailwindcss('./app/styles/tailwind.config.js'), autoprefixer],
      },
    },
    'ember-power-select': {
      theme: false,
    },
    'ember-cli-babel': {
      placeholderPattern: false,
    },
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    'ember-promise-modals': {
      excludeCSS: true,
    },
  });

  return app.toTree();
};
