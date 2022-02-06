import Model, { attr } from '@ember-data/model';

export default class Category extends Model {
  public static modelName = 'category';

  @attr('string') declare name: string;
  @attr('string') declare backgroundColor: string;
  @attr('string') declare icon: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    category: Category;
  }
}
