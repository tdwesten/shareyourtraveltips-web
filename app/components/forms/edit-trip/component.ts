import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Photo } from '../../../../types/unsplash';
import Trip from '../../../models/trip';
import CurrentUserService from '../../../services/current-user';
import TRIPVALIDATIONS from '../../../validations/trip';
import {
  BufferedChangeset,
  Changeset,
  lookupValidator,
} from 'validated-changeset';
interface FormsEditTripArgs {
  onSuccess: CallableFunction;
  onCancel: CallableFunction;
  model: Trip;
}

export default class FormsEditTrip extends Component<FormsEditTripArgs> {
  @service public declare store: Store;
  @service public declare currentUser: CurrentUserService;

  @tracked public changeset: BufferedChangeset;

  get getSuccesButtonText() {
    return this.args.model?.get('isNew') ? 'create' : 'save';
  }

  constructor(owner: unknown, args: FormsEditTripArgs) {
    super(owner, args);

    this.changeset = Changeset(
      this.args.model,
      lookupValidator(TRIPVALIDATIONS),
      TRIPVALIDATIONS
    );
  }

  @action
  setCoverPhoto(photo: Photo) {
    this.args.model.set('unsplashPhoto', photo);
  }

  @action
  addNewTrip(e: Event) {
    e.preventDefault();

    this.args.onSuccess();
  }
}
