import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';
import User from '../models/user';

export default class CurrentUserService extends Service {
  @service private declare session;
  @service private declare store: DS.Store;
  @service private declare intl;

  @tracked public declare user: User;

  async load() {
    const userId = this.session.data.authenticated.user_id;

    if (userId) {
      const user = await this.store.findRecord('user', userId);
      this.intl.setLocale([user.locale]);
      this.user = user;
    }
  }
}
