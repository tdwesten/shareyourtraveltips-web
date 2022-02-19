import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Trip from '../../models/trip';
import Unsplash from '../../services/unsplash';

interface TripCardArgs {
  model: Trip;
  hasHover: boolean;
}

export default class TripCard extends Component<TripCardArgs> {
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

  get getPublicStatusIcon() {
    return this.args.model.public ? 'globe' : 'lock';
  }

  constructor(owner: unknown, args: TripCardArgs) {
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
