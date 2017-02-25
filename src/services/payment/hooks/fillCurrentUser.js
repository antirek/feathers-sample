
module.exports = function (options) {
    return function (hook) {
        hook.data.userId = hook.params.user.id;
    };
};