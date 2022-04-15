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
      trips: this.currentUser.user.trips,
      tripsContributedTo: this.currentUser.user.tripsContributedTo,
      newTrip: this.store.createRecord(Trip.modelName),
    });
  }
}
