import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import User from '../models/user';
import { inject as service } from '@ember/service';

export default class Register extends Controller {
  @service private declare router: RouterService;

  declare model: User;

  @action
  register(event: Event) {
    event.preventDefault();

    this.model.save().then(() => {
      this.router.transitionTo('login');
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    register: Register;
  }
}
