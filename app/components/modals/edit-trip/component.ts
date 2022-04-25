import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { FlashMessageType } from '../../../enum/flash-message-type.enum';
import Trip from '../../../models/trip';
import TRIPVALIDATIONS from '../../../validations/trip';
import ModalsModal from '../modal/component';

export default class ModalsEditTrip extends ModalsModal<Trip> {
  validations = TRIPVALIDATIONS;
  flashmessageTypes = FlashMessageType;
  @tracked isLoading = false;

  get getSuccesButtonText() {
    return this.args.options?.model?.get('isNew') ? 'create' : 'save';
  }

  @action
  onSuccess() {
    this.slideOver.close();
    this.isLoading = false;
  }
}
