/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    const productFavourite = sequelize.define('productFavourite', {
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
        productId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'productId',
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
        tableName: 'productFavourite',
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
                    records.forEach(function(record) {
                        record.dataValues.created = Math.round(new Date().getTime() / 1000);
                        record.dataValues.updated = Math.round(new Date().getTime() / 1000);
                    });
                }
            },
            beforeBulkUpdate: (records, options) => {
                if (Array.isArray(records)) {
                    records.forEach(function(record) {
                        record.dataValues.updated = Math.round(new Date().getTime() / 1000);
                    });
                }
            }
        }
    });

    productFavourite.associate = models => {
        productFavourite.belongsTo(models.user, { foreignKey: 'userId', onDelete: 'cascade', hooks: false });
        productFavourite.belongsTo(models.product, { foreignKey: 'productId', onDelete: 'cascade', hooks: false });
    };

    return productFavourite;
};