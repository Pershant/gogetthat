const { INTEGER } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
	const bank = sequelize.define('bank', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		bankName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'bankName',
			defaultValue: 1,
		},
		bsb: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'bsb',
			defaultValue: '',
		},
		isDeleted: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 0,
			field: 'isDeleted'
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
		tableName: 'bank',
	});

	bank.associate = models => {
        bank.belongsTo(models.user, { foreignKey: 'userId', as: 'vendor', hooks: false });
	}
	return bank;
};
