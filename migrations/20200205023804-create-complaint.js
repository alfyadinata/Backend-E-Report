'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Complaints', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			category_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Categories',
					key: 'id'
				}
			},
			description: {
				type: Sequelize.TEXT
			},
			address: {
				type: Sequelize.STRING
			},
			foto: {
				type: Sequelize.STRING
			},
			is_anonym: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			status: {
				type: Sequelize.INTEGER
			},
			ip_address: {
				type: Sequelize.CHAR
			},
			latitude: {
				type: Sequelize.CHAR
			},
			longitude: {
				type: Sequelize.CHAR
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Complaints');
	}
};
