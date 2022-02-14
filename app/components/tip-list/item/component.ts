import { action } from '@ember/object';
import Component from '@glimmer/component';
import Tip from '../../../models/tip';

interface TipListItemArgs {
  model: Tip;
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

  @action
  toggleHoverState() {
    this.args.model.toggleProperty('isHovered');
  }
}
