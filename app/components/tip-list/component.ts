import Component from '@glimmer/component';
import Tip from '../../models/tip';

interface TipListArgs {
  tips: Tip[];
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TipList extends Component<TipListArgs> {}
