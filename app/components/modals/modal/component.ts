import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import ModalOptions from '../../../interfaces/modal-options.interface';
import SlideOverService from '../../../services/slide-over';

interface ModalsModalArgs<M> {
  options: ModalOptions<M>;
}

export default class ModalsModal<M = unknown> extends Component<
  ModalsModalArgs<M>
> {
  @service public declare slideOver: SlideOverService;

  constructor(owner: unknown, args: ModalsModalArgs<M>) {
    super(owner, args);
  }

  get getModel() {
    return this.args.options.model;
  }

  @action
  onCancel() {
    this.slideOver.close();
  }

  @action
  onSuccess() {
    this.slideOver.close();
  }
}
