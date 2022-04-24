import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../types/unsplash';
import Trip from '../../models/trip';
import CurrentUserService from '../../services/current-user';
import Unsplash from '../../services/unsplash';

interface TripCardArgs {
  model: Trip;
  hasHover: boolean;
}

export default class TripCard extends Component<TripCardArgs> {
  @service unsplash!: Unsplash;
  @service declare currentUser: CurrentUserService;
  @tracked private declare photo: Photo;

  get isMine() {
    return this.args.model.user.id === this.currentUser.user.id;
  }

  get coverPhotoStyle() {
    return this.args.model.coverPhotoUrl
      ? `background-image: url(${this.args.model.coverPhotoUrl})`
      : '';
  }

  constructor(owner: unknown, args: TripCardArgs) {
    super(owner, args);
  }
}
