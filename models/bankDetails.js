/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const bankDetails = sequelize.define('bankDetails', {
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
		},
		accountNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'accountNumber',
		},
        name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name',
		},
        ifsc: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'ifsc',
		},
        branch: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'branch',
		},
        bankName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'bankName',
		},  
		bsb: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'bsb',
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
		tableName: 'bank_details',
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

	return bankDetails;
};
