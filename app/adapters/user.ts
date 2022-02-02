import User from '../models/user';
import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  urlForQueryRecord(query: { me: boolean }) {
    const originalUrl = super.urlForQueryRecord(query, User.modelName);

    if (query.me) {
      query.me = false;
      return `${originalUrl}/me`;
    }

    return originalUrl;
  }
}
