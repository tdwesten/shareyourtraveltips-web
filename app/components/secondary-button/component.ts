import Component from '@glimmer/component';

interface SecondaryButtonArgs {
  type?: string;
}

export default class SecondaryButton extends Component<SecondaryButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }
}
