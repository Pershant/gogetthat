const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const siteComission = require('../../models/siteComission');
const { Op } = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

const model = "setting";
global.modelTitle = "Setting"

module.exports = {
    setting: async (req, res) => {
        try {
            global.currentModule = 'Setting';
            global.currentSubModuleSidebar = '';

            const admin = req.session.admin;
// console.log(admin,'================hwerer');return
            const siteComissions = await models['siteComission'].findAll({
                raw: true
            });
            // console.log(siteComissions, '=============>siteComissions');return

            let siteComissionHTML = ``;

            if (siteComissions.length > 1) {
                for (i = 1; i < siteComissions.length; i++) {
                    siteComissionHTML += `
                        <div class="row single_row_container">
                            <div class="col-3 col-md-3 col-lg-3">
                                <div class="form-group">
                                    <label>&nbsp;</label>

                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fas fa-sort-amount-down"></i>
                                            </div>
                                        </div>
                                        <input type="number" min="0" class="form-control" name="minimum"
                                            value="${siteComissions[i]['minimum']}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 col-md-3 col-lg-3">
                                <label>&nbsp;</label>
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fas fa-sort-amount-up"></i>
                                            </div>
                                        </div>
                                        <input type="number" min="1" class="form-control" name="maximum"
                                            value="${siteComissions[i]['maximum']}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 col-md-3 col-lg-3">
                                <label>&nbsp;</label>
                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fas fa-dollar-sign"></i>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" name="comission"
                                            value="${siteComissions[i]['comission']}" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 col-md-3 col-lg-3">
                                <label>&nbsp;</label>
                                <div class="form-group">
                                    <input type="hidden" class="form-control" name="id" value="${siteComissions[i]['id']}" required>
                                    <a href="javascript:void(0)" class="btn btn-icon btn-danger delete_row"><i class="fas fa-times"></i></a>
                                </div>
                            </div>
                        </div>`;
                }
            }



            const settingData = await models[model].findAll({
                raw: true
            });

            const settings = {};
            settingData.forEach(setting => {
                settings[setting.name] = setting.value;
            });
            console.log(settings, '===============>settings===admin');

            /*
            |----------------------------------------------------------------
            |   Tax Category Data
            |----------------------------------------------------------------
            |
            */
            const taxCategoryListingData = await module.exports.taxCategoryListing();

            return res.render('admin/setting/index', { admin, settingData, settings, siteComissions, siteComissionHTML, ...taxCategoryListingData });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateSettings: async (req, res) => {
        try {
            // console.log('===================adminsetting');return
            global.currentModule = 'Setting';
            global.currentSubModuleSidebar = '';

            const requestData = helper.clone(req.body);

            if (req.files && req.files.image && req.files.image.name) {
                requestData.image = helper.imageUpload(req.files.image, 'user');
            }
            if (requestData.hasOwnProperty('password') && requestData.password) {
                requestData.password = helper.bcryptHash(requestData.password);
            }
            if (!requestData.password) {
                delete requestData.password
            }


            const { moduleName } = requestData;
            // console.log(requestData, '====================requestData'); return
            delete requestData.moduleName;

            const settingData = await models[model].findAll({
                raw: true
            });
            const settingsIds = {};
            settingData.forEach(setting => {
                settingsIds[setting['name']] = setting.id;
            });

            let updateArray = [];
            for (let i in requestData) {
                updateArray.push({
                    id: settingsIds[i],
                    name: i,
                    value: requestData[i]
                });
            }
            console.log(updateArray, '=============================>updateArray');

            // console.log(requestData, '=======================inside'); return
            await models[model].bulkCreate(updateArray, { updateOnDuplicate: ["value"] });
            const updatedItem = await helper.save(models['user'], requestData, true);


            delete requestData.id;
            requestData.id = 1;

            const saveUser = await helper.save(models['adminDetail'], requestData, true);

            // let moduleName = `User`


            // return helper.success(res, `${moduleName} updated successfully`, {});
            // req.flash('flashMessage', { color: 'success', message: `${moduleName} updated successfully` });
            res.send({
                message: "setting updated successfully",
                success: true,
            })
            res.redirect(`/admin/setting`);


        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    updateSiteComission: async (req, res) => {
        try {
            // console.log('=====================under api===============');return
            global.currentModule = 'Setting';
            global.currentSubModuleSidebar = '';

            const requestData = helper.clone(req.body);

            const { moduleName } = requestData;
            delete requestData.moduleName;


            console.log(requestData, '=============>requestData');

            if (requestData.minimum.length > 0) {
                await models['siteComission'].destroy(
                    {
                        where: {},
                        // truncate: true
                    }
                );

                const addSiteComission = [];

                for (let i in requestData.minimum) {
                    addSiteComission.push({
                        minimum: requestData.minimum[i],
                        maximum: requestData.maximum[i],
                        comission: requestData.comission[i],
                        ...(requestData.hasOwnProperty('id') && requestData.id.length > i ? { id: requestData.id[i] } : {})
                    });
                }

                console.log(addSiteComission, '=================>addSiteComission');
                await models['siteComission'].bulkCreate(addSiteComission, { updateOnDuplicate: ['minimum', 'maximum', 'comission'] });
            }


            return helper.success(res, `${moduleName} updated successfully`, {});
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },

    taxCategoryListing: async (req, res) => {
        try {
            const model = "taxCategory";
            const modelTitle = 'Tax Category';

            const listing = await models[model].findAll({
                where: {
                    vendorId: 0
                },
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });
            // console.log(listing, '===========================================>listing');

            const taxCategoryData = listing.map((taxCategory, index) => {
                const statusButton = {
                    0: `<button model_id="${taxCategory.id}" model="${model}" status="${taxCategory.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
                    1: `<button model_id="${taxCategory.id}" model="${model}" status="${taxCategory.status}" class="btn btn-outline-success status_btn" >Active</button>`,
                }

                const viewButton = `<a href="/admin/taxCategory/view/${taxCategory.id}" class="btn btn-outline-info" >View</a>`;
                const editButton = `<a href="/admin/taxCategory/edit/${taxCategory.id}" class="btn btn-outline-warning" >Edit</a>`;
                const deleteButton = `<button model_id="${taxCategory.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

                let action = '';
                action += viewButton;
                action += '&nbsp;';
                action += editButton;
                action += '&nbsp;';
                action += deleteButton;

                return Object.values({
                    sno: parseInt(index) + 1,
                    taxCategory: taxCategory.taxCategory,
                    taxInPercent: taxCategory.taxInPercent == 0 ? 'No' : 'Yes',
                    taxValue: taxCategory.taxValue,
                    // dateCreated: moment(taxCategory.createdAt).format('dddd, MMMM Do YYYY'),
                    status: statusButton[taxCategory.status],
                    action
                });
            });

            const taxCategoryHeaderColumns = Object.values({
                sno: '#',
                taxCategory: 'Tax Category',
                taxInPercent: 'Tax in Percent',
                taxValue: 'Tax Value',
                // dateCreated: 'Date Created',
                status: 'Status',
                action: 'Action',
            });

            return {
                taxCategoryData,
                taxCategoryHeaderColumns,
            }
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },


}