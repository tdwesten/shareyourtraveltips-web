import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Trip from '../../models/trip';
import Unsplash from '../../services/unsplash';

interface TripHeaderArgs {
  model: Trip;
}

export default class TripHeader extends Component<TripHeaderArgs> {
  @service unsplash!: Unsplash;

  @tracked private declare photo: Photo;

  get loadingClass() {
    return this.coverPhoto ? '' : 'animate-pulse';
  }

  get coverPhoto() {
    return this.photo?.urls?.regular;
  }

  get coverPhotoStyle() {
    return this.coverPhoto ? `background-image: url(${this.coverPhoto})` : '';
  }

  constructor(owner: unknown, args: TripHeaderArgs) {
    super(owner, args);

    this.unsplash
      .getImageById(this.args.model.unsplashPhotoId)
      .then((photo) => {
        if (photo) {
          this.photo = photo;
        }
      });
  }
}
