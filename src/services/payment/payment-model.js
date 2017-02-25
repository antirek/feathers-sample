'use strict';

// payment-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const payment = sequelize.define('payments', {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    account: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  payment.sync();

  return payment;
};
