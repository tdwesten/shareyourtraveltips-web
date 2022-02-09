import Controller from '@ember/controller';

export default class TripController extends Controller {
  onMarkerClick(event: Event) {
    console.log(event);
  }

  onMapClick(event: Event) {
    console.log(event);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    trip: TripController;
  }
}
