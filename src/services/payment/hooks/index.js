'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const fillCurrentUser = require('./fillCurrentUser');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [
    auth.queryWithCurrentUser({ idField: 'id', as: 'userId' })
  ],
  get: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'userId' })
  ],
  create: [
    fillCurrentUser()
  ],
  update: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'userId' })
  ],
  patch: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'userId' })
  ],
  remove: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'userId' })
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
