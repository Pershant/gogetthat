const models = require("../../models");
const database = require("../../db/db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/helper");
const secretKey = jwtSecretKey; // configured inside config/constants.js

const authController = require('./authController');
const productController = require('./productController');
const { request } = require("express");

const model = 'user';


module.exports = {
    homeListing: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                range: req.body.range || 100
            };
            const nonRequired = {

            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let products = [];
            const vendorIdProductsObject = {};

            const productData = await productController.findAll(req, res, {
                vendorId: {
                    [Op.ne]: 0,
                }
            }).then(products => {
                products.forEach(product => {
                    if (vendorIdProductsObject.hasOwnProperty(product.vendorId)) {
                        vendorIdProductsObject[product.vendorId].push(product);
                    } else {
                        vendorIdProductsObject[product.vendorId] = [
                            product
                        ]
                    }
                });;
            });

            const vendors = await models.user.findAll({
                where: {
                    status: 1
                },
                attributes: [
                    ...(
                        requestData.latitude && requestData.longitude ? [
                            [
                                sequelize.literal(
                                    `round( 
                                ( 3959 * acos( least(1.0,  
                                  cos( radians(${requestData.latitude}) ) 
                                  * cos( radians(vendorDetail.latitude) ) 
                                  * cos( radians(vendorDetail.longitude) - radians(${requestData.longitude}) ) 
                                  + sin( radians(${requestData.latitude}) ) 
                                  * sin( radians(vendorDetail.latitude) 
                                ) ) ) 
                              ), 1)`
                                ),
                                "distance",
                            ],
                        ] : [
                            [sequelize.literal(`0`), "distance"]
                        ]
                    ), [sequelize.literal(`CONVERT(SUBSTRING_INDEX(
                          IFNULL(( SELECT MIN(p.minimumSellingPrice) FROM product AS p WHERE p.vendorId=user.id ), 0)
                      ,'-',-1),UNSIGNED INTEGER)`), 'productPriceLowest'],
                    [sequelize.literal(`CONVERT(SUBSTRING_INDEX(
                          IFNULL(( SELECT MAX(p.minimumSellingPrice) FROM product AS p WHERE p.vendorId=user.id ), 0)
                      ,'-',-1),UNSIGNED INTEGER)`), 'productPriceHighest'],
                ],
                include: [{
                    model: models.vendorDetail,
                    required: true,
                    attributes: {
                        include: [
                            [sequelize.literal(`(IF (vendorDetail.image='', '', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image']
                        ]
                    },
                }, ],
                having: {
                    ...(
                        (requestData.latitude && requestData.longitude) ? {
                            distance: {
                                //[Op.lt]: requestData.range,
                                [Op.lt]: 50,
                            },
                        } : {}
                    ),
                    // [Op.and]: [
                    //     sequelize.literal(`productPriceLowest!=0 && productPriceHighest!=0`),
                    // ]
                },
                order: [
                    ...(
                        requestData.latitude && requestData.longitude ? [
                            [sequelize.col("distance"), "ASC"]
                        ] : []
                    ),
                ],
            }).map(vendor => {
                vendor = vendor.toJSON();

                if (vendorIdProductsObject.hasOwnProperty(String(vendor.vendorDetail.userId))) {

                    const vendorProducts = vendorIdProductsObject[vendor.vendorDetail.userId].map(product => ({
                        distance: vendor.distance,
                        ...product
                    }));

                    products = [
                        ...products,
                        ...vendorProducts
                    ]
                }

                return {
                    id: vendor.id,
                    productPriceLowest: vendor.productPriceLowest,
                    productPriceHighest: vendor.productPriceHighest,
                    distance: vendor.distance,
                    email: vendor.email,
                    ...vendor.vendorDetail,
                    id: vendor.id,
                    vendorDetailId: vendor.vendorDetail.id,
                }
            });

            const banners = await models.banner.findAll({
                where: {
                    status: 1,
                },
                attributes: {
                    include: [
                        helper.makeImageUrlSql('banner', 'image', 'banner')
                    ]
                }
            }).map(banner => banner.toJSON());

            const categories = await models.shopCategory.findAll({
                where: {
                    status: 1
                },
                attributes: {
                    include: [
                        helper.makeImageUrlSql('shopCategory', 'image', 'category')
                    ]
                }
            }).map(categories => categories.toJSON());

            const responseData = {
                vendors,
                products,
                banners,
                categories,
            }

            return helper.success(res, `Home listing fetched successfully.`, responseData);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    getOtherUserProfile: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                id: req.body.id,
            };

            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const getUser = await authController.findOne(requestData.id);

            if (!getUser) throw "invalid id.";

            return helper.success(res, "User profile fetched successfully.", getUser);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    getProfile: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey
            };

            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const getUser = await authController.findOne(req.user.id, req.user.role);

            return helper.success(res, "User profile fetched successfully.", getUser);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    editProfile: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
                req,
            };

            const nonRequired = {
                name: req.body.name,
                email: req.body.email,
                countryCode: req.body.countryCode,
                phone: req.body.phone,
                shopName: req.body.shopName,
                shopCategory: req.body.shopCategory,
                abn: req.body.abn,
                buildingNumber: req.body.buildingNumber,
                streetNumber: req.body.streetNumber,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                postalCode: req.body.postalCode,
                shopOpenTime: req.body.shopOpenTime,
                shopCloseTime: req.body.shopCloseTime,
                homeDelivery: req.body.homeDelivery,
                deliveriesPerDay: req.body.deliveriesPerDay,
                image: req.files && req.files.image,
                shopLogo: req.files && req.files.shopLogo,
                vendorDeliveryOptions: req.body.vendorDeliveryOptions ? req.body.vendorDeliveryOptions : '',
                imageFolders: {
                    image: "users"
                },
                ...req.body
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            await authController.checkExists(requestData);

            if (requestData.image) {
                requestData['image'] = await helper.imageUpload(requestData.image, 'user');
            }
            if (requestData.shopLogo) {
                requestData['shopLogo'] = await helper.imageUpload(requestData.shopLogo, 'user');
            }

            requestData.id = req.user.id;
            const userId = await helper.save(models[model], requestData);
            const user = await authController.findOne(userId);
            console.log(user, '=================================================>user');

            // user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
            // requestData.userId = user.id;

            const checkUserModel = await models[userRoleModels[user.role]].findOne({
                where: {
                    userId: requestData.user.id,
                },
                raw: true,
            })

            if (checkUserModel) requestData.id = checkUserModel.id;

            if (user.role == 3) {
                if (requestData.hasOwnProperty('shopName') && String(requestData.shopName)) requestData.isShopAdded = 1;
                if (requestData.hasOwnProperty('homeDelivery') && String(requestData.homeDelivery)) requestData.isHomeDeliveryAdded = 1;
                if (requestData.hasOwnProperty('deliveriesPerDay') && String(requestData.deliveriesPerDay)) requestData.isDeliveryDaysAdded = 1;
            }

            await helper.save(models[userRoleModels[user.role]], requestData);
            const checkUser = await authController.findOne(userId);

            let userData = {
                id: req.user.id,
                email: requestData.email ? requestData.email : checkUser.email
            };

            const iat = helper.unixTimestamp();

            // const updatedUser = await authController.findOne(userId);
            const updatedUser = await authController.findOne(userId, checkUser.role);

            await models.userToken.destroy({
                where: {
                    userId: updatedUser.id,
                }
            });

            const token = jwt.sign({
                data: userData,
                iat,
            }, secretKey);

            const userTokenId = await models.userToken.findOne({
                where: {
                    userId: requestData.user.id,
                    deviceType: requestData.deviceType,
                    deviceToken: requestData.deviceToken,
                },
                raw: true,
            });

            const userToken = await helper.save(models.userToken, {
                ...(
                    userTokenId ? {
                        id: userTokenId.id
                    } : {}
                ),
                userId: updatedUser.id,
                token,
                iat,
                deviceToken: requestData.deviceToken,
                deviceType: requestData.deviceType,
            }, true);

            //Delete Old Values vendorDeliveryOptions//

            let deleteold = await models['vendorDeliveryOptions'].destroy({
                where: {
                    vendorId: req.user.id
                }
            });

            if (!helper.isJson(requestData.vendorDeliveryOptions)) {

                throw "Invalid JSON format in param hoursOfOperation.";

            } else {
                requestData.vendorDeliveryOptions = JSON.parse(requestData.vendorDeliveryOptions);
                if (!(Array.isArray(requestData.vendorDeliveryOptions) && requestData.vendorDeliveryOptions.length > 0)) throw "Invalid JSON format in param vendorDeliveryOptions.";
            }

            const vendorDeliveryOptions = requestData.vendorDeliveryOptions.map(data => {
                return {
                    ...data,
                    vendorId: req.user.id
                }
            });

            await models['vendorDeliveryOptions'].bulkCreate(vendorDeliveryOptions);


            //Updating vendor delievery Charges..


            //Delete Old Values vendorDeliveryOptions//

            let deleteold1 = await models['vendorDeliveryCharges'].destroy({
                where: {
                    vendorId: req.user.id
                }
            });

            if (!helper.isJson(requestData.vendorDeliveryCharges)) {

                throw "Invalid JSON format in param hoursOfOperation.";

            } else {
                requestData.vendorDeliveryCharges = JSON.parse(requestData.vendorDeliveryCharges);
                if (!(Array.isArray(requestData.vendorDeliveryCharges) && requestData.vendorDeliveryCharges.length > 0)) throw "Invalid JSON format in param vendorDeliveryCharges.";
            }

            const vendorDeliveryCharges = requestData.vendorDeliveryCharges.map(data => {
                return {
                    ...data,
                    vendorId: req.user.id
                }
            });

            await models['vendorDeliveryCharges'].bulkCreate(vendorDeliveryCharges);


            return helper.success(res, "User profile updated successfully.", {
                ...updatedUser,
                token,
            });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateUser: async(requestData) => {
        const userId = await helper.save(models[model], requestData);
        const user = await authController.findOne(userId);

        const checkUserModel = await models[userRoleModels[user.role]].findOne({
            where: {
                userId: userId,
            },
            raw: true,
        })

        if (checkUserModel) requestData.id = checkUserModel.id;

        await helper.save(models[userRoleModels[user.role]], requestData);

        const updatedUser = await authController.findOne(userId);

        return updatedUser;
    },
    changePassword: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                oldPassword: req.body.oldPassword,
                newPassword: req.body.newPassword
            };

            const nonRequired = {
                imageFolders: {
                    image: "users"
                }
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            checkPassword = await helper.comparePass(
                requestData.oldPassword,
                req.user.password
            );
            if (!checkPassword) {
                throw "Old password did not match.";
            }

            requestData.password = helper.bcryptHash(requestData.newPassword);
            requestData.id = req.user.id;

            let userId = await helper.save(models['user'], requestData);

            const user = await authController.findOne(userId);

            return helper.success(res, "User password changed successfully.", user);
        } catch (err) {
            return helper.error(res, err);
        }
    },

    checkPhoneBook: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                numbers: req.body.numbers // comma seperated numbers
            };

            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            requestData.numbers = requestData.numbers.split(",");

            let users = await models['user'].findAll({
                where: {
                    role: 1,
                    otpVerified: 1,
                    [Op.or]: [{
                            phone: {
                                [Op.in]: requestData.numbers
                            }
                        },
                        {
                            countryCodePhone: {
                                [Op.in]: requestData.numbers
                            }
                        }
                    ]
                },
                attributes: {
                    include: [
                        sequelize.literal(
                            `IF (image='', '', CONCAT("${req.protocol}://${req.get(
                "host"
              )}/uploads/users/", image)) as image`
                        )
                    ],
                    exclude: ["password"]
                },
                order: [
                    ["id", "DESC"]
                ],
                raw: true
            });

            return helper.success(res, "Uses searched successfully.", users);
        } catch (err) {
            return helper.error(res, err, []);
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                email: req.body.email
            };

            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            let existingUser = await models['user'].findOne({
                where: {
                    email: requestData.email
                },
                raw: true
            });
            if (!existingUser) throw 'Email does not exist.';
            existingUser.forgotPasswordHash = helper.createSHA1();


            let html = `Click here to change your password <a href="${req.protocol}://${req.get('host')}/api/forgot_url/${existingUser.forgotPasswordHash}"> Click</a>`;

            let emailData = {
                to: requestData.email,
                subject: `${appName} Forgot Password`,
                html: html
            };

            await helper.sendEmail(emailData);

            const user = await helper.save(models['user'], existingUser, true);

            return helper.success(res, 'Forgot Password email sent successfully.', {});
        } catch (err) {
            return helper.error(res, err);
        }
    },
    forgotUrl: async(req, res) => {
        try {
            let user = await models['user'].findOne({
                where: {
                    forgotPasswordHash: req.params.hash
                }
            });

            if (user) {
                res.render("admin/reset_password", {
                    title: appName,
                    response: user,
                    //   message: req.flash('message'),
                    hash: req.params.hash
                });
            } else {
                const html = `
            <br/>
            <br/>
            <br/>
            <div style="font-size: 50px;" >
                <b><center>Link has been expired!</center><p>
            </div>
          `;
                res.status(403).send(html);
            }
        } catch (err) {
            throw err;
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password, forgotPasswordHash } = {...req.body };

            const user = await models['user'].findOne({
                where: {
                    forgotPasswordHash
                },
                raw: true
            });
            if (!user) throw "Something went wrong.";

            const updateObj = {};
            updateObj.password = await helper.bcryptHash(password);
            updateObj.forgotPasswordHash = '';
            updateObj.id = user.id;

            const updatedUser = await helper.save(models['user'], updateObj);

            if (updatedUser) {
                return helper.success(res, 'Password updated successfully.', {});
                // res.render("admin/success_page", {
                //     title: appName,
                //     message: "Password Change successfull"
                // });
            } else {
                throw "Invalid User.";
            }

        } catch (err) {
            return helper.error(res, err);
            // if (typeof err  === 'string') {                
            //     res.render("admin/success_page", {
            //         message: err
            //     });
            // } else {
            //     console.log(err);
            // }
        }
    },
};