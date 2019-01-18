'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('messages', [
        {
          text: 'Hello World',
          userId: 1,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          text: 'Hello World!',
          userId: 2,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          text: 'Good bye...',
          userId: 2,
          createdAt : new Date(),
          updatedAt : new Date(),
        },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('messages', null, {});
  }
};
