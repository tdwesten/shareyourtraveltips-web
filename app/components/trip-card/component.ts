import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Trip from '../../models/trip';
import Unsplash from '../../services/unsplash';

interface TripCardArgs {
  trip: Trip;
}

export default class TripCard extends Component<TripCardArgs> {
  @service unsplash!: Unsplash;

  @tracked private declare photo: Photo;

  get coverPhoto() {
    return this.photo?.urls?.small;
  }

  constructor(owner: unknown, args: TripCardArgs) {
    super(owner, args);

    this.unsplash.getImageById(this.args.trip.unsplashPhotoId).then((photo) => {
      this.photo = photo;
    });
  }
}
