/* jshint indent: 1 */
module.exports = function(sequelize, DataTypes) {
    const wallet = sequelize.define('wallet', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        vendorId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'vendorId'
        },
        bankId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'bankId',
            defaultValue: 1,
        },
        balance: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'balance',
            defaultValue: 1,
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'status',
        },
        withdraw_amount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'withdraw_amount',
            defaultValue: 1,
        },
        updated: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'updated',
            defaultValue: 1,
        },
        createdAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updatedAt'
		}

    }, {
        tableName: 'wallet',
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
                    records.forEach(function(record) {
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
                    records.forEach(function(record) {
                        record.dataValues.updated = Math.round(new Date().getTime() / 1000);
                    });
                }
            }
        }
    });


    wallet.associate = models => {
        wallet.belongsTo(models.user, { foreignKey: 'vendorId', as: 'vendor', hooks: false });
        wallet.belongsTo(models.bank, { foreignKey: 'bankId', hooks: false });
    }

    return wallet;
};
