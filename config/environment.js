'use strict';

module.exports = function (environment) {
  // eslint-disable-next-line prefer-const
  let ENV = {
    modulePrefix: 'shareyourtraveltips',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      unsplashApiKey: process.env.unsplashApiKey,
    },
  };

  ENV['APP']['apiHost'] = process.env.apiServer;

  ENV['ember-google-maps'] = {
    key: process.env.googleMapsApiKey,
    language: 'en',
    region: 'NL',
    protocol: 'https',
    version: '3.41',
    libraries: ['geometry', 'places'], // Optional libraries
    // client: undefined,
    // channel: undefined,
    // baseUrl: '//maps.googleapis.com/maps/api/js',
    // mapIds: ['1234', '2345'],
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'staging') {
    ENV['APP']['apiHost'] = 'https://api.staging.shareyourtravel.tips/api';
  }

  if (environment === 'production') {
    ENV['APP']['apiHost'] = 'https://api.shareyourtravel.tips/api';
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token',
    useSessionSetupMethod: true,
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV['APP']['apiHost'] + '/auth/login',
    identificationField: 'email',
    tokenPropertyName: 'access_token',
    serverTokenRefreshEndpoint: ENV['APP']['apiHost'] + '/auth/refresh',
    refreshTokenPropertyName: 'access_token',
    tokenExpireName: 'exp',
    refreshAccessTokens: true,
    refreshLeeway: 60,
  };

  return ENV;
};
