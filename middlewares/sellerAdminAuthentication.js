const fs = require('fs');
const sequelize = require('sequelize');
const { Op } = sequelize;
const models = require('../models');
const helper = require('../helpers/helper');

const User = models.user;
const AdminDetail = models.adminDetail;

module.exports = async (req, res, next) => {
    const ignoreRoutes = [
        '/',
        '/login',
        '/loginSubmit',
        '/changeField',
        '/delete',
        '/updateStatus',
        '/category/categoryBasedChildCategories',
        '/sellerSignUpForm',
        '/sellerSignup'
    ];

    if (ignoreRoutes.includes(req.url)) return next();

    if (DEBUG_MODE) {
        return debugModeEnable(req, res, next);
    }

    if (![3, 4, 5].includes(req.session.authenticated && req.session.admin.role)) {
        req.session.authenticated = false;
    }

    if (req.session.authenticated == true) {
        let staffLogin = req.session.admin.staffLogin;
        
        console.log(staffLogin, '===========>staffLogin');
        if (staffLogin) {
            staffLogin = await User.findOne({
                where: {
                    id: staffLogin.id,
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
                    },
                ],
                // raw: true,
                // nest: true
            });
            staffLogin = staffLogin.toJSON();
        }
        
        const admin = await User.findOne({
            where: {
                id: req.session.admin.id,
                role: {
                    [Op.in]: [3]
                },
            },
            include: [
                {
                    model: AdminDetail,
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (adminDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', adminDetail.image)) )`), 'image']
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
                    model: models['vendorDeliveryOptions'],
                    required: false,
                    separate: true,
                    order: [['sortOrder', 'ASC']],
                },
                {
                    model: models['vendorDeliveryCharges'],
                    required: false,
                    separate: true,
                    order: [['minDistance', 'ASC']]
                },
            ],
            // raw: true,
            // nest: true
        // });
        }).then(data => !data ? data : data.toJSON());

        if (!admin) throw "Admin not found.!";


        admin.shopCategories = await models.vendorShopCategory.findAll({
            where: {
                vendorId: admin.id,
            },
            raw: true,
        });

        admin.vendorBannerImages = await models.vendorBannerImages.findAll({
            where: {
                vendorId: admin.id,
            },
            attributes: {
                include: [
                    helper.makeImageUrlSql('vendorBannerImages', 'image', 'vendorBannerImages', undefined, PLACEHOLDER_IMAGE),
                ]
            },
            raw: true,
        });
        
        
        admin.staffLogin = staffLogin;
        req.session.admin = admin;
        global.adminData = admin;
        log(global.adminData, 'log inside seller Authentication middleware');
        
        if (WRITE_DEBUG_JSON_FILE) {
            fs.writeFileSync(__dirname + '/../debugMode/sellerAdmin.json', JSON.stringify(adminData, null, 2));
        }

        return next();
    } else {
        req.flash('flashMessage', { color: 'error', message: 'Please login first.' });
        const originalUrl = req.originalUrl.split('/')[1];
        return res.redirect(`/${originalUrl}`);
    }
}

function debugModeEnable(req, res, next) {
    const admin = JSON.parse(getAdminData());
    // log(admin, 'admin');
    // return;
    req.session.admin = admin;
    global.adminData = admin;
    
    // console.log('=>here');
    // console.log(admin, 'adminData=>here');
    // return;

    return next();
}
function getAdminData() {
    return fs.readFileSync(__dirname + '/../debugMode/sellerAdmin.json');
}