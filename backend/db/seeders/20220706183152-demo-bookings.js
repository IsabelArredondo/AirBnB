'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [
      {
        userId: '1',
        spotId: '1',
        startDate: '2020-01-01',
        endDate: '2020-01-10',
       },
       {
        userId: '2',
        spotId: '2',
        startDate: '2020-02-10',
        endDate: '2020-02-20',
       }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
