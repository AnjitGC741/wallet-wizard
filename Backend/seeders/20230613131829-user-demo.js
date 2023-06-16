'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Customers', [{
       user_name: 'John Doe',
      email:'anjit@gmail.com',
      password:"12345",
      currency:"euro",
      createdAt:new Date(),
      updatedAt:new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Customers', null, {});
     
  }
};
