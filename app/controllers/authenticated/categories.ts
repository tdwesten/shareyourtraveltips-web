import Controller from '@ember/controller';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import Category from '../../models/category';

export default class CategoriesController extends Controller {
  @service private declare intl: IntlService;

  model!: Category[];

  get tableRows() {
    return this.model.map((category) => {
      return [category.name, category.backgroundColor, category.icon];
    });
  }

  get tableHeaders() {
    return [
      this.intl.t('name'),
      this.intl.t('background_color'),
      this.intl.t('icon'),
    ];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    categories: CategoriesController;
  }
}
