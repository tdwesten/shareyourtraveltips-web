import { later } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SlideOverService extends Service {
  @tracked isOpen = false;
  @tracked showOverlay = false;
  @tracked title = '';

  get isSlideOverOpen() {
    return this.isOpen;
  }

  get getTitle() {
    return this.title;
  }

  open(title: string | undefined = undefined) {
    if (title) {
      this.setTitle(title);
    }

    this.showOverlay = true;

    later(() => {
      this.isOpen = true;
    }, 10);
  }

  close() {
    this.isOpen = false;

    later(() => {
      this.showOverlay = false;
    }, 250);
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
