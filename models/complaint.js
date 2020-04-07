'use strict';
module.exports = (sequelize, DataTypes) => {
	const Complaint = sequelize.define(
		'Complaint',
		{
			user_id: DataTypes.INTEGER,
			category_id: DataTypes.INTEGER,
			description: DataTypes.TEXT,
			address: DataTypes.STRING,
			foto: DataTypes.STRING,
			is_anonym: DataTypes.INTEGER,
			status: DataTypes.INTEGER,
			ip_address: DataTypes.CHAR,
			latitude: DataTypes.CHAR,
			longitude: DataTypes.CHAR
		},
		{}
	);
	Complaint.associate = function(models) {
		// associations can be defined here
		Complaint.belongsTo(models.Category, {
			foreignKey: 'category_id',
			as: 'categories'
		});
		Complaint.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'users'
		});
	};
	return Complaint;
};
