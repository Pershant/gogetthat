/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const userDeliveryAddress = sequelize.define('userDeliveryAddress', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'userId',
			defaultValue: '',
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name',
			defaultValue: '',
		},
		last_name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'last_name',
			defaultValue: '',
		},
		address_line_1: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'address_line_1',
			defaultValue: '',
		},
		address_line_2: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'address_line_2',
			defaultValue: '',
		},
		zip_code: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'zip_code',
			defaultValue: 0,
		},
		is_primary: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'is_primary',
			defaultValue: 0,
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'type',////1=delivery 2=shipping
			defaultValue: 0,
		},
		completeAddress: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'completeAddress',
			defaultValue: '',
		},
		city: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'city',
			defaultValue: '',
		},
		state: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'state',
			defaultValue: '',
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'country',
			defaultValue: '',
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 8),
			allowNull: true,
			field: 'latitude',
			defaultValue: 0.0,
		},
		longitude: {
			type: DataTypes.DECIMAL(11, 8),
			allowNull: true,
			field: 'longitude',
			defaultValue: 0.0,
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated'
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updatedAt'
		}
	}, {
		tableName: 'userDeliveryAddress',
		hooks: {
			beforeCreate: (record, options) => {
				record.dataValues.created = Math.round(new Date().getTime() / 1000);
				record.dataValues.updated = Math.round(new Date().getTime() / 1000);
			},
			beforeUpdate: (record, options) => {
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
				if (Array.isArray(records)) {
					records.forEach(function (record) {
						record.dataValues.updated = Math.round(new Date().getTime() / 1000);
					});
				}
			}
		}
	});

	userDeliveryAddress.associate = models => {
		userDeliveryAddress.belongsTo(models.user, { foreignKey: 'userId', onDelete: 'cascade', hooks: false });
	};

	return userDeliveryAddress;
};
