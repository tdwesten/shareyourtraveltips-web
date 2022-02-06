// Types for compiled templates
declare module 'shareyourtraveltips-web/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module 'ember-simple-auth/session-stores/local-storage' {
  import LocalStorageStore from 'ember-simple-auth/session-stores/local-storage';
  export default class extends LocalStorageStore {
    [x: string]: any;
  }
}

declare module 'ember-page-title/services/page-title' {
  import EmberPageTitleService from 'ember-page-title/services/page-title';
  export default class extends EmberPageTitleService {
    [x: string]: any;
  }
}

declare module 'ember-intl/services/intl' {
  export default class IntlService {
    locale: string;
    primaryLocale: string;

    formatRelative(value: any, options?: any, formats?: any): string;

    exists(key: string, localeName: string): boolean;
    setLocale(locale: string): void;
    t(key: string, options?: any): string;

    addTranslations(localeName: string, payload: any): void;
  }
}
