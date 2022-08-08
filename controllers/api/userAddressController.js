const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { Op } = require('sequelize');
const { request } = require('express');


const model = 'userAddress';
const modelName = 'User Address';

module.exports = {
    userAddressListing: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
            };
            const nonRequired = {
                isSelfPickup:req.query.isSelfPickup,
                vendorId:req.query.vendor_id
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let modelItems = []
            if(requestData.isSelfPickup && requestData.isSelfPickup=='1' && requestData.vendorId!=''){
                modelItems = await models['vendorDetail'].findAll({
                    where: {
                        userId: requestData.vendorId
                    },
                    attributes: ['buildingNumber','streetNumber','city','state','country','postalCode','latitude','longitude','geoLocation'],
                    order: [
                        ['id', 'DESC']
                    ]
                }).map(modelItem => modelItem.toJSON());
            }else{
                modelItems = await module.exports.findAll(req, res, {
                    userId: req.user.id,
                });
            }

            return helper.success(res, `${modelName}s listing fetched successfully.`, modelItems);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addUserAddress: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                userId: req.user.id,
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                name: req.body.name,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
                isDefault: 1,
            };
            const nonRequired = {

            };

            let requestData = await helper.vaildObject(required, nonRequired);

            await models[model].update({
                isDefault: 0,
            }, {
                where: {
                    userId: req.user.id,
                }
            });

            let modelItemId = await helper.save(models[model], requestData);

            let modelItem = await module.exports.findOne(req, res, {
                id: modelItemId,
            });

            return helper.success(res, `${modelName} added successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateUserAddress: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                id: req.body.id,
            };
            const nonRequired = {
                address: req.body.address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                name: req.body.name,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let modelItem = await models[model].findOne({
                where: {
                    id: requestData.id,
                    userId: req.user.id
                },
                raw: true
            });
            if (!modelItem) throw "Invalid id.";

            let modelItemId = await helper.save(models[model], requestData);

            modelItem = await module.exports.findOne(req, res, {
                id: modelItemId
            });

            return helper.success(res, `${modelName} updated successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    deleteUserAddress: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
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

            if (modelItem.isDefault) {
                const getId = await models[model].findOne({
                    where: {
                        [Op.and]: [
                            sequelize.literal(`id=(SELECT id FROM ${model} as ua WHERE ua.userId=${req.user.id} ORDER BY ua.id DESC LIMIT 1)`),
                        ]
                    },
                    raw: true,
                });

                await models[model].update({
                    isDefault: 1,
                }, {
                    where: {
                        id: getId,
                        // userId: req.user.id,
                        // [Op.and]: [
                        //     sequelize.literal(`id=(SELECT id FROM ${model} as ua WHERE ua.userId=${req.user.id} ORDER BY ua.id DESC LIMIT 1)`),
                        // ],
                    },
                    // order: [['id', 'DESC']],
                    // limit: 1,
                })
            };

            return helper.success(res, `${modelName} deleted successfully.`, {});
        } catch (err) {
            return helper.error(res, err);
        }
    },
    setDefaultUserAddress: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                id: req.body.id,
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const modelItemExists = await models[model].findOne({
                where: {
                    id: requestData.id,
                    userId: req.user.id
                },
                raw: true
            });
            if (!modelItemExists) throw "Invalid id.";

            await models[model].update({
                isDefault: 0,
            }, {
                where: {
                    userId: req.user.id,
                }
            });

            let modelItemId = await helper.save(models[model], {
                id: requestData.id,
                isDefault: 1
            });

            modelItem = await module.exports.findOne(req, res, {
                id: modelItemId
            });

            return helper.success(res, `${modelName} set as default successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    findAll: async(req, res, where = {}, modifiedObj = {}) => {
        return await models[model].findAll({
            where,
            order: [
                ['isDefault', 'DESC'],
                ['id', 'DESC']
            ],
            ...modifiedObj,
        }).map(modelItem => modelItem.toJSON());
    },
    findOne: async(req, res, where = {}, modifiedObj = {}) => {
        let modelItem = await models[model].findOne({
            where,
            ...modifiedObj,
        });

        if (modelItem) modelItem = modelItem.toJSON();
        return modelItem;
    }
}