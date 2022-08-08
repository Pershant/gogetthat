const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { Op } = require('sequelize');
const { request } = require('express');

const MODULE_MODEL = models.page;

module.exports = {
    getPage: (accessor) => { 
        return async (req, res) => {
            try {        
                const required = {
                    securitykey: req.headers.securitykey,
                };
                const nonRequired = {

                };
    
                let requestData = await helper.vaildObject(required, nonRequired);
                
                const page = await MODULE_MODEL.findOne({
                    where: {
                        accessor
                    },
                    raw: true
                });
                 
                return helper.success(res, `${page.title} fetched successfully.`, page);
            } catch (err) {
                return helper.error(res, err);
            }
        }
    },
}