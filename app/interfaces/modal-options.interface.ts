import { Modals } from '../enum/modals.enum';

export default interface ModalOptions<M> {
  modal: Modals | null;
  title: string | null;
  model: M | null;
  callback?: CallableFunction | null;
}
