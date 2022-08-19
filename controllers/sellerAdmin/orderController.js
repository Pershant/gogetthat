const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

global.model = "order";
global.modelTitle = "Order";
global.modelDataTable = "orderDataTable";

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

const orderStatusTexts = {
    0: 'Pending',
    1: 'Accepted',
    2: 'Packed',
    3: 'Shipped',
    4: 'Delivered',
    // 5: 'Cancelled',
    // 6: 'Declined',
}

const orderStatus = {
    0: {
        value: `Pending`,
        backgroundCssColor: `red`,
    },
    1: {
        value: `Accepted`,
        backgroundCssColor: `green`,
    },
    2: {
        value: `Packed`,
        backgroundCssColor: `#ffc107`,
    },
    3: {
        value: `Shipped`,
        backgroundCssColor: `cadetblue`,
    },
    4: {
        value: `Delivered`,
        backgroundCssColor: `orange`,
    },
    // 5: {
    //     value: `Cancelled`,
    //     backgroundCssColor: `red`,
    // },
    // 6: {
    //     value: `Declined`,
    //     backgroundCssColor: `red`,
    // },
}

const paymentMethodText = {
    0: 'Wallet',
    1: 'Card',
}

module.exports = {
    view: async (req, res) => {
        try {
            // global.currentModule = 'Order';
            const modelTitle = "Order";
            global.currentSubModule = 'Detail';
            global.currentSubModuleSidebar = 'View';

            const order = await module.exports.findOneOrder(req.params.id);
            console.log(JSON.stringify(order, null, 2), '=========================>order');
            order.orderStatusText = orderStatusTexts[order.orderStatus];
            order.paymentMethodText = paymentMethodText[order.paymentMethod];

            const headerColumns = Object.values({
                sno: '#',
                Image: 'Image',
                orderParticulars: 'Order Particulars',
                qty: 'Quantity',
                shippingCharges: 'Shipping Charges',
                price: 'Price',
                taxCharged: 'Tax Charged',
                total: 'Total',
            });

            const data = order.orderItems.map((orderItem, index) => {

                return Object.values({
                    sno: parseInt(index) + 1,
                    image: `<img alt="image" src="${orderItem.product.image}" class="datatable_list_image" data-toggle="tooltip" title="${orderItem.product.image}">`,
                    orderParticulars: `Name: ${orderItem.product.name}<br/>
                                   Brand: ${orderItem.product.brandName}`,
                    qty: orderItem.qty,
                    shippingCharges: orderItem.shippingCharges,
                    price: orderItem.netAmount,
                    taxCharged: orderItem.taxCharged,
                    total: orderItem.total,
                });
            });

            return res.render('sellerAdmin/order/view', { order, headerColumns, data, orderStatus, modelTitle });
        } catch (err) {
            return helper.error(res, err);
        }
    },

    listing: async (req, res) => {
        try {
            global.currentModule = 'Report';
            global.currentSubModule = 'Orders';
            global.currentSubModuleSidebar = 'orders';

            const model = "order";
            const modelTitle = "Order";

            const { currentSubModule, currentSubModuleSidebar, from, to, customerId, vendorId } = req.query;

            currentSubModuleSidebar
                ? global.currentSubModuleSidebar = currentSubModuleSidebar
                : global.currentSubModuleSidebar = 'orders';

            currentSubModule
                ? global.currentSubModule = `${currentSubModule} Orders`
                : global.currentSubModule = 'Orders';

            const modulePermissions = {
                add: false,
                edit: false,
                delete: false,
                view: false,
            }

            if (!adminData.staffLogin) {
                for (let permission in modulePermissions) {
                    modulePermissions[permission] = true;
                }
            } else if (adminData.staffLogin && adminData.staffLogin.hasOwnProperty('vendorStaffDetail') && adminData.staffLogin.vendorStaffDetail.hasOwnProperty('permissions') && adminData.staffLogin.vendorStaffDetail.permissions.hasOwnProperty('orders') && adminData.staffLogin.vendorStaffDetail.permissions['orders'].length > 0) {
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('add')) modulePermissions['add'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('edit')) modulePermissions['edit'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('delete')) modulePermissions['delete'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('view')) modulePermissions['view'] = true;
            }

            const listing = await models[model].findAndCountAll({
                where: {
                    ...(
                        from && to
                            ? {
                                [Op.and]: [
                                    sequelize.literal(`DATE(order.createdAt) >= "${from}" AND DATE(order.createdAt) < "${moment(to, "YYYY-MM-DD").add('days', 1).format("YYYY-MM-DD")}"`)
                                ]
                            } : {}
                    ),
                    ...(
                        customerId
                            ? {
                                customerId
                            } : {}
                    ),
                    ...(
                        vendorId
                            ? {
                                vendorId
                            } : {}
                    ),
                    // [Op.and]: [
                    //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%' || vendor.email LIKE '%${search.value}%' || \`vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
                    // ]
                },
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
                        as: 'vendor',
                        required: true,
                        include: [
                            {
                                model: models['vendorDetail'],
                                attributes: {
                                    include: [
                                        [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                                    ]
                                }
                            },
                        ]
                    },
                ],
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });
            console.log(listing, '===========================================>listing');
            // return;

            const headerColumns = Object.values({
                sno: '#',
                orderId: 'Order ID',
                seller: 'Seller',
                customer: 'Customer',
                orderDate: 'Order Date',
                total: 'Total',
                ...(
                    modulePermissions.edit
                        ? {
                            orderStatus: 'Order Status',
                        } : {}
                ),
                action: 'Action',
            });

            const data = listing.rows.map((order, index) => {
                // const orderStatus = {
                //     0: {
                //         value: `Pending`,
                //         backgroundCssColor: `red`,
                //     },
                //     1: {
                //         value: `In Progress`,
                //         backgroundCssColor: `#ffc107`,
                //     },
                //     2: {
                //         value: `Complete`,
                //         backgroundCssColor: `green`,
                //     },
                // }

                let orderStatusSelect = ``;
                orderStatusSelect += `<select class="changeOrderRequestStatus" model="${model}" model_title="${modelTitle}" model_id="${order.id}" field="orderStatus" style="background: ${orderStatus[order.orderStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
                for (let status in orderStatus) {
                    orderStatusSelect += `<option value="${status}" ${status == order.orderStatus ? 'selected' : ''} style="background: ${orderStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" ${status < order.orderStatus ? 'disabled' : ''} >${orderStatus[status].value}</option>`;
                }
                orderStatusSelect += `</select>`;

                return Object.values({
                    sno: parseInt(index) + 1,
                    orderId: order.orderNo,
                    seller: `Name: ${order.vendor.vendorDetail.name}<br/>
                            Email: ${order.vendor.email}<br/>
                            Phone: ${order.vendor.vendorDetail.phone}
                            `,
                    customer: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,
                    orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
                    total: order.total,
                    ...(
                        modulePermissions.edit
                            ? {
                                orderStatus: orderStatusSelect,
                            } : {}
                    ),
                    action: `
                    <a href="/sellerAdmin/order/view/${order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
                    // action
                });
            });

            return res.render('sellerAdmin/order/listing', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    orders: async (req, res) => {
        try {
            global.currentModule = 'Orders';
            global.currentSubModule = '';
            global.currentSubModuleSidebar = 'orders';

            const model = "order";
            const modelTitle = "Order";

            const modulePermissions = {
                add: false,
                edit: false,
                delete: false,
                view: false,
            }

            if (!adminData.staffLogin) {
                for (let permission in modulePermissions) {
                    modulePermissions[permission] = true;
                }
            } else if (adminData.staffLogin && adminData.staffLogin.hasOwnProperty('vendorStaffDetail') && adminData.staffLogin.vendorStaffDetail.hasOwnProperty('permissions') && adminData.staffLogin.vendorStaffDetail.permissions.hasOwnProperty('orders') && adminData.staffLogin.vendorStaffDetail.permissions['orders'].length > 0) {
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('add')) modulePermissions['add'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('edit')) modulePermissions['edit'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('delete')) modulePermissions['delete'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orders'].includes('view')) modulePermissions['view'] = true;
            }


            const listing = await models[model].findAndCountAll({
                where: {
                    // [Op.and]: [
                    //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%'`)
                    // ]
                    vendorId: adminData.id
                },
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
                        as: 'vendor',
                        required: true,
                        include: [
                            {
                                model: models['vendorDetail'],
                                attributes: {
                                    include: [
                                        [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                                    ]
                                }
                            },
                        ]
                    },
                ],
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });

            const headerColumns = Object.values({
                sno: '#',
                orderId: 'Order ID',
                customerName: 'Customer',
                orderDate: 'Order Date',
                total: 'Total',
                ...(
                    modulePermissions.edit
                        ? {
                            orderStatus: 'Order Status',
                        } : {}
                ),
                action: 'Action',
            });

            const data = listing.rows.map((order, index) => {
                // const orderStatus = {
                //     0: {
                //         value: `Pending`,
                //         backgroundCssColor: `red`,
                //     },
                //     1: {
                //         value: `In Progress`,
                //         backgroundCssColor: `#ffc107`,
                //     },
                //     2: {
                //         value: `Complete`,
                //         backgroundCssColor: `green`,
                //     },
                // }

                let orderStatusSelect = ``;
                orderStatusSelect += `<select class="changeOrderRequestStatus" model="${model}" model_title="${modelTitle}" model_id="${order.id}" field="orderStatus" style="background: ${orderStatus[order.orderStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
                for (let status in orderStatus) {
                    orderStatusSelect += `<option value="${status}" ${status == order.orderStatus ? 'selected' : ''} style="background: ${orderStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" ${status < order.orderStatus ? 'disabled' : ''}>${orderStatus[status].value}</option>`;
                }
                orderStatusSelect += `</select>`;

                return Object.values({
                    sno: parseInt(index) + 1,
                    orderId: order.orderNo,
                    customerName: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,
                    orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
                    total: order.total,
                    ...(
                        modulePermissions.edit
                            ? {
                                orderStatus: orderStatusSelect,
                            } : {}
                    ),
                    action: `
                    <a href="/sellerAdmin/order/view/${order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
                });
            });

            return res.render('sellerAdmin/order/orders', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },

    earnings: async (req, res) => {
        try {
            global.currentModule = 'Earnings';
            global.currentSubModule = '';
            global.currentSubModuleSidebar = 'earnings';

            const model = "order";
            const modelTitle = "Earnings";

            // const modulePermissions = {
            //     add: false,
            //     edit: false,
            //     delete: false,
            //     view: false,
            // }

            const listing = await models[model].findAndCountAll({
                where: {
                    vendorId: adminData.id
                },
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
                ],
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });

            const headerColumns = Object.values({
                sno: '#',
                orderId: 'Order ID',
                customerName: 'Customer',
                orderDate: 'Order Date',
                total: 'Order Total',
                tax: 'GST',
                adminCommission: 'Admin Commission',
                vendorShare: 'Vendor Share',
                action: 'Action',
            });

            const data = listing.rows.map((order, index) => {
                let withdrawAction = `
                <a href="/sellerAdmin/earnings/withdraw/${order.id}">
                    <button type="button" class="btn btn-warning">Withdraw</button>
                </a>`;
                if(order.is_withdrawn_by_vendor == "1"){
                    withdrawAction = 'Request Sent';
                }else if(order.is_withdrawn_by_vendor == "2"){
                    withdrawAction = 'Request Completed';
                }else if(order.is_withdrawn_by_vendor == "3"){
                    withdrawAction = 'Request Rejected';
                }
                let vendorAmount = parseFloat(order.total) - parseFloat(order.adminCommission);
                return Object.values({
                    sno: parseInt(index) + 1,
                    orderId: order.orderNo,
                    customerName: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,
                    orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
                    total: order.total,
                    tax: order.taxCharged,
                    adminCommission: order.adminCommission,
                    vendorShare: vendorAmount,
                    action: withdrawAction,
                });
            });

            return res.render('sellerAdmin/order/orders', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },

    withdraw_earnings: async (req, res) => {
        try {
            const required = {
                // securitykey: req.headers.securitykey,
                id: req.params.id
            };
            const nonRequired = {};

            let requestData = await helper.vaildObject(required, nonRequired);

            const orderData = await models[model].findOne({
                where: {
                    id: requestData.id
                },
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });
            let dataToSubmit = {
                orderId : req.params.id,
                customerId : orderData.customerId,
                vendorId : orderData.vendorId,
            }
            const updatedItem = await helper.save(models['orderWithdrawalRequest'], dataToSubmit);
            await models[model].update({
                is_withdrawn_by_vendor: 1
            }, {
                where: {
                    id: req.params.id
                }
            });

            // return helper.success(res, 'Status Updated Successfully.', updatedItem);
            let message = `Request Sent Successfully.`;
            req.flash('flashMessage', { color: 'success', message });
            res.redirect(`/sellerAdmin/earnings`);
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },
    customerOrders: async (req, res) => {
        try {
          global.currentModule = 'Order';
          global.currentSubModule = 'Customer Orders';
          global.currentSubModuleSidebar = 'customerOrders';
    
          const { currentSubModule, currentSubModuleSidebar, from, to, customerId } = req.query;
    
          currentSubModuleSidebar
            ? global.currentSubModuleSidebar = currentSubModuleSidebar
            : global.currentSubModuleSidebar = 'customerOrders';
    
          currentSubModule
            ? global.currentSubModule = `${currentSubModule} Orders`
            : global.currentSubModule = 'Customer Orders';
    
          currentSubModule && currentSubModule
            ? global.currentModule = 'Report'
            : global.currentModule = 'Order';
    
          const model = "order";
          const modelTitle = "Order";
    
          const listing = await models[model].findAndCountAll({
       
            where: {
              ...(
                from && to
                  ? {
                    [Op.and]: [
                      sequelize.literal(`DATE(order.createdAt) >= "${from}" AND DATE(order.createdAt) < "${moment(to, "YYYY-MM-DD").add('days', 1).format("YYYY-MM-DD")}"`)
                    ]
                  } : {}
              ),
              ...(
                customerId
                  ? {
                    customerId
                  } : {}
              )
              // [Op.and]: [
              //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%'`)
              // ]
            },
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
                as: 'vendor',
                required: true,
                include: [
                  {
                    model: models['vendorDetail'],
                    attributes: {
                      include: [
                        [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                      ]
                    }
                  },
                ]
              },
            ],
            where:{
                vendorId:req.session.admin.id,
            },
            order: [['id', 'DESC']],
            raw: true,
            nest: true
          });
        //     console.log(listing,"==================");return
          const headerColumns = Object.values({
            sno: '#',
            orderId: 'Order ID',
            customerName: 'Customer',
            SellerName: 'Seller Name',
            address: 'Billing Address',
            // addressLine2: 'Address Line 2',
            // city: 'City',
            // state: 'State',
            // country: 'Country',
            // zipCode: 'Zip Code',
            orderDate: 'Order Date',
            // orderDetail:'Order Detail',
            total: 'Total',
            orderStatus: 'Order Status',
            action: 'Action',
          });
    
          const data = listing.rows.map((order, index) => {
    
    
            let orderStatusSelect = ``;
            orderStatusSelect += `<select class="changeOrderRequestStatus" model="${model}" model_title="${modelTitle}" model_id="${order.id}" field="orderStatus" style="background: ${orderStatus[order.orderStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
            for (let status in orderStatus) {
              orderStatusSelect += `<option value="${status}" ${status == order.orderStatus ? 'selected' : ''} style="background: ${orderStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" ${status < order.orderStatus ? 'disabled' : ''} >${orderStatus[status].value}</option>`;
            }
            orderStatusSelect += `</select>`;
    
            return Object.values({
              sno: parseInt(index) + 1,
              orderId: order.orderNo,
              customerName: `Name: ${order.customer.userDetail.name}<br/>
                                       Email: ${order.customer.email}`,
                                       SellerName: `Name: ${order.vendor.vendorDetail.name}<br/>
                                       Email: ${order.vendor.email}`,
              address:`Address: ${order.address}<br/>
              addressLine2: ${order.addressLine2}<br/>
              city: ${order.city}<br/>
              state: ${order.state}<br/>
              country: ${order.country}<br/>
              zipCode: ${order.zipCode}<br/>
              `,
              // addressLine2: order.addressLine2,
              // city: order.city,
              // state: order.state,
              // country: order.country,
              // zipCode: order.zipCode,
              orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
            //   orderDetail: `
            //   <a href="/sellerAdmin/orderDetail/view/${order.id}">
            //       <button type="button" class="btn btn-success">View Order Detail</button>
            //   </a>`,
              total: order.total,
              orderStatus: orderStatusSelect,
              action: `
                        <a href="/sellerAdmin/order/view/${order.id}">
                            <button type="button" class="btn btn-warning">View</button>
                        </a>`,
            });
          });
    
          return res.render('sellerAdmin/order/customerOrders', { headerColumns, data });
        } catch (err) {
          return helper.error(res, err);
        }
      },
    refundRequests: async (req, res) => {
        try {
          global.currentModule = 'Order';
          global.currentSubModule = 'Refund Requests';
          global.currentSubModuleSidebar = 'refundRequests';
    
          const model = "orderRefundRequest";
          const modelTitle = 'Order Refund Request';
    
          const listing = await models['orderRefundRequest'].findAndCountAll({
            include: [
              {
                model: models['order'],
                required: true,
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
                            [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                          ]
                        }
                      },
                    ]
                  },
                  {
    
                    model: models['user'],
                    as: 'vendor',
                    required: true,
                    include: [
                      {
                        model: models['vendorDetail'],
                        attributes: {
                          include: [
                            [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                          ]
                        }
                      },
                    ]
                  },
                ],
              }
            ],
            order: [['id', 'DESC']],
            raw: true,
            nest: true
          });
          console.log(listing, '===========================================>listing');
          // return;
    
          const headerColumns = Object.values({
            sno: '#',
            seller: 'Seller',
            customer: 'Customer',
            requestDetails: 'Request Details',
            orderDate: 'Date',
            amount: 'Amount',
            status: 'Status',
            action: 'Action'
          });
    
          const data = listing.rows.map((orderCancellationRequest, index) => {
            // const orderStatus = {
            //     0: `Pending`,
            //     1: `In Progress`,
            //     2: `Complete`,
            // }
            const orderStatus = orderStatusTexts;
    
            const orderRequestStatus = {
              0: {
                value: `Pending`,
                backgroundCssColor: `#ffc107`,
              },
              1: {
                value: `Approved`,
                backgroundCssColor: `green`,
              },
              2: {
                value: `Disapproved`,
                backgroundCssColor: `red`,
              },
            }
    
            let orderRequestSelect = ``;
            orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
            for (let status in orderRequestStatus) {
              orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
            }
            orderRequestSelect += `</select>`;
    
            return Object.values({
              sno: parseInt(index) + 1,
              seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                                Email: ${orderCancellationRequest.order.vendor.email}<br/>
                                Phone: ${orderCancellationRequest.order.vendor.vendorDetail.phone}
                                `,
              customer: `Name: ${orderCancellationRequest.order.customer.userDetail.name}<br/>
                                   Email: ${orderCancellationRequest.order.customer.email}`,
              requestDetails: `Order/Invoice: ${orderCancellationRequest.order.orderNo}<br/>
                                         Order Status: ${orderStatus[orderCancellationRequest.order.orderStatus]}<br/>
                                         Reason: ${orderCancellationRequest.reason}<br/>
                                         Comments: ${orderCancellationRequest.comments}
                                         `,
              date: moment(orderCancellationRequest.createdAt).format('dddd, MMMM Do YYYY'),
              amount: orderCancellationRequest.order.total,
              status: orderRequestSelect,
              action: `
                        <a href="/admin/order/view/${orderCancellationRequest.order.id}">
                            <button type="button" class="btn btn-warning">View</button>
                        </a>`,
              // action
            });
          });
    
          return res.render('sellerAdmin/order/refundRequests', { headerColumns, data });
        } catch (err) {
          return helper.error(res, err);
        }
      },
      withdrawalRequests: async (req, res) => {
        try {
          global.currentModule = 'Order';
          global.currentSubModule = 'Withdrawal Requests';
          global.currentSubModuleSidebar = 'withdrawalRequests';
    
          const model = "orderWithdrawalRequest";
          const modelTitle = 'Order Withdrawal Request';
    
            const rootBank= await models['bank'].findOne({
                where:{
                    userId:req.session.admin.id
                },
                include:[
                    {
                        model:models['user'],
                        as:'vendor',
                        required:true
                    }
                ]
            })
            console.log(rootBank.bankName,"=======================>>>>>>>>>>>>>>RootBank");
       


          const listing = await models['orderWithdrawalRequest'].findAndCountAll({
            include: [
              {
                model: models['order'],
                required: false,
                include: [
                  {
    
                    model: models['user'],
                    as: 'customer',
                    required: false,
                    include: [
                      {
                        model: models['userDetail'],
                        attributes: {
                          include: [
                            [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                          ]
                        }
                      },
                    ]
                  },
                  {
    
                    model: models['bankDetails'],
                    required: false,
                    on: {
                      col1: sequelize.where(sequelize.col('order.vendorId'), '=', sequelize.col('order->bankDetail.userId')),
                    },
                  },
                  {
    
                    model: models['user'],
                    as: 'vendor',
                    required: false,
                    include: [
                      {
                        model: models['vendorDetail'],
                        attributes: {
                          include: [
                            [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                          ]
                        }
                      },
                    ]
                  },
                ],
              }
            ],
            order: [['id', 'DESC']],
            raw: true,
            nest: true
          });
        //    console.log(JSON.stringify(listing), '===========================================>listing');
        //     return;
          //  for(var i in listing){
    
          //  }
          


          const headerColumns = Object.values({
            sno: '#',
            seller: 'Seller',
          //  customer: 'Customer',
           // requestDetails: 'Request Details',
            bankDetails:'Bank Details',
            orderDate: 'Date',
            amount: 'Amount',
            status: 'Status',
           // action: 'Action'
          });
    
          const data = listing.rows.map((orderCancellationRequest, index) => {
            const orderStatus = {
              0: 'Pending', 1: 'Accepted', 2: 'Packed', 3: 'Shipped', 4: 'Delivered', 5: 'Cancelled', 6: 'Declined',
            }
    
            const orderRequestStatus = {
              0: {
                value: `Pending`,
                backgroundCssColor: `#ffc107`,
              },
              1: {
                value: `Approved`,
                backgroundCssColor: `green`,
              },
              2: {
                value: `Disapproved`,
                backgroundCssColor: `red`,
              },
            }
    
            let orderRequestSelect = ``;
            orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_order_id="${orderCancellationRequest.order.id}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
            for (let status in orderRequestStatus) {
              orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" ${orderCancellationRequest.status != '0' ? 'disabled' : ''} >${orderRequestStatus[status].value}</option>`;
            }
            orderRequestSelect += `</select>`;
    
            return Object.values({
              sno: parseInt(index) + 1,
              seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                                Email: ${orderCancellationRequest.order.vendor.email}<br/>
                                Phone: ${orderCancellationRequest.order.vendor.vendorDetail.phone}
                                `,
              bankDetails: `Bank Name: ${orderCancellationRequest.order.bankDetail.accountNumber}<br/>
              Account Holder Name: ${orderCancellationRequest.order.bankDetail.name}<br/>
              BSB: ${orderCancellationRequest.order.bankDetail.bsb}<br/>
              `,
              date: moment(orderCancellationRequest.createdAt).format('dddd, MMMM Do YYYY'),
              amount: parseFloat(orderCancellationRequest.order.total) - parseFloat(orderCancellationRequest.order.adminCommission),
              status: orderRequestSelect,
    
            });
          });
    
          return res.render('sellerAdmin/order/withdrawalRequests', { headerColumns, data });
        } catch (err) {
          return helper.error(res, err);
        }
      },
    cancellationRequests: async (req, res) => {
        try {
            global.currentModule = 'Cancellation Requests';
            global.currentSubModule = '';
            global.currentSubModuleSidebar = '';

            const model = "orderCancellationRequest";
            const modelTitle = 'Order Cancel Request';

            const modulePermissions = {
                add: false,
                edit: false,
                delete: false,
                view: false,
            }

            if (!adminData.staffLogin) {
                for (let permission in modulePermissions) {
                    modulePermissions[permission] = true;
                }
            } else if (adminData.staffLogin && adminData.staffLogin.hasOwnProperty('vendorStaffDetail') && adminData.staffLogin.vendorStaffDetail.hasOwnProperty('permissions') && adminData.staffLogin.vendorStaffDetail.permissions.hasOwnProperty('cancellationRequests') && adminData.staffLogin.vendorStaffDetail.permissions['cancellationRequests'].length > 0) {
                if (adminData.staffLogin.vendorStaffDetail.permissions['cancellationRequests'].includes('add')) modulePermissions['add'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['cancellationRequests'].includes('edit')) modulePermissions['edit'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['cancellationRequests'].includes('delete')) modulePermissions['delete'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['cancellationRequests'].includes('view')) modulePermissions['view'] = true;
            }

            const listing = await models[model].findAll({
                where: {
                    vendorId: adminData.id
                },
                include: [
                    {
                        model: models['order'],
                        required: true,
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
                                                [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                                            ]
                                        }
                                    },
                                ]
                            },
                            {

                                model: models['user'],
                                as: 'vendor',
                                required: true,
                                include: [
                                    {
                                        model: models['vendorDetail'],
                                        attributes: {
                                            include: [
                                                [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                                            ]
                                        }
                                    },
                                ]
                            },
                        ],
                    }
                ],
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });
            console.log(listing, '===========================================>listing');
            // return;

            const headerColumns = Object.values({
                sno: '#',
                seller: 'Seller',
                customer: 'Customer',
                requestDetails: 'Request Details',
                orderDate: 'Date',
                amount: 'Amount',
                ...(
                    modulePermissions.edit
                        ? {
                            status: 'Status',
                        } : {}
                ),
                action: 'Action',
            });

            const data = listing.map((orderCancellationRequest, index) => {
                // const orderStatus = {
                //     0: `Pending`,
                //     1: `In Progress`,
                //     2: `Complete`,
                // }
                const orderStatus = orderStatusTexts;

                const orderRequestStatus = {
                    0: {
                        value: `Pending`,
                        backgroundCssColor: `#ffc107`,
                    },
                    1: {
                        value: `Approved`,
                        backgroundCssColor: `green`,
                    },
                    2: {
                        value: `Declined`,
                        backgroundCssColor: `red`,
                    },
                }

                let orderRequestSelect = ``;
                orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
                for (let status in orderRequestStatus) {
                    orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
                }
                orderRequestSelect += `</select>`;



                return Object.values({
                    sno: parseInt(index) + 1,
                    seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                            Email: ${orderCancellationRequest.order.vendor.email}`,
                    customer: `Name: ${orderCancellationRequest.order.customer.userDetail.name}<br/>
                               Email: ${orderCancellationRequest.order.customer.email}`,
                    requestDetails: `Order/Invoice: ${orderCancellationRequest.order.orderNo}<br/>
                                     Order Status: ${orderStatus[orderCancellationRequest.order.orderStatus]}<br/>
                                     Reason: ${orderCancellationRequest.reason}<br/>
                                     Comments: ${orderCancellationRequest.comments}
                                     `,
                    date: moment(orderCancellationRequest.createdAt).format('dddd, MMMM Do YYYY'),
                    amount: orderCancellationRequest.order.total,
                    ...(
                        modulePermissions.edit
                            ? {
                                status: orderRequestSelect,
                            } : {}
                    ),
                    action: `
                    <a href="/sellerAdmin/order/view/${orderCancellationRequest.order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
                });
            });

            return res.render('sellerAdmin/order/cancellationRequests', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    orderReturnRequests: async (req, res) => {
        try {
            global.currentModule = 'Return & Refund Requestss';
            global.currentSubModule = '';
            global.currentSubModuleSidebar = 'orderReturnRequests';

            const model = "orderRefundRequest";
            const modelTitle = 'Return & Refund Requests';

            const modulePermissions = {
                add: false,
                edit: false,
                delete: false,
                view: false,
            }

            if (!adminData.staffLogin) {
                for (let permission in modulePermissions) {
                    modulePermissions[permission] = true;
                }
            } else if (adminData.staffLogin && adminData.staffLogin.hasOwnProperty('vendorStaffDetail') && adminData.staffLogin.vendorStaffDetail.hasOwnProperty('permissions') && adminData.staffLogin.vendorStaffDetail.permissions.hasOwnProperty('orderReturnRequests') && adminData.staffLogin.vendorStaffDetail.permissions['orderReturnRequests'].length > 0) {
                if (adminData.staffLogin.vendorStaffDetail.permissions['orderReturnRequests'].includes('add')) modulePermissions['add'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orderReturnRequests'].includes('edit')) modulePermissions['edit'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orderReturnRequests'].includes('delete')) modulePermissions['delete'] = true;
                if (adminData.staffLogin.vendorStaffDetail.permissions['orderReturnRequests'].includes('view')) modulePermissions['view'] = true;
            }

            const listing = await models['orderRefundRequest'].findAndCountAll({
                where: {
                    vendorId: adminData.id
                },
                include: [
                    {
                        model: models['order'],
                        required: true,
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
                                                [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                                            ]
                                        }
                                    },
                                ]
                            },
                            {

                                model: models['user'],
                                as: 'vendor',
                                required: true,
                                include: [
                                    {
                                        model: models['vendorDetail'],
                                        attributes: {
                                            include: [
                                                [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                                            ]
                                        }
                                    },
                                ]
                            },
                        ],
                    }
                ],
                order: [['id', 'DESC']],
                raw: true,
                nest: true
            });
            console.log(listing, '===========================================>listing');
            // return;

            const headerColumns = Object.values({
                sno: '#',
                seller: 'Seller',
                customer: 'Customer',
                requestDetails: 'Request Details',
                orderDate: 'Date',
                amount: 'Amount',
                ...(
                    modulePermissions.edit
                        ? {
                            status: 'Status',
                        } : {}
                ),
                action: 'Action'
            });

            const data = listing.rows.map((orderCancellationRequest, index) => {
                const orderStatus = orderStatusTexts;
                // const orderStatus = {
                //     0: `Pending`,
                //     1: `In Progress`,
                //     2: `Complete`,
                // }

                const orderRequestStatus = {
                    0: {
                        value: `Pending`,
                        backgroundCssColor: `#ffc107`,
                    },
                    1: {
                        value: `Approved`,
                        backgroundCssColor: `green`,
                    },
                    2: {
                        value: `Declined`,
                        backgroundCssColor: `red`,
                    },
                }

                let orderRequestSelect = ``;
                orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
                for (let status in orderRequestStatus) {
                    orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
                }
                orderRequestSelect += `</select>`;

                return Object.values({
                    sno: parseInt(index) + 1,
                    seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                            Email: ${orderCancellationRequest.order.vendor.email}`,
                    customer: `Name: ${orderCancellationRequest.order.customer.userDetail.name}<br/>
                               Email: ${orderCancellationRequest.order.customer.email}`,
                    requestDetails: `Order/Invoice: ${orderCancellationRequest.order.orderNo}<br/>
                                     Order Status: ${orderStatus[orderCancellationRequest.order.orderStatus]}<br/>
                                     Reason: ${orderCancellationRequest.reason}<br/>
                                     Comments: ${orderCancellationRequest.comments}
                                     `,
                    date: moment(orderCancellationRequest.createdAt).format('dddd, MMMM Do YYYY'),
                    amount: orderCancellationRequest.order.total,
                    ...(
                        modulePermissions.edit
                            ? {
                                status: orderRequestSelect,
                            } : {}
                    ),
                    action: `
                    <a href="/sellerAdmin/order/view/${orderCancellationRequest.order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
                    // action
                });
            });

            return res.render('sellerAdmin/order/orderReturnRequests', { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    findOneOrder: async (id) => {
        let order = await models['order'].findOne({
            where: {
                id
            },
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
                    as: 'vendor',
                    required: true,
                    include: [
                        {
                            model: models['vendorDetail'],
                            attributes: {
                                include: [
                                    [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                                ]
                            }
                        },
                    ]
                },
                {

                    model: models['orderItem'],
                    required: false,
                    include: [
                        {
                            model: models['product'],
                            required: true,
                            attributes: {
                                include: [
                                    [sequelize.literal(`(IF (\`orderItems->product\`.\`image\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`orderItems->product\`.\`image\`)) )`), 'image']
                                ]
                            }
                        }
                    ]
                },
            ],
        });

        if (!order) throw "Invalid orderId.";
        return order.toJSON();


    },
}