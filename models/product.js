/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    const product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        isApproved: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'isApproved',
            defaultValue: 0,
        },
        is_featured: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'is_featured',
            defaultValue: 0,
        },
        status: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'status',
            defaultValue: 0,
        },
        isAvailable: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'isAvailable',
            defaultValue: 1,
        },
        quantity: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'quantity',
            defaultValue: 1,
        },
        taxCategoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'taxCategoryId',
            defaultValue: 0,
        },
        vendorId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'vendorId',
            defaultValue: 0,
        },
        
        categoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'categoryId',
            defaultValue: 0,
        },
        subCategoryId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'subCategoryId',
            defaultValue: 0,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'name',
            defaultValue: '',
        },
        description: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'description',
            defaultValue: '',
        },

        reviews: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'reviews',
            defaultValue: '',
        },
        color:{
            type:DataTypes.STRING(15),
            allowNull:true,
            field:'color',
            defaultValue: '',
        },
        shippingInformation: {
            type: DataTypes.TEXT(),
            allowNull: true,
            field: 'shippingInformation',
            defaultValue: '',
        },
        countryOfOrigin: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'countryOfOrigin',
            defaultValue: '',
        },
        gtinNumber: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'gtinNumber',
            defaultValue: '',
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'image',
            defaultValue: '',
        },
        isBarcodeItem: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'isBarcodeItem',
            defaultValue: 0,
        },
        addedBy: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'addedBy',
            defaultValue: 0,
        },
        barcode: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'barcode',
            defaultValue: '',
        },
        barcodeImage: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'barcodeImage',
            defaultValue: '',
        },
        sku: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'sku',
            defaultValue: '',
        },
        skuImage: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'skuImage',
            defaultValue: '',
        },
        brandName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'brandName',
            defaultValue: "",
        },
        mrp: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'mrp',
            defaultValue: 0,
        },
        retailPrice: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'retailPrice',
            defaultValue: 0,
        },
        minimumSellingPrice: {
            type: DataTypes.DECIMAL(9, 2),
            allowNull: true,
            field: 'minimumSellingPrice',
            defaultValue: 0,
        },
        return_price: {
            type: DataTypes.FLOAT(4),
            allowNull: true,
            field: 'return_price',
            defaultValue: 0,
        },
        shipping_price: {
            type: DataTypes.FLOAT(4),
            allowNull: true,
            field: 'shipping_price',
            defaultValue: 0,
        },
        percentageDiscount: {
            type: DataTypes.INTEGER(6),
            allowNull: true,
            field: 'percentageDiscount',
            defaultValue: 0,
        },
        length: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: true,
            field: 'length',
            defaultValue: 0,
        },
        width: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: true,
            field: 'width',
            defaultValue: 0,
        },
        height: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: true,
            field: 'height',
            defaultValue: 0,
        },
        dimensionsUnit: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'dimensionsUnit',
            defaultValue: 0,
        },
        weight: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: true,
            field: 'weight',
            defaultValue: 0,
        },
        weightUnit: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            field: 'weightUnit',
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
        tableName: 'product',
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

    product.associate = models => {
        product.belongsTo(models.user, { foreignKey: 'vendorId', as: 'vendor', hooks: false });
        product.belongsTo(models.taxCategory, { foreignKey: 'taxCategoryId', hooks: false });
        product.hasMany(models.productSpecification, { foreignKey: 'productId' });
        product.hasMany(models.images, { foreignKey: 'prod_id' });
        product.hasMany(models.color, { foreignKey: 'prod_id' });
        product.hasMany(models.productSpecification, { foreignKey: 'productId' });
        product.hasMany(models.reviews, { foreignKey: 'product_id',as:"findReview" });


		// product.hasOne(models.user, { foreignKey: 'userId', hooks: false });

    };

    return product;
};
