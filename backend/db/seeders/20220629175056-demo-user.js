'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { 
        firstName: 'john',
        lastName: 'doe',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      { 
        firstName: 'ray',
        lastName: 'va',
        email: 'user1@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'isabel',
        lastName: 'demo',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
  
};
