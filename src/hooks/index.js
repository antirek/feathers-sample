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

exports.createInvoice = function (options) {
    return function (hook) {
        //hook.data.userId = hook.params.user.id;
        const paymentService = hook.app.service('/payments');
        
        return paymentService.find({
                id: hook.params.user.id
            }).then(res => {
                let payments = res.data.map(item => {
                    return {type: item.type, account: item.account};
                })
                //console.log(payments);
                //console.log(hook.data);
                hook.data.data = payments;
                //console.log(hook.data);
                return hook;
            });
    };
};