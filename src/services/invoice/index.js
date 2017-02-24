'use strict';

const service = require('feathers-sequelize');
const invoice = require('./invoice-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: invoice(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/invoices', service(options));

  // Get our initialize service to that we can bind hooks
  const invoiceService = app.service('/invoices');

  // Set up our before hooks
  invoiceService.before(hooks.before);

  // Set up our after hooks
  invoiceService.after(hooks.after);
};
