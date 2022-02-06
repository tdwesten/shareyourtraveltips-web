import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogoutRoute extends Route {
  @service private declare session;

  beforeModel() {
    this.session.invalidate();
  }
}
