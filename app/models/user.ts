import Model, { attr, hasMany } from '@ember-data/model';

export default class User extends Model {
  public static modelName = 'user';

  @attr('string') declare firstName: string;
  @attr('string') declare lastName: string;
  @attr('string') declare email: string;
  @attr('string') declare password: string;
  @hasMany('trip') declare trips: [];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
