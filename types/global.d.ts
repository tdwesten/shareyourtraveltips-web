// Types for compiled templates
declare module 'traveltips-web/templates/*' {
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
