'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visitor = sequelize.define('Visitor', {
    ip: DataTypes.CHAR,
    latitude: DataTypes.CHAR,
    longitude: DataTypes.CHAR
  }, {});
  Visitor.associate = function(models) {
    // associations can be defined here
  };
  return Visitor;
};