const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;

const prefixBaseName = 'admin';
const model = 'pushNotification';
const modelBaseName = 'pushNotification';
const modelTitle = 'Push Notification';
const modelImageFolder = 'pushNotification';
const modelDataTable = '';

module.exports = {
    add: async (req, res) => {
        try {
            global.currentModule = modelTitle;
            global.currentSubModule = 'Send Push Notification';
            global.currentSubModuleSidebar = 'Send Push Notification';

            return res.render(`${prefixBaseName}/${modelBaseName}/addEdit`, { row: undefined, prefixBaseName, modelBaseName });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    edit: async (req, res) => {
        try {
            global.currentModule = modelTitle;
            global.currentSubModuleSidebar = '';
            global.currentSubModule = `Edit`;

            const row = await module.exports.findOne(req.params.id);

            console.log(JSON.stringify(row, null, 2), '======================================>listing');
            // return;

            return res.render(`${prefixBaseName}/${modelBaseName}/addEdit`, { row, prefixBaseName, modelBaseName });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    view: async (req, res) => {
        try {
            global.currentModule = modelTitle;
            global.currentSubModuleSidebar = 'listing';

            global.currentSubModule = `View`;
            const row = await module.exports.findOne(req.params.id);

            console.log(JSON.stringify(row, null, 2), '====================================>row');

            // function getHierarchy(row) {
            //     if (!row) return;
            //     let html = '';
            //     html += `
            //     <ul>
            //         <li>${row && row.name}</li>`;
            //     if (row.hasOwnProperty('children') && Array.isArray(row.children)) {
            //         row.children.forEach(child => {
            //             html += getHierarchy(child);
            //         });
            //     }
            //     html += `</ul>`;
            //     return html;
            // }

            return res.render(`${prefixBaseName}//${modelBaseName}/view`, { row, prefixBaseName, modelBaseName });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addUpdate: async (req, res) => {
        try {
            // const required = {
            //     vendorId: adminData.role == 3 ? adminData.id : 0,
            //     name: req.body.name,
            // };
            // const nonRequired = {
            //     id: req.body.id,
            //     image: req.files && req.files.image
            // };

            // let requestData = await helper.vaildObject(required, nonRequired);

            // if (adminData.role != 3) {
            //     delete requestData.vendorId;
            // }
            
            // if (req.files && req.files.image) {
            //     requestData.image = helper.imageUpload(req.files.image, modelImageFolder);
            // }

            // const rowId = await helper.save(models[model], requestData);
            // const row = await module.exports.findOne(rowId);
            // console.log(row, '=================================================>row');

            let message = `${modelTitle} sent Successfully.`;

            req.flash('flashMessage', { color: 'success', message });

            res.redirect(`/${prefixBaseName}/${modelBaseName}`);
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    findOne: async (id) => {
        return await models[model].findOne({
            where: { id },
            raw: true
        });
    },
}