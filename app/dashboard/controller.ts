import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service private declare session;
  @service private declare currentUser;
}
