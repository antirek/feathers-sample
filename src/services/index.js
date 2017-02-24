'use strict';
const invoice = require('./invoice');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: console.log
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(invoice);
};
