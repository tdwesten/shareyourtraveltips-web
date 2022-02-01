import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | app', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:app');
    assert.ok(route);
  });
});
