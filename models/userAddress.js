/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const userAddress = sequelize.define('userAddress', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		isDefault: { // 0=>no 1=>yes	
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isDefault',
			defaultValue: 0,
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'userId',
			defaultValue: 0,
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'address',
			defaultValue: '',
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 8),
			allowNull: false,
			field: 'latitude',
			defaultValue: 0,
		},
		longitude: {
			type: DataTypes.DECIMAL(11, 8),
			allowNull: false,
			field: 'longitude',
			defaultValue: 0,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'name',
			defaultValue: '',
		},
		countryCode: {
			type: DataTypes.STRING(5),
			allowNull: false,
			field: 'countryCode',
			defaultValue: '',
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'phone',
			defaultValue: '',
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updatedAt'
		}
	}, {
		tableName: 'userAddress',
		// freezeTableName: true,
		// hierarchy: true,
		hooks: {
			beforeCreate: (record, options) => {
				record.dataValues.created = Math.round(new Date().getTime() / 1000);
				record.dataValues.updated = Math.round(new Date().getTime() / 1000);
			},
			beforeUpdate: (record, options) => {
				// console.log(record, '==================================>beforeUpdate')
				record.dataValues.updated = Math.round(new Date().getTime() / 1000);
			},
			beforeBulkCreate: (records, options) => {
				if (Array.isArray(records)) {
					records.forEach(function (record) {
						record.dataValues.created = Math.round(new Date().getTime() / 1000);
						record.dataValues.updated = Math.round(new Date().getTime() / 1000);
					});
				}
			},
			beforeBulkUpdate: (records, options) => {
				// console.log(records, '==========================>records'); 
				// console.log(options, '==========================>options'); 
				// return;
				if (Array.isArray(records)) {
					records.forEach(function (record) {
						record.dataValues.updated = Math.round(new Date().getTime() / 1000);
					});
				}
			}
		}
	});

	userAddress.associate = models => {
		userAddress.belongsTo(models.user, { foreignKey: 'userId' });
	};

	return userAddress;
};
