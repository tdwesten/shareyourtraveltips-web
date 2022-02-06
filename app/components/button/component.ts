import Component from '@glimmer/component';

interface ButtonArgs {
  type?: string;
}

export default class Button extends Component<ButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }
}
