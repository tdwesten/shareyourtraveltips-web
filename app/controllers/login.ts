import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SessionService from '../services/session';
import LOGIN_VALIDATIONS from '../validations/login';

export default class Login extends Controller {
  @service private declare session: SessionService;
  validations = LOGIN_VALIDATIONS;
  @tracked model = { email: '', password: '' };
  @tracked errors = '';
  @tracked isLoading = false;

  get hasErrors() {
    return this.errors !== '';
  }

  @action
  authenticate() {
    this.isLoading = true;

    this.session
      .authenticate('authenticator:jwt', {
        email: this.model.email,
        password: this.model.password,
      })
      .then(() => {
        this.isLoading = false;
        this.model = { email: '', password: '' };
      })
      .catch((error) => {
        this.isLoading = false;
        this.errors = error.json.error;
      });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    login: Login;
  }
}
