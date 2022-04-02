import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { Photo } from '../../types/unsplash';
import Tip from './tip';
import User from './user';
import { htmlSafe } from '@ember/template';
import { SafeString } from '@ember/template/-private/handlebars';
export default class Trip extends Model {
  [x: string]: any;
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

  get unsplashPhotoCredits(): SafeString | null {
    if (!this.unsplashPhoto) {
      return null;
    }

    return htmlSafe(
      `Photo by <a href="https://unsplash.com/@${this.unsplashPhoto.user.username}?utm_source=shareyourtravel.tips&amp;utm_medium=referral ">${this.unsplashPhoto.user.first_name} ${this.unsplashPhoto.user.last_name}</a> on (<a href="https://unsplash.com?utm_source=shareyourtravel.tips&amp;utm_medium=referral">Unsplash</a>)`
    );
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    trip: Trip;
  }
}
