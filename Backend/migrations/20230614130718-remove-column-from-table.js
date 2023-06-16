'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'user_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Categories', 'user_id', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null, 
    });
  }
};
