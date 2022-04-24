import { Modals } from '../enum/modals.enum';

export default interface ModalOptions<M> {
  modal: Modals;
  title: string;
  model: M;
  showCloseButton: boolean;
  showOverlay: boolean;
  callback?: CallableFunction;
}
