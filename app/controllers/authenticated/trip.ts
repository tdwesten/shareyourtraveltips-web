import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import IntlService from 'ember-intl/services/intl';
import { Modals } from '../../enum/modals.enum';
import Tip from '../../models/tip';
import Trip from '../../models/trip';
import CurrentUserService from '../../services/current-user';
import SlideOverService from '../../services/slide-over';

interface OnMapClickEvent {
  event: PointerEvent;
  components: {
    markers: unknown[];
  };
  map: unknown;
  target: unknown;
  eventName: string;
  googleEvent: {
    domEvent: MouseEvent;
    jb: unknown;
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
  @tracked public searchQuery = '';
  @tracked public model!: Trip;
  @tracked public placeMarkerTimeout: any;
  @tracked public isEdittingTip = false;
  @tracked public declare currentLocation: { lat: number; lng: number };
  public defaultMapZoom = 5;
  public defaultMaxZoom = 20;
  declare geocoder: google.maps.Geocoder;

  get getTips() {
    return this.model.tips.sortBy('createdAt').reverse();
  }

  get defaultMapCenterLocation() {
    return {
      lat: 49.8453321,
      lng: 9.9034641,
    };
  }

  get getTipsWithoutNew() {
    // @ts-expect-error isNew is not typed
    return this.getTips.filterBy('isNew', false);
  }

  get getCurrentLocation() {
    return this.currentLocation;
  }

  navigatorLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      this.currentLocation = { lat: lat, lng: lng };
    });
  }

  @action
  editTrip() {
    this.slideOver.open({
      modal: Modals.EditTrip,
      model: this.model,
      title: this.intl.t('edit_trip'),
    });
  }

  @action
  showContributors() {
    this.slideOver.open({
      modal: Modals.EditContributors,
      title: this.intl.t('invite_contributors') as string,
      model: this.model,
    });
  }

  @action
  onMarkerClick(tip: Tip, _map: any, event: PointerEvent) {
    this.isEdittingTip = true;

    event.stopPropagation();

    this.selectedTip = tip;
    this.map.panTo({ lat: tip.location.lat, lng: tip.location.lng });
    // this.map.panBy(224, 0);

    this.slideOver.open({
      modal: tip.userCanEdit ? Modals.EditTip : Modals.ViewTip,
      model: tip,
      title: tip.userCanEdit
        ? this.intl.t('edit_tip')
        : this.intl.t('view_tip'),
      callback: this.markerModalClose.bind(this),
    });
  }

  @action
  onTipClick(tip: Tip) {
    this.selectedTip = tip;
    this.map.panTo({ lat: tip.location.lat, lng: tip.location.lng });
    // this.map.panBy(224, 0);
    this.slideOver.open({
      modal: tip.userCanEdit ? Modals.EditTip : Modals.ViewTip,
      model: tip,
      title: tip.userCanEdit
        ? this.intl.t('edit_tip')
        : this.intl.t('view_tip'),
      callback: this.markerModalClose.bind(this),
    });
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

      if (this.selectedTip) {
        this.slideOver.open({
          modal: Modals.EditTip,
          model: this.selectedTip,
          title: this.intl.t('edit_tip'),
          callback: this.markerModalClose.bind(this),
        });
      }
    }
  }

  @action
  onMapDblClick() {
    clearTimeout(this.placeMarkerTimeout);
  }

  @action
  onMapClick(event: OnMapClickEvent) {
    this.placeMarkerTimeout = setTimeout(() => {
      this.placeMarker(event);
    }, 200);
  }

  placeMarker(event: OnMapClickEvent) {
    if (this.isEdittingTip) {
      return;
    }

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
          results.firstObject &&
          status === 'OK' &&
          this.selectedTip
        ) {
          const address = results.firstObject.formatted_address;
          this.selectedTip.address = address;
        }
      }
    );

    this.slideOver.open({
      modal: Modals.EditTip,
      model: this.selectedTip,
      title: this.intl.t('edit_tip'),
      callback: this.markerModalClose.bind(this),
    });
  }

  markerModalClose() {
    this.isEdittingTip = false;

    if (this.selectedTip) {
      if (this.selectedTip.get('isNew') === true) {
        this.selectedTip.deleteRecord();
      }
      this.selectedTip ? this.selectedTip?.save() : null;
    }
  }

  @action
  onMapLoad({ map }: { map: google.maps.Map }) {
    this.map = map;
    this.geocoder = new google.maps.Geocoder();

    this.centralize();
    this.navigatorLocation();
  }

  @action
  centralize() {
    const bounds = new google.maps.LatLngBounds();
    this.model.get('tips').forEach((tip) => {
      bounds.extend({
        lat: tip.location.lat,
        lng: tip.location.lng,
      });
    });

    if (!bounds.isEmpty()) {
      this.map.fitBounds(bounds);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trip: TripController;
  }
}
