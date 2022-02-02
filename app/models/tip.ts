import Model, { attr, belongsTo } from '@ember-data/model';
import Trip from './trip';
import User from './user';

export default class Tip extends Model {
  public static modelName = 'tip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @belongsTo('trip') declare trip: Trip;
  @belongsTo('user') declare user: User;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    tip: Tip;
  }
}
