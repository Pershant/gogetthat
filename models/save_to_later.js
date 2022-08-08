/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    const save_to_later = sequelize.define('save_to_later', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        orderNo: {
            type: DataTypes.STRING(40),
            allowNull: true,
            field: 'orderNo',
            defaultValue: '',
        },
        orderStatus: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'orderStatus',
            defaultValue: 0,
            comment: ''
        },
        customerId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'customerId',
            defaultValue: 0,
        },
        shiping_address_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'shiping_address_id',
            defaultValue: 0,
        },
        billing_address_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'billing_address_id',
            defaultValue: 0,
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'product_id',
            defaultValue: 0,
        },
        vendorId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'vendorId',
            defaultValue: 0,
        },
        employeeId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'employeeId',
            defaultValue: 0,
        },
        netAmount: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'netAmount',
            defaultValue: 0,
        },
        qty: {
            type: DataTypes.INTEGER(9),
            allowNull: true,
            field: 'qty',
            defaultValue: 0,
        },
        card_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'card_id',
            defaultValue: 0,
        },
        taxCharged: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'taxCharged',
            defaultValue: 0,
        },
        shippingCharges: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'shippingCharges',
            defaultValue: 0,
        },
        address: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'address',
            defaultValue: 0,
        },
        addressLine2: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'addressLine2',
            defaultValue: 0,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'city',
            defaultValue: 0,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'state',
            defaultValue: 0,
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'country',
            defaultValue: 0,
        },
        zipCode: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'zipCode',
            defaultValue: 0,
        },

        adminCommission: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'adminCommission',
            defaultValue: 0,
        },
        subTotal: {
            type: DataTypes.FLOAT(),
            allowNull: true,
            field: 'subTotal',
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'discount',
            defaultValue: 0,
        },
        shipping: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'shipping',
            defaultValue: 0,
        },
        tax: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'tax',
            defaultValue: 0,
        },
        total: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'total',
            defaultValue: 0,
        },
        paymentMethod: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'paymentMethod',
            defaultValue: 0,
        },
        deliveryDate: {
            type: DataTypes.DATE(),
            allowNull: true,
            field: 'deliveryDate',
            defaultValue: '0000-00-00',
        },
        isSelfpickup: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'isSelfpickup',
            defaultValue: '',
        },
        deliverySlot: {
            type: DataTypes.STRING(40),
            allowNull: true,
            field: 'deliverySlot',
            defaultValue: '',
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
        tableName: 'save_to_later',
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

    save_to_later.associate = models => {
        save_to_later.belongsTo(models.user, { foreignKey: 'customerId', as: 'customer', hooks: false });
        save_to_later.belongsTo(models.user, { foreignKey: 'vendorId', as: 'vendor', hooks: false });
        save_to_later.hasMany(models.orderItem, { foreignKey: 'orderId', hooks: false });
        save_to_later.hasMany(models.payment, { foreignKey: 'bookingId', hooks: false });
        save_to_later.belongsTo(models.bankDetails, { foreignKey: 'vendorId', hooks: false });
        save_to_later.belongsTo(models.product, { foreignKey: 'product_id', hooks: false });
        save_to_later.belongsTo(models.userDeliveryAddress, { foreignKey: 'billing_address_id', as: "billing_address", hooks: false });
        save_to_later.belongsTo(models.userDeliveryAddress, { foreignKey: 'shiping_address_id', as: "shipping_address", hooks: false });
        save_to_later.belongsTo(models.card, { foreignKey: 'card_id', hooks: false });
    };
    return save_to_later;
};