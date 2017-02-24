'use strict';

// invoice-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const invoice = sequelize.define('invoices', {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    from: {
      type: Sequelize.STRING,
      allowNull: false
    },
    to: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  invoice.sync();

  return invoice;
};
