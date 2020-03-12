'use strict';
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    // blogs
    Category.hasMany(models.Blog, {
      foreignKey: 'category_id',
      as: 'blogs'
    })
    // complaints
    Category.hasMany(models.Complaint, {
      foreignKey: 'category_id',
      as: 'complaints'
    })
  };

  sequelizePaginate.paginate(Category)
  return Category;
};