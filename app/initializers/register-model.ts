import Application from '@ember/application';
import Tip from '../models/tip';
import Trip from '../models/trip';
import User from '../models/user';

export function initialize(application: Application): void {
  application.register('object:model', User);
  application.register('object:model', Trip);
  application.register('object:model', Tip);
}

export default {
  initialize,
};
