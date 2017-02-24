'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

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
        const query = hook.params.query;
        
        query['from'] = hook.params.user.phone;
        return hook;
    }
}


exports.afterFilterBySender = function(options) {
    return function(hook) {
        //console.log(hook.result);

        hook.result.data = hook.result.data.filter(current => {
            //console.log(current.dataValues.from);
            return current.dataValues.from === hook.params.user.phone


        });

        return hook;
    }
}