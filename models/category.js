'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Blog, {
      foreignKey: 'category_id',
      as: 'blogs'
    })
  };
  return Category;
};