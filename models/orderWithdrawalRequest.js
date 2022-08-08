/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const orderCancellationRequest = sequelize.define('orderWithdrawalRequest', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'status',
			defaultValue: 0,
		},
		orderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'orderId',
			defaultValue: 0,
		},
		customerId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'customerId',
			defaultValue: 0,
		},
		vendorId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'vendorId',
			defaultValue: 0,
		},
		reason: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'reason',
			defaultValue: '',
		},
		comments: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'comments',
			defaultValue: '',
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
		tableName: 'orderWithdrawalRequest',
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

	orderCancellationRequest.associate = models => {
		orderCancellationRequest.belongsTo(models.user, { foreignKey: 'customerId', as: 'customer', hooks: false });
		orderCancellationRequest.belongsTo(models.user, { foreignKey: 'vendorId', as: 'vendor', hooks: false });
		orderCancellationRequest.belongsTo(models.order, { foreignKey: 'orderId', hooks: false });
	};

	return orderCancellationRequest;
};
