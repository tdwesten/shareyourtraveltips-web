import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from '../config/environment';
import { FlashMessageType } from '../enum/flash-message-type.enum';
import SessionService from '../services/session';
import REGISTER_VALIDATIONS from '../validations/register';

export default class Register extends Controller {
  @service private declare router: RouterService;
  @service private declare session: SessionService;
  validations = REGISTER_VALIDATIONS;
  passwordPattern =
    '^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$';
  @tracked showVerifyEmailNotification = false;
  @tracked model = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    invitedAsContributorForTrip: '',
  };
  @tracked errors = '';
  flashmessageTypes = FlashMessageType;
  @tracked isLoading = false;

  // eslint-disable-next-line no-shadow-restricted-names
  constructor(args: object | undefined) {
    super(args);

    const params = new URLSearchParams(window.location.search);
    this.model.invitedAsContributorForTrip = params.get(
      'invitedAsContributorForTrip'
    ) as unknown as string;
  }

  get hasErrors() {
    return this.errors !== '';
  }

  @action
  register(event: Event) {
    event.preventDefault();

    this.isLoading = true;

    const url = ENV.APP.apiHost + '/auth/register';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.model),
    })
      .then((response) => response.json())
      .then((response) => {
        this.isLoading = false;
        if (response.errors) {
          this.errors = response.errors;
        } else {
          this.showVerifyEmailNotification = true;
        }
      })
      .catch((error) => console.error('Error:', error));
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
