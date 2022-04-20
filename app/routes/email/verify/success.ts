import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import CurrentUserService from '../../../services/current-user';

export default class EmailVerifySuccess extends Route {
  @service public declare currentUser: CurrentUserService;

  model() {
    return this.currentUser.user;
  }
}
