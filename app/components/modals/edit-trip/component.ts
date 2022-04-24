import { FlashMessageType } from '../../../enum/flash-message-type.enum';
import Trip from '../../../models/trip';
import TRIPVALIDATIONS from '../../../validations/trip';
import ModalsModal from '../modal/component';

export default class ModalsEditTrip extends ModalsModal<Trip> {
  validations = TRIPVALIDATIONS;
  flashmessageTypes = FlashMessageType;

  get getSuccesButtonText() {
    return this.args.options?.model.get('isNew') ? 'create' : 'save';
  }
}
