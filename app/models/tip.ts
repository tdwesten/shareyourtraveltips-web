import Model, { attr, belongsTo } from '@ember-data/model';
import Category from './category';
import Trip from './trip';
import User from './user';

export default class Tip extends Model {
  public static modelName = 'tip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @attr() declare location: { coordinates: [number, number] };
  @belongsTo('trip') declare trip: Trip;
  @belongsTo('user') declare user: User;
  @belongsTo('category') declare category: Category;

  get getLng() {
    return this.location?.coordinates[0];
  }

  get getLat() {
    return this.location?.coordinates[1];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    tip: Tip;
  }
}
