import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import IntlService from 'ember-intl/services/intl';
import { MAPSTYLES } from '../../components/map-wrapper/map-styles';
import Tip from '../../models/tip';
import Trip from '../../models/trip';
import CurrentUserService from '../../services/current-user';
import SlideOverService from '../../services/slide-over';

interface OnMapClickEvent {
  event: PointerEvent;
  components: {
    markers: any[];
  };
  map: any;
  target: any;
  eventName: string;
  googleEvent: {
    domEvent: MouseEvent;
    jb: any;
    latLng: {
      lat: CallableFunction;
      lng: CallableFunction;
    };
  };
}
export default class TripController extends Controller {
  @service public declare store: Store;
  @service public declare slideOver: SlideOverService;
  @service public declare currentUser: CurrentUserService;
  @service public declare intl: IntlService;

  @service googleMapsApi: any;

  get google() {
    return this.googleMapsApi.google;
  }

  @tracked public declare selectTip: Tip;

  map!: any;
  model!: Trip;

  get getMapStyles() {
    return MAPSTYLES;
  }

  get getTips() {
    return this.model.tips;
  }

  get getTipsWithoutNew() {
    return this.getTips.filterBy('isNew', false);
  }

  @action
  onMarkerClick(tip: Tip, event: PointerEvent) {
    event.stopPropagation();

    this.selectTip = tip;
    this.slideOver.open(this.intl.t('edit_tip'));
  }

  @action
  onTipClick(tip: Tip) {
    this.selectTip = tip;
    this.slideOver.open(this.intl.t('edit_tip'));
  }

  @action
  onMapClick(event: OnMapClickEvent) {
    this.selectTip = this.store.createRecord('tip', {
      location: {
        lat: event.googleEvent.latLng.lat(),
        lng: event.googleEvent.latLng.lng(),
      },
      trip: this.model,
    });

    this.slideOver.open();
    this.slideOver.open(this.intl.t('create_new_tip'));
  }

  @action
  saveAndSlideOver(e: Event) {
    e.preventDefault();
    this.slideOver.close();
    this.selectTip.save();
  }

  @action
  deleteAndSlideOver() {
    this.slideOver.close();
    this.selectTip.deleteRecord();
    this.selectTip.save();
  }

  @action
  closeSlideOver() {
    this.slideOver.close();

    if (this.selectTip.get('isNew') === true) {
      this.selectTip.deleteRecord();
    }

    this.selectTip.save();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trip: TripController;
  }
}
