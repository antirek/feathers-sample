'use strict';

const service = require('feathers-sequelize');
const payment = require('./payment-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: payment(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/payments', service(options));

  // Get our initialize service to that we can bind hooks
  const paymentService = app.service('/payments');

  // Set up our before hooks
  paymentService.before(hooks.before);

  // Set up our after hooks
  paymentService.after(hooks.after);
};
