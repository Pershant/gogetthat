/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const blog_category = sequelize.define('blog_category', {
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
			defaultValue: 1,
		},
		parentId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'parentId',
			defaultValue: null,
		},
		discount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'discount',
			defaultValue: 0,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name',
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING(255),
			//type: DataTypes.TEXT(),
			allowNull: true,
			field: 'image',
			defaultValue: '',
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'description',
			defaultValue: '',
		},
		shop_category_id: {
			type: DataTypes.INTEGER(11),
			field: 'shop_category_id',
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
		tableName: 'blog_category',
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

	// blog_category.associate = models => {
	// 	blog_category.hasMany(models.subCategory, { foreignKey: 'categoryId' });
	// };

	return blog_category;
};
