const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const helper = require('../helpers/helper');
const models = require('../models');

// Setup options for JWT Strategy
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = jwtSecretKey;

const MODULE_MODEL_FOLDER = 'user';

// Create JWT Strategy
passport.use('user', new JwtStrategy(jwtOptions,
    async function (payload, done) {
        try {
            let existingUser = await models.user.findOne({
                where: {
                    id: payload.data.id,
                    email: payload.data.email
                },
                raw: true,
            });

            if (!existingUser) return done(null, false);

            const userToken = await models.userToken.findOne({
                where: {
                    userId: existingUser.id,
                    iat: payload.iat,
                },
            });

            if (userToken) {
                // if ([4, 5].includes(existingUser.role)) {
                //     existingUser.venodr = await models.user.findOne({
                //         where: {}
                //     })
                // }

            
                const detail = await models[userRoleModels[existingUser.role]].findOne({
                    where: {
                        userId: existingUser.id,
                    },
                    include: [
                        ...(
                            [4, 5].includes(existingUser.role)
                                ? [
                                    {
                                        model: models.vendorDetail,
                                        attributes: {
                                            include: [
                                                ['id', 'detailId'],
                                                ['userId', 'id'],
                                                helper.makeImageUrlSql('vendorDetail', 'image', MODULE_MODEL_FOLDER),
                                                helper.makeImageUrlSql('vendorDetail', 'shopLogo', MODULE_MODEL_FOLDER),
                                            ]
                                        }
                                    }
                                ] : []
                        ),
                    ],
                    attributes: {
                        include: [
                            // [sequelize.literal(`(IF (\`${userRoleModels[user.role]}\`.\`image\`='', '', CONCAT('${baseUrl}/uploads/user/', \`${userRoleModels[user.role]}\`.\`image\`)) )`), 'image'],
                            helper.makeImageUrlSql(userRoleModels[existingUser.role], 'image', MODULE_MODEL_FOLDER),
                            ...(
                                existingUser.role == 3 ? [
                                    helper.makeImageUrlSql(userRoleModels[existingUser.role], 'shopLogo', MODULE_MODEL_FOLDER),
                                ] : []
                            )
                        ],
                    },
                }).then(detailData => detailData ? detailData.toJSON() : detailData);

                if (existingUser.role == 3) {
                    const vendorDeliveryOptions = await models['vendorDeliveryOptions'].findAll({
                        where: {
                            vendorId: existingUser.id
                        },
                        order: [
                            ['sortOrder', 'ASC']
                        ]
                    }).map(vendorDeliveryOption => vendorDeliveryOption.toJSON());
                    existingUser.vendorDeliveryOptions = vendorDeliveryOptions;

                    const vendorDeliveryCharges = await models['vendorDeliveryCharges'].findAll({
                        where: {
                            vendorId: existingUser.id
                        },
                        order: [
                            ['minDistance', 'ASC']
                        ]
                    }).map(deliveryCharge => deliveryCharge.toJSON());
                    existingUser.vendorDeliveryCharges = vendorDeliveryCharges;
                }

                // console.log(detail, '========>detail123');
                
                if (detail) {
                    delete detail.id;
                    existingUser = {
                        ...existingUser,
                        ...detail,
                    }
                }

                console.log(existingUser, '===============>loggedInUser');
                return done(null, existingUser);
            }

            return done(null, false);
        } catch (e) {
            console.log('not local');
            console.log(e);
            // return done(e, false);
        }
    }
));

module.exports = {
    initialize: function () {
        return passport.initialize();
    },
    authenticateUser: function (req, res, next) {
        return passport.authenticate("user", {
            session: false
        }, (err, user, info) => {
            // console.log(err, '=======================>passport err');
            // console.log(info, '=======================>passport info');
            // console.log(info && info['name'], '=======================>passport info[name]');
            // console.log(user, '=======================>passport err user');

            if (err) {
                return helper.error(res, err);
            }
            if (info && info.hasOwnProperty('name') && info.name == 'JsonWebTokenError') {
                return helper.error(res, {
                    message: 'Invalid Token.'
                });
            } else if (user == false) {
                return helper.error(res, {
                    message: 'Authorization is required.'
                });
            }
            // Forward user information to the next middleware
            req.user = user;
            next();
        })(req, res, next);
    },
};


