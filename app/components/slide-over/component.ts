import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SlideOverService from '../../services/slide-over';
import { action } from '@ember/object';

interface SlideOverArgs {}

export default class SlideOver extends Component<SlideOverArgs> {
  @service private declare slideOver: SlideOverService;

  get isSlideOverOpen() {
    return this.slideOver.isSlideOverOpen;
  }

  get hideOverlay() {
    return !this.slideOver.showOverlay;
  }

  get getTitle() {
    return this.slideOver.getTitle;
  }

  @action
  closeSlideOver() {
    this.slideOver.close();
  }

  get animationClasses() {
    const entering =
      'transform transition ease-in-out duration-500 translate-x-full';
    const leaving =
      'transform transition ease-in-out duration-500 translate-x-0';

    return this.isSlideOverOpen ? leaving : entering;
  }
}
