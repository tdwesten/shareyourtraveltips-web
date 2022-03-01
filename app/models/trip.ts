import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Tip from './tip';
import User from './user';

export default class Trip extends Model {
  public static modelName = 'trip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @hasMany('tips') declare tips: Tip[];
  @belongsTo('user') declare user: User;
  @attr('string') declare unsplashPhotoUrl: string;
  @attr('string') declare unsplashPhotoCredits: string;
  @attr('boolean') declare public: boolean;

  get getPublicStatusIcon() {
    return this.public ? 'globe' : 'lock';
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    trip: Trip;
  }
}
