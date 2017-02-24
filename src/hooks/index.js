'use strict';

const Sequelize = require('sequelize');

exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.preFilterBySender = function (options) {
    return function (hook) {
        //console.log(hook.params.query)
        //console.log(hook.params.user.dataValues.phone)
        //console.log('user id', hook.params.user.phone);
        let query = hook.params.query;
        let phone = hook.params.user.phone;

        let modifiedQuery = Object.assign({}, query, Sequelize.or({from: phone},{to: phone}));

        //console.log('query', query);
        //console.log('modifiedQuery', modifiedQuery)
        
        hook.params.query = modifiedQuery;
        
        //query['from'] = hook.params.user.phone;
        return hook;
    };
};