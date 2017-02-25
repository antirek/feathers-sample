'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('payment service', function() {
  it('registered the payments service', () => {
    assert.ok(app.service('payments'));
  });
});
