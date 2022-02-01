import JSONAPIAdapter from '@ember-data/adapter/json-api';
// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';

interface IHeaders {
  Authorization: any;
}
export default class ApplicationAdapter extends JSONAPIAdapter {
  @service private declare session;

  host = (ENV.APP.apiHost + '/v1') as string;

  @computed(
    // eslint-disable-next-line ember/use-brace-expansion
    'session.data.authenticated.access_token',
    'session.isAuthenticated'
  )
  get headers() {
    const headers: IHeaders = {
      Authorization: undefined,
    };

    if (this.session.isAuthenticated) {
      headers.Authorization = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }

  handleResponse(status: number, headers: any, payload: any, requestData: any) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }

    return super.handleResponse(status, headers, payload, requestData);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your adapters.
declare module 'ember-data/types/registries/adapter' {
  export default interface AdapterRegistry {
    application: ApplicationAdapter;
  }
}
