/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const faq = sequelize.define('faq', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'status',
			defaultValue: 1,
		},
        question: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'question',
			defaultValue: '',
		},
        answer: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'answer',
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
		tableName: 'faq',
	});



	return faq;
};
