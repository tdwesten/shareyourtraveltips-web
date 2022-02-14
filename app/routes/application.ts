import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CurrentUserService from '../services/current-user';

export default class ApplicationRoute extends Route {
  @service private declare session;
  @service private declare currentUser: CurrentUserService;
  @service private declare intl;

  async beforeModel() {
    await this.session.setup();

    this.intl.setLocale(['en-us']);

    return this._loadCurrentUser();
  }

  async _loadCurrentUser() {
    try {
      await this.currentUser.load();
    } catch (err) {
      await this.session.invalidate();
    }
  }
}
