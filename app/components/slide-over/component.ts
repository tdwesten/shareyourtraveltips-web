import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SlideOverService from '../../services/slide-over';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Modals } from '../../enum/modals.enum';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SlideOverArgs {}

export default class SlideOver extends Component<SlideOverArgs> {
  @service private declare slideOver: SlideOverService;
  @tracked public declare elm: HTMLElement;
  public modals = Modals;

  constructor(owner: unknown, args: SlideOverArgs) {
    super(owner, args);
  }

  get getOptions() {
    return this.slideOver.getOptions;
  }

  get isSlideOverOpen() {
    if (this.slideOver.isSlideOverOpen) {
      this.focusFirstElement();
    }

    return this.slideOver.isSlideOverOpen;
  }

  get getCurrentModal() {
    return this.slideOver?.getCurrentModal;
  }

  get hideOverlay() {
    return !this.slideOver.showOverlay;
  }

  get getTitle() {
    return this.slideOver.getTitle;
  }

  focusFirstElement() {
    const firstElement = this.elm.querySelector('input');

    if (firstElement) {
      firstElement.focus();
    }
  }

  @action
  onInsert(element: HTMLElement) {
    this.elm = element;
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
