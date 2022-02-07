import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import IntlService from 'ember-intl/services/intl';
import Trip from '../../models/trip';
import SlideOverService from '../../services/slide-over';

export default class TripsController extends Controller {
  @service private declare slideOver: SlideOverService;
  @service private declare intl: IntlService;

  @tracked public declare newTrip: Trip;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
    this.slideOver.setTitle(this.intl.t('create_new_trip'));
  }

  @action
  openSlideOver() {
    this.slideOver.setTitle('Slide Over Title');
    this.slideOver.open();
  }

  @action
  addNewTrip() {
    console.log(this.newTrip);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trips: TripsController;
  }
}
