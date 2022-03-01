import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from '../config/environment';

export default class Register extends Controller {
  @service private declare router: RouterService;
  @tracked user = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };

  @action
  register(event: Event) {
    event.preventDefault();
    const url = ENV.APP.apiHost + '/auth/register';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.user),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error('Error:', error));
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    register: Register;
  }
}
