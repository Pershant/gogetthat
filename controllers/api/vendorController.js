const db = require("../../models");



const models = require("../../models");
const database = require("../../db/db");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const jwt = require("jsonwebtoken");
const helper = require("../../helpers/helper");
const secretKey = jwtSecretKey; // configured inside config/constants.js
const jsonData = require('../../config/jsonData');

// const authController = require('./authController');
const productController = require('./productController');
const moment = require("moment");
const orderItem = models.orderItem
const product = models.product
const order = db.order
const userToken = models.userToken
const model = 'user';
var stripe = require('stripe')('sk_test_51He7MuF5sxjijFYsTxH8mnYEqHiv0XHAohUDuUtkGYbqYBEXaqwqIhO5CdB6k3BtwgRxeQtYNmbqVDZW1Gz1IQzD005eLXmSqY');

orderItem.belongsTo(
  product, {
  foreignKey: 'productId'
});
models.vendorShopCategory.belongsTo(
  models.user, {
  foreignKey: 'vendorId'
});

// const roleTypes = {
//   0: 'Admin',
//   1: 'User',
//   2: 'Driver',
//   3: 'Vendor',
//   4: 'Review Admin',
// }

// const userRoleModels = {
//   0: 'adminDetail',
//   1: 'userDetail',
//   2: 'driverDetail',
//   3: 'vendorDetail',
//   4: 'adminDetail',
// }

// 0: 'Pending',
// 1: 'Accepted',
// 2: 'Packed',
// 3: 'Shipped',
// 4: 'Delivered',
// 5: 'Cancelled',
// 6: 'Declined',

module.exports = {

  isSelfpickupOrders: async (req, res) => {
    try {
      const required = {
        isSelfpickup: req.body.isSelfpickup,
        orderStatus: req.body.orderStatus
      };

      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);
      var criteria = {
        orderStatus: requestData.orderStatus,
        vendorId: req.user.id,
        isSelfpickup: requestData.isSelfpickup
      }
      if (req.user.role != 3) {
        criteria = 
        {
          orderStatus: requestData.orderStatus,
          employeeId: req.user.id,
          isSelfpickup: requestData.isSelfpickup
        }
      }
      const findorders = await models['order'].findAll({
        attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', 'orderStatus', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
          [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
          [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
          [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
          [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress'],
        ],
        where: criteria
      })

      return helper.success(res, `Orders list.`, findorders);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  shippedOrder: async (req, res) => {
    try {
      const required = {
        id: req.body.id
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      var check = await models['order'].update({
        orderStatus: 3,

      }, {
        where: {
          id: requestData.id
        }
      })
      
      helper.sendOrderPushNotification(models['order'], "shipped", requestData.id)
      var response = {}
      return helper.success(res, `Product status updated successfully `, response);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  acceptorder: async (req, res) => {
    try {
      const required = {
        id: req.body.id
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      var check = await models['order'].update({
        orderStatus: 1,
      }, {
        where: {
          id: requestData.id
        }
      })
      helper.sendOrderPushNotification(models['order'], "accept", requestData.id)
      var response = {}
      return helper.success(res, `Product status updated successfully `, response);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  pastorders: async (req, res) => {

    try {
      const required = {

      };
      const nonRequired = {
        isSelfpickup: req.body.isSelfpickup
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      const findorders = await models['order'].findAll({
        attributes: ['orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', 'orderStatus', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
          [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
          [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
          [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
          [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress'],
        ],
        where: {
          orderStatus: 4,
          vendorId: req.user.id,
        }
      })

      return helper.success(res, `Orders list.`, findorders);


    } catch (err) {
      return helper.error(res, err);
    }
  },
  completeOrder: async (req, res) => {
    try {

      const required = {
        id: req.body.id
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      var check = await models['order'].update({
        orderStatus: 4,

      }, {
        where: {
          id: requestData.id
        }
      })
      var response = {}
      return helper.success(res, `Product status updated sucessfully `, response);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  getProductlist: async (req, res) => {
    try {
      const required = {

      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);

      var criteria = {
        vendorId: req.user.id
      }
      if (req.user.role != 3) {
        criteria = {
          vendorEmployeeId: req.user.id
        }
      }


      var check = await models['product'].findAll({
        attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`,`vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `mrp`, `percentageDiscount`, `length`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, helper.makeImageUrlSql('product', 'image', 'product')],
        where: criteria,
      })

      return helper.success(res, `Get product data sucessfully`, check);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  buySubscription: async (req, res) => {
    try {
      const required = {
        cvv: req.body.cvv,
        subscriptionid: req.body.subscriptionid
      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired);
      const find_subscription = await models['subscription'].findOne({
        where: {
          id: requestData.subscriptionid,
        },
        raw: true
      });

      const find_card = await models['card'].findOne({
        where: {
          userId: req.user.id,
          isDefault: 1
        },
        raw: true
      });

      await stripe.tokens.create({
        card: {
          number: find_card.cardNumber,
          exp_month: find_card.month,
          exp_year: find_card.year,
          cvc: find_card.cvv,
        },
      },
        async function (err, token) {
          console.log(token, '-----------------------TOKEN')
          // return
          if (err) {
            // console.log(err);
            return helper.error(res, err, req);
          } else {
            await stripe.customers.create({
              source: token.id,
              email: req.user.email,
              name: req.user.username
            }, async function (err, customer) {
              if (err) {
                return helper.error(res, err, req);

              } else {
                await stripe.charges.create({
                  amount: find_subscription.amount,
                  currency: 'GBP',
                  customer: customer.id,
                  description: 'Booking Payment',
                  // transfer_data: {
                  //     amount: transfer_data_amount,
                  //     destination: userAccountId
                  // }
                }, async function (err, charge) {
                  // console.log(charge)
                  if (err) {
                    jsonData.wrong_status(res, err.message)
                    return;
                  } else {
                    if (charge.status == "succeeded") {
                      await models['userSubscriptions'].create({
                        userId: req.user.id,
                        subscriptionId: requestData.subscriptionid,
                        amount: find_subscription.amount,
                        type: find_subscription.type,
                        item: find_subscription.item,
                        employes: find_subscription.employes

                      })
                      //findorder-------------------------------

                      return helper.success(res, `Payments done`, charge.status);
                    }
                  }
                });
              }
            })
          }

        }
      );

    } catch (err) {
      return helper.error(res, err);
    }
  },
  getProductbarcode: async (req, res) => {
    try {
      const required = {
        barcode: req.body.barcode
      };
      const nonRequired = {

      };
      let requestData = await helper.vaildObject(required, nonRequired);
      var check = await models['product'].findOne({
        attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `mrp`, `percentageDiscount`, `length`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, helper.makeImageUrlSql('product', 'image', 'product'), helper.makeImageUrlSql('product', 'barcodeImage', 'product')],
        where: {
          barcode: requestData.barcode
        }
      })
      if (check) {

        return helper.success(res, `Get product data sucessfully`, check);

      } else {
        var response = {

        }
        return helper.success(res, `No product is availabe for this barcode`, response);

      }
    } catch (err) {
      return helper.error(res, err);
    }
  },
  checkBarcode: async (req, res) => {
    try {

      const required = {
        barcode: req.body.barcode
      };

      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);
      const check = await models['product'].findOne({
        where: {
          barcode: requestData.barcode
        }
      })
      var response = {}
      if (check) {
        return helper.success(res, `This barcode is available`, response);
      } else {
        return helper.success(res, `This barcode is notavailable`, response);
      }

    } catch (err) {
      return helper.error(res, err);
    }
  },
  salesDetails: async (req, res) => {
    try {
      const required = {
        year: req.body.year
      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired);
      let monthArray = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
      let finalArray = [];
      await Promise.all(monthArray.map(async data => {
        var count = await database.query(`SELECT IFNULL(SUM(netAmount),0) as totalcount FROM ongoapp.order WHERE MONTH(FROM_UNIXTIME(created)) = ${data} AND YEAR(FROM_UNIXTIME(created)) = ${requestData.year}`);

        finalArray.push({
          month: data,
          count: count[0][0].totalcount
        });
      }));

      return helper.success(res, `Get monthly details sucessfully`, finalArray);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  notification: async (req, res) => {

    try {
      const required = {};
      const nonRequired = {};


      let requestData = await helper.vaildObject(required, nonRequired);


      const findnotification = await models['notification'].findAll({
        attributes: ['id', 'message', 'orderid', 'createdAt', [sequelize.literal('(SELECT username FROM user WHERE id = notification.userId)'), 'userby'],
          [sequelize.literal('(SELECT username FROM user WHERE id = notification.user2Id)'), 'userto'],
        ],
        where: {
          user2Id: req.user.id
        }
      })

      return helper.success(res, `Get notifications list sucessfully`, findnotification);

    } catch (err) {
      return helper.error(res, err);
    }

  },
  finishPacking: async (req, res) => {
    try {

      const required = {
        id: req.body.id
      };
      const nonRequired = {};


      let requestData = await helper.vaildObject(required, nonRequired);


      const updatestatus = await models['order'].update({
        orderStatus: 2
      }, {
        where: {
          id: requestData.id
        }
      })

      helper.sendOrderPushNotification(models['order'], "packed", requestData.id)
      var response = {}
      return helper.success(res, `Order status change sucessfully`, response);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  ordersItems: async (req, res) => {
    try {
      const required = {
        id: req.body.id
      };
      const nonRequired = {};


      let requestData = await helper.vaildObject(required, nonRequired);


      const findorders = await models['orderItem'].findAll({
        include: [{
          model: product,
          attributes: ['name', 'weight', 'description', 'weightUnit', [sequelize.literal(`(IF (product.image='', '', CONCAT('${baseUrl}/uploads/product/', product.image)) )`), 'image']],

        }],
        where: {
          orderId: requestData.id
        }
      })

      return helper.success(res, `Orders Items`, findorders);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  ordersList: async (req, res) => {
    try {
      const required = {
        status: req.body.status
      };
      const nonRequired = {
        isSelfpickup: req.body.isSelfpickup
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (![3,4,5].includes(req.user.role)) {
        throw "Invalid Authorization Role";
      }
      
      let current_time = Math.round(new Date().getTime() / 1000)

      console.log(req.user, '==========>req.user');
      // return
      const vendorId = req.user.role == 3 ? req.user.id : req.user.vendorId;

      if (!requestData.isSelfpickup) {
        console.log('hi i am in if')
        const future_dates = await models['order'].findAll({
          attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
            [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
            [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
            [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
            [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress'],


          ],
          where: {
            orderStatus: requestData.status,
            // vendorId: req.user.id,
            vendorId,
            created: {
              [Op.gte]: current_time
            }
          },
          order: [['id', 'DESC']]
        })

        const pastdates = await models['order'].findAll({
          attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
            [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
            [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
            [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
            [sequelize.literal(`IFNULL((SELECT address FROM userAddress WHERE userId = order.customerId), '')`), 'userAddress'],
          ],
          where: {
            orderStatus: requestData.status,
            vendorId,
            created: {
              [Op.lte]: current_time
            }
          },
          order: [['id', 'DESC']]
        })
        var findorders = {
          pastdates: pastdates,
          future_dates: future_dates,
        }
        return helper.success(res, `Orders list.`, findorders);

      } else {

        console.log('hi i am in else')

        const future_dates = await models['order'].findAll({
          attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
            [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
            [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
            [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
            [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress']
          ],
          where: {
            orderStatus: requestData.status,
            vendorId,
            isSelfpickup: requestData.isSelfpickup,
            created: {
              [Op.gte]: current_time
            }
          },
          order: [['id', 'DESC']]
        })

        const pastdates = await models['order'].findAll({
          attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
            [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
            [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
            [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
            [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress']
          ],
          where: {
            isSelfpickup: requestData.isSelfpickup,
            orderStatus: requestData.status,
            vendorId,
            created: {
              [Op.lte]: current_time
            }
          },
          order: [['id', 'DESC']]
        })
        var findorders = {
          pastdates: pastdates,
          future_dates: future_dates,
        }
        return helper.success(res, `Orders list.`, findorders);
      }

    } catch (err) {
      return helper.error(res, err);
    }
  },
  getordersList: async (req, res) => {
    try {
      const required = {
        status: req.body.status
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);
      let current_time = Math.round(new Date().getTime() / 1000)

      const future_dates = await models['order'].findAll({
        attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
          [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
          [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
          [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
          [sequelize.literal('(SELECT address FROM userAddress WHERE userId = order.customerId)'), 'userAddress'],


        ],
        where: {
          orderStatus: requestData.status,
          employeeId: req.user.id,
          // created: {
          //     [Op.gte]: current_time
          // }
        }
      })

      // const pastdates = await models['order'].findAll({
      //     attributes: ['id', 'orderNo', 'createdAt', 'deliverySlot', 'isSelfpickup', [sequelize.literal('(SELECT username FROM user WHERE id = order.customerId)'), 'username'],
      //         [sequelize.literal('(SELECT email FROM user WHERE id = order.customerId)'), 'email'],
      //         [sequelize.literal('(SELECT phone FROM user WHERE id = order.customerId)'), 'phone'],
      //         [sequelize.literal(`IFNULL((SELECT ${helper.makeImageUrlSqlForSubQuery('image', 'user')} FROM userDetail WHERE userId = order.customerId), '')`), 'image'],
      //         [sequelize.literal(`IFNULL((SELECT address FROM userAddress WHERE userId = order.customerId), '')`), 'userAddress'],
      //     ],
      //     where: {
      //         orderStatus: requestData.status,
      //         vendorId: req.user.id,
      //         created: {
      //             [Op.lte]: current_time
      //         }
      //     }
      // })
      // var findorders = {
      //     pastdates: pastdates,
      //     future_dates: future_dates,
      // }
      return helper.success(res, `Orders list.`, future_dates);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  get_shop_category_id: async (req, res) => {
    try {
      const required = {
        category_id: req.body.category_id
      };
      const nonRequired = {

      };

      let requestData = await helper.vaildObject(required, nonRequired);
      // let current_time = Math.round(new Date().getTime() / 1000)

      const shops = await models.vendorShopCategory.findAll({
        where: {
          shopCategoryId: requestData.category_id,
        },
        
        include: [
                {
                  model: models.user,
                  // attributes: {
                  //   include: [ 'id', 'email'] ]
                  // },
                  attributes: ['id','email','phone'],
                  include: [
                          {
                            model: models.vendorDetail,
                            attributes: {
                              include: [
                                ['id', 'detailId'],
                                ['userId', 'id'],
                                [sequelize.literal("(IF (`user->vendorDetail`.image='', '', CONCAT('/uploads/user/', `user->vendorDetail`.image)) )"), 'image'],
                                [sequelize.literal("(IF (`user->vendorDetail`.shopLogo='', '', CONCAT('/uploads/user/', `user->vendorDetail`.shopLogo)) )"), 'shopLogo'],
                                // helper.makeImageUrlSql('vendorDetail', 'image', 'user'),
                                // helper.makeImageUrlSql('vendorDetail', 'shopLogo', 'user'),
                              ]
                            }
                          }
                  ]
                }
        ]
    });
      return helper.success(res, `Shops list.`, shops);

    } catch (err) {
      return helper.error(res, err);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const required = {
        id: req.body.id,

      };

      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);
      let deletedata = await helper.delete(models[model], requestData.id);


      var apimessage = {}
      return helper.success(res, ` Account deleted successfully.`, apimessage);
    } catch (err) {
      return helper.error(res, err);
    }
  },


  nearbyVendors: async (req, res) => {
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
        },],
        having: {
          ...(
            (requestData.latitude && requestData.longitude) ? {
              distance: {
                [Op.lt]: requestData.range,
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


      return helper.success(res, `Nearby vendors listing fetched successfully.`, vendors);
    } catch (err) {
      return helper.error(res, err);
    }
  },

  nearbyVendors: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        range: req.body.range || 100
      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired);

      let products = [];
      const vendorIdProductsObject = {};

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
        },],
        having: {
          ...(
            (requestData.latitude && requestData.longitude) ? {
              distance: {
                [Op.lt]: requestData.range,
              },
            } : {}
          ),
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
      return helper.success(res, `Nearby vendors listing fetched successfully.`, vendors);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  graphDetail: async function (req, res) {
    try {
      console.log(req.headers, '===========>req.headers');
      const required = {
        // securitykey: req.headers.securitykey,
        // token:req.body.token
        fromDate: req.body.fromDate, // format DD-MM-YYYY
        toDate: req.body.toDate, // format DD-MM-YYYY
      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired);

      let getChartDetail = await order.findAll({
        attributes: ['netAmount', 'total', 'qty', 'createdAt',
          // [sequelize.fn('sum', sequelize.col('netAmount')), 'total_amount']
        ],
        where: {
          orderStatus: 4,
          vendorId: req.user.id,
          createdAt: {
            [Op.between]: [moment(requestData.fromDate, 'DD-MM-YYYY'), moment(requestData.toDate, 'DD-MM-YYYY')]
          }
        }
      }).map(singleOrder => singleOrder.toJSON());

      const total = {};

      getChartDetail.forEach(singleOrder => {
        log(singleOrder, 'singleOrder');
        const formattedDate = moment(singleOrder.createdAt).format('DD-MM-YY');

        log(formattedDate, 'moment');

        if (!total.hasOwnProperty(formattedDate)) {
          total[formattedDate] = Number(singleOrder.total);
        } else {
          total[formattedDate] += Number(singleOrder.total);
        }
      });
      // log(total, 'total');
      const responseData = {
        dates: Object.keys(total),
        amount: Object.values(total),
      };
      return helper.success(res, `orders.`, responseData);
    } catch (error) {
      return helper.error(res, error)
    }
  },


  get_delivery_options: async (req, res) => {
    try {

      const required = {
      };
      const nonRequired = {
        vendorId:req.query.vendor_id
      };

      let requestData = await helper.vaildObject(required, nonRequired);
      const data = await models['vendorDeliveryOptions'].findAll({ where: { vendorId: (requestData.vendorId && requestData.vendorId!='') ? requestData.vendorId : req.user.id } })
      if (data) {
        return helper.success(res, `Success `, data);
      } else {
        return helper.success(res, `Nothing Found`, data);
      }

    } catch (err) {
      return helper.error(res, err);
    }
  },


};