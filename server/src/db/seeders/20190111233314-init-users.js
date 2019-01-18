'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('12345678', salt);

    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'Admin',
        username: 'admin',
        email: 'admin@localhost.com',
        password: hashedPassword,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'User',
        lastName: 'User',
        username: 'user',
        email: 'ccollins@localhost.com',
        password: hashedPassword,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('users', null, { include: [Sequelize.Message] });
  }
};
