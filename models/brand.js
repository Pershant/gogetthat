/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const brand = sequelize.define('brand', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		brandName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'brandName',
			defaultValue: 1,
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'image',
			defaultValue: '',
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
		tableName: 'brand',
		// freezeTableName: true,
		// hierarchy: true,
		// hooks: {
		// 	beforeCreate: (record, options) => {
		// 		record.dataValues.created = Math.round(new Date().getTime() / 1000);
		// 		record.dataValues.updated = Math.round(new Date().getTime() / 1000);
		// 	},
		// 	beforeUpdate: (record, options) => {
		// 		// console.log(record, '==================================>beforeUpdate')
		// 		record.dataValues.updated = Math.round(new Date().getTime() / 1000);
		// 	},
		// 	beforeBulkCreate: (records, options) => {
		// 		if (Array.isArray(records)) {
		// 			records.forEach(function (record) {
		// 				record.dataValues.created = Math.round(new Date().getTime() / 1000);
		// 				record.dataValues.updated = Math.round(new Date().getTime() / 1000);
		// 			});
		// 		}
		// 	},
		// 	beforeBulkUpdate: (records, options) => {
		// 		// console.log(records, '==========================>records'); 
		// 		// console.log(options, '==========================>options'); 
		// 		// return;
		// 		if (Array.isArray(records)) {
		// 			records.forEach(function (record) {
		// 				record.dataValues.updated = Math.round(new Date().getTime() / 1000);
		// 			});
		// 		}
		// 	}
		// }
	});



	return brand;
};
