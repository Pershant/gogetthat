const models = require('../../models');
const sequelize = require('sequelize');
const helper = require('../../helpers/helper');
const { request } = require('express');

const User = models.user;
const AdminDetail = models.adminDetail;

module.exports = {
  dashboard: async (req, res) => {
    try {
      global.currentModule = 'Dashboard';

      let getCounts = await User.findOne({
        attributes: [
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=1)'), 'user'],
          [sequelize.literal('(SELECT COUNT(*) FROM faq )'), 'faq'],
          [sequelize.literal('(SELECT COUNT(*) FROM blog )'), 'blog'],
          [sequelize.literal('(SELECT COUNT(*) FROM brand )'), 'brand'],
          [sequelize.literal('(SELECT COUNT(*) FROM banner )'), 'banner'],
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=2)'), 'driver'],
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=3)'), 'vendor'],
          [sequelize.literal("(SELECT COUNT(*) FROM `shopCategory`)"), 'shopCategory'],
          [sequelize.literal("(SELECT COUNT(*) FROM `category`)"), 'category'],
          [sequelize.literal("(SELECT COUNT(*) FROM `subCategory`)"), 'subCategory'],
          [sequelize.literal("(SELECT COUNT(*) FROM `product` AS p WHERE p.isApproved=0)"), 'approvalRequests'],
          [sequelize.literal("(SELECT COUNT(*) FROM `product` AS p WHERE p.isApproved=1)"), 'product'],
          [sequelize.literal('(SELECT COUNT(*) FROM `order` AS o)'), 'order'],
          [sequelize.literal("(SELECT COUNT(*) FROM `orderCancellationRequest` AS `orderCancellationRequest` INNER JOIN `order` AS `order` ON `orderCancellationRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId` ORDER BY `orderCancellationRequest`.`id` DESC)"), 'orderCancellationRequest'],
          [sequelize.literal("(SELECT COUNT(*) FROM `orderRefundRequest` AS `orderRefundRequest` INNER JOIN `order` AS `order` ON `orderRefundRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId`  ORDER BY `orderRefundRequest`.`id` DESC)"), 'orderRefundRequest'],
          [sequelize.literal("(SELECT COUNT(*) FROM `orderWithdrawalRequest` AS `orderWithdrawalRequest` INNER JOIN `order` AS `order` ON `orderWithdrawalRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId` ORDER BY `orderWithdrawalRequest`.`id` DESC)"), 'orderWithdrawalRequests'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT DATE(`order`.`createdAt`) AS `grouped_date`, COUNT(*) AS `count` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `grouped_date` ORDER BY `order`.`id` DESC) as tt)"), 'salesReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `customerId` ORDER BY `order`.`id` DESC) AS tt)"), 'userReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'sellerReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'taxReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'commissionReport'],
        ],
        raw: true
      });
      console.log(getCounts, '===============>getCounts');

      const popularProducts = await models['orderItem'].findAll({
        attributes: {
          include: [
            [sequelize.literal('( SELECT COUNT(*) FROM orderItem AS o WHERE o.productId=orderItem.productId )'), 'popularityCount']
          ]
        },
        include: [
          {
            model: models['product'],
            required: true,
            attributes: {
              include: [
                [sequelize.literal(`ifNull((IF (\`product\`.\`image\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`image\`)) ),"")`), 'image']
              ]
            },
          }
        ],
        group: ['productId'],
        order: [[sequelize.col('popularityCount'), 'DESC']],
        limit: 30
      }).map(data => data.toJSON());

      const headerColumnsPopularProducts = Object.values({
        sno: '#',
        name: 'Name',
        image: 'Image',
        brandName: 'Brand Name',
        mrp: 'MRP',
        orders: 'Orders'
      });
      const dataPopularProducts = popularProducts.map((order, index) => {
        return Object.values({
          sno: parseInt(index) + 1,
          image: `<img alt="image" src="${order.product.image}" class="datatable_list_image" data-toggle="tooltip" title="${order.product.name}">`,
          name: order.product.name,
          brandName: order.product.brandName,
          mrp: order.product.mrp,
          orders: order.popularityCount,
        });
      });

      const popularVendors = await models['order'].findAll({
        attributes: {
          include: [
            [sequelize.literal('( SELECT COUNT(*) FROM \`order\` AS o WHERE o.vendorId=\`order\`.\`vendorId\` )'), 'popularityCount']
          ]
        },
        include: [
          {
            model: models['user'],
            as: 'vendor',
            include: [
              {
                model: models['vendorDetail'],
                attributes: {
                  include: [
                    [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                  ]
                }
              }
            ]
          }
        ],
        group: ['vendorId'],
        order: [[sequelize.col('popularityCount'), 'DESC']],
        limit: 30
      }).map(data => data.toJSON());

      // const headerColumnsPopularVendors = Object.values({
      //     sno: '#',
      //     image: 'Image',
      //     name: 'Name',
      //     email: 'Email',
      //     orders: 'Orders',
      // });
      // const dataPopularVendors = popularVendors.map((order, index) => {
      //     return Object.values({
      //         sno: parseInt(index) + 1,
      //         image: `<img alt="image" src="${order.vendor.vendorDetail && order.vendor.vendorDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${order.vendor.vendorDetail && order.vendor.vendorDetail.name}">`,
      //         name: order.vendor.vendorDetail && order.vendor.vendorDetail.name,
      //         email: order.vendor.email,
      //         orders: order.popularityCount,
      //     });
      // });

      console.log(popularProducts, '========================>popularProducts');
      console.log(popularVendors, '========================>popularVendors');

      return res.render('admin/home/dashboard', {
        getCounts,
        headerColumnsPopularProducts,
        dataPopularProducts,
        // headerColumnsPopularVendors,
        // dataPopularVendors,
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  dashboardCounts: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      // let getCounts = await User.findOne({
      //     attributes: [
      //         [sequelize.literal('(SELECT COUNT(*) FROM users WHERE users.role=1)'), 'users'],
      //         [sequelize.literal('(SELECT COUNT(*) FROM communities)'), 'communities'],
      //         [sequelize.literal('(SELECT COUNT(*) FROM journals)'), 'journals'],
      //         [sequelize.literal('(SELECT COUNT(*) FROM posts)'), 'posts'],
      //         [sequelize.literal('(SELECT COUNT(*) FROM reported_posts)'), 'reportedPosts'],
      //         [sequelize.literal('(SELECT COUNT(*) FROM `order`)'), 'order'],
      //         [sequelize.literal('(SELECT count(*) FROM orderCancellationRequest)'), 'orderCancellationRequest'],
      //     ],
      //     raw: true
      // });

      // console.log(getCounts,  '======================>getCounts'); return;

      return helper.success(res, 'Admin Dashboard Count Fetched Successfully.', getCounts);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  updateStatus: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        status: req.body.status,
        model: req.body.model
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  updateFeature: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        is_featured: req.body.is_featured,
        model: req.body.model
      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired);
// console.log(requestData,'===================hererer');return
      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      return helper.success(res, 'Feature Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  delete: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        model: req.body.model
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const deleteItem = await models[requestData.model].destroy({
        where: {
          id: requestData.id
        }
      });

      return helper.success(res, 'Item Deleted Successfully.', deleteItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },

  // changeField: async (req, res) => {
  //     try {
  //         const required = {
  //             securitykey: req.headers.securitykey,
  //             id: req.body.id,
  //             field: req.body.field,
  //             fieldValue: req.body.fieldValue,
  //             model: req.body.model
  //         };
  //         const nonRequired = {};

  //         let requestData = await helper.vaildObject(required, nonRequired);

  //         requestData[requestData.field] = requestData.fieldValue;
  //         const updatedItem = await helper.save(models[requestData.model], requestData, true);

  //         return helper.success(res, 'Status Updated Successfully.', updatedItem);
  //     } catch (err) {
  //         err.code = 200;
  //         return helper.error(res, err);
  //     }
  // },

  changeField: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        field: req.body.field,
        fieldValue: req.body.fieldValue,
        model: req.body.model
      };
      const nonRequired = {
        modelTitle: req.body.modelTitle,
        statusText: req.body.statusText,
      };


      let requestData = await helper.vaildObject(required, nonRequired);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ", requestData);
      requestData[requestData.field] = requestData.fieldValue;
      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      if (requestData.model == 'order' && requestData.field == 'orderStatus') {
        console.log(updatedItem.customerId,"updatedItem.customerId $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        // return
      
        const user = await models.user.findOne({
          where: { 
            id: updatedItem.customerId,
          },
          include: [
            {
              model: models['userToken'],
            },
          ],
        }).then(modelRow => modelRow ? modelRow.toJSON() : modelRow);
        const order = await models[requestData.model].findOne({
          where: {
            id: requestData.id,
          },
          raw:true
        });
        
        console.log("===========================user", user)
        console.log(order, '=====>order');
        const message = `${requestData.modelTitle} status changed to ${requestData.statusText} ${updatedItem.orderNo}`;

        const addNotification = await helper.save(models.notification, {
          userId: order.vendorId,
          user2Id:order.customerId,
          orderId:order.id,
          type: 1,
          message,
          notificationData: {
            order
          },
        });

        delete order.orderJson;

        helper.send_push_notification(message,user.web_token,"1",order, '1')

        if (user && user.userTokens && user.userTokens.length > 0) {
          Promise.all(user.userTokens.map(async userToken => {
            const notificationData = {
              deviceType: userToken.deviceType,
              deviceToken: userToken.deviceToken,
              title: message,
              code: 1,
              body: order,
              type: requestData.statusText,
              order_id: updatedItem.id
            };

            await helper.pushNotification(notificationData);

          }));
        }
      }

      return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
}
