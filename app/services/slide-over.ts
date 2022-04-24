import Model from '@ember-data/model';
import { later } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ModalOptions from '../interfaces/modal-options.interface';

export default class SlideOverService extends Service {
  @tracked isOpen = false;
  @tracked showOverlay = false;
  @tracked title = '';
  @tracked declare options: ModalOptions<Model>;

  constructor() {
    super();
  }

  get getOptions() {
    return this.options;
  }

  get isSlideOverOpen() {
    return this.isOpen;
  }

  get getTitle() {
    return this.options?.title;
  }

  get getCurrentModal() {
    return this.options?.modal;
  }

  closeOnEscape(e: KeyboardEvent) {
    if (this.isOpen && e.key == 'Escape') {
      this.close();
    }
  }

  open(options: ModalOptions<Model>) {
    this.setOptions(options);
    this.showOverlay = true;
    document.body.addEventListener('keyup', this.closeOnEscape.bind(this));

    later(() => {
      this.isOpen = true;
    }, 10);
  }

  close(timeout = 250) {
    this.isOpen = false;

    if (this.options.callback) {
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
    this.options = options;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'slide-over': SlideOverService;
  }
}
