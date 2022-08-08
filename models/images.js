/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    const images = sequelize.define('images', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        prod_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'prod_id',
            defaultValue: 1,
        },
        images: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'images',
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
        tableName: 'images',
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

    images.associate = models => {
        images.belongsTo(models.product, { foreignKey: 'prod_id', hooks: false });
    };

    return images;
};
