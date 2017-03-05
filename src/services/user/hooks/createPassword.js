var generatePassword = require('password-generator');

module.exports = function (options) {
    return function (hook) {
    	let password = generatePassword(6);
    	//console.log('password', password);
    	hook.data.password = password;
    };
};
