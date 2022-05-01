import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import Trip from '../../models/trip';
import CurrentUserService from '../../services/current-user';

export default class TripsRoute extends Route {
  @service public declare store: Store;
  @service private declare currentUser: CurrentUserService;

  model() {
    return hash({
      trips: this.store.query(Trip.modelName, {
        userId: this.currentUser.user.id,
        include: 'tips,tips.category,tips.user',
      }),
      newTrip: this.store.createRecord(Trip.modelName),
    });
  }
}
