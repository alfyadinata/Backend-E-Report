'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role_id: DataTypes.INTEGER,
			status: DataTypes.INTEGER,
			phone_number: DataTypes.CHAR
		},
		{}
	);
	User.associate = function(models) {
		// associations can be defined here
		User.hasMany(models.Log, {
			foreignKey: 'user_id',
			as: 'logs'
		});
	};
	return User;
};
