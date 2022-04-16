type Callback = () => void;
type Data = Record<string, unknown>;
type SessionData = {
  authenticated: Data;
};

declare module 'ember-simple-auth/services/session' {
  import Service from '@ember/service';
  import { Promise } from 'rsvp';
  import type BaseSessionStore from 'ember-simple-auth/session-stores/base';
  import type Transition from '@ember/routing/-private/transition';

  export default class extends Service {
    isAuthenticated: boolean;
    data: SessionData;
    store: BaseSessionStore;
    session: any;

    authenticate(authenticator: string, ...args: unknown[]): Promise<unknown>;

    invalidate(...args: unknown[]): Promise<unknown>;

    requireAuthentication(
      transition: Transition,
      routeOrCallback: string | Callback
    ): boolean;

    prohibitAuthentication(routeOrCallback: string | Callback): boolean;
  }
}

declare module 'ember-simple-auth/authenticators/base' {
  import EmberObject from '@ember/object';
  import Evented from '@ember/object/evented';
  import { Promise } from 'rsvp';

  export default class extends EmberObject.extend(Evented) {
    restore(data: Data): Promise<unknown>;
    authenticate(...args: unknown[]): Promise<unknown>;
    invalidate(data: Data, ...args: unknown[]): Promise<unknown>;
  }
}

declare module 'ember-simple-auth/authenticators/devise' {
  import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
  export default class extends BaseAuthenticator {
    serverTokenEndpoint: string;
    resourceName: string;
    tokenAttributeName: string;
    identificationAttributeName: string;
  }
}

declare module 'ember-simple-auth/authenticators/oauth2-implicit-grant' {
  import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
  export default class extends BaseAuthenticator {}
}

declare module 'ember-simple-auth/authenticators/oauth2-password-grant' {
  import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
  export default class extends BaseAuthenticator {
    clientId: string | null;
    serverTokenEndpoint: string;
    serverTokenRevocationEndpoint: string | null;
    refreshAccessTokens: boolean;
  }
}

declare module 'ember-simple-auth/authenticators/test' {
  import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
  export default class extends BaseAuthenticator {}
}

declare module 'ember-simple-auth/authenticators/torii' {
  import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
  export default class extends BaseAuthenticator {}
}

declare module 'ember-simple-auth/session-stores/base' {
  import EmberObject from '@ember/object';
  import Evented from '@ember/object/evented';
  import { Promise } from 'rsvp';

  export default class extends EmberObject.extend(Evented) {
    persist(data: SessionData): Promise<unknown>;
    restore(): Promise<SessionData>;
    clear(): Promise<unknown>;
  }
}

declare module 'ember-simple-auth/session-stores/cookie' {
  import BaseSessionStore from 'ember-simple-auth/session-stores/base';
  export default class extends BaseSessionStore {}
}

declare module 'ember-simple-auth/session-stores/ephemeral' {
  import BaseSessionStore from 'ember-simple-auth/session-stores/base';
  export default class extends BaseSessionStore {}
}

declare module 'ember-simple-auth/session-stores/session-storage' {
  import BaseSessionStore from 'ember-simple-auth/session-stores/base';
  export default class extends BaseSessionStore {}
}

declare module 'ember-simple-auth/session-stores/adaptive' {
  import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
  export default class extends AdaptiveStore {}
}
