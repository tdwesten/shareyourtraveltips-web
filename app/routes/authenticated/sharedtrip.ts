import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Trip from '../../models/trip';

interface SharedTripParams {
  id: string;
}

export default class SharedTripRoute extends Route {
  @service public declare store: Store;

  model(params: SharedTripParams) {
    console.log('SharedTripRoute.model');

    return this.store.findRecord(Trip.modelName, params.id, {
      include: 'tips,tips.category,tips.user',
    });
  }

  controllerName = 'authenticated/trip';
  templateName = 'authenticated/trip';
}
