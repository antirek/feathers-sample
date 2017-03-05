'use strict';
const SMSru = require('sms_ru');
const Sequelize = require('sequelize');
const console = require('tracer').colorConsole();

exports.myHook = function (options) {
  return function (hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

exports.sendSMS = function (options) {
    return function (hook) {
        let token = hook.app.get("smsru").token;
        //console.log('token', token);
        var sms = new SMSru(token);

        let password = hook.data.password;
        //console.log('password', password);
        //console.log('phone', hook.data.phone);

        sms.sms_send({
          to: '7' + hook.data.phone,
          text: 'Password: ' + password
        }, function(e) {
          console.log(e);
        });
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
                query: {
                    userId: hook.params.user.id
                }
            }).then(res => {
                console.log(res);
                let payments = res.data.map(item => {
                    return {type: item.type, account: item.account};
                });
                //console.log(payments);
                //console.log(hook.data);
                hook.data.data = payments;
                hook.data.from = hook.params.user.phone;
                
                console.log(hook.data);
                return hook;
            });
    };
};