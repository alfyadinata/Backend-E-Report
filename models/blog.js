'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    visit: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
  };
  return Blog;
};