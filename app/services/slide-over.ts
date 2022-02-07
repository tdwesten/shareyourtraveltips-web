import { later } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SlideOverService extends Service {
  @tracked isOpen = true;
  @tracked showOverlay = true;
  @tracked title = '';

  get isSlideOverOpen() {
    return this.isOpen;
  }

  get getTitle() {
    return this.title;
  }

  open() {
    this.showOverlay = true;

    later(() => {
      this.isOpen = true;
    }, 100);
  }

  close() {
    this.isOpen = false;

    later(() => {
      this.showOverlay = false;
    }, 500);
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
