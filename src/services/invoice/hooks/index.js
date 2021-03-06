'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [
    globalHooks.preFilterBySender()
  ],
  get: [],
  create: [
    globalHooks.createInvoice()
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [
    //auth.populateUser(),
  ],
  find: [],
  get: [],
  create: [
    globalHooks.sendSMSWithInvoice()
  ],
  update: [],
  patch: [],
  remove: []
};