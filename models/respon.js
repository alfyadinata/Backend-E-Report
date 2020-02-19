'use strict';
module.exports = (sequelize, DataTypes) => {
  const Respon = sequelize.define('Respon', {
    complaint_id: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});
  Respon.associate = function(models) {
    // associations can be defined here
  };
  return Respon;
};