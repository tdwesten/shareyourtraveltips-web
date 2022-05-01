import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Trip from '../../models/trip';

interface TripRouteParams {
  id: string;
}

export default class TripRoute extends Route {
  @service public declare store: Store;

  model(params: TripRouteParams) {
    return this.store.findRecord(Trip.modelName, params.id, {
      include: 'tips,tips.category,tips.user',
      sort: {
        field: 'createdAt',
      },
    });
  }
}
