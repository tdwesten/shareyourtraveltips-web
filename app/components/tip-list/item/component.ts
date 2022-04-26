import { action } from '@ember/object';
import Component from '@glimmer/component';
import Tip from '../../../models/tip';

interface TipListItemArgs {
  model: Tip;
  onHover: CallableFunction;
}

export default class TipListItem extends Component<TipListItemArgs> {
  get backgroundColor() {
    const color =
      this.args.model.category.get('backgroundColor') !== undefined
        ? this.args.model.category.get('backgroundColor')
        : 'orange';

    return `bg-${color}-500`;
  }

  get getIcon() {
    return this.args.model.category.get('icon')
      ? this.args.model.category.get('icon')
      : 'circle';
  }

  get getUserFullName() {
    return this.args.model.user.get('fullName');
  }

  get isAddedByContributor() {
    return this.args.model.get('isAddedByContributor');
  }

  @action
  toggleHoverState() {
    this.args.model.toggleProperty('isHovered');
  }
}
