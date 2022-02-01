import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Login extends Controller {
  @service private declare session: any;

  private declare email: string;
  private declare password: string;

  @action
  authenticate(event: Event) {
    event.preventDefault();

    const authenticator = 'authenticator:token'; // or 'authenticator:jwt'

    this.session.authenticate(authenticator, {
      email: this.email,
      password: this.password,
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    login: Login;
  }
}
