const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const shopCategoryController = require('../admin/shopCategoryController');
const { Op } = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

const model = "user";
global.modelTitle = "User";
global.modelDataTable = "userDataTable";

const roleTypes = {
    0: 'Admin',
    1: 'User',
    2: 'Driver',
    3: 'Vendor',
    4: 'Employee',
    5: 'Manager',
}
const userRoleModels = {
    0: 'adminDetail',
    1: 'userDetail',
    2: 'driverDetail',
    3: 'vendorDetail',
    4: 'vendorStaffDetail',
    5: 'vendorStaffDetail',
}

module.exports = {
    manageShop: async (req, res) => {
        try {
            global.currentModule = 'Manage Shop';
            global.currentSubModule = 'Shop Detail';
            global.currentSubModuleSidebar = 'manageShop';

            const shopCategories = await shopCategoryController.findAll(req);

            return res.render('sellerAdmin/manageShop', { type: 'edit', shopCategories });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    staffManagementListing: async (req, res) => {
        try {
            global.currentModule = 'Staff Management';
            global.currentSubModule = 'Listing';
            global.currentSubModuleSidebar = 'staffManagement';

            const vendorId = adminData.id;

            const vendorStaff = await module.exports.getAllVendorStaff(vendorId);

            return res.render('sellerAdmin/staffManagement/listing', { type: 'listing', ...vendorStaff });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    staffManagementAddEditView: (type) => {
        return async (req, res) => {
            try {
                global.currentModule = 'Staff Management';
                global.currentSubModule = helper.uppercaseFirstLetter(type);
                global.currentSubModuleSidebar = type;

                const vendorId = adminData.id;
                let staffMember = undefined;

                if (['edit', 'view'].includes(type)) {
                    staffMember = await module.exports.findOneUser(req.params.id);

                    if (!staffMember) throw "Invalid ID.";
                    staffMember.vendorStaffDetail.permissions = JSON.parse(staffMember.vendorStaffDetail.permissions);
                }

                return res.render('sellerAdmin/staffManagement/addEditView', { type, staffMember, vendorId });
            } catch (err) {
                return helper.error(res, err);
            }
        }
    },
    taxCategory: async (req, res) => {
        try {
            global.currentModule = 'Tax Category';
            global.currentSubModule = '';
            global.currentSubModuleSidebar = 'taxCategory';

            return res.render('sellerAdmin/taxCategory');
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const required = {
            };
            const nonRequired = {
                id: !(req.body.hasOwnProperty('id') && req.body.id) ? undefined : !adminData.staffLogin ? adminData.id : adminData.staffLogin.id,
                name: req.body.name,
                email: req.body.email,
                // role: req.body.role,
                password: req.body.password,
                image: req.files && req.files.image,
                phone: req.body.phone,
                shopName: req.body.shopName,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                postalCode: req.body.postalCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                geoLocation: req.body.geoLocation,
                shopAddress: req.body.shopAddress,
                shopDescription: req.body.shopDescription,
                paymentPolicy: req.body.paymentPolicy,
                deliveryPolicy: req.body.deliveryPolicy,
                sellerInformation: req.body.sellerInformation,
                taxInPercent: req.body.taxInPercent,
                taxValue: req.body.taxValue,
                bankName: req.body.bankName,
                bankBranch: req.body.bankBranch,
                accountHolderName: req.body.accountHolderName,
                accountNumber: req.body.accountNumber,
                bsbNumber: req.body.bsbNumber,
                ifscSwiftCode: req.body.ifscSwiftCode,
                bankAddress: req.body.bankAddress,
                shopLogo: req.body.shopLogo,
                // countryCode: req.body.countryCode,
                // phone: req.body.phone,
                redirectUrl: req.body.redirectUrl,

                vendorBannerImages: req.files && req.files.vendorBannerImages,

                ...req.body,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            if (requestData.redirectUrl == '/sellerAdmin/manageShop' && requestData.hasOwnProperty('isStaffLogin') && requestData.isStaffLogin) {
                requestData.id = adminData.staffLogin ? adminData.id : adminData.staffLogin.id;
            }

            // log(requestData, 'requestData');
            // log(adminData, 'adminData');
            // return;
            // console.log(adminData, '==========>adminData');
            // return;

            // requestData.countryCodePhone = `${requestData.countryCode}${requestData.phone}`;

            if (requestData.hasOwnProperty('password') && requestData.password) {
                requestData.password = helper.bcryptHash(requestData.password);
            }

            // const imageFolders = {
            //     0: 'admin',
            //     1: 'user',
            //     2: 'user',
            //     3: 'user',
            // }

            if (req.files && req.files.image) {
                requestData.image = helper.imageUpload(req.files.image, 'user');
            }

            if (req.files && req.files.shopLogo) {
                requestData.shopLogo = helper.imageUpload(req.files.shopLogo, 'user');
            }

            requestData.verified='1';
            // console.log(adminData, '=======>adminData');
            // console.log(requestData, '=======>requestData');
            // console.log(models[model], '=======>models[model]');
            // return;

            const userId = await helper.save(models[model], requestData);
            const user = await module.exports.findOneUser(userId);
            console.log(user, '=================================================>user');

            // console.log(user.role, '========>user.role');
            // console.log(userRoleModels, '================>userRoleModels');

            user.hasOwnProperty(userRoleModels[user.role]) && user[userRoleModels[user.role]] && user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
            requestData.userId = user.id;

            console.log(userRoleModels[user.role], ' =====================>userRoleModels[user.role]');
            console.log(requestData, '=============================>requestData');
            // return;

            if (req.files && req.files.vendorBannerImages && req.files.vendorBannerImages.length > 0) {
                requestData.vendorBannerImages = helper.imageUploadMultiple(req.files.vendorBannerImages, 'vendorBannerImages');

                const vendorBannerImages = requestData.vendorBannerImages.map(image => ({
                    vendorId: userId,
                    image,
                }))

                await models.vendorBannerImages.bulkCreate(vendorBannerImages);
            }

            if (requestData.hasOwnProperty('shopCategoryIds') && requestData.shopCategoryIds) {
                if (!Array.isArray(requestData.shopCategoryIds)) requestData.shopCategoryIds = [requestData.shopCategoryIds];

                const deleteAllShopCategoies = await models.vendorShopCategory.destroy({
                    where: {
                        vendorId: userId,
                    }
                });

                const shopCategoryArray = requestData.shopCategoryIds.map(shopCategoryId => ({
                    vendorId: userId,
                    shopCategoryId
                }));

                await models.vendorShopCategory.bulkCreate(shopCategoryArray);
            }

            if ([4, 5].includes(user.role)) {
                const permissions = {};
                let hasPermission = false;
                for (let i in modules.sellerAdmin) {
                    const moduleItem = modules['sellerAdmin'][i];
                    if (moduleItem.hasOwnProperty('permissions') && Array.isArray(moduleItem.permissions) && moduleItem.permissions.length > 0) {
                        if (requestData.hasOwnProperty(`module.${i}`)) {
                            hasPermission = true;
                            permissions[i] = Array.isArray(requestData[`module.${i}`]) ? requestData[`module.${i}`] : [requestData[`module.${i}`]];

                            if (permissions[i].length > 0 && !(permissions[i].includes('view'))) {
                                permissions[i].push('view');
                            }
                            permissions[i].sort();
                        } else {
                            permissions[i] = [];
                        }
                    }
                }

                // console.log(permissions, '====================================>permissions');
                if (hasPermission) {
                    requestData.permissions = permissions;
                }
                // return;
            }

            // console.log(models[userRoleModels[user.role]]);
            // console.log(requestData, '====================>requestData');
            // return;

            await helper.save(models[userRoleModels[user.role]], requestData);

            // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

            let message = '';

            if (requestData.hasOwnProperty('id') && requestData.id) {

                const messageModule = {
                    '/sellerAdmin/manageShop': 'Shop Detail',
                    '/sellerAdmin/taxCategory': 'Tax Category',
                    '/sellerAdmin/setting': 'Setting',
                    [`/sellerAdmin/staffManagement/view/${user.id}`]: roleTypes[user.role],
                    '/sellerAdmin/staffManagement/listing': roleTypes[user.role],
                };

                message = `${messageModule[requestData.redirectUrl]} Updated Successfully.`;

                // console.log(roleTypes, '========>userRoleModels');
                // console.log(roleTypes[user.role], '========>userRoleModels[user.role]');
                // console.log(messageModule, '========>messageModule');
                // console.log(requestData.redirectUrl, '========>requestData.redirectUrl');
                // console.log(message, '========>message');
                // return;


                if (messageModule[requestData.redirectUrl] == 'Setting') {
                    return helper.success(res, message, user);
                }
            } else {
                message = `${roleTypes[user.role]} Added Successfully.`;
            }
            req.flash('flashMessage', { color: 'success', message });

            res.redirect(requestData.redirectUrl);

            // return helper.success(res, message, user);    
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    updateVendorDeliveryOptionDays: async (req, res) => {
        try {
            const required = {
                vendorId: (req.body.hasOwnProperty('id') && req.body.id) ? undefined : !adminData.staffLogin ? adminData.id : adminData.staffLogin.id,
            };
            const nonRequired = {
                day: req.body.day,
                deliveryTimeFrom: req.body.deliveryTimeFrom,
                deliveryTimeTo: req.body.deliveryTimeTo,
                noDelivery: req.body.noDelivery,
                redirectUrl: req.body.redirectUrl,
                ...req.body,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            console.log(requestData, '==========>requestData;')



            for (let i = 1; i <= 7; i++) {
                if (requestData.hasOwnProperty(`id${i}`)) {
                    const updateVendorDeliveryOption = {
                        id: requestData[`id${i}`],
                        ...(requestData.hasOwnProperty(`day${i}`) ? { day: requestData[`day${i}`] } : {}),
                        ...(requestData.hasOwnProperty(`deliveryTimeFrom${i}`) ? { deliveryTimeFrom: requestData[`deliveryTimeFrom${i}`] } : {}),
                        ...(requestData.hasOwnProperty(`deliveryTimeTo${i}`) ? { deliveryTimeTo: requestData[`deliveryTimeTo${i}`] } : {}),
                        noDelivery: requestData.hasOwnProperty(`noDelivery${i}`) && requestData[`noDelivery${i}`] == 'on' ? 1 : 0,
                    };
                    helper.save(models['vendorDeliveryOptions'], updateVendorDeliveryOption);
                    console.log(updateVendorDeliveryOption, `=========================>updateVendorDeliveryOption${i}`)
                }
            }

            // return;

            // const userId = await helper.save(models[model], requestData);
            // const user = await module.exports.findOneUser(userId);
            // console.log(user, '=================================================>user');

            // user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
            // requestData.userId = user.id;

            // console.log(requestData, `==========>requestData for model ${models[userRoleModels[user.role]]}`);
            // // return;
            // await helper.save(models[userRoleModels[user.role]], requestData);

            // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

            let message = `Vendor Updated Successfully.`;

            req.flash('flashMessage', { color: 'success', message });

            console.log(requestData.redirectUrl, '======>requestData.redirectUrl');
            // return;
            res.redirect(requestData.redirectUrl);

            // return helper.success(res, message, user);    
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    updateVendorDeliveryCharges: async (req, res) => {
        try {
            const required = {
                vendorId: (req.body.hasOwnProperty('id') && req.body.id) ? undefined : !adminData.staffLogin ? adminData.id : adminData.staffLogin.id,
            };
            const nonRequired = {
                price: req.body.price,
                noDelivery: req.body.noDelivery,
                freeDelivery: req.body.freeDelivery,
                redirectUrl: req.body.redirectUrl,
                ...req.body,
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            console.log(requestData, '==========>requestData;')

            const getHighestMinDistanceValue = await models['vendorDeliveryCharges'].findOne({
                where: {
                    vendorId: requestData.vendorId,
                },
                raw: true,
                order: [['minDistance', 'DESC']],
            });

            if (!getHighestMinDistanceValue) throw "Delivery Charges do not exist.";

            console.log(getHighestMinDistanceValue.minDistance, '=======================>getHighestMinDistanceValue.minDistance');

            for (let i = 0; i <= getHighestMinDistanceValue.minDistance; i += 5) {
                if (requestData.hasOwnProperty(`id${i}`)) {
                    const updateVendorDeliveryCharge = {
                        id: requestData[`id${i}`],
                        ...(requestData.hasOwnProperty(`price${i}`) ? { price: requestData[`price${i}`] } : {}),
                        noDelivery: requestData.hasOwnProperty(`noDelivery${i}`) && requestData[`noDelivery${i}`] == 'on' ? 1 : 0,
                        freeDelivery: requestData.hasOwnProperty(`freeDelivery${i}`) && requestData[`freeDelivery${i}`] == 'on' ? 1 : 0,
                    };
                    helper.save(models['vendorDeliveryCharges'], updateVendorDeliveryCharge);
                    console.log(updateVendorDeliveryCharge, `=========================>updateVendorDeliveryCharge${i}`)
                }
            }
            // return;


            // const userId = await helper.save(models[model], requestData);
            // const user = await module.exports.findOneUser(userId);
            // console.log(user, '=================================================>user');

            // user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
            // requestData.userId = user.id;

            // console.log(requestData, `==========>requestData for model ${models[userRoleModels[user.role]]}`);
            // // return;
            // await helper.save(models[userRoleModels[user.role]], requestData);

            // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

            let message = `Vendor Updated Successfully.`;

            req.flash('flashMessage', { color: 'success', message });

            console.log(requestData.redirectUrl, '======>requestData.redirectUrl');
            // return;
            res.redirect(requestData.redirectUrl);

            // return helper.success(res, message, user);    
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    findOneUser: async (id) => {
        return await models['user'].findOne({
            where: {
                id
            },
            include: [
                {

                    model: models['adminDetail'],
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (adminDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', adminDetail.image)) )`), 'image']
                        ]
                    }
                },
                {

                    model: models['userDetail'],
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (userDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', userDetail.image)) )`), 'image']
                        ]
                    }
                },
                {
                    model: models['driverDetail'],
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (driverDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', driverDetail.image)) )`), 'image']
                        ]
                    }
                },
                {
                    model: models['vendorDetail'],
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image'],
                            [sequelize.literal(`(IF (vendorDetail.shopLogo='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/user/', vendorDetail.shopLogo)) )`), 'shopLogo']
                        ]
                    }
                },
                {
                    model: models['vendorStaffDetail'],
                    required: false,
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (vendorStaffDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorStaffDetail.image)) )`), 'image'],

                        ]
                    }
                },
            ],
            raw: true,
            nest: true,
        });
    },

    changePasswordSetting: async (req, res) => {
        try {
            const required = {
                id: !adminData.staffLogin ? adminData.id : adminData.staffLogin.id,
                currentPassword: req.body.currentPassword,
                newPassword: req.body.newPassword,
                confirmNewPassword: req.body.confirmNewPassword,
            };
            const nonRequired = {};

            if (required.newPassword != required.confirmNewPassword) throw "New Password and Confirm Password did not match.";

            let requestData = await helper.vaildObject(required, nonRequired);

            let getUser = await models[model].findOne({
                where: {
                    id: requestData.id,
                },
                raw: true,
            });
            console.log(getUser, '======================>getUser');

            checkPassword = await helper.comparePass(requestData.currentPassword, getUser.password);

            if (!checkPassword) {
                throw "Current Password did not match, Please try again.";
            }

            if (requestData.hasOwnProperty('newPassword') && requestData.newPassword) {
                requestData.password = helper.bcryptHash(requestData.newPassword);
            }

            console.log(requestData, '=======================>requestData')
            // return;

            const updatedItem = await helper.save(models[model], requestData, true);

            return helper.success(res, 'Password Updated Successfully.', updatedItem);
        } catch (err) {
            if (typeof err == 'string') {
                err = {
                    message: err
                }
            }
            err.code = 200;

            return helper.error(res, err);
        }
    },

    changeEmailSetting: async (req, res) => {
        try {
            const required = {
                id: !adminData.staffLogin ? adminData.id : adminData.staffLogin.id,
                currentPassword: req.body.currentPassword,
                newEmail: req.body.newEmail,
                confirmNewEmail: req.body.confirmNewEmail,
            };
            const nonRequired = {};

            if (required.newEmail != required.confirmNewEmail) throw "New Email and Confirm Email did not match.";

            let requestData = await helper.vaildObject(required, nonRequired);

            let getUser = await models[model].findOne({
                where: {
                    id: adminData.id,
                },
                raw: true,
            });
            console.log(getUser, '======================>getUser');

            checkPassword = await helper.comparePass(requestData.currentPassword, getUser.password);

            if (!checkPassword) {
                throw "Current Password did not match, Please try again.";
            }

            requestData.email = requestData.newEmail;

            const updatedItem = await helper.save(models[model], requestData, true);

            return helper.success(res, 'Email Updated Successfully.', updatedItem);
        } catch (err) {
            if (typeof err == 'string') {
                err = {
                    message: err
                }
            }
            err.code = 200;

            return helper.error(res, err);
        }
    },
    getAllVendorStaff: async (vendorId) => {
        const vendorStaff = await models['user'].findAll({
            include: [
                {
                    model: models['vendorStaffDetail'],
                    required: true,
                    where: {
                        vendorId,
                    },
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (vendorStaffDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorStaffDetail.image)) )`), 'image'],

                        ]
                    }
                }
            ]
        }).map(data => data.toJSON());

        // console.log(vendorStaff, '=============>vendorStaff');
        // return;

        const data = vendorStaff.map((user, index) => {
            const roleBasedColumnDetail = {
                4: {
                    image: `<img alt="image" src="${user.vendorStaffDetail && user.vendorStaffDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.vendorStaffDetail && user.vendorStaffDetail.name}">`,
                    user: `Name: ${user.vendorStaffDetail && user.vendorStaffDetail.name}<br/>
                           Email: ${user.email}<br/>
                        `,
                    role: '<div class="badge badge-dark">Employee</div>',
                    modelTitle: 'Employee',
                    editButtonUrl: `/sellerAdmin/staffManagement/edit/${user.id}`,
                    viewButonUrl: `/sellerAdmin/staffManagement/view/${user.id}`,
                },
                5: {
                    image: `<img alt="image" src="${user.vendorStaffDetail && user.vendorStaffDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.vendorStaffDetail && user.vendorStaffDetail.name}">`,
                    user: `Name: ${user.vendorStaffDetail && user.vendorStaffDetail.name}<br/>
                           Email: ${user.email}<br/>
                        `,
                    role: '<div class="badge badge-dark">Manager</div>',
                    modelTitle: 'Manager',
                    editButtonUrl: `/sellerAdmin/staffManagement/edit/${user.id}`,
                    viewButonUrl: `/sellerAdmin/staffManagement/edit/${user.id}`,
                },
            }

            const statusButton = {
                0: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
                1: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-success status_btn" >Active</button>`,
            }

            const approvalStatusObj = {
                0: {
                    value: `Pending`,
                    backgroundCssColor: `red`,
                },
                1: {
                    value: `Pending More Info`,
                    backgroundCssColor: `#ffc107`,
                },
                2: {
                    value: `Approve`,
                    backgroundCssColor: `green`,
                },
                3: {
                    value: `Suspend`,
                    backgroundCssColor: `orange`,
                },
                4: {
                    value: `Decline`,
                    backgroundCssColor: `red`,
                },
            }

            // console.log(user.id, '======================>user.id');
            // console.log(user.vendorDetail.approvalStatus, '======================>user.vendorDetail.approvalStatus');
            // return;

            let approvalStatusSelect = ``;
            // if (user.role == 3) {
            //     approvalStatusSelect += `<select class="changeVendorApprovalStatus" model="vendorDetail" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" model_id="${user.id}" model_detail_id="${user.vendorDetail && user.vendorDetail.id}" field="approvalStatus" current_value="${user.vendorDetail && user.vendorDetail.approvalStatus}" style="background: ${approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus] && approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
            //     for (let status in approvalStatusObj) {
            //         // console.log(approvalStatusObj, '=================-=================>approvalStatusObj');
            //         // console.log(approvalStatusObj[status], `=================-=================>approvalStatusObj[${status}]`);

            //         approvalStatusSelect += `<option value="${status}" ${status == user.vendorDetail.approvalStatus ? 'selected' : ''} style="background: ${approvalStatusObj[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${approvalStatusObj[status].value}</option>`;
            //     }
            //     approvalStatusSelect += `</select>`;
            // }


            const verifiedButton = {
                0: `<div class="badge badge-warning">Unverified</div>`,
                1: `<div class="badge badge-success">Verified</div>`,
            }

            const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}" class="btn btn-outline-info" >View</a>`;
            const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}" class="btn btn-outline-warning" >Edit</a>`;
            const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

            let action = '';
            action += viewButton;
            action += '&nbsp;';
            action += editButton;
            action += '&nbsp;';
            action += deleteButton;


            return Object.values({
                sno: parseInt(index) + 1,
                image: roleBasedColumnDetail[user.role].image,
                user: roleBasedColumnDetail[user.role].user,
                role: roleBasedColumnDetail[user.role].role,
                // regDate: moment(user.createdAt).format('dddd, MMMM Do YYYY'),
                status: statusButton[user.status],
                // ...(
                //     user.role == 3
                //         ? { approvalStatus: approvalStatusSelect }
                //         : {}
                // ),
                // verified: verifiedButton[user.verified],
                action
            });
        });

        const headerColumns = Object.values({
            sno: '#',
            image: 'Image',
            User: 'User',
            role: 'Role',
            // regDate: 'Reg. Date',
            status: 'status',
            action: 'Action',
        });

        return {
            headerColumns,
            data,
        }
    }
}