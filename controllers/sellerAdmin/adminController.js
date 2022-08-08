const models = require('../../models');
const sequelize = require('sequelize');
const helper = require('../../helpers/helper');
const { request } = require('express');
const user = require('../../models/user');
// const { constrainPoint } = require('fullcalendar/src/util');

const User = models.user;
const AdminDetail = models.adminDetail;
const model = "user";
const prefixBaseName = 'sellerAdmin';
const modelBaseName = 'user';
const modelImageFolder = 'user';
const modelTitle = 'User';
const childModel = 'vendorDetail';

module.exports = {
  dashboard: async (req, res) => {
    try {

      // console.log('ADMIN DATA', adminData); return
      global.currentModule = 'Dashboard';

      let getCounts = await User.findOne({
        attributes: [
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=1)'), 'user'],
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=2)'), 'driver'],
          [sequelize.literal('(SELECT COUNT(*) FROM user WHERE user.role=3)'), 'vendor'],
          [sequelize.literal(`(SELECT COUNT(*) FROM \`order\` AS o WHERE o.vendorId=${adminData.id})`), 'order'],
          [sequelize.literal(`(SELECT COUNT(*) FROM vendorStaffDetail AS v WHERE v.vendorId=${adminData.id})`), 'staffManagement'],
          [sequelize.literal("(SELECT COUNT(*) FROM `bank`)"), 'category'],
          [sequelize.literal("(SELECT COUNT(*) FROM `wallet`)"), 'wallet'],
          [sequelize.literal(`(SELECT COUNT(*) FROM bank WHERE userId=${req.session.admin.id})`), 'bank'],

          [sequelize.literal(`(SELECT COUNT(*) FROM product where product.vendorId = ${adminData.id})`), 'product'],

          [sequelize.literal(`(SELECT COUNT(*) FROM wallet where wallet.vendorId = ${adminData.id})`), 'wallet'],
          // [sequelize.literal(`(SELECT COUNT(*) FROM product where bank.userId = ${adminData.id})`), 'bank'],


          [sequelize.literal("(SELECT COUNT(*) FROM `orderCancellationRequest` AS `orderCancellationRequest` INNER JOIN `order` AS `order` ON `orderCancellationRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId` ORDER BY `orderCancellationRequest`.`id` DESC)"), 'orderCancellationRequest'],
          [sequelize.literal("(SELECT COUNT(*) FROM `orderRefundRequest` AS `orderRefundRequest` INNER JOIN `order` AS `order` ON `orderRefundRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId`  ORDER BY `orderRefundRequest`.`id` DESC)"), 'orderRefundRequest'],
          [sequelize.literal("(SELECT COUNT(*) FROM `orderWithdrawalRequest` AS `orderWithdrawalRequest` INNER JOIN `order` AS `order` ON `orderWithdrawalRequest`.`orderId` = `order`.`id` INNER JOIN `user` AS `order->customer` ON `order`.`customerId` = `order->customer`.`id` LEFT OUTER JOIN `userDetail` AS `order->customer->userDetail` ON `order->customer`.`id` = `order->customer->userDetail`.`userId` INNER JOIN `user` AS `order->vendor` ON `order`.`vendorId` = `order->vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `order->vendor->vendorDetail` ON `order->vendor`.`id` = `order->vendor->vendorDetail`.`userId` ORDER BY `orderWithdrawalRequest`.`id` DESC)"), 'orderWithdrawalRequests'],
          [sequelize.literal(`(SELECT COUNT(*) FROM (SELECT DATE(createdAt) AS grouped_date, COUNT(*) AS count FROM \`order\` where vendorId = ${adminData.id} GROUP BY grouped_date) as tt)`), 'salesReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `customerId` ORDER BY `order`.`id` DESC) AS tt)"), 'userReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'sellerReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'taxReport'],
          [sequelize.literal("(SELECT COUNT(*) FROM (SELECT `order`.`id` FROM `order` AS `order` INNER JOIN `user` AS `customer` ON `order`.`customerId` = `customer`.`id` LEFT OUTER JOIN `userDetail` AS `customer->userDetail` ON `customer`.`id` = `customer->userDetail`.`userId` INNER JOIN `user` AS `vendor` ON `order`.`vendorId` = `vendor`.`id` LEFT OUTER JOIN `vendorDetail` AS `vendor->vendorDetail` ON `vendor`.`id` = `vendor->vendorDetail`.`userId` GROUP BY `vendorId` ORDER BY `order`.`id` DESC) AS tt)"), 'commissionReport'],
        ],
        raw: true
      });
      console.log(getCounts, '===============>getCounts');

      return res.render('sellerAdmin/home/dashboard', { getCounts });
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
// console.log(requestData,'===================herer');return
      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      return helper.success(res, 'Status Updated Successfully.', updatedItem);
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
  disable: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        model: req.body.model
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const deleteItem = await models[requestData.model].update({ isDeleted: 1 }, {
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

  changeField: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        field: req.body.field,
        fieldValue: req.body.fieldValue,
        model: req.body.model
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      requestData[requestData.field] = requestData.fieldValue;
      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  signUpForm: async (req, res) => {
    try {
      return res.render('sellerAdmin/home/signUp');
    }
    catch (err) {
      return helper.error(res, err);
    }
  },
  signUp: async (req, res) => {
    try {
      // console.log("===================>Prakhar");
      // return
      const required = {
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        company: req.body.company,
        buisnessAddress: req.body.buisnessAddress,
        businessCNumber: req.body.businessCNumber,
        businessNumber: req.body.businessNumber,
        verificationId: req.body.verificationId,
        password: helper.bcryptHash(req.body.password),
      }
      const nonRequired = {
        image: req.files && req.files.image,
        lat: req.body.lat,
        long: req.body.long,
      }

      let requestData = await helper.vaildObject(required, nonRequired);


      let countEmail = await User.count({
        where: {
          email: req.body.email,
        }
      })
      // console.log('req.body>>>>>>>>>>',countEmail); return
      if (countEmail > 0) {
        // console.log('==================under check')
        let message = 'Email already exists please use another';
        req.flash('flashMessage', { color: 'error', message });
        res.redirect(`../sellerAdmin/login`);
        return
      }
        console.log('==================after check')
// return
      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, modelImageFolder);
      }

      const rowId = await helper.save(models[model], requestData, true);
      console.log(rowId.id, "============>>>>>>>ID Prakhar Singh");
      var Id = rowId.id;
      const create_user = await models[childModel].create({
        userId: Id,
        image: requestData.image,
        name: requestData.name,
        email: requestData.email,
      })




      const row = await module.exports.findOne(rowId);
      // console.log(row, '=================================================>row');return
      let message = `${modelTitle} ${requestData.hasOwnProperty('id') ? `Updated` : 'Added'} Please Wait for admin's approval.`;

      req.flash('flashMessage', { color: 'success', message });


      res.redirect(`../sellerAdmin/login`);

    }
    catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  findOne: async (id) => {
    return await models[model].findOne({
      where: { id },
      raw: true
    });
  },
}