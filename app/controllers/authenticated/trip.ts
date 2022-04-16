import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
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
  @service public declare router: RouterService;

  @tracked public declare selectedTip: Tip | null;
  @tracked public declare map: google.maps.Map;
  @tracked public isEdittingTrip = false;
  @tracked public isEdittingTip = false;
  @tracked public isEdittingTripContributors = false;
  @tracked public searchQuery = '';
  @tracked public model!: Trip;
  public defaultMapCenterLocation = { lat: 48.155004, lng: 11.4717963 };
  public defaultMapZoom = 5;
  public defaultMaxZoom = 15;
  declare geocoder: google.maps.Geocoder;

  get getMapStyles() {
    return MAPSTYLES;
  }

  get getTips() {
    return this.model.tips;
  }

  get getTipsWithoutNew() {
    return this.getTips.filterBy('isNew', false);
  }

  get shareLink() {
    return `${window.location.protocol}${
      window.location.host
    }${this.router.urlFor('trip-invite', this.model)}`;
  }

  @action
  editTrip() {
    this.isEdittingTrip = true;
    this.slideOver.open(this.intl.t('edit_trip'));
  }

  @action
  showContributors() {
    this.slideOver.open(this.intl.t('invite_contributors'));
    this.isEdittingTripContributors = true;
  }

  @action
  onMarkerClick(tip: Tip, _map: any, event: PointerEvent) {
    event.stopPropagation();
    this.selectedTip = tip;
    this.editTip(this.selectedTip);
  }

  @action
  onTipClick(tip: Tip) {
    this.selectedTip = tip;
    this.editTip(this.selectedTip);
  }

  @action
  editTip(tip: Tip) {
    this.map.panTo({ lat: tip.location.lat, lng: tip.location.lng });
    this.map.panBy(224, 0);
    this.isEdittingTip = true;
    this.slideOver.open(this.intl.t('edit_tip'));
  }

  @action
  handleOnSearchSelect(place: google.maps.places.PlaceResult) {
    if (place.geometry) {
      this.selectedTip = this.store.createRecord(Tip.modelName, {
        title: place.name,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        trip: this.model,
        formatted_address: place.formatted_address,
      });

      if (this.selectedTip) {
        this.map.panTo({
          lat: this.selectedTip.location.lat,
          lng: this.selectedTip.location.lng,
        });
      }

      this.slideOver.open(this.intl.t('edit_tip'));
    }
  }

  @action
  onMapClick(event: OnMapClickEvent) {
    this.isEdittingTip = true;
    this.selectedTip = this.store.createRecord('tip', {
      location: {
        lat: event.googleEvent.latLng.lat(),
        lng: event.googleEvent.latLng.lng(),
      },
      trip: this.model,
    });

    this.map.panTo({
      lat: this.selectedTip.location.lat,
      lng: this.selectedTip.location.lng,
    });

    this.map.panBy(224, 0);

    this.geocoder.geocode(
      {
        location: {
          lat: this.selectedTip.location.lat,
          lng: this.selectedTip.location.lng,
        },
      },
      (results, status) => {
        if (
          results &&
          results.length > 0 &&
          status === 'OK' &&
          this.selectedTip
        ) {
          // @ts-ignore
          const address = results.firstObject.formatted_address;
          this.selectedTip.address = address;
        }
      }
    );

    this.slideOver.open(this.intl.t('create_new_tip'));
  }

  @action
  deleteAndSlideOver() {
    if (this.selectedTip) {
      this.selectedTip.deleteRecord();
      this.selectedTip.save();
    }

    this.slideOver.close();
  }

  @action
  closeSlideOver() {
    this.isEdittingTrip = false;
    this.isEdittingTip = false;
    this.selectedTip = null;

    this.slideOver.close();
  }

  @action
  cancelAddNewTip() {
    this.slideOver.close();
    this.map.panBy(-200, 0);

    if (this.selectedTip?.get('isNew') === true) {
      this.selectedTip.deleteRecord();
    }

    this.selectedTip ? this.selectedTip.save() : null;
    this.selectedTip = null;
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
