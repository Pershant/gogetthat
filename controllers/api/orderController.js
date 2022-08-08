const models = require('../../models');
const helper = require('../../helpers/helper');
const sequelize = require("sequelize");
const { Op } = require('sequelize');
const constants = require('../../config/constants');

const cartController = require('./cartController');

var stripeNpm = require('stripe')('sk_test_51He7MuF5sxjijFYsTxH8mnYEqHiv0XHAohUDuUtkGYbqYBEXaqwqIhO5CdB6k3BtwgRxeQtYNmbqVDZW1Gz1IQzD005eLXmSqY');

const model = 'order';
const modelName = 'Order';

// const orderItem = models.orderItem
// orderItem.belongsTo(
//     models.order, {
//     foreignKey: 'orderId'
//   });
module.exports = {
    orderListing: async (req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                type: req.body.type, // 1 => past orders, 2 => ongoing orders
            };
            const nonRequired = {

            };
            let requestData = await helper.vaildObject(required, nonRequired);

            if (![1, 2].includes(parseInt(requestData.type))) throw "Invalid type.";

            const orders = await module.exports.findAll(req, res, {
                customerId: req.user.id,
                orderStatus: {
                    ...(
                        requestData.type == 1 ?
                            {
                                [Op.eq]: 3,
                            } : {
                                [Op.ne]: 3
                            }
                    )
                }
            });

           // console.log(orders,"===========orders");

            return helper.success(res, `${requestData.type == 1 ? 'Past' : 'Ongoing'} ${modelName} listng fetched successfully.`, orders);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    orderDetail: async (req, res) => {
        try {
            const required = {
                securitykey: req.headers.securitykey,
                id: req.query.id,
            };

            const nonRequired = {

            };

            let requestData = await helper.vaildObject(required, nonRequired);

            const order= await models.order.findOne({
                attributes:[`id`, `orderNo`, `orderStatus`, `customerId`, `vendorId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `adminCommission`, `total`, `paymentMethod`, `deliveryDate`, `deliverySlot`,  `created`, `updated`,
                // [
                //     sequelize.literal( ` (SELECT if(count(id) > 0, "1", "0") cnt FROM ratings WHERE orderId=order.id) ` ),
                //     "isRated"
                // ]
                ],
                include:[

                    {
                        model: models.orderItem,
                        required: false,
                        include: [{

                            model: models.product,
                            attributes: ['name', 'weight', 'description', 'weightUnit', 
                                helper.makeImageUrlSql('orderItems->product', 'image', 'product')
                            ],
                  
                        }]
                    },
                    {
                        model: models.user,
                        as: 'customer',
                        required: false,
                        attributes: [
                            'id',
                            'email',
                        ],
                       
                        
                    },
                    {
                        model: models.user,
                        as: 'vendor',
                        required: false,
                        attributes: [
                            'id',
                            'email',
                        ],
                        include:[
                            {
                                model:models.vendorDetail,
                                required:true,
                            
                            }
                        ]
                    },
                   
                ],
                where:{
                    id: requestData.id,
                }
            });

        //     const order = await module.exports.findOne(req, res, {
        //          id: requestData.id,
        //  });

        if(order.dataValues.vendor==null){
            order.dataValues.vendor={}
        }
           
            if (!order) throw "Invalid id.";

            return helper.success(res, `${modelName} detail fetched successfully.`, order);
        } catch (err) {
            return helper.error(res, err);
        }
    },
    addOrder: async (req, res) => {
        try {
            const required = {
              securitykey: req.headers.securitykey,
              amount: req.body.amount,
            //   isUseWallet: req.body.isUseWallet, // 0 => no, 1 => yes
              userAddressId: req.body.userAddressId || 0,
              cardId: req.body.cardId,
              cvv: req.body.cvv
            };
            const nonRequired = {
                isSelfpickup: req.body.isSelfpickup ? req.body.isSelfpickup : '0',
                gst_amount: req.body.gst_amount ? req.body.gst_amount : '0',
                deliveryDate: req.body.deliveryDate,
                deliverySlot: req.body.deliverySlot,
                admin_commission: req.body.admin_commission ? req.body.admin_commission : '0'
                // instructions: req.body.instructions,                
            };

            let requestData = await helper.vaildObject(required, nonRequired);

            let userDetail;

            console.log(" @@@@@@@@@@@@@@@@@@@@@@ ==============ddd",requestData)
            const card = await models.card.findOne({
                where: {
                    id: requestData.cardId,
                    userId: req.user.id,
                },
                raw: true,
            });
            if (!card) throw "Invalid cardId.";

            requestData.card = card;

            let userAddress = {};

            if (requestData.hasOwnProperty('userAddressId') && requestData.userAddressId != 0) {
                userAddress = await models.userAddress.findOne({
                    where: {
                        id: requestData.userAddressId,
                        userId: req.user.id,
                    },
                    raw: true,
                });
                if (!userAddress) throw "Invalid userAddressId.";
            }

            const cartItems = await cartController.findAll(req, res, {
                userId: req.user.id
            });
            // console.log("cartItems ------------------------------------",cartItems)
            if (cartItems.length == 0) throw "Cart is empty.";

            const token = await module.exports.stripeToken(requestData,req.body.cardId);

            const payment = await stripeNpm.charges.create(
                {
                    amount: requestData.amount * 100,
                    currency: 'USD',
                    source: token,
                    description: 'Ongo order payment'
                }
            );
            // console.log(payment, '======>payment');
            
            if (payment && payment.status != "succeeded") {
                throw "Something went, payment could not be processed.";
            }
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ", {
                ...requestData,
                customerId: req.user.id,
                userAddressId: requestData.userAddressId,
                netAmount: requestData.amount,
                total: requestData.amount,
                isSelfpickup: requestData.isSelfpickup,
                taxCharged:requestData.gst_amount,
                shippingCharges:'0',
                adminCommission:requestData.admin_commission,
                vendorId: cartItems[0].vendorId,
                paymentMethod: 1,
                orderNo: helper.orderNumber(),
            })
            const orderId = await helper.save(models.order, {
                ...requestData,
                customerId: req.user.id,
                userAddressId: requestData.userAddressId,
                netAmount: requestData.amount,
                total: requestData.amount,
                isSelfpickup: requestData.isSelfpickup,
                taxCharged:requestData.gst_amount,
                shippingCharges:'0',
                adminCommission:requestData.admin_commission,
                vendorId: cartItems[0].vendorId,
                paymentMethod: 1,
                // orderJson: {
                //     payment,
                //     userAddress,
                //     orderItems: cartItems,
                // },
                orderNo: helper.orderNumber(),
            });

            const addProductData = [];
            for (let i in cartItems) {
                addProductData.push({
                    orderId:orderId,
                    productId:cartItems[i].productId,
                    qty:cartItems[i].qty,
                    netAmount:cartItems[i].product.mrp,
                    taxCharged:0,
                    shippingCharges:0,
                    adminCommission:0,
                    total:cartItems[i].product.mrp,
                });
            }
            await models['orderItem'].bulkCreate(addProductData);

            req.sendResponse = false;
            const emptyCart = await cartController.emptyCart(req, res);
        
            const order = await module.exports.findOne(req, res, {
                id: orderId,
            });


            helper.sendAddOrderPushNotification(models['order'],models['vendorStaffDetail'], "addOrder", orderId)
            return helper.success(res, `${modelName} created successfully.`, order);

           
        } catch (err) {
            return helper.error(res, err);
        }
    },
    stripeToken: async function (data,cardId) {

        const card = await models.card.findOne({
            where: {
                id: cardId,
            },
            raw: true,
        });
    
    
        // return;
        // console.log(data.card.year, '=====>data.card.year');
        // data.card.year = String(data.card.year).slice(2);
        // console.log(data.card.year, '=====>data.card.year');
        const token = await stripeNpm.tokens.create(
            {
                card: {
                    number: card.cardNumber,
                    exp_month: card.month,
                    exp_year: String(card.year),
                    cvc: data.cvv,
                },
            });
        if (token) {
            return token.id;
        }
    },
    findOne: async (req, res, where = {}, conditions = {}) => {
        let modelItem = await models[model].findOne({
            where,
            include: [
                {
                    model: models.user,
                    as: 'customer',
                    required: true,
                    attributes: [
                        'id',
                        'email',
                    ],
                    include: [
                        {
                            model: models.userDetail,
                            required: true,
                            attributes: [
                                'name',
                            ]
                        }
                    ],
                },
            ],
            ...conditions,
        });

        if (modelItem) {
            modelItem = modelItem.toJSON();
            const userDetail = modelItem.customer.userDetail;
            delete modelItem.customer.userDetail;

            modelItem.customer = {
                ...modelItem.customer,
                ...userDetail
            };
        }

        // if (modelItem.hasOwnProperty('orderitems') && Array.isArray(modelItem.orderitems) && modelItem.orderitems.length > 0) {
        //     // console.log(order, '====>order');
        //     modelItem.orderitems = modelItem.orderitems.map(orderItem => {
        //         orderItem.categoryitem.qty = orderItem.qty;
        //         return orderItem;
        //     });
        // }

        return modelItem;
    },
    findAll: async (req, res, where = {}, conditions = {}) => {
        return await models[model].findAll({
            where,
            include: [
                {
                    model: models.user,
                    as: 'customer',
                    required: true,
                    attributes: [
                        'id',
                        'email',
                    ],
                    include: [
                        {
                            model: models.userDetail,
                            required: true,
                            attributes: [
                                'name',
                            ]
                        }
                    ],
                },
                // {
                //     model: models.shippingAddress,
                //     required: true,
                // },
                // {
                //     model: models.orderitem,
                //     required: false,
                //     include: [
                //         {
                //             model: models.categoryitem,
                //             required: true,
                //             attributes: {
                //                 include: [
                //                     [
                //                         sequelize.literal(
                //                           "IF (`orderitems->categoryitem`.`image`='', '', CONCAT('" +
                //                           req.protocol +
                //                           "://" +
                //                           req.get("host") +
                //                           "/uploads/categoryitem/', `orderitems->categoryitem`.`image`))"
                //                         ),
                //                         "image",
                //                       ],
                //                 ]
                //             }
                //         }
                //     ]
                // },
            ],
            order: [['id', 'DESC']],
            ...conditions,
        }).map(modelItem => {
            modelItem = modelItem.toJSON()

            const userDetail = modelItem.customer.userDetail;
            delete modelItem.customer.userDetail;

            modelItem.customer = {
                ...modelItem.customer,
                ...userDetail
            };

            return modelItem;
        });
    },
    addRating:async function(req,res){
        try{
            const required = {
                securitykey: req.headers.securitykey,
                order_id: req.body.order_id,              
                
              };
              const nonRequired = {
                review: req.body.review,
              };
  
              let requestData = await helper.vaildObject(required, nonRequired);

              let findExstingrating = await models.ratings.findOne({
                  where:{
                    userId:req.user.id,
                    orderId:requestData.order_id,
                  }
              });

              if(findExstingrating==null){
                let updateValue= await models.ratings.create({
                    userId:req.user.id,
                    orderId:requestData.order_id,
                    review:req.body.review,
                    time:Math.round(new Date().getTime()/1000)
                  });
                  
                  if (!updateValue) throw "Please try again";
                   var data={}
                  return helper.success(res, `Rating Successful`,data);
              }else{
                throw "Your Already Rated this Order"
              }
            
             
              

        }catch(err){
            return helper.error(res, err);
        }
    }
}