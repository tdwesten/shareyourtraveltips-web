import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Trip from '../../models/trip';
import CurrentUserService from '../../services/current-user';

export default class TripsRoute extends Route {
  @service public declare store: Store;
  @service private declare currentUser: CurrentUserService;

  model() {
    return this.store.findAll(Trip.modelName, {
      include: 'tips,tips.category,tips.user',
    });
  }
}
