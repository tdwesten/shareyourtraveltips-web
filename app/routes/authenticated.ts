import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';
type Transition = ReturnType<RouterService['transitionTo']>;

export default class AuthenticatedRoute extends Route {
  @service private declare session;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
