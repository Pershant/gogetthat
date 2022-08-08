const models = require('../../models');
// const database = require('../../db/db');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const helper = require('../../helpers/helper');
const constants = require('../../config/constants');
const secretKey = constants.jwtSecretKey;
const { Op } = sequelize;

const MODULE_MODEL = "user";
const MODULE_MODEL_FOLDER = "user";

// const roleTypes // configured in config/constants.js file
// const userRoleModels = // configured in config/constants.js file

module.exports = {
  signup: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        // location: req.body.location,
        // latitude: req.body.latitude,
        // longitude: req.body.longitude,
        role: req.body.role || 1, // 1 => user, 3 => vendor
        imageFolders: {
          image: 'user'
        },
        deviceType: req.body.deviceType,
        deviceToken: req.body.deviceToken,
        otp: 1111,
        checkExists: 1, // inside validObject helpers.js
      };

      const nonRequired = {
        image: req.files && req.files.image,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        geoLocation: req.body.geoLocation
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (requestData.role == 0) throw "Invalid role.";

      if (![1, 3].includes(parseInt(requestData.role))) throw "Invalid role.";

      if (requestData.image) {
        requestData['image'] = helper.imageUpload(requestData.image, MODULE_MODEL);
      }

      if (requestData.hasOwnProperty('password') && requestData.password) {
        requestData.password = helper.bcryptHash(requestData.password);
      }

      // let user = await helper.save(models['user'], requestData, true, req);            
      const userId = await helper.save(models[MODULE_MODEL], requestData);

      const user = await module.exports.findOne(userId);
      console.log(user, '=========>user');

      if (user.role == 3) await module.exports.addVendorSignUpDataToOtherTables(user);

      // user.hasOwnProperty(userRoleModels[user.role]) && user[userRoleModels[user.role]] && user[userRoleModels[user.role]].hasOwnProperty('id') && user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      requestData.userId = user.id;

      await helper.save(models[userRoleModels[user.role]], requestData);

      let updatedUser = await module.exports.findOne(userId, user.role);

      let userData = {
        id: updatedUser.id,
        email: updatedUser.email,
      }

      // const unixTimestamp = helper.unixTimestamp();

      let token = jwt.sign({
        data: userData,
        iat: updatedUser.created,
      }, secretKey);
      updatedUser.token = token;

      await helper.save(models['userToken'], {
        userId: updatedUser.id,
        token,
        iat: updatedUser.created,
        deviceToken: requestData.deviceToken,
        deviceType: requestData.deviceType,
      });

      return helper.success(res, `${roleTypes[user.role]} signed up Successfully.`, updatedUser);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  login: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        email: req.body.email,
        password: req.body.password,
      };
      const nonRequired = {
        deviceType: req.body.deviceType,
        deviceToken: req.body.deviceToken
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      let user = await models[MODULE_MODEL].findOne({
        where: {
          email: requestData.email,
          // role: {
          //     [Op.in]: [1, 4]
          // },
        },
        raw: true
      });
      if (!user) {
        throw "Email or Password did not match, Please try again.";
      }     

      if (user.verified == 0) {
        throw "Email verification is pending";
      }
      checkPassword = await helper.comparePass(requestData.password, user.password);
      if (!checkPassword) {
        throw "Email or Password did not match, Please try again.";
      }
      // delete user['password'];


      const getUser = await module.exports.findOne(user.id, user.role);

      const updateUserObj = {
        id: getUser.id,
        deviceToken: requestData.deviceToken,
        deviceType: requestData.deviceType,
      }
      const updatedUser = await helper.save(models[MODULE_MODEL], updateUserObj, true);

      let userData = {
        id: getUser.id,
        email: getUser.email,
      }

      const iat = helper.unixTimestamp();

      let token = jwt.sign({
        data: userData,
        iat,
      }, secretKey);

      // await models.userToken.destroy({
      //     where: {
      //         userId: updatedUser.id,
      //     }
      // });

      models.userToken.destroy({
        where: {
          deviceType: requestData.deviceType,
          deviceToken: requestData.deviceToken,
        },
      });

      const userToken = await helper.save(models.userToken, {
        userId: updatedUser.id,
        token,
        iat,
        deviceToken: requestData.deviceToken,
        deviceType: requestData.deviceType,
      }, true);

      return helper.success(res, 'User logged in successfully.', {
        ...getUser,
        token: userToken.token,
        deviceType: userToken.deviceType,
        deviceToken: userToken.deviceToken,
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  socialLogin: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        name: req.body.name,
        email: req.body.email,
        socialId: req.body.socialId,
        socialType: req.body.socialType, // 1 => facebook, 2 => Gplus
        role: req.body.role || 1,
        imageFolders: {
          image: 'users'
        }
      };
      const nonRequired = {
        socialImage: req.body.socialImage,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.files && req.files.image,
        deviceType: req.body.deviceType,
        deviceToken: req.body.deviceToken
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (requestData.role == 0) throw "Invalid role.";

      if (requestData.image) {
        requestData['image'] = helper.imageUpload(requestData.image, MODULE_MODEL);
      }

      let socialId = 'facebookId';

      if (requestData.socialType == 2) {
        socialId = 'googleId';
      }

      const checkUser = await models[MODULE_MODEL].findOne({
        where: {
          [socialId]: requestData.socialId,
          email: requestData.email
        },
        raw: true
      });

      requestData[socialId] = requestData.socialId;
      if (checkUser) {
        requestData.id = checkUser.id;
      }

      // if (requestData.profileImage) {
      //     requestData['profileImage'] = helper.fileUpload(requestData.profileImage, 'users');
      // }


      const userId = await helper.save(models[MODULE_MODEL], requestData);
      // console.log(requestData, '==========>requestData');
      // return;
      const user = await module.exports.findOne(userId);

      console.log(user, '=========>user');

      user.hasOwnProperty(userRoleModels[user.role]) && user[userRoleModels[user.role]] && user[userRoleModels[user.role]].hasOwnProperty('id') && user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      requestData.userId = user.id;



      await helper.save(models[userRoleModels[user.role]], requestData);

      const updatedUser = await module.exports.findOne(userId);

      let userData = {
        id: updatedUser.id,
        email: updatedUser.email,
      }

      // const unixTimestamp = helper.unixTimestamp();

      let token = jwt.sign({
        data: userData,
        iat: updatedUser.created,
      }, secretKey);
      updatedUser.token = token;

      await helper.save(models['userToken'], {
        userId: updatedUser.id,
        token,
        iat: updatedUser.created,
        deviceToken: requestData.deviceToken,
        deviceType: requestData.deviceType,
      });

      // updatedUser.deviceType = requestData.hasOwnProperty('deviceType') && requestData.deviceType ? parseInt(requestData.deviceType) : getUser.deviceType;
      // updatedUser.deviceToken = requestData.hasOwnProperty('deviceToken') && requestData.deviceToken ? requestData.deviceToken : getUser.deviceToken;

      return helper.success(res, 'User logged in successfully.', updatedUser);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  // socialLogin: async (req, res) => {
  //     try {
  //         const required = {
  //             securitykey: req.headers.securitykey,
  //             name: req.body.name,
  //             email: req.body.email,
  //             socialId: req.body.socialId,
  //             socialType: req.body.socialType, // 1 => facebook, 2 => google
  //             imageFolders: {
  //                 profileImage: 'users'
  //             }
  //         };
  //         const nonRequired = {
  //             image: req.files && req.files.image,
  //             deviceType: req.body.deviceType,
  //             deviceToken: req.body.deviceToken
  //         };

  //         let requestData = await helper.vaildObject(required, nonRequired);
  //         let socialId = 'facebookId';

  //         if (requestData.socialType == 2) {
  //             socialId = 'googleId';
  //         }

  //         const checkUser = await models[MODULE_MODEL].findOne({
  //             where: {
  //                 [socialId]: requestData.socialId,
  //                 email: requestData.email
  //             },
  //             raw: true
  //         });
  //         requestData[socialId] = requestData.socialId;
  //         if (checkUser) {
  //             requestData.id = checkUser.id;
  //         }

  //         if (requestData.profileImage) {
  //             requestData['profileImage'] = helper.fileUpload(requestData.profileImage, 'users');
  //         }

  //         const getUser = await helper.save(models[MODULE_MODEL], requestData, true, req);

  //         let userData = {
  //             id: getUser.id,
  //             email: getUser.email,
  //         }

  //         let token = jwt.sign({
  //             data: userData
  //         }, secretKey);

  //         getUser.token = token;

  //         return helper.success(res, 'User logged in successfully.', getUser);
  //     } catch (err) {
  //         return helper.error(res, err);
  //     }
  // },
  getOtp: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);


      const responseData = {
        id: req.user.id,
        otp: req.user.otp,
        countryCode: req.user.countryCode,
        phone: req.user.phone,
      }

      return helper.success(res, 'OTP fetched successfully.', responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        otp: req.body.otp
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      if (requestData.otp != req.user.otp) throw "Invalid OTP.";

      const updateUserObj = {
        id: req.user.id,
        verified: 1
      }
      let user = await helper.save(models[MODULE_MODEL], updateUserObj, true);

      let html = `Thanks for being with us as a valuable member, your email is verified and you can start using the application.`;

      let emailData = {
        to: user.email,
        subject: `${appName} OTP Verified`,
        html: html
      };

      await helper.sendEmail(emailData);

      return helper.success(res, 'OTP verified successfully.', user);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  resendOtp: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      // requestData.otp = helper.generateOTP();
      requestData.otp = 1111;

      const updateUserObj = {
        id: req.user.id,
        otp: requestData.otp,
        imageFolders: {
          image: 'user'
        }
      }
      let user = await helper.save(models[MODULE_MODEL], updateUserObj, true, req);

      return helper.success(res, 'OTP resent successfully.', user);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  logout: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        deviceType: req.body.deviceType,
        deviceToken: req.body.deviceToken,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      models.userToken.destroy({
        where: {
          deviceType: requestData.deviceType,
          deviceToken: requestData.deviceToken,
        },
      });

      return helper.success(res, 'User logged out successfully.', {});
    } catch (err) {
      return helper.error(res, err);
    }
  },
  checkExists: async (requestData) => {
    let checkUser = await models['user'].findOne({
      where: {
        id: requestData.user.id
      },
      attributes: [
        "email",
        ...(requestData.email ? [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM user as u WHERE u.email='${requestData.email}' && u.id!=${requestData.user.id})`
            ),
            "emailExists"
          ]
        ] : [
          [sequelize.literal("0"), "emailExists"]
        ]),
        ...(requestData.countryCode && requestData.phone ? [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM user as u WHERE ( u.phone='${requestData.phone}' && u.countryCode='${requestData.countryCode}${requestData.phone}' ) && u.id!=${requestData.user.id})`
            ),
            "phoneExists"
          ]
        ] : [
          [sequelize.literal("0"), "phoneExists"]
        ])
      ],
      raw: true
    });

    if (checkUser.emailExists)
      throw "Email already exists, kindly use another.";
    if (!requestData.email) delete requestData["email"];

    if (checkUser.phoneExists)
      throw "Phone already exists, kindly use another.";
  },
  findOne: async (id, role) => {
    let user = await models[MODULE_MODEL].findOne({
      where: {
        id
      },
      attributes: {
        exclude: 'password'
      },
      raw: true,
    });

    if (user) {
      const detail = await models[userRoleModels[user.role]].findOne({
        where: {
          userId: user.id,
        },
        include: [
          ...(
            [4, 5].includes(user.role)
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
            helper.makeImageUrlSql(userRoleModels[user.role], 'image', MODULE_MODEL_FOLDER),
            ...(
              user.role == 3 ? [ 
                helper.makeImageUrlSql(userRoleModels[user.role], 'shopLogo', MODULE_MODEL_FOLDER),
              ] : []
            )
          ],
        },
      }).then(detailData => detailData ? detailData.toJSON() : detailData);

      if (role && (role == 3 || role == 4)) {
        var user__id = user.id 
        // console.log("detail @@@@@@@@@@@@@@@@@@ ================ ",detail)
        if(role == 4){          
          user__id = detail.vendorId; 
        }
        const vendorDeliveryOptions = await models['vendorDeliveryOptions'].findAll({
          where: {
            vendorId: user__id
          },
          order: [
            ['sortOrder', 'ASC']
          ]
        }).map(vendorDeliveryOption => vendorDeliveryOption.toJSON());
        user.vendorDeliveryOptions = vendorDeliveryOptions;

        const vendorDeliveryCharges = await models['vendorDeliveryCharges'].findAll({
          where: {
            vendorId: user__id
          },
          order: [
            ['minDistance', 'ASC']
          ]
        }).map(deliveryCharge => deliveryCharge.toJSON());
        user.vendorDeliveryCharges = vendorDeliveryCharges;
      }

      if (detail) {
        delete detail.id;
        var detailData = {};
        if(role==3){
          detailData.vendorDetail = detail
        }else{
          detailData = detail
        }
        user = {
          ...user,
          ...detailData,
        }
      }
    }
    return user;
  },
  addVendorSignUpDataToOtherTables: async (user) => {
    const days = {
      1: 'sun',
      2: 'mon',
      3: 'tue',
      4: 'wed',
      5: 'thu',
      6: 'fri',
      7: 'sat'
    }

    let vendorDeliveryOptionsArray = [];
    for (let i = 1; i <= 7; i++) {
      const vendorDeliveryOption = {
        vendorId: user.id,
        sortOrder: i,
        day: days[i],
      };
      vendorDeliveryOptionsArray.push(vendorDeliveryOption)
      // console.log(vendorDeliveryOption, `=========================>vendorDeliveryOption${i}`)
    }
    // console.log(vendorDeliveryOptionsArray, '=============================>vendorDeliveryOptionsArray');
    await models['vendorDeliveryOptions'].bulkCreate(vendorDeliveryOptionsArray);

    let vendorDeliveryChargesArray = [];
    for (let i = 0; i < 50; i += 5) {
      const vendorDeliveryCharge = {
        vendorId: user.id,
        minDistance: i,
        maxDistance: i + 5,
      };
      vendorDeliveryChargesArray.push(vendorDeliveryCharge)
      // console.log(vendorDeliveryOption, `=========================>vendorDeliveryOption${i}`)
    }
    // console.log(vendorDeliveryOptionsArray, '=============================>vendorDeliveryOptionsArray');
    await models['vendorDeliveryCharges'].bulkCreate(vendorDeliveryChargesArray);
  }
}