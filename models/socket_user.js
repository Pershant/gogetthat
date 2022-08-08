/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('socketUser', {
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
		socketId: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'socketId'
		},
		isOnline: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			field: 'isOnline'
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'updated'
		}
	}, {
		tableName: 'socket_user',
		timestamps:false
	});
};
