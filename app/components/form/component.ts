import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  BufferedChangeset,
  Changeset,
  lookupValidator,
} from 'validated-changeset';

interface FormArgs {
  onSubmit: CallableFunction;
  validations: any;
  model: any;
}

export default class Form extends Component<FormArgs> {
  @tracked public declare changeset: BufferedChangeset;
  @tracked public errors: any = [];
  @tracked public isValid = false;

  get isInvalid() {
    return this.isValid === false;
  }

  constructor(owner: unknown, args: FormArgs) {
    super(owner, args);

    this.createChangeset();
  }

  createChangeset() {
    this.changeset = Changeset(
      this.args.model,
      lookupValidator(this.args.validations),
      this.args.validations
    );
  }

  @action
  submit(event: Event) {
    event.preventDefault();
    this.changeset.validate().then(() => {
      this.isValid = this.changeset.isValid;
      this.errors = this.changeset.error;

      console.log('errors', this.errors, this.changeset);

      if (this.changeset.isValid) {
        this.changeset.save().then(() => {
          this.args.onSubmit(event);
        });
      }
    });
  }
}
