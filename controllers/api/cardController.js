const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { Op } = require('sequelize');
const { request } = require('express');


const model = 'card';
const modelName = 'Card';

module.exports = {
    allCards: async(req, res) => {
        try {
            const required = {

                // securitykey: req.headers.securitykey,

            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            let modelItems = await module.exports.findAll(req, res, {
                userId: req.user.id,
            });

            return helper.success(res, `${modelName} Listing fetched successfully.`, modelItems);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addCard: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                cardType: req.body.cardType,
                name: req.body.name,
                cardNumber: req.body.cardNumber,
                month: req.body.month,
                year: req.body.year,
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            if (isNaN(Number(requestData.cardType))) throw "cardType should only be a number.";

            requestData.cardNumber = requestData.cardNumber.replace(/\s/g, '');

            const now = moment().unix();
            const cardExpiry = moment(`${requestData.year}/${requestData.month}/01`, 'YYYY/MM/DD').unix();

            // const month = now.format('M');
            // const day = now.format('D');
            // const year = now.format('YYYY');

            // console.log(year, month, day);
            console.log(now, '=========>now');
            console.log(cardExpiry, '=======>cardExpirty');

            if (cardExpiry < now) throw "Invalid Expiry.";

            if (requestData.cardNumber.length != 16) throw "Card number should be 16 digit long.";
            if (requestData.month.length != 2) throw "Month should be 2 digit long.";
            if (requestData.year.length != 4) throw "Year should be 4 digit long.";

            await models[model].update({
                isDefault: 0
            }, {
                where: {
                    userId: req.user.id
                }
            });

            requestData.isDefault = 1;
            requestData.userId = req.user.id;

            let modelItemId = await helper.save(models[model], requestData);

            const modelItem = await module.exports.findOne(req, res, {
                id: modelItemId
            });

            return helper.success(res, `${modelName} added successfully.`, modelItem);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateCard: async(req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                id: req.body.id,
                ...(
                    req.body.hasOwnProperty('month') && req.body.month ? {
                        year: req.body.year,
                    } : {}
                ),
                ...(
                    req.body.hasOwnProperty('year') && req.body.year ? {
                        month: req.body.month,
                    } : {}
                ),
            };
            const nonRequired = {
                cardType: req.body.cardType,
                name: req.body.name,
                cardNumber: req.body.cardNumber,
                month: req.body.month,
                year: req.body.year,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            if (requestData.hasOwnProperty('cardType') && isNaN(Number(requestData.cardType))) throw "cardType should only be a number.";

            const now = moment().unix();

            if (requestData.hasOwnProperty('cardNumber') && requestData.cardNumber) requestData.cardNumber = requestData.cardNumber.replace(/\s/g, '');

            if (requestData.hasOwnProperty('year') && requestData.year && requestData.hasOwnProperty('month') && requestData.month) {
                const cardExpiry = moment(`${requestData.year}/${requestData.month}/01`, 'YYYY/MM/DD').unix();
                // const month = now.format('M');
                // const day = now.format('D');
                // const year = now.format('YYYY');

                // console.log(year, month, day);
                console.log(now, '=========>now');
                console.log(cardExpiry, '=======>cardExpirty');

                if (cardExpiry < now) throw "Invalid Expiry.";
            }


            if (requestData.hasOwnProperty('cardNumber') && requestData.cardNumber.length != 16) throw "Card number should be 16 digit long.";
            if (requestData.hasOwnProperty('month') && requestData.month.length != 2) throw "Month should be 2 digit long.";
            if (requestData.hasOwnProperty('year') && requestData.year.length != 4) throw "Year should be 4 digit long.";

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
    deleteCard: async(req, res) => {
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
                        id: getId
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
    setDefaultCard: async(req, res) => {
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