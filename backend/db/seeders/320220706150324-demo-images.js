'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
         userId: 2,
         spotId: 2,
         reviewId: 2,
         imageableId: 2,
         imageableType: 'spot',
         url: 'https://www.forbes.com/advisor/home-improvement/types-of-house-styles/',
      },

      {
        userId: 1,
        spotId: 1,
        reviewId: 1,
        imageableId: 1,
        imageableType: 'review',
        url: 'https://www.dezeen.com/2014/08/12/house-k-indoor-gardens-tokyo-k2yt/',
     },


    ], {});
  },

  async down (queryInterface, Sequelize) {
     const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      reviewId: { [Op.in]: [1, 2] }
    }, {});
  }
};
