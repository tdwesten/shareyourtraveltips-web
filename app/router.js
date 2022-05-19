import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('logout');
  this.route('register');
  this.route('register-success');
  this.route('authenticated', { path: 'app' }, function () {
    this.route('trips');
    this.route('trip', { path: 'trips/:id' });
    this.route('categories');
    this.route('sharedtrips', { path: 'shared-trips' });
    this.route('sharedtrip', { path: 'shared-trips/:id' });
  });

  this.route('trip-invite', { path: 'invite/:trip_id' });

  this.route('email', function () {
    this.route('verify', function () {
      this.route('success');
    });
  });
  this.route('public-trip', { path: 'public-trip/:id' });
});
