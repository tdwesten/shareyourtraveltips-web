import Model from '@ember-data/model';
import { later } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Modals } from '../enum/modals.enum';
import ModalOptions from '../interfaces/modal-options.interface';

export default class SlideOverService extends Service {
  @tracked isOpen = false;
  @tracked showOverlay = false;
  @tracked declare title: string;
  @tracked declare modal: Modals | null;
  @tracked declare model: Model | null;
  @tracked declare options: ModalOptions<Model> | null;
  @tracked declare callback: CallableFunction | null;

  constructor() {
    super();
  }

  get getOptions(): ModalOptions<Model> {
    return {
      title: this.title,
      modal: this.modal,
      model: this.model,
      callback: this.callback || null,
    };
  }

  get isSlideOverOpen() {
    return this.isOpen;
  }

  get getTitle() {
    return this.title;
  }

  get getCurrentModal() {
    return this.modal;
  }

  closeOnEscape(e: KeyboardEvent) {
    if (this.isOpen && e.key == 'Escape') {
      this.close();
    }
  }

  clearOptions() {
    this.title = '';
    this.model = null;
    this.modal = null;
    this.callback = null;
  }

  open(options: ModalOptions<Model>) {
    const timeout = 10;

    this.setOptions(options);
    this.showOverlay = true;
    document.body.addEventListener('keyup', this.closeOnEscape.bind(this));

    later(() => {
      this.isOpen = true;
    }, timeout);
  }

  close(timeout = 250) {
    this.isOpen = false;

    if (this.options?.callback) {
      this.options.callback();
    }

    document.body.removeEventListener(
      'keyup',
      this.closeOnEscape.bind(this),
      true
    );

    later(() => {
      this.showOverlay = false;
    }, timeout);
  }

  setOptions(options: ModalOptions<Model>) {
    this.title = options.title || '';
    this.model = options.model || null;
    this.modal = options.modal || null;
    this.callback = options.callback ? options.callback : null;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'slide-over': SlideOverService;
  }
}
