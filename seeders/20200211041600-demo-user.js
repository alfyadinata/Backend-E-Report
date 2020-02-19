'use strict';
const model   = require('../models/index')

module.exports = {
  up: (queryInterface, Sequelize) => {

      for (let index = 0; index < 10; index++) {

        let name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);        
        let nik  = Math.random()
        let email = name
        let password = 123456

        models.User.create({
          name,nik,email,password  
        })
  
        
      }
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
