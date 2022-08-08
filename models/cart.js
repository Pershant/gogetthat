/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const cart = sequelize.define('cart', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
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
		productId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'productId',
			defaultValue: 0,
		},
		specifications: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'specifications',
			defaultValue: "",
		},
		vendorId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'vendorId',
			defaultValue: 0,
		},
		size: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'size',
			defaultValue: "",
		},
		color: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'color',
			defaultValue: "",
		},
		save_to_later: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'save_to_later',
			defaultValue: 0,
		},
		total_price: {
			type: DataTypes.FLOAT(4, 2),
			allowNull: true,
			field: 'total_price',
			defaultValue: 0,
		},
		qty: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'qty',
			defaultValue: 0,
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
		tableName: 'cart',
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

	cart.associate = models => {
		cart.belongsTo(models.user, { foreignKey: 'userId' });
		cart.belongsTo(models.product, { foreignKey: 'productId' });
	};

	return cart;
};
