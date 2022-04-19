import { later } from '@ember/runloop';
import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SlideOverService extends Service {
  @tracked isOpen = false;
  @tracked showOverlay = false;
  @tracked title = '';

  constructor() {
    super();
  }

  get isSlideOverOpen() {
    return this.isOpen;
  }

  get getTitle() {
    return this.title;
  }

  open(title: string | undefined = undefined) {
    if (this.isOpen) {
      this.close(0);

      setTimeout(() => {
        this.isOpen = false;
        this.open(title);
      }, 350);
    }

    if (title) {
      this.setTitle(title);
    }

    this.showOverlay = true;

    later(() => {
      this.isOpen = true;
    }, 10);
  }

  close(timeout = 250) {
    this.isOpen = false;

    later(() => {
      this.showOverlay = false;
    }, timeout);
  }

  setTitle(title: string) {
    this.title = title;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'slide-over': SlideOverService;
  }
}
