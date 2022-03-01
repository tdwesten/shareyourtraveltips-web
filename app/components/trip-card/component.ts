import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { SafeString } from '@ember/template/-private/handlebars';
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

  get coverPhotoStyle() {
    return this.args.model.unsplashPhotoUrl
      ? `background-image: url(${this.args.model.unsplashPhotoUrl})`
      : '';
  }

  get coverPhotoCredits(): SafeString {
    return htmlSafe(this.args.model.unsplashPhotoCredits);
  }

  constructor(owner: unknown, args: TripCardArgs) {
    super(owner, args);
  }
}
