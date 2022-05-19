import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SlideOverService from '../../services/slide-over';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Modals } from '../../enum/modals.enum';
import RouterService from '@ember/routing/router-service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SlideOverArgs {}

export default class SlideOver extends Component<SlideOverArgs> {
  @service private declare slideOver: SlideOverService;
  @service private declare router: RouterService;
  @tracked public declare elm: HTMLElement;
  public modals = Modals;

  constructor(owner: unknown, args: SlideOverArgs) {
    super(owner, args);

    this.router.on('routeWillChange', () => {
      this.closeSlideOver();
    });
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
    const base = 'transform transition ease-in-out duration-500 ';
    const entering =
      base +
      'translate-x-0 md:translate-x-full translate-y-full md:translate-y-0';
    const leaving =
      base + 'translate-x-0 md:translate-x-0 translate-y-1/4 md:translate-y-0';

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
