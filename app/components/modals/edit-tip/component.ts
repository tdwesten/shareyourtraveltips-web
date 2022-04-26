import { FlashMessageType } from '../../../enum/flash-message-type.enum';
import Tip from '../../../models/tip';
import TIPVALIDATIONS from '../../../validations/tip';
import ModalsModal from '../modal/component';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import CurrentUserService from '../../../services/current-user';
import ModalOptions from '../../../interfaces/modal-options.interface';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface ModalsModalArgs<M> {
  options: ModalOptions<M>;
}

export default class ModalsEditTip extends ModalsModal<Tip> {
  @service public declare store: Store;
  @service public declare currentUser: CurrentUserService;
  @tracked public isLoading = false;

  validations = TIPVALIDATIONS;
  flashmessageTypes = FlashMessageType;
  public declare categories;

  get getFormatedCategories() {
    return this.categories ? this.categories : [];
  }

  constructor(owner: unknown, args: ModalsModalArgs<Tip>) {
    super(owner, args);

    this.categories = this.store.findAll('category');
  }

  get getSuccesButtonText() {
    return this.args.options.model?.get('isNew') ? 'create' : 'save';
  }

  get isNew() {
    return !this.args.options.model?.get('isNew');
  }

  get userCanDelete() {
    return this.currentUser.user.id === this.args.options.model?.get('user').id;
  }

  get showDeleteButton() {
    return this.isNew && this.userCanDelete;
  }

  @action
  addNewTrip() {
    this.isLoading = true;
    this.args.options.model?.save().then(() => {
      this.isLoading = false;
      this.onSuccess();
    });
  }

  @action
  onDelete() {
    this.isLoading = true;
    this.args.options.model?.deleteRecord();
    this.args.options.model
      ?.save()
      .then(() => {
        this.onCancel();
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
