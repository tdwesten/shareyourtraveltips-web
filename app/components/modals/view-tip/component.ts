import Tip from '../../../models/tip';
import ModalsModal from '../modal/component';

export default class ModalsviewTip extends ModalsModal<Tip> {
  get getUserFullName() {
    return this.args?.options?.model?.user.get('fullName');
  }
}
