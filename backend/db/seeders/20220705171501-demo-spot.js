'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: null, 
      },
      {
        ownerId: 2,
        address: "643 Disco Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 39.7645358,
        lng: -123.4730327,
        name: "Disco Dream",
        description: "Place where disco happens",
        price: 123,
        previewImage: null, 
        

      },      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      ownerId: { [Op.in]: [1, 2] }
    }, {});
  }
};
