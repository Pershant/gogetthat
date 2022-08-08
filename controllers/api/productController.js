const models = require("../../models");
const database = require("../../db/db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/helper");
const secretKey = jwtSecretKey; // configured inside config/constants.js

// const authController = require('./authController');

const model = 'product';
const modelName = 'Product';
const modelFolder = 'product';

module.exports = {



	editPrice: async (req, res) => {
		try {
			const required = {
				id: req.body.id,
				mrp: req.body.mrp
			};
			const nonRequired = {};

			let requestData = await helper.vaildObject(required, nonRequired);

			const updatePrice = await models[model].update({

				mrp: req.body.mrp


			}, {
				where: {
					id: requestData.id
				}
			})

			const finddetails = await models[model].findOne({

				where: {
					id: requestData.id
				}
			})

			return helper.success(res, `${modelName} price update successfully.`, finddetails);
		} catch (err) {
			return helper.error(res, err);
		}
	},

	deleteProduct: async (req, res) => {
		try {
			const required = {
				id: req.body.id
			};
			const nonRequired = {};

			let requestData = await helper.vaildObject(required, nonRequired);

			const product = await helper.checkId(models[model], requestData.productId, 'productId');

			let deletedata = await helper.delete(models[model], requestData.id);

			var apimessage = {}
			return helper.success(res, `${modelName} deleted successfully.`, apimessage);
		} catch (err) {
			return helper.error(res, err);
		}
	},
	addproduct: async (req, res) => {
		try {
			const required = {
				securitykey: req.headers.securitykey,
				vendorId: req.user.id,
				categoryId: req.body.categoryId,
				name: req.body.name,
				description: req.body.description,
				countryOfOrigin: req.body.countryOfOrigin,
				gtinNumber: req.body.gtinNumber,
				brandName: req.body.brandName,
				mrp: req.body.mrp,
				isAvailable: '1',///req.body.isAvailable,
				weight: req.body.weight,
				weightUnit: req.body.weightUnit, // 	0=>kg, 1=>pounds
				status: 1,

				isBarcodeItem: req.body.isBarcodeItem,
				...(
					req.body.hasOwnProperty('isBarcodeItem') && req.body.isBarcodeItem == 1 ? {
						barcode: req.body.barcode
					} : {}
				),

				roles: [3, 4, 5],
				req,
			};
			const nonRequired = {
				image: req.files && req.files.image,
			};

			let requestData = await helper.vaildObject(required, nonRequired);

			log(requestData, 'requestData');
			// return;

			if (requestData.hasOwnProperty('isBarcodeItem') && ![0, 1].includes(parseInt(requestData.isBarcodeItem)))
				throw "Invalid value in isBarcodeItem (0 => no, 1 => yes).";

			if (requestData.image) {
				requestData.image = helper.imageUpload(requestData.image, model);
			}

			if (requestData.hasOwnProperty('barcode')) {
				requestData.barcodeImage = await helper.generateBarcode(requestData.barcode, 'product');
			}

			if (req.user.role != 3) {
				requestData.vendorId = req.user.vendorId;
				requestData.vendorEmployeeId = req.user.id;
			} else {
				requestData.vendorId = req.user.id;
				requestData.vendorEmployeeId = 0;
			}
			
			const productId = await helper.save(models[model], requestData);

			const product = await module.exports.findOne(req, {
				id: productId,
			});

			return helper.success(res, `Product added successfully.`, product);
		} catch (err) {
			return helper.error(res, err);
		}
	},
	changeAvailability: async (req, res) => {
		try {
			const required = {
				securitykey: req.headers.securitykey,
				productId: req.body.productId,
				isAvailable: req.body.isAvailable, // 0 => unavailable, 1 => available
			};
			const nonRequired = {};

			let requestData = await helper.vaildObject(required, nonRequired);

			const product = await helper.checkId(models[model], requestData.productId, 'productId');
			const updatePrice = await models[model].update({
				isAvailable: requestData.isAvailable
			}, {
				where: {
					id: requestData.productId
				}
			})
			return helper.success(res, `Product availability changed successfully.`, product);
		} catch (err) {
			return helper.error(res, err);
		}
	},
	subCategoryProductListing: async (req, res) => {
		try {
			const required = {
				securitykey: req.headers.securitykey,
				categoryId: req.body.categoryId,
			};
			const nonRequired = {

			};
			let requestData = await helper.vaildObject(required, nonRequired);

			const where = {
				categoryId: requestData.categoryId,
				//vendorId: 0				
			};
			if (req.user.role == 3) {
				where.vendorId= req.user.id;
			} if (req.user.role == 4 || req.user.role == 5) {
				where.vendorId= req.user.vendorId
			}


			const products = await module.exports.findAll(req, where);

			return helper.success(res, `Product listing fetched successfully.`, products);

		} catch (err) {
			return helper.error(res, err);
		}
	},
	productListUser: async (req, res) => {
		try {
			const required = {
				// securitykey: req.headers.securitykey,
				categoryId: req.body.categoryId,
			};
			const nonRequired = {

			};
			let requestData = await helper.vaildObject(required, nonRequired);

			const where = {
				categoryId: requestData.categoryId,
			};

			const products = await module.exports.findAll(req, where);

			return helper.success(res, `Product listing fetched successfully.`, products);

		} catch (err) {
			return helper.error(res, err);
		}
	},
	product_detail: async (req, res) => {
		try {
			const required = {
				id: req.body.id,
			};
			const nonRequired = {

			};
			let requestData = await helper.vaildObject(required, nonRequired);

			const where = {
				id: requestData.id,
			};

			const products = await module.exports.findOne(req, where);

			return helper.success(res, `Product detail fetched successfully.`, products);

		} catch (err) {
			return helper.error(res, err);
		}
	},
	homeListingproduct: async (req, res) => {
		try {
			const required = {
				securitykey: req.headers.securitykey,
			};
			const nonRequired = {

			};
			let requestData = await helper.vaildObject(required, nonRequired);

			const where = {

			};

			const products = await module.exports.findAll(req, where);

			return helper.success(res, `Product listing fetched successfully.`, products);

		} catch (err) {
			return helper.error(res, err);
		}
	},
	get_product_by_shop_id: async (req, res) => {
		try {
			const required = {
				securitykey: req.headers.securitykey,
			};
			const nonRequired = {
				vendorId: req.body.vendor_id,
				keyword: req.body.keyword,
			};
			let requestData = await helper.vaildObject(required, nonRequired);

			const where = {

			};

			// const products = await module.exports.findAll(req, where);
			var criteria ={ status: 1,isAvailable:1 }
			if(requestData.keyword && requestData.keyword!=""){
				criteria ={ 
					status: 1 ,
					isAvailable:1,
					[Op.and]: [
						sequelize.literal(`product.name LIKE '%${requestData.keyword}%'`)
					]
				}
			}
			if(requestData.vendorId && requestData.vendorId!=""){
				criteria.vendorId = requestData.vendorId;
			}
			const products = await models[model].findAll({
				where: criteria,
				attributes: module.exports.modelAttributes(req),
				order: [
					['id', 'DESC']
				],
                include:[
                    {
                        model: models.user,
                        as: 'vendor',
                        required: false,
                        attributes: [
                            'id'							
                        ],
                        include:[
                            {
                                model:models.vendorDetail,
								attributes: [
									'name',
									'latitude',
									'longitude',
									'geoLocation',
									'shopAddress',
									'shopName',
									'streetNumber',
									'city',
									'state',
									'country',
									'postalCode'
								],
                                required:true,
                            
                            }
                        ]
					},
                    {
                        model: models.productSpecification,
                        // as: 'productId',
                        required: false
					}
			]
			}).map(modelItem => modelItem.toJSON());

			return helper.success(res, `Product listing fetched successfully.`, products);

		} catch (err) {
			return helper.error(res, err);
		}
	},
	findOne: async (req, where = {}, obj = {}) => {
		return await models[model].findOne({
			where: {
				status: 1,
				...where,
			},
			attributes: module.exports.modelAttributes(req),
		}).then(modelItem => modelItem ? modelItem.toJSON() : modelItem);
	},
	findAll: async (req, where = {}, obj = {}) => {
		return await models[model].findAll({
			where: {
				status: 1,
				...where,
			},
			attributes: module.exports.modelAttributes(req),
			order: [
				['id', 'DESC']
			],
		}).map(modelItem => modelItem.toJSON());
	},
	modelAttributes: (req) => {
		return {
			include: [
				helper.makeImageUrlSql(model, 'image', modelFolder),
				helper.makeImageUrlSql(model, 'barcodeImage', modelFolder),
				[sequelize.literal('(SELECT if(count(id) > 0, 1, 0) is_fav FROM `productFavourite` WHERE `userId`='+req.user.id+' and `productId`=product.id)'), 'is_favorite']
			]
		};
	},
}