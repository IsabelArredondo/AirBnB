'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        userId: 2,
        spotId: 1,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' 
      },
      {
        userId: 2,
        spotId: 2,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      {
        userId: 2,
        spotId: 3,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1623921017613-9970959b91b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      {
        userId: 2,
        spotId: 4,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      {
        userId: 2,
        spotId: 5,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      {
        userId: 2,
        spotId: 6,
        //reviewId: 2,
        imageableId: 2,
        imageableType: 'spot',
        url: 'https://images.unsplash.com/photo-1616593871468-2a9452218369?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },

      {
        userId: 1,
        //spotId: 1,
        reviewId: 1,
        imageableId: 1,
        imageableType: 'review',
        url: 'https://images.unsplash.com/photo-1610459716431-e07abcf74230?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=915&q=80'
      },


    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
