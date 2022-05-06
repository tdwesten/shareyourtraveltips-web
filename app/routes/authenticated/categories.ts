import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { hash } from 'rsvp';
import Category from '../../models/category';

export default class AuthenticatedCategories extends Route {
  @service public declare store: Store;

  model() {
    return hash({
      categories: this.store.findAll('category'),
      new: this.store.createRecord(Category.modelName),
    });
  }
}
