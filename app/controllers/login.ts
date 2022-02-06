import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Login extends Controller {
  @service private declare session: any;

  public declare email: string;
  public declare password: string;

  @action
  authenticate(event: Event) {
    event.preventDefault();

    this.session.authenticate('authenticator:jwt', {
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
