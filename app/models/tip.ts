import Model, { attr, belongsTo } from '@ember-data/model';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import CurrentUserService from '../services/current-user';
import Category from './category';
import Trip from './trip';
import User from './user';

export default class Tip extends Model {
  @service public declare currentUser: CurrentUserService;

  public static modelName = 'tip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @attr('string') declare address: string;
  @attr('date') declare createdAt: string;
  @attr() declare location: { lat: number; lng: number };
  @belongsTo('trip') declare trip: Trip;
  @belongsTo('user') declare user: User;
  @belongsTo('category') declare category: Category;

  @tracked
  public declare isHovered: boolean;

  get getLat() {
    return this.location?.lat;
  }

  get getLng() {
    return this.location?.lng;
  }

  get userCanEdit() {
    return (
      this.currentUser.user.id === this?.user?.get('id') ||
      this.currentUser.user.id === this?.trip.get('user')?.get('id')
    );
  }

  get tripHasContributors() {
    return this.trip.get('contributors').length > 0;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    tip: Tip;
  }
}
