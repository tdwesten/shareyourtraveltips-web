import Component from '@glimmer/component';
import Trip from '../../../models/trip';
import TRIPVALIDATIONS from '../../../validations/trip';
interface FormsEditTripArgs {
  onSuccess: CallableFunction;
  onCancel: CallableFunction;
  model: Trip;
}

export default class FormsEditTrip extends Component<FormsEditTripArgs> {
  validations = TRIPVALIDATIONS;

  get getSuccesButtonText() {
    return this.args.model?.get('isNew') ? 'create' : 'save';
  }
}
