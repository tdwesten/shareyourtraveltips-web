import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Trip from '../../models/trip';

export default class TripsRoute extends Route {
  @service public declare store: Store;

  model() {
    return this.store.findAll(Trip.modelName).then((trips) => {
      return trips.filter((trip) => !trip.isNew);
    });
  }
}
