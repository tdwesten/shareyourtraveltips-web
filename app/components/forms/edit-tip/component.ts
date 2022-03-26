import Store from '@ember-data/store';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { BufferedChangeset } from 'validated-changeset';
import Tip from '../../../models/tip';
import CurrentUserService from '../../../services/current-user';
import TIPVALIDATIONS from '../../../validations/tip';

interface FormsEditTipArgs {
  onSuccess: CallableFunction;
  onCancel: CallableFunction;
  onDelete: CallableFunction;
  model: Tip;
  isVisible: boolean;
}

export default class FormsEditTip extends Component<FormsEditTipArgs> {
  @service public declare store: Store;
  @service public declare currentUser: CurrentUserService;
  validations = TIPVALIDATIONS;

  public declare categories;
  public declare changeset: BufferedChangeset;

  get getFormatedCategories() {
    return this.categories ? this.categories : [];
  }

  get getSuccesButtonText() {
    return this.args.model?.get('isNew') ? 'create' : 'save';
  }

  get showDeleteButton() {
    return !this.args.model?.get('isNew');
  }

  constructor(owner: unknown, args: FormsEditTipArgs) {
    super(owner, args);

    this.categories = this.store.findAll('category');
  }

  @action
  addNewTrip() {
    this.args.model.save().then(() => {
      this.args.onSuccess();
    });
  }
}
