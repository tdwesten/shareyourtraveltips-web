import Model, { attr, hasMany } from '@ember-data/model';
import Store from '@ember-data/store';
import { service } from '@ember/service';

export default class User extends Model {
  @service public declare store: Store;

  public static modelName = 'user';

  @attr('string') declare firstName: string;
  @attr('string') declare lastName: string;
  @attr('string') declare email: string;
  @attr('string') declare password: string;
  @attr('string') declare locale: string;
  @hasMany('trip') declare trips: [];

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  get tripsContributedTo() {
    return this.store.query('trip', {
      filter: { contributors: { id: [this.id] } },
      include: 'tips,tips.category,tips.user',
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
