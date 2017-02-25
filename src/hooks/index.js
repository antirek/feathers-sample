'use strict';

const Sequelize = require('sequelize');

exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.preFilterBySender = function (options) {
    return function (hook) {
        let query = hook.params.query;
        let phone = hook.params.user.phone;

        let modifiedQuery = Object.assign({}, query, Sequelize.or({from: phone},{to: phone}));
        hook.params.query = modifiedQuery;
        
        return hook;
    };
};

