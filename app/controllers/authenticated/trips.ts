import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import IntlService from 'ember-intl/services/intl';
import { Modals } from '../../enum/modals.enum';
import Trip from '../../models/trip';
import SlideOverService from '../../services/slide-over';

export default class TripsController extends Controller {
  @service private declare slideOver: SlideOverService;
  @service private declare intl: IntlService;
  @service public declare store: Store;

  declare model: { newTrip: Trip };

  @tracked public declare primaryCountry: string;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
  }

  @action
  openSlideOver() {
    this.slideOver.open({
      modal: Modals.EditTrip,
      model: this.model.newTrip,
      title: this.intl.t('create_new_trip'),
      showCloseButton: true,
      showOverlay: false,
      callback: this.closeSlideOver.bind(this),
    });
  }

  closeSlideOver() {
    this.model.newTrip = this.store.createRecord('trip');
  }

  @action
  closeSlideOverOnCancel() {
    this.slideOver.close();
    this.model.newTrip.rollbackAttributes();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trips: TripsController;
  }
}
