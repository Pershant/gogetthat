/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('userSubscriptions', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'userId'
        },
        subscriptionId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'subscriptionId'
        },
        amount: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'amount'
        },
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'type'
        },
        item: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'item'
        },
        employes: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'employes'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updated_at'
        }
    }, {
        tableName: 'userSubscriptions'
    });
};