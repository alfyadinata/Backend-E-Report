'use strict';
module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    foto: DataTypes.STRING,
    is_anonym: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    ip_address: DataTypes.CHAR,
    latitude: DataTypes.CHAR,
    longitude: DataTypes.CHAR,
    admin_id: DataTypes.INTEGER
  }, {});
  Complaint.associate = function(models) {
    // associations can be defined here
  };
  return Complaint;
};