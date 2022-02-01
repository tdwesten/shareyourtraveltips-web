import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';

export default class Index extends Route {
  @service declare store: DS.Store;
  @service private declare session;

  model() {
    console.log(this.session.isAuthenticated);
    return {};
  }
}
