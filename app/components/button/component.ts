import Component from '@glimmer/component';

interface ButtonArgs {
  type?: string;
  isLarge?: boolean;
  isLoading?: boolean;
}

export default class Button extends Component<ButtonArgs> {
  get type() {
    return this.args.type || 'button';
  }

  get sizeClasses() {
    if (this.args.isLarge) {
      return 'py-4 px-6 text-base';
    }

    return 'py-2 px-4 text-sm';
  }
}
