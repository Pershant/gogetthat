const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

const model = "feedback";
const modelTitle = "Feedback";
const modelDataTable = "";

const roleTypes = {
    0: 'Admin',
    1: 'User',
    2: 'Driver',
    3: 'Vendor'
}
const userRoleModels = {
    0: 'adminetail',
    1: 'userDetail',
    2: 'driverDetail',
    3: 'vendorDetail',
}

module.exports = {
    listing: async (req, res) => {
        try {
            global.currentModule = 'Feedback';
            // global.currentSubModule = '';
            // global.currentSubModuleSidebar = '';

            const listing = await models[model].findAll({
                include: [
                    {

                        model: models['user'],
                        as: 'customer',
                        required: true,
                        include: [
                            {
                                model: models['userDetail'],
                                attributes: {
                                    include: [
                                        [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
                                    ]
                                }
                            },
                        ]
                    },
                    {

                        model: models['user'],
                        as: 'admin',
                        required: true,
                        include: [
                            {
                                model: models['adminDetail'],
                                attributes: {
                                    include: [
                                        [sequelize.literal(`(IF (\`admin->adminDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`admin->adminDetail\`.\`image\`)) )`), 'image']
                                    ]
                                }
                            },
                        ]
                    },
                    {

                        model: models['order'],
                        required: true,
                    },
                ],
                order: [['id', 'DESC']],
                // offset: parseInt(start),
                // limit: parseInt(length),
                raw: true,
                nest: true
            });
            // console.log(listing, '===========================================>listing');
            // return;

            const headerColumns = Object.values({
                sno: '#',
                date: 'Date',
                orderId: 'Order ID',
                name: 'Name',
                comment: 'Comment',
                // noOfOrders: 'No. of Orders',
                // orderNetAmount: 'Order Net Amount',
                // noOfQty: 'No. of QTY',
                // taxCharged: 'Tax Charged',
                // shippingCharges: 'Shipping Charges',
                // salesEarning: 'Sales Earning',
            });

            const data = listing.map((feedback, index) => {
                return Object.values({
                    sno: parseInt(index) + 1,
                    date: moment(feedback.createdAt).format('YYYY-MM-DD'),
                    orderId: feedback.order.orderNo,
                    name: feedback.customer.userDetail.name,
                    comment: feedback.comment,
                    // orderNetAmount: report.totalNetAmount,
                    // noOfQty: report.totalQty,
                    // taxCharged: report.totalTaxCharged,
                    // shippingCharges: report.totalShippingCharges,
                    // salesEarning: report.totalAmount,
                    // action
                });
            });

            return res.render('admin/feedback/listing', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },
}