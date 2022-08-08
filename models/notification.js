/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('notification', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'userId'
		},
		user2Id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'user2Id'
		},
		orderId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'orderId'
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'type'
		},
		message: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'message'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at'
		}
	}, {
		tableName: 'notification'
	});
};
