import Component from '@glimmer/component';

interface InputErrorMessageArgs {
  message: string | object;
}

export default class InputErrorMessage extends Component<InputErrorMessageArgs> {
  get error() {
    if (typeof this.args.message === 'string') {
      return this.args.message;
    }

    if (
      typeof this.args.message === 'object' &&
      // eslint-disable-next-line no-prototype-builtins
      this.args.message.hasOwnProperty('validation')
    ) {
      // @ts-ignore
      return this.args.message.validation[0];
    }

    return this.args.message;
  }
}
