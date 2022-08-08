/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const Vendor=sequelize.define('vendorDetail', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		approvalStatus: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'approvalStatus',
			defaultValue: 0,
		},
		approvalStatusReason: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'approvalStatusReason',
			defaultValue: '',
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'name',
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'image',
			defaultValue: '',
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'phone',
			defaultValue: '',
		},
		shopName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'shopName',
			defaultValue: '',
		},
		shopLogo: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'shopLogo',
			defaultValue: '',
		},
		shopCategory: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'shopCategory',
			defaultValue: '',
		},
		
		abn: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'abn',
			defaultValue: '',
		},
		buildingNumber: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'buildingNumber',
			defaultValue: '',
		},
		streetNumber: {
			type: DataTypes.STRING(40),
			allowNull: true,
			field: 'streetNumber',
			defaultValue: '',
		},
		city: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'city',
			defaultValue: '',
		},
		state: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'state',
			defaultValue: '',
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'country',
			defaultValue: '',
		},
		postalCode: {
			type: DataTypes.STRING(20),
			allowNull: true,
			field: 'postalCode',
			defaultValue: '',
		},
		shopOpenTime: {
			type: DataTypes.STRING(20),
			allowNull: true,
			field: 'shopOpenTime',
			defaultValue: '',
		},
		shopCloseTime: {
			type: DataTypes.STRING(20),
			allowNull: true,
			field: 'shopCloseTime',
			defaultValue: '',
		},
		homeDelivery: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'homeDelivery',
			defaultValue: 0,
		},
		deliveriesPerDay: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'deliveriesPerDay',
			defaultValue: 0,
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 8),
			allowNull: true,
			field: 'latitude',
			defaultValue: 0,
		},
		longitude: {
			type: DataTypes.DECIMAL(11, 8),
			allowNull: true,
			field: 'longitude',
			defaultValue: 0,
		},
		geoLocation: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'geoLocation',
			defaultValue: '',
		},
		shopAddress: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'shopAddress',
			defaultValue: '',
		},
		shopDescription: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'shopDescription',
			defaultValue: '',
		},
		paymentPolicy: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'paymentPolicy',
			defaultValue: '',
		},
		deliveryPolicy: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'deliveryPolicy',
			defaultValue: '',
		},
		sellerInformation: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'sellerInformation',
			defaultValue: '',
		},
		taxInPercent: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'taxInPercent',
			defaultValue: 0,
		},
		taxValue: {
			type: DataTypes.INTEGER(6),
			allowNull: true,
			field: 'taxValue',
			defaultValue: 0,
		},
		bankName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'bankName',
			defaultValue: '',
		},
		bankBranch: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'bankBranch',
			defaultValue: '',
		},
		accountHolderName: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'accountHolderName',
			defaultValue: '',
		},
		accountNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'accountNumber',
			defaultValue: '',
		},
		bsbNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'bsbNumber',
			defaultValue: '',
		},
		ifscSwiftCode: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'ifscSwiftCode',
			defaultValue: '',
		},
		bankAddress: {
			type: DataTypes.TEXT(),
			allowNull: true,
			field: 'bankAddress',
			defaultValue: '',
		},
		isShopAdded: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isShopAdded',
			defaultValue: 0,
		},
		isHomeDeliveryAdded: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isHomeDeliveryAdded',
			defaultValue: 0,
		},
		isDeliveryOptionsAdded: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isDeliveryOptionsAdded',
			defaultValue: 0,
		},
		isDeliveryDaysAdded: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isDeliveryDaysAdded',
			defaultValue: 0,
		},
		isDeliveryChargesAdded: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'isDeliveryChargesAdded',
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
		tableName: 'vendorDetail',
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
					records.forEach(function (record) {
						record.dataValues.created = Math.round(new Date().getTime() / 1000);
						record.dataValues.updated = Math.round(new Date().getTime() / 1000);
					});
				}
			},
			beforeBulkUpdate: (records, options) => {
				if (Array.isArray(records)) {
					records.forEach(function (record) {
						record.dataValues.updated = Math.round(new Date().getTime() / 1000);
					});
				}
			}
		}
	});

	Vendor.associate = models => {
		Vendor.hasMany(models.payment,{foreignKey:'sellerId',hooks:false});
};
return Vendor;
};