import Component from '@glimmer/component';
import { FlashMessageType } from '../../enum/flash-message-type.enum';

interface FlashMessageArgs {
  type: FlashMessageType;
  icon: string;
}

interface FlashMessageMapping {
  type: FlashMessageType;
  backgroundColor: string;
  leftBorderColor: string;
  iconColor: string;
  textColor: string;
}

const MAPPING: FlashMessageMapping[] = [
  {
    type: FlashMessageType.Error,
    backgroundColor: 'bg-yellow-50',
    leftBorderColor: 'border-yellow-400',
    iconColor: 'text-yellow-400',
    textColor: 'text-yellow-700',
  },
  {
    type: FlashMessageType.Info,
    backgroundColor: 'bg-blue-50',
    leftBorderColor: 'border-blue-400',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-700',
  },
  {
    type: FlashMessageType.Success,
    backgroundColor: 'bg-green-50',
    leftBorderColor: 'border-green-400',
    iconColor: 'text-green-400',
    textColor: 'text-green-700',
  },
];
export default class FlashMessage extends Component<FlashMessageArgs> {
  get type() {
    return this.args.type ? this.args.type : FlashMessageType.Info;
  }

  get getColors() {
    return MAPPING.filter((item) => item.type === this.type).firstObject;
  }
}
