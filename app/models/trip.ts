import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { Photo } from '../../types/unsplash';
import CurrentUserService from '../services/current-user';
import Tip from './tip';
import User from './user';
export default class Trip extends Model {
  @service() declare currentUser: CurrentUserService;
  @service() declare router: RouterService;

  public static modelName = 'trip';

  @attr('string') declare title: string;
  @attr('string') declare description: string;
  @attr() declare unsplashPhoto: Photo;
  @attr('boolean') declare public: boolean;
  @belongsTo('user', { inverse: null }) declare user: User;
  @hasMany('tips') declare tips: Tip[];
  @hasMany('user') declare contributors: User[];

  get getPublicStatusIcon() {
    return this.public ? 'globe' : 'lock';
  }

  get coverPhotoUrl() {
    if (!this.unsplashPhoto) {
      return null;
    }
    return this.unsplashPhoto.urls.regular;
  }

  get isTripOwner() {
    return this.currentUser.user.get('id') === this.user.get('id');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    trip: Trip;
  }
}
