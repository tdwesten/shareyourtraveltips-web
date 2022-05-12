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

  // Props
  @tracked public declare newTrip: Trip;
  @tracked public declare primaryCountry: string;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
  }

  @action
  openSlideOver() {
    this.newTrip = this.store.createRecord('trip');

    this.slideOver.open({
      modal: Modals.EditTrip,
      model: this.newTrip,
      title: this.intl.t('create_new_trip'),
      callback: this.closeSlideOver.bind(this),
    });
  }

  closeSlideOver() {
    this.newTrip.destroyRecord();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trips: TripsController;
  }
}
