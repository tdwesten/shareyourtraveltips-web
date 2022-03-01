import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import { SafeString } from '@ember/template/-private/handlebars';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Trip from '../../models/trip';
import Unsplash from '../../services/unsplash';

interface TripHeaderArgs {
  model: Trip;
  editTrip: CallableFunction;
}

export default class TripHeader extends Component<TripHeaderArgs> {
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

  constructor(owner: unknown, args: TripHeaderArgs) {
    super(owner, args);
  }
}
