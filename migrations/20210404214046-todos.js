'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Todos',
      'description',
      {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'default'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
};
