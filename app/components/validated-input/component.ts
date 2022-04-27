import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { BufferedChangeset } from 'validated-changeset';

interface ValidatedInputArgs {
  changeset: BufferedChangeset;
  id: string;
  type: 'text' | 'textarea' | 'password' | 'email' | 'checkbox' | 'number';
}

export default class ValidatedInput extends Component<ValidatedInputArgs> {
  @tracked errors: Errors<string> = [];
  public hasBlurred = false;

  constructor(owner: unknown, args: ValidatedInputArgs) {
    super(owner, args);

    this.args.changeset.on('afterValidation', () => {
      this.errors = this.args.changeset.errors.filter(
        (error: { key: string }) => error.key === this.args.id
      );
    });
  }

  get errorMessage() {
    return this.errors.length > 0 ? this.errors[0]?.validation[0] : undefined;
  }

  get hasError() {
    return this.errors.length > 0;
  }

  get borderClasses() {
    return this.hasError
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500';
  }

  get isTextarea() {
    return this.args.type === 'textarea';
  }

  @action
  onBlur() {
    this.hasBlurred = true;
  }
}
