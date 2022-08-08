/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const vendorStaffDetail = sequelize.define('vendorStaffDetail', {
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
			defaultValue: 0,
		},
		vendorId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'vendorId',
			defaultValue: 0,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name',
			defaultValue: '',
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'phone',
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'image',
			defaultValue: '',
		},
		permissions: {
			type: DataTypes.TEXT(),
			allowNull: false,
			field: 'permissions',
			defaultValue: '',
			get: function () {
				console.log(this.getDataValue('permissions'), '=======>json in get method');

				if (!this.getDataValue('permissions')) return;

				return JSON.parse(this.getDataValue('permissions'));
				// return this.getDataValue('permissions');
				// return (this.getDataValue('id')) ? JSON.parse(this.getDataValue('permissions')) : this.getDataValue('permissions');
			},
			set: function (permissions) {
				console.log(permissions, '========>json permissions');
				// this.setDataValue('permissions', permissions);
				// if (!permissions) return;
				return this.setDataValue('permissions', JSON.stringify(permissions));
			},
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
		tableName: 'vendorStaffDetail',
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

	vendorStaffDetail.associate = models => {
		vendorStaffDetail.belongsTo(models.vendorDetail, { foreignKey: 'vendorId', targetKey: 'userId' });
	};

	return vendorStaffDetail;
};
