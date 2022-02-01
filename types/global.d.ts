// Types for compiled templates
declare module 'traveltips-web/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module 'ember-simple-auth-token/authenticators/token' {
  import TokenAuthenticator from 'ember-simple-auth-token/authenticators/token';
  export default class extends TokenAuthenticator {
    [x: string]: any;
  }
}
