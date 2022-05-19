import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Trip from '../models/trip';

interface PublicTripParams {
  id: string;
}

export default class PublicTripRoute extends Route {
  @service public declare store: Store;

  model(params: PublicTripParams) {
    return this.store.findRecord(Trip.modelName, params.id, {
      include: 'tips,tips.category,tips.user',
    });
  }

  controllerName = 'authenticated/trip';
  templateName = 'authenticated/trip';
}
