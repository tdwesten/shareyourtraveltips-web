import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenticatedCategories extends Route {
  @service public declare store: Store;

  model() {
    return this.store.findAll('category');
  }
}
