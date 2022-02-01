import Model, { attr } from '@ember-data/model';

export default class User extends Model {
  public static modelName = 'user';

  @attr('string') declare name: string;
  @attr('string') declare email: string;
  @attr('string') declare password: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: User;
  }
}
