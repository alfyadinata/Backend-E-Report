'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    ip: DataTypes.CHAR,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    latitude: DataTypes.CHAR,
    longitude: DataTypes.CHAR
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
    Log.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'users'
    })
  };
  return Log;
};