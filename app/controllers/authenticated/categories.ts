import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import { Modals } from '../../enum/modals.enum';
import Category from '../../models/category';
import SlideOverService from '../../services/slide-over';

export default class CategoriesController extends Controller {
  @service private declare intl: IntlService;
  @service private declare slideOver: SlideOverService;
  @service public declare store: Store;

  @action
  openEditModal(category: Category) {
    console.log(category);

    this.slideOver.open({
      modal: Modals.EditCategory,
      model: category,
      title: this.intl.t('edit_category'),
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    categories: CategoriesController;
  }
}
