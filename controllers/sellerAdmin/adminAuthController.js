const models = require('../../models');
const helper = require('../../helpers/helper');
const sequelize = require('sequelize');
const { Op } = sequelize;
const jwt = require('jsonwebtoken');
const secretKey = jwtSecretKey;

const User = models.user;
const AdminDetail = models.adminDetail;
const venderDetail = models.adminDetail;

module.exports = {
    loginPage: async (req, res) => {
        try {
            if (req.session.authenticated) {
                res.redirect('/sellerAdmin/dashboard');
            } else {

                res.render('sellerAdmin/home/login');
            }

            // return res.render('sellerAdmin/sellerAdmin/login');
        } catch (err) {
            return helper.error(res, err, req);
        }
    },
    loginSubmit: async (req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                email: req.body.email,
                password: req.body.password,
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            let getUser = await User.findOne({
                where: {
                    email: requestData.email,
                    role: 3,
                },
                include: [
                    {
                        model: models['vendorDetail'],
                        attributes: {
                            include: [
                                [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image']
                            ]
                        }
                    },
                ],
                raw: true,
                nest: true
            });
            

            let getStaff;
          //   console.log(getUser,'========================>getUser'); return;
            if (!getUser) {
                getStaff = await User.findOne({
                    where: {
                        email: requestData.email,
                        role: {
                            [Op.in]: [4, 5]
                        },
                    },
                    include: [
                        {
                            model: models['vendorStaffDetail'],
                            attributes: {
                                include: [
                                    [sequelize.literal(`(IF (vendorStaffDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorStaffDetail.image)) )`), 'image']
                                ]
                            }
                        }
                    ],
                    raw: true,
                    nest: true
                });

                console.log(getStaff, '===========>getStaff');

                if (!getStaff) {
                    throw "Incorrect Email or Password.";
                }
            }
         //  console.log(getUser.vendorDetail.isApprove,"getUser.vendorDetail.isApprove");return
            if (getUser.vendorDetail.approvalStatus != 2) {
                throw "Email verification is pending";
            }

            checkPassword = await helper.comparePass(requestData.password, getUser ? getUser.password : getStaff.password);

            if (!checkPassword) {
                throw "Email or Password did not match, Please try again.";
            }

            if (getStaff) {
                getUser = await User.findOne({
                    where: {
                        id: getStaff.vendorStaffDetail.vendorId
                    },
                    include: [
                        {
                            model: models['vendorDetail'],
                            attributes: {
                                include: [
                                    [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image']
                                ]
                            }
                        }
                    ],
                    raw: true,
                    nest: true
                });
                getUser.staffLogin = getStaff;
            } else {
                getUser.staffLogin = false;
            }

            getUser.shopCategories = await models.vendorShopCategory.findAll({
                where: {
                    vendorId: getUser.id,
                }
            });

            getUser.vendorBannerImages = await models.vendorBannerImages.findAll({
                where: {
                    vendorId: getUser.id,
                },
                attributes: {
                    include: [
                        helper.makeImageUrlSql('vendorBannerImages', 'image', 'vendorBannerImages', undefined, PLACEHOLDER_IMAGE),
                    ]
                }
            });

            console.log(getUser, '==========>getUser');

            // if (getUser.vendorDetail.approvalStatus == 0) {
            //     throw "Seller account is Pending for approval by the Admin.";
            // } else 
            if (getUser.vendorDetail.approvalStatus != 2) {
                throw getUser.vendorDetail.approvalStatusReason;
            }

            console.log(getUser, '================================>getUser');
            if (getUser.status == 0) throw "Seller acount has been disabled by the admin.";

            delete getUser.password;

            let userData = {
                id: getUser.id,
                email: getUser.email,
                password: getUser.password,
            }

            var token = jwt.sign({
                data: userData
            }, secretKey);

            getUser.token = token;
            delete getUser.password;

            console.log(getUser, '==========>getUser');

            req.session.admin = getUser;
            req.session.authenticated = true;

            req.flash('flashMessage', { color: 'success', message: 'Logged in Successfully.' });
            res.redirect('/sellerAdmin/dashboard');
        } catch (err) {
            return helper.error(res, err, req);
        }
    },

    logout: async (req, res) => {
        req.session.authenticated = false;
        req.session.admin = {};
        req.flash('flashMessage', { color: 'success', message: 'Logged out Successfully.' });
        res.redirect('/sellerAdmin');
    },
    
}