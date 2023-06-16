'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transcations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull:false,
      },
      note: {
        type: Sequelize.STRING(30),
        allowNull:false,
      },
      date_of_transacation: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Customers',
          key:'id'
        }
      },
      category_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Categories',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transcations');
  }
};