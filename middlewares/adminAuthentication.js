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
        '/selleradmin/sellerSignUpForm'
    ];

    if (ignoreRoutes.includes(req.url)) return next();

    if (DEBUG_MODE) {
        return debugModeEnable(req, res, next);
    }

    if (![0].includes(req.session.authenticated && req.session.admin.role)) {
        req.session.authenticated = false;
    }
    

    if (req.session.authenticated == true) {

        const admin = await User.findOne({
            where: {
                id: req.session.admin.id,
                role: {
                    [Op.in]: [0]
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
                }
            ],
            raw: true,
            nest: true
        });
        req.session.admin = admin;
        global.adminData = admin;
        log(global.adminData, 'log inside admin Authentication middleware');
        // return;

        if (WRITE_DEBUG_JSON_FILE) {
            fs.writeFileSync(__dirname + '/../debugMode/admin.json', JSON.stringify(adminData, null, 2));
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
    // log('here', 'here');
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
    return fs.readFileSync(__dirname + '/../debugMode/admin.json');
}