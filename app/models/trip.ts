import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Tip from './tip';
import User from './user';

export default class Trip extends Model {
  public static modelName = 'trip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @attr('string') declare unsplashPhotoUrl: string;
  @attr('string') declare unsplashPhotoCredits: string;
  @attr('boolean') declare public: boolean;

  @belongsTo('user', { inverse: null }) declare user: User;
  @hasMany('tips') declare tips: Tip[];
  @hasMany('user') declare contributors: User[];

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
