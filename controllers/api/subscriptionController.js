const models = require("../../models");
const database = require("../../db/db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/helper");
const secretKey = jwtSecretKey; // configured inside config/constants.js

// const authController = require('./authController');

const model = 'subscription';
const modelName = 'subscription';
const modelFolder = 'product';

module.exports = {
    getSubscriptions: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const product = await module.exports.findAll(model);

            var apimessage = {}
            return helper.success(res, `${modelName} get successfully.`, product);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    findOne: async(req, where = {}, obj = {}) => {
        return await models[model].findOne({
            where: {
                status: 1,
                ...where,
            },
            attributes: module.exports.modelAttributes(),
        }).then(modelItem => modelItem ? modelItem.toJSON() : modelItem);
    },
    findAll: async(req, where = {}, obj = {}) => {
        return await models[model].findAll({
            where: {
                status: 1,
                ...where,
            },

            order: [
                ['id', 'DESC']
            ],
        }).map(modelItem => modelItem.toJSON());
    },
    modelAttributes: () => {
        return {
            include: [
                helper.makeImageUrlSql(model, 'image', modelFolder),
                helper.makeImageUrlSql(model, 'barcodeImage', modelFolder),
            ]
        };
    },
}