import SimpleAuthSessionService from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';
import CurrentUserService from './current-user';

export default class SessionService extends SimpleAuthSessionService {
  [x: string]: any;
  @service private declare router;
  @service private declare currentUser: CurrentUserService;

  handleAuthentication() {
    this.loadCurrentUser();
    this.router.transitionTo('authenticated.trips');
  }

  /**
   * Loads the current authenticated user
   *
   * @void
   */
  async loadCurrentUser() {
    try {
      const user = await this.currentUser.load();
      return user;
    } catch (err) {
      await this.session.invalidate();
    }
  }
}
