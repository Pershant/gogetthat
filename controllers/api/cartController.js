const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { Op } = require('sequelize');
const { request } = require('express');


const model = 'cart';
const modelName = 'Cart Item';

module.exports = {
    cartItemsListing: async (req, res) => {
        try {
            const required = {
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            let modelItems = await module.exports.findAll(req, res, {
                userId: req.user.id
            });

            const userModelDetail = await models[userRoleModels[req.user.role]].findOne({
                where: {
                    userId: req.user.id,
                },
                raw: true,
            })

            const gstTax = await models['taxCategory'].findOne({
                where: {
                    id: '1',
                },
                raw: true,
            })

            const adminCommission = await models['siteComission'].findOne({
                where: {
                    id: '1',
                },
                raw: true,
            })

            const responseData = {
                taxDetails:{
                    gst:gstTax.taxValue,
                    siteComission:adminCommission.comission
                },
                walletAmount: userModelDetail ? userModelDetail.wallet : '0',
                cartItems: modelItems,
            }

            return helper.success(res, `${modelName}s listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addCartItem: async (req, res) => {
        try {
            const required = {
                productId: req.body.productId,
                qty: req.body.qty,
                vendorId:req.body.vendorId
            };
            const nonRequired = {

            };

            let requestData = await helper.vaildObject(required, nonRequired);
            let getMyCart= await models.cart.findOne({
                where:{
                    userId:req.user.id
                }
            });
          
            if(getMyCart!==null){
               
                if(getMyCart.dataValues.vendorId!==Number(requestData.vendorId)){
                    var data={
                        is_already:"0"
                    }
                    return helper.error(res,{"code":401, "message":"Different Vendor Please clear your Cart First"});
                    // return helper.success(res,"Different Vendor Please clear your Cart First",data);
                }

            }
            if (isNaN(Number(requestData.qty))) throw "qty should only be a number.";
            // if (parseInt(requestData.qty) <= 0) throw "qty should be greater than 0.";

            const product = await models.product.findOne({
                where: {
                    id: requestData.productId,
                    // categoryId: 2 // for RE:TAIL
                },
                raw: true,
            });
            
            if (!product) throw "Invalid productId.";

            let modelItemExists = await module.exports.findOne(req, res, {
                userId: req.user.id,
                productId: requestData.productId,
            });
            // if (modelItemExists) throw `${modelName} already exists in the cart.`;
            
            if (modelItemExists) requestData.id = modelItemExists.id;

            requestData.userId = req.user.id;

            let modelItemId = await helper.save(models[model], requestData);

            let modelItem = await module.exports.findOne(req, res, {
                id: modelItemId
            });

            if (requestData.qty == 0) {
                await helper.delete(models[model], requestData.id);
                modelItem = {};
            }

            return helper.success(res, `${modelName} ${requestData.qty == 0 ? 'deleted' : modelItemExists ? 'updated' : 'added'} successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateCartItem: async (req, res) => {
        try {
            const required = {
                id: req.body.id,
            };
            const nonRequired = {
                qty: req.body.qty,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            if (requestData.hasOwnProperty('qty')) {
                if (isNaN(Number(requestData.qty))) throw "qty should only be a number.";
                if (parseInt(requestData.qty) <= 0) throw "qty should be greater than 0.";
            }

            let modelItem = await models[model].findOne({
                where: {
                    id: requestData.id,
                    userId: req.user.id
                },
                raw: true
            });
            if (!modelItem) throw "Invalid id.";

            // if (requestData.hasOwnProperty('productId')) {
            //     const product = models.product.findOne({
            //         where: {
            //             id: requestData.productId,
            //             // categoryId: 2 // for RE:TAIL
            //         },
            //         raw: true,
            //     });
            //     if (!product) throw "Invalid productId.";
            // }

            requestData.userId = req.user.id;

            let modelItemId = await helper.save(models[model], requestData);

            modelItem = await module.exports.findOne(req, res, {
                id: modelItemId
            });

            return helper.success(res, `${modelName} updated successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    deleteCartItem: async (req, res) => {
        try {
            const required = {
                id: req.query.id,
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const modelItem = await models[model].findOne({
                where: {
                    id: requestData.id,
                    userId: req.user.id
                },
                raw: true
            });
            if (!modelItem) throw "Invalid id.";

            await helper.delete(models[model], requestData.id);

            return helper.success(res, `${modelName} deleted successfully.`, {});
        } catch (err) {
            return helper.error(res, err);
        }
    },
    emptyCart: async (req, res) => {
        try {
            const required = {
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            await models[model].destroy({
                where: {
                    userId: req.user.id,
                }
            });

            const message = `${modelName} emptied successfully.`;

            return (req.hasOwnProperty('sendResponse') && req.sendResponse == false)
                ? message
                : helper.success(res, message, {});
        } catch (err) {
            return helper.error(res, err);
        }
    },
    findAll: async (req, res, where = {}, modifiedObj = {}) => {
        return await models[model].findAll({
            where,
            order: [['id', 'DESC']],
            include: [
                {
                    model: models.product,
                    required: true,
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (product.image='', '', CONCAT('${baseUrl}/uploads/product/', product.image)) )`), 'image'],
                        ],
                    },
                }
            ],
            ...modifiedObj,
        }).map(modelItem => modelItem.toJSON());
    },
    findOne: async (req, res, where = {}, modifiedObj = {}) => {
        let modelItem = await models[model].findOne({
            where,
            include: [
                {
                    model: models.product,
                    required: true,
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (product.image='', '', CONCAT('${baseUrl}/uploads/product/', product.image)) )`), 'image'],
                        ],
                    },
                }
            ],
            ...modifiedObj,
        });

        if (modelItem) modelItem = modelItem.toJSON();
        return modelItem;
    }
}
