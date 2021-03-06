import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    application: ApplicationController;
  }
}
