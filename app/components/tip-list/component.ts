import Component from '@glimmer/component';
import Tip from '../../models/tip';

interface TipListArgs {
  tips: Tip[];
}

export default class TipList extends Component<TipListArgs> {}
