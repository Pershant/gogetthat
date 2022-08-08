const models = require("../../models");
const database = require("../../db/db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/helper");
const secretKey = jwtSecretKey; // configured inside config/constants.js

// const authController = require('./authController');
const productController = require('./productController');

const model = 'productFavourite';

modelName = "Favourites"


module.exports = {

    productFav: async(req, res) => {
        try {
            const required = {
                id: req.body.id,
            };
            const nonRequired = {

            };

            let requestData = await helper.vaildObject(required, nonRequired);
            console.log(requestData.id, "------------");



            const post = await helper.checkId(models['product'], requestData.id, 'id');

            const productFavourite = await helper.checkId(models[model], {

                productId: post.id,
                userId: req.user.id,

            }, '', false);

            if (productFavourite) {
                await helper.delete(models[model], productFavourite.id);
                var responseData = {}
            } else {
                await helper.save(models[model], {
                    productId: post.id,
                    userId: req.user.id,
                });
            }
            var responseData = {}
            return helper.success(res, `${productFavourite ? 'Removed from' : 'Added to'} favourite successfully.`, responseData);

        } catch (err) {
            return helper.error(res, err);
        }
    },
    fav_product_list: async(req, res) => {
        try {
            const required = {
            };
            const nonRequired = {
            };
            let requestData = await helper.vaildObject(required, nonRequired);
            const favProductList = await models[model].findAll({
                where: {userId: req.user.id},
                attributes: ['id'],
                include: [{
					model: models.product,
					required: true,
					attributes: {
						include: [
							[sequelize.literal(`(IF (image='', '', CONCAT('${baseUrl}/uploads/product/', image)) )`), 'image']
						]
					},
				}]
            })        
            return helper.success(res, `Favorite Products List`, favProductList);
        } catch (err) {
            return helper.error(res, err);
        }
    },

};