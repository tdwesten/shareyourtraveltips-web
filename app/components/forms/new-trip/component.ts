import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../../types/unsplash';
import Trip from '../../../models/trip';
import CurrentUserService from '../../../services/current-user';

interface FormsNewTripArgs {
  onSuccess: CallableFunction;
  onCancel: CallableFunction;
}

export default class FormsNewTrip extends Component<FormsNewTripArgs> {
  @service public declare store: Store;
  @service public declare currentUser: CurrentUserService;

  @tracked public declare primaryCountry: string;
  @tracked public declare model: Trip;

  constructor(owner: unknown, args: FormsNewTripArgs) {
    super(owner, args);

    this.model = this.store.createRecord('trip');
  }

  @action
  setCoverPhoto(photo: Photo) {
    this.model.set('unsplashPhotoId', photo.id);
  }

  @action
  addNewTrip(e: Event) {
    e.preventDefault();

    this.model.save().then(() => {
      this.args.onSuccess();
    });
  }
}
