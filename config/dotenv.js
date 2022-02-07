/* eslint-env node */

'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function (/* env */) {
  return {
    clientAllowedKeys: ['googleMapsApiKey', 'unsplashApiKey'],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};
