import Application from '@ember/application';
import User from '../models/user';

export function initialize(application: Application): void {
  application.register('object:model', User);
}

export default {
  initialize,
};
