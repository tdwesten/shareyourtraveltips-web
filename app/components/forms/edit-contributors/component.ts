import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  BufferedChangeset,
  Changeset,
  lookupValidator,
} from 'validated-changeset';
import Trip from '../../../models/trip';
import CurrentUserService from '../../../services/current-user';
import TRIPVALIDATIONS from '../../../validations/trip';
interface EditContributorsArgs {
  onSuccess: CallableFunction;
  onCancel: CallableFunction;
  model: Trip;
}

export default class EditContributors extends Component<EditContributorsArgs> {
  @service public declare store: Store;
  @service public declare currentUser: CurrentUserService;
  @tracked public changeset: BufferedChangeset;

  validations = TRIPVALIDATIONS;

  get getSuccesButtonText() {
    return this.args.model?.get('isNew') ? 'create' : 'save';
  }

  constructor(owner: unknown, args: EditContributorsArgs) {
    super(owner, args);

    this.changeset = Changeset(
      this.args.model,
      lookupValidator(TRIPVALIDATIONS),
      TRIPVALIDATIONS
    );
  }

  @action
  addNewTrip() {
    this.args.onSuccess();
  }
}
