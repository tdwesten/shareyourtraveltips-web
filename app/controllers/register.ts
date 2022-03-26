import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from '../config/environment';
import {
  BufferedChangeset,
  Changeset,
  lookupValidator,
} from 'validated-changeset';
import REGISTER_VALIDATIONS from '../validations/register';
import SessionService from '../services/session';

export default class Register extends Controller {
  @service private declare router: RouterService;
  @service private declare session: SessionService;
  public changeset: BufferedChangeset;
  @tracked user = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };

  // eslint-disable-next-line no-shadow-restricted-names
  constructor(args: any) {
    super(args);

    this.changeset = Changeset(
      this.user,
      lookupValidator(REGISTER_VALIDATIONS),
      REGISTER_VALIDATIONS
    );
  }

  @action
  register(event: Event) {
    event.preventDefault();
    const url = ENV.APP.apiHost + '/auth/register';

    this.changeset.validate().then(() => {
      if (this.changeset.isValid) {
        this.changeset.save().then(() => {
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.user),
          })
            .then(() => {
              this.session.authenticate('authenticator:jwt', {
                email: this.user.email,
                password: this.user.password,
              });
            })
            .catch((error) => console.error('Error:', error));
        });
      }
    });
  }

  @action
  toLogin() {
    this.router.transitionTo('login');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    register: Register;
  }
}
