/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		role: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'role',
			defaultValue: 1,
		},
		verified: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'verified',
			defaultValue: 0,
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'status',
			defaultValue: 1,
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'username',
			defaultValue: '',
		},
		stripe_customer_id:{
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'stripe_customer_id',
			defaultValue: '',
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'email',
			defaultValue: '',
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'password',
			defaultValue: '',
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true,
			fiewalletAmountld: 'image',
			defaultValue: '',
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name',
			defaultValue: '',
		},
		company: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'company',
			defaultValue: '',
		},
		businessNumber: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'businessNumber',
			defaultValue: 0,
		},
		walletAmount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'walletAmount',
			defaultValue: 0,
		},
		loyality_points: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'loyality_points',
			defaultValue: 0,
		},
		businessCNumber: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'businessCNumber',
			defaultValue: 0,
		},
		verificationId: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'verificationId',
			defaultValue: '',
		},
		buisnessAddress: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'buisnessAddress',
			defaultValue: '',
		},
		countryCode: {
			type: DataTypes.STRING(5),
			allowNull: false,
			field: 'countryCode',
			defaultValue: '',
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: false,
			field: 'phone',
			defaultValue: '',
		},
		forgotPasswordHash: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'forgotPasswordHash',
			defaultValue: '',
		},
		long: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'long',
            defaultValue: 0,
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            field: 'lat',
            defaultValue: 0,
        },
		facebookId: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'facebookId',
			defaultValue: '',
		},
		web_token: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'web_token',
			defaultValue: '',
		},
		googleId: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'googleId',
			defaultValue: '',
		},
		otp: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			field: 'otp',
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
		tableName: 'user',
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

	User.associate = models => {
		User.hasOne(models.adminDetail, { onDelete: 'cascade', hooks: false });
		User.hasOne(models.userDetail, { onDelete: 'cascade', hooks: false });
		User.hasOne(models.driverDetail, { onDelete: 'cascade', hooks: false });
		User.hasOne(models.vendorDetail, { onDelete: 'cascade', hooks: false });
		User.hasOne(models.vendorStaffDetail, { onDelete: 'cascade', hooks: false });
		User.hasMany(models.vendorDeliveryOptions, { foreignKey: 'vendorId', hooks: false });
		User.hasMany(models.vendorDeliveryCharges, { foreignKey: 'vendorId', hooks: false });
		User.hasMany(models.vendorShopCategory, { foreignKey: 'vendorId', hooks: false });
		User.hasMany(models.userDeliveryAddress, { foreignKey: 'userId', hooks: false });
		User.hasMany(models.userToken, { foreignKey: 'userId', hooks: false });
		User.hasMany(models.payment,{foreignKey:'userId',hooks:false});
	};

	return User;
};
