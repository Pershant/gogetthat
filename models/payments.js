/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const Payments = sequelize.define('payment', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		bookingId: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'bookingId',
			defaultValue: 1,
		},
		userId: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'bookingId',
			defaultValue: 1,
		},
		sellerId: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'userId',
			defaultValue: 1,
		},
		userName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'userName',
			defaultValue: 1,
		},
		transactionId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'transactionId',
			defaultValue: '',
		},
        amount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'amount',
			defaultValue: '',
		},
        status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'status',
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
		tableName: 'payment',
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



	return Payments;
};
