import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import CurrentUserService from '../services/current-user';

export default class IndexController extends Controller {
  @service private declare session;
  @service private declare currentUser: CurrentUserService;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: IndexController;
  }
}
