'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {
         
         spotId: 1,
         url: 'https://www.forbes.com/advisor/home-improvement/types-of-house-styles/',
      },

      {
        
        spotId: 1,
        url: 'https://www.dezeen.com/2014/08/12/house-k-indoor-gardens-tokyo-k2yt/',
     },

     {
      
      spotId: 2,
      url: 'https://www.mydomaine.com/white-interior-decorating-ideas-4767847',
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
