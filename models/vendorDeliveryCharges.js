/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const vendorDeliveryCharges = sequelize.define('vendorDeliveryCharges', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		vendorId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'vendorId',
			defaultValue: 0,
		},
		minDistance: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'minDistance',
			defaultValue: 0,
		},
		maxDistance: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'maxDistance',
			defaultValue: 0,
		},
		price: {
			type: DataTypes.DECIMAL(9,2),
			allowNull: true,
			field: 'price',
			defaultValue: 0,
		},
		noDelivery: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'noDelivery',
			defaultValue: 0,
		},
		freeDelivery: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'freeDelivery',
			defaultValue: 0,
		},
		created: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created'
		},
		updated: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated'
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
		tableName: 'vendorDeliveryCharges',
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

	// vendorDeliveryCharges.associate = models => {
	// 	// vendorDeliveryCharges.belongsTo(models.vendorDeliveryCharges, { foreignKey: 'parentId' });
	// };

	return vendorDeliveryCharges;
};
