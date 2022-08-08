/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const blog_comment = sequelize.define('blog_comment', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		blog_id: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'blog_id',
			defaultValue: 0,
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'email',
			defaultValue: "",
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name',
			defaultValue: "",
		},
        comment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'comment',
			defaultValue: "",
		},
        subject: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'subject',
			defaultValue: "",
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
		tableName: 'blog_comment',
		// freezeTableName: true,
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

	return blog_comment;
};
