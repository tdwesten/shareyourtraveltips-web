import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | trip-invite', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:trip-invite');
    assert.ok(route);
  });
});
