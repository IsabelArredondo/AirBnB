'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 App Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        
      },
      {
        ownerId: 1,
        address: "123 Green Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.76453589,
        lng: -122.47303276,
        name: "Green thumb",
        description: "Place where plants thrive",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        
      },
      {
        ownerId: 1,
        address: "123 Top Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.76453584,
        lng: -122.47303275,
        name: "Artist Colony",
        description: "Place where art is created",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
        
      },
      {
        ownerId: 2,
        address: "643 DollHouse Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 39.76453584,
        lng: -123.47303279,
        name: "Doll Dream House",
        description: "Place where dolls come alive",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1568669931649-ef295d25a4b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=923&q=80',
        

      },
      {
        ownerId: 2,
        address: "643 Grand Plaza Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 39.76453589,
        lng: -123.47303272,
        name: "Grand Plaza",
        description: "Place where sophitication happens",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1588348562295-7d33c5de3f48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'

      },
      {
        ownerId: 2,
        address: "6435 Disco Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 39.764535823,
        lng: -123.473032734,
        name: "Disco Dream",
        description: "Place where disco happens",
        price: 123,
        previewImage: 'https://images.unsplash.com/photo-1560787338-43fcd3b87500?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=886&q=80',
        

      },      
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
