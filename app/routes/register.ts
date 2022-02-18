import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import User from '../models/user';

export default class Register extends Route {
  @service public declare store: Store;

  model() {
    return this.store.createRecord(User.modelName);
  }
}
