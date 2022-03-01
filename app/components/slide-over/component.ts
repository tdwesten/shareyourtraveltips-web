import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SlideOverService from '../../services/slide-over';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface SlideOverArgs {}

export default class SlideOver extends Component<SlideOverArgs> {
  @service private declare slideOver: SlideOverService;

  @tracked public declare element: HTMLElement;

  constructor(owner: unknown, args: SlideOverArgs) {
    super(owner, args);
  }

  get isSlideOverOpen() {
    if (this.slideOver.isSlideOverOpen) {
      this.focusFirstElement();
    }

    return this.slideOver.isSlideOverOpen;
  }

  get hideOverlay() {
    return !this.slideOver.showOverlay;
  }

  get getTitle() {
    return this.slideOver.getTitle;
  }

  focusFirstElement() {
    const firstElement = this.element.querySelector('input');

    if (firstElement) {
      firstElement.focus();
    }
  }

  @action
  onInsert(element: HTMLElement) {
    this.element = element;
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

  get animationBackgroundClasses() {
    const entering =
      'opacity transition ease-in-out duration-500 opacity-0 bg-black bg-opacity-50';
    const leaving =
      'opacity transition ease-in-out duration-500 opacity-100 bg-black bg-opacity-50';

    return this.isSlideOverOpen ? leaving : entering;
  }
}
