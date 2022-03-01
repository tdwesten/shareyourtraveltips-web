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
  @tracked public declare selectTip: Tip;
  @tracked public isEdittingTrip = false;
  public defaultMapCenterLocation = { lat: 48.155004, lng: 11.4717963 };
  public defaultMapZoom = 5;

  declare map: google.maps.Map;
  declare geocoder: google.maps.Geocoder;

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
  editTrip() {
    this.isEdittingTrip = true;
    this.slideOver.open(this.intl.t('edit_trip'));
  }

  @action
  onMarkerClick(tip: Tip, _map: any, event: PointerEvent) {
    event.stopPropagation();
    this.selectTip = tip;
    this.editTip(this.selectTip);
  }

  @action
  onTipClick(tip: Tip) {
    this.selectTip = tip;
    this.editTip(this.selectTip);
  }

  @action
  editTip(tip: Tip) {
    this.map.panTo({ lat: tip.location.lat, lng: tip.location.lng });
    this.map.panBy(224, 0);

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

    this.map.panTo({
      lat: this.selectTip.location.lat,
      lng: this.selectTip.location.lng,
    });
    this.map.panBy(224, 0);

    this.geocoder.geocode(
      {
        location: {
          lat: this.selectTip.location.lat,
          lng: this.selectTip.location.lng,
        },
      },
      (results, status) => {
        if (results && results.length > 0 && status === 'OK') {
          // @ts-ignore
          const address = results[0].formatted_address;
          this.selectTip.address = address;
        }
      }
    );

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
    this.isEdittingTrip = false;
    this.slideOver.close();
  }

  @action
  saveTrip() {
    this.model.save();
    this.slideOver.close();
  }

  @action
  cancelAddNewTip() {
    this.slideOver.close();

    this.map.panBy(-200, 0);

    if (this.selectTip.get('isNew') === true) {
      this.selectTip.deleteRecord();
    }

    this.selectTip.save();
  }

  @action
  onMapLoad({ map }: { map: google.maps.Map }) {
    this.map = map;
    this.geocoder = new google.maps.Geocoder();

    this.centralize();
  }

  @action
  centralize() {
    const bounds = new google.maps.LatLngBounds();
    // @ts-ignore
    this.model.get('tips').then((tips: Tip[]) => {
      tips.forEach((tip) => {
        bounds.extend({
          lat: tip.location.lat,
          lng: tip.location.lng,
        });
      });

      if (!bounds.isEmpty()) {
        this.map.fitBounds(bounds);
      }
    });
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trip: TripController;
  }
}
