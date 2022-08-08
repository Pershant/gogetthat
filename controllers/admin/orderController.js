const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const {
  request
} = require('express');
const {
  Op
} = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

global.model = "order";
global.modelTitle = "Order";
global.modelDataTable = "orderDataTable";

// const approvalStatusObj = {
//   0: {
//     value: `Pending`,
//     backgroundCssColor: `red`,
//   },
//   1: {
//     value: `Approval`,
//     backgroundCssColor: `#0ede07`,
//   },
// }
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

module.exports = {
  view: async (req, res) => {
    try {
      global.currentModule = 'Order';
      global.currentSubModuleSidebar = 'View';

      const order = await module.exports.findOneOrder(req.params.id);

      // console.log(order,"order");return

      order.orderStatusText = orderStatusTexts[order.orderStatus];

      return res.render('admin/order/view', {
        order,
        orderStatus
      });
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

      const {
        currentSubModule,
        currentSubModuleSidebar,
        from,
        to,
        customerId,
        vendorId
      } = req.query;

      currentSubModuleSidebar
        ?
        global.currentSubModuleSidebar = currentSubModuleSidebar :
        global.currentSubModuleSidebar = 'orders';

      currentSubModule
        ?
        global.currentSubModule = `${currentSubModule} Orders` :
        global.currentSubModule = 'Orders';

      const listing = await models[model].findAndCountAll({
        where: {
          ...(
            from && to ?
              {
                [Op.and]: [
                  sequelize.literal(`DATE(order.createdAt) >= "${from}" AND DATE(order.createdAt) < "${moment(to, "YYYY-MM-DD").add('days', 1).format("YYYY-MM-DD")}"`)
                ]
              } : {}
          ),
          ...(
            customerId ?
              {
                customerId
              } : {}
          ),
          ...(
            vendorId ?
              {
                vendorId
              } : {}
          ),
          // [Op.and]: [
          //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%' || vendor.email LIKE '%${search.value}%' || \`vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          // ]
        },
        include: [{

          model: models['user'],
          as: 'customer',
          required: true,
          include: [{
            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        {

          model: models['user'],
          as: 'vendor',
          required: true,
          include: [{
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        ],
        order: [
          ['id', 'DESC']
        ],
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
        address: 'Address',
        orderDate: 'Order Date',
        total: 'Total',
        orderStatus: 'Order Status',
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
          seller: `Name: ${order.vendor.vendorDetail.name}<br/>
                            Email: ${order.vendor.email}<br/>
                            Phone: ${order.vendor.vendorDetail.phone}
                            `,
          customer: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,

          // address:`Address:${order.customer.userDetail.address}`,
          orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
          total: order.total,
          orderStatus: orderStatusSelect,
          action: `
                    <a href="/admin/order/view/${order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
          // action
        });
      });

      return res.render('admin/order/sellerOrders', {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  customerOrders: async (req, res) => {
    try {
      global.currentModule = 'Order';
      global.currentSubModule = 'Customer Orders';
      global.currentSubModuleSidebar = 'customerOrders';

      const {
        currentSubModule,
        currentSubModuleSidebar,
        from,
        to,
        customerId
      } = req.query;

      currentSubModuleSidebar
        ?
        global.currentSubModuleSidebar = currentSubModuleSidebar :
        global.currentSubModuleSidebar = 'customerOrders';

      currentSubModule
        ?
        global.currentSubModule = `${currentSubModule} Orders` :
        global.currentSubModule = 'Customer Orders';

      currentSubModule && currentSubModule ?
        global.currentModule = 'Report' :
        global.currentModule = 'Order';

      const model = "order";
      const modelTitle = "Order";

      const listing = await models[model].findAndCountAll({
        // attributes: {
        //   include: [
        //     [sequelize.literal('ifnull((SELECT productId FROM orderItem WHERE orderId = order.id limit 1),0)'), 'productId']
        //   ]
        // },
        where: {
          ...(
            from && to ?
              {
                [Op.and]: [
                  sequelize.literal(`DATE(order.createdAt) >= "${from}" AND DATE(order.createdAt) < "${moment(to, "YYYY-MM-DD").add('days', 1).format("YYYY-MM-DD")}"`)
                ]
              } : {}
          ),
          ...(
            customerId ?
              {
                customerId
              } : {}
          )
          // [Op.and]: [
          //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%'`)
          // ]
        },
        include: [{

          model: models['user'],
          as: 'customer',
          required: true,
          include: [{
            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        {

          model: models['user'],
          as: 'vendor',
          required: true,
          include: [{
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        ],
        order: [
          ['id', 'DESC']
        ],
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
        // orderDetail: 'Order Detail',
        total: 'Total',
        orderStatus: 'Order Status',
        action: 'Action',
        add_trackingId_url: 'Add tracker Url',

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
          address: `Address: ${order.address}<br/>
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
          // orderDetail: `
          // <a href="/admin/orderDetail/view/${order.id}">
          //     <button type="button" class="btn btn-success">View Order Detail</button>
          // </a>`,
          total: order.netAmount,
          orderStatus: orderStatusSelect,
          action: `
                    <a href="/admin/order/view/${order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
          add_trackingId_url: `
                    <a href="/admin/order/edit/${order.id}">
                        <button type="button" class="btn btn-primary">Add Tracker</button>
                    </a>`,

        });
      });

      return res.render('admin/order/customerOrders', {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  sellerOrders: async (req, res) => {
    try {
      global.currentModule = 'Order';
      global.currentSubModule = 'Seller Orders';
      global.currentSubModuleSidebar = 'sellerOrders';

      const model = "order";
      const modelTitle = "Order";

      const {
        currentSubModule,
        currentSubModuleSidebar,
        from,
        to,
        vendorId
      } = req.query;

      currentSubModuleSidebar
        ?
        global.currentSubModuleSidebar = currentSubModuleSidebar :
        global.currentSubModuleSidebar = 'sellerOrders';

      currentSubModule
        ?
        global.currentSubModule = `${currentSubModule} Orders` :
        global.currentSubModule = 'Seller Orders';

      currentSubModule && currentSubModule ?
        global.currentModule = 'Report' :
        global.currentModule = 'Order';

      const listing = await models[model].findAndCountAll({
        where: {
          ...(
            from && to ?
              {
                [Op.and]: [
                  sequelize.literal(`DATE(order.createdAt) >= "${from}" AND DATE(order.createdAt) < "${moment(to, "YYYY-MM-DD").add('days', 1).format("YYYY-MM-DD")}"`)
                ]
              } : {}
          ),
          ...(
            vendorId ?
              {
                vendorId
              } : {}
          )
          // [Op.and]: [
          //     sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%' || vendor.email LIKE '%${search.value}%' || \`vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          // ]
        },
        include: [{

          model: models['user'],
          as: 'customer',
          required: true,
          include: [{
            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        {

          model: models['user'],
          as: 'vendor',
          required: true,
          include: [{
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        ],
        order: [
          ['id', 'DESC']
        ],
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
        orderStatus: 'Order Status',
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
          orderStatus: orderStatusSelect,
          action: `
                    <a href="/admin/order/view/${order.id}">
                        <button type="button" class="btn btn-warning">View</button>
                    </a>`,
          // action
        });
      });

      return res.render('admin/order/sellerOrders', {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  cancellationRequests: async (req, res) => {
    try {
      global.currentModule = 'Order';
      global.currentSubModule = 'Cancellation Requests';
      global.currentSubModuleSidebar = 'cancellationRequests';

      const model = "orderCancellationRequest";
      const modelTitle = 'Order Cancellation Request';

      const listing = await models[model].findAndCountAll({
        include: [{
          model: models['order'],
          required: true,
          include: [{

            model: models['user'],
            as: 'customer',
            required: true,
            include: [{
              model: models['userDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          {

            model: models['user'],
            as: 'vendor',
            required: true,
            include: [{
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          ],
        }],
        order: [
          ['id', 'DESC']
        ],
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
        action: 'Action',
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
        orderRequestSelect += `<select class="changeOrderRequestStatus" current_value="${orderCancellationRequest.status}" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
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
        });
      });

      return res.render('admin/order/cancellationRequests', {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  // withdrawalRequests: async (req, res) => {
  //   try {
  //     global.currentModule = 'Order';
  //     global.currentSubModule = 'Withdrawal Requests';
  //     global.currentSubModuleSidebar = 'withdrawalRequests';

  //     const model = "wallet";
  //     const modelTitle = 'Order Withdrawal Request';

  //     const listing = await models[model].findAndCountAll({

  //       order: [['id', 'DESC']],
  //       raw: true,
  //       // nest: true
  //     });

  //     console.log(JSON.stringify(listing), '===========================================>listing');    








  //     const headerColumns = Object.values({
  //       sno: '#',
  //       seller: 'Seller',
  //       bankDetails:'Bank Details',
  //       orderDate: 'Date',
  //       amount: 'Amount',
  //       status: 'Status',
  //      // action: 'Action'
  //     });

  //     const data = listing.rows.map((orderCancellationRequest, index) => {




  //       return Object.values({
  //         sno: parseInt(index) + 1,
  //         // seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
  //         //                   Email: ${orderCancellationRequest.order.vendor.email}<br/>
  //         //                   Phone: ${orderCancellationRequest.order.vendor.vendorDetail.phone}
  //         //                   `,
  //         email: row.vendor.email,
  //         bankName:rootBank.bankName,
  //         bsb:rootBank.bsb,
  //         withdrawAmount:rows.withdraw_amount,
  //         date: moment(orderCancellationRequest.createdAt).format('dddd, MMMM Do YYYY'),
  //         status: orderRequestSelect,

  //       });
  //     });

  //     return res.render('admin/order/withdrawalRequests', { headerColumns, data });
  //   } catch (err) {
  //     return helper.error(res, err);
  //   }
  // },
  withdrawalRequests: async (req, res) => {
    try {
      global.currentModule = modelTitle;
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';

      const model = 'wallet'

      const listing = await models[model].findAndCountAll({
        order: [['id', 'DESC']],
        include: [{
          model: models['bank'],

        },
        {
          model: models['user'],
          as: 'vendor',
          include: [{
            model: models['vendorDetail'],

          },],

          required: true
        },
        ],

      })

      let dataArr = listing.rows.map(data => data.toJSON());


      const data = await Promise.all(dataArr.map(async (row, index) => {
        const statusButton = {
          0: `<button model_id="${row.id}" model="${model}" status="${row.status}" class="btn btn-outline-danger status_change" >Pending</button>`,
          1: `<button model_id="${row.id}" model="${model}" status="${row.status}" class=" btn btn-outline-success status_change" disabled>Approved</button>`,
        }

        // console.log(statusButton,"=======.StatusButton") // let string = `` // for (let i in approvalStatusObj) { //   string += `<option value ='${i}'>${approvalStatusObj[i].value}</option>` // } // let text = `<select>${string}</select>` return Object.values({ // username: row.vendor.username, email: row.vendor.email, bankName: row.bank.bankName, bsb: row.bank.bsb, withdrawAmount: row.withdraw_amount, status: statusButton[row.status] }); }));
        // console.log(statusButton,"=======.StatusButton")
        // let string = ``
        // for (let i in approvalStatusObj) {
        //   string += `<option value ='${i}'>${approvalStatusObj[i].value}</option>`
        // }
        // let text = `<select>${string}</select>`


        return Object.values({
          // username: row.vendor.username,
          email: row.vendor.email,
          bankName: row.bank.bankName,
          bsb: row.bank.bsb,
          withdrawAmount: row.withdraw_amount,
          status: statusButton[row.status]
        });
      }));
      // console.log(rootBank, "============>>>>>");


      const headerColumns = Object.values({
        // username: "Seller Name",
        email: "Seller Email",
        bankName: 'Bank name',
        bsb: 'BSB',
        // balance:"Current Balance",
        withdrawAmount: 'Withdraw Amount',
        status: "Status",
      });
      return res.render('admin/order/withdrawalRequests', {
        headerColumns,
        data
      });

    } catch (err) {
      return helper.error(res, err);
    }
  },
  approvalStatus: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        id: req.body.id,
        status: req.body.status,
        model: req.body.model
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);
      // console.log(requestData,'=================herer');return
      const updatedItem = await helper.save(models[requestData.model], requestData, true);

      return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
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
        include: [{
          model: models['order'],
          required: true,
          include: [{

            model: models['user'],
            as: 'customer',
            required: true,
            include: [{
              model: models['userDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          {

            model: models['user'],
            as: 'vendor',
            required: true,
            include: [{
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          ],
        }],
        order: [
          ['id', 'DESC']
        ],
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

      return res.render('admin/order/refundRequests', {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  customerOrderDataTable: async (req, res) => {
    try {
      const model = "order";
      const modelTitle = "Order";
      const queryParameters = req.query;
      const {
        draw,
        search,
        start,
        length
      } = queryParameters;
      // console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {

        }
      });

      const listing = await models[model].findAndCountAll({
        where: {
          [Op.and]: [
            sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%'`)
          ]
        },
        include: [{

          model: models['user'],
          as: 'customer',
          required: true,
          include: [{
            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        {

          model: models['user'],
          as: 'vendor',
          required: true,
          include: [{
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        ],
        order: [
          ['id', 'DESC']
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      console.log(listing, '===========================================>listing');
      // return;
      let responseData = [];
      const data = listing.rows.map((order, index) => {

        // const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        // action += viewButton;
        // action += '&nbsp;';
        // action += editButton;
        // action += '&nbsp;';
        // action += deleteButton;

        // const orderStatus = {
        //     0: `<div class="badge badge-danger">Pending</div>`,
        //     1: `<div class="badge badge-warning">In Progress</div>`,
        //     2: `<div class="badge badge-success">Complete</div>`,
        // }

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
          sno: parseInt(start) + parseInt(index) + 1,
          orderId: order.orderNo,
          customerName: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,
          orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
          total: order.total,
          orderStatus: orderStatusSelect,
          // action
        });
      });

      // console.log(data, '=======================>data');
      // console.log(recordsTotal, '=======================>recordsTotal');

      responseData = {
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: listing.count,
        data
      }

      return res.send(responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  sellerOrderDataTable: async (req, res) => {
    try {
      const model = "order";
      const modelTitle = "Order";
      const queryParameters = req.query;
      const {
        draw,
        search,
        start,
        length
      } = queryParameters;
      // console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {

        }
      });

      const listing = await models[model].findAndCountAll({
        where: {

          [Op.and]: [
            sequelize.literal(`order.orderNo LIKE '%${search.value}%' || customer.email LIKE '%${search.value}%' || \`customer->userDetail\`.\`name\` LIKE '%${search.value}%' || vendor.email LIKE '%${search.value}%' || \`vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          ]
        },
        include: [{

          model: models['user'],
          as: 'customer',
          required: true,
          include: [{
            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        {

          model: models['user'],
          as: 'vendor',
          required: true,
          include: [{
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
              ]
            }
          },]
        },
        ],
        order: [
          ['id', 'DESC']
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      console.log(listing, '===========================================>listing');
      // return;
      let responseData = [];
      const data = listing.rows.map((order, index) => {

        // const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        // action += viewButton;
        // action += '&nbsp;';
        // action += editButton;
        // action += '&nbsp;';
        // action += deleteButton;

        // const orderStatus = {
        //     0: `<div class="badge badge-danger">Pending</div>`,
        //     1: `<div class="badge badge-warning">In Progress</div>`,
        //     2: `<div class="badge badge-success">Complete</div>`,
        // }

        const orderStatus = {
          0: {
            value: `Pending`,
            backgroundCssColor: `red`,
          },
          1: {
            value: `In Progress`,
            backgroundCssColor: `#ffc107`,
          },
          2: {
            value: `Complete`,
            backgroundCssColor: `green`,
          },
        }

        let orderStatusSelect = ``;
        orderStatusSelect += `<select class="changeOrderRequestStatus" model="${model}" model_title="${modelTitle}" model_id="${order.id}" field="orderStatus" style="background: ${orderStatus[order.orderStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
        for (let status in orderStatus) {
          orderStatusSelect += `<option value="${status}" ${status == order.orderStatus ? 'selected' : ''} style="background: ${orderStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" ${status < order.orderStatus ? 'disabled' : ''} >${orderStatus[status].value}</option>`;
        }
        orderStatusSelect += `</select>`;

        return Object.values({
          sno: parseInt(start) + parseInt(index) + 1,
          orderId: order.orderNo,
          seller: `Name: ${order.vendor.vendorDetail.name}<br/>
                            Email: ${order.vendor.email}<br/>
                            Phone: ${order.vendor.vendorDetail.phone}
                            `,
          customer: `Name: ${order.customer.userDetail.name}<br/>
                                   Email: ${order.customer.email}`,
          orderDate: moment(order.createdAt).format('dddd, MMMM Do YYYY'),
          total: order.total,
          orderStatus: orderStatusSelect,
          // action
        });
      });

      // console.log(data, '=======================>data');
      // console.log(recordsTotal, '=======================>recordsTotal');

      responseData = {
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: listing.count,
        data
      }

      return res.send(responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  cancellationRequestsDataTable: async (req, res) => {
    try {
      const model = "orderCancellationRequest";
      const modelTitle = 'Order Cancellation Request';
      const queryParameters = req.query;
      const {
        draw,
        search,
        start,
        length
      } = queryParameters;
      // console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {

        }
      });

      const listing = await models[model].findAndCountAll({
        where: {

          [Op.and]: [
            sequelize.literal(`order.orderNo LIKE '%${search.value}%' || \`order->customer\`.\`email\` LIKE '%${search.value}%' || \`order->customer->userDetail\`.\`name\` LIKE '%${search.value}%' || \`order->vendor\`.\`email\` LIKE '%${search.value}%' || \`order->vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          ]
        },
        include: [{
          model: models['order'],
          required: true,
          include: [{

            model: models['user'],
            as: 'customer',
            required: true,
            include: [{
              model: models['userDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          {

            model: models['user'],
            as: 'vendor',
            required: true,
            include: [{
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          ],
        }],
        order: [
          ['id', 'DESC']
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      console.log(listing, '===========================================>listing');
      // return;
      let responseData = [];
      const data = listing.rows.map((orderCancellationRequest, index) => {

        // const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        // action += viewButton;
        // action += '&nbsp;';
        // action += editButton;
        // action += '&nbsp;';
        // action += deleteButton;

        const orderStatus = {
          0: `Pending`,
          1: `In Progress`,
          2: `Complete`,
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
        // const orderCancellationRequestStatus = {
        //     0: `<div class="badge badge-warning">Pending</div>`,
        //     1: `<div class="badge badge-success">Approved</div>`,
        //     2: `<div class="badge badge-danger">Disapproved</div>`,
        // }

        let orderRequestSelect = ``;
        orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
        for (let status in orderRequestStatus) {
          orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
        }
        orderRequestSelect += `</select>`;



        return Object.values({
          sno: parseInt(start) + parseInt(index) + 1,
          seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                            Email: ${orderCancellationRequest.order.vendor.email}<br/>`,
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
          // action
        });
      });

      // console.log(data, '=======================>data');
      // console.log(recordsTotal, '=======================>recordsTotal');

      responseData = {
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: listing.count,
        data
      }

      return res.send(responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  withdrawalRequestsDataTable: async (req, res) => {
    try {
      const model = "orderWithdrawalRequest";
      const modelTitle = 'Order Withdrawal Request';
      const queryParameters = req.query;
      const {
        draw,
        search,
        start,
        length
      } = queryParameters;
      // console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {

        }
      });

      const listing = await models['orderWithdrawalRequest'].findAndCountAll({
        where: {

          [Op.and]: [
            sequelize.literal(`order.orderNo LIKE '%${search.value}%' || \`order->customer\`.\`email\` LIKE '%${search.value}%' || \`order->customer->userDetail\`.\`name\` LIKE '%${search.value}%' || \`order->vendor\`.\`email\` LIKE '%${search.value}%' || \`order->vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          ]
        },
        include: [{
          model: models['order'],
          required: true,
          include: [{

            model: models['user'],
            as: 'customer',
            required: true,
            include: [{
              model: models['userDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          {

            model: models['user'],
            as: 'vendor',
            required: true,
            include: [{
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          ],
        }],
        order: [
          ['id', 'DESC']
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      console.log(listing, '===========================================>listing');
      // return;
      let responseData = [];
      const data = listing.rows.map((orderCancellationRequest, index) => {

        // const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        // action += viewButton;
        // action += '&nbsp;';
        // action += editButton;
        // action += '&nbsp;';
        // action += deleteButton;

        const orderStatus = {
          0: `Pending`,
          1: `In Progress`,
          2: `Complete`,
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
        orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
        for (let status in orderRequestStatus) {
          orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
        }
        orderRequestSelect += `</select>`;

        return Object.values({
          sno: parseInt(start) + parseInt(index) + 1,
          seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                            Email: ${orderCancellationRequest.order.vendor.email}<br/>`,
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
          // action
        });
      });

      // console.log(data, '=======================>data');
      // console.log(recordsTotal, '=======================>recordsTotal');

      responseData = {
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: listing.count,
        data
      }

      return res.send(responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  refundRequestsDataTable: async (req, res) => {
    try {
      const model = "orderRefundRequest";
      const modelTitle = 'Order Refund Request';
      const queryParameters = req.query;
      const {
        draw,
        search,
        start,
        length
      } = queryParameters;
      // console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {

        }
      });

      const listing = await models['orderRefundRequest'].findAndCountAll({
        where: {

          [Op.and]: [
            sequelize.literal(`order.orderNo LIKE '%${search.value}%' || \`order->customer\`.\`email\` LIKE '%${search.value}%' || \`order->customer->userDetail\`.\`name\` LIKE '%${search.value}%' || \`order->vendor\`.\`email\` LIKE '%${search.value}%' || \`order->vendor->vendorDetail\`.\`name\` LIKE '%${search.value}%'`)
          ]
        },
        include: [{
          model: models['order'],
          required: true,
          include: [{

            model: models['user'],
            as: 'customer',
            required: true,
            include: [{
              model: models['userDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->customer->userDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          {

            model: models['user'],
            as: 'vendor',
            required: true,
            include: [{
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`order->vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`order->vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },]
          },
          ],
        }],
        order: [
          ['id', 'DESC']
        ],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      console.log(listing, '===========================================>listing');
      // return;
      let responseData = [];
      const data = listing.rows.map((orderCancellationRequest, index) => {

        // const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        // action += viewButton;
        // action += '&nbsp;';
        // action += editButton;
        // action += '&nbsp;';
        // action += deleteButton;

        const orderStatus = {
          0: `Pending`,
          1: `In Progress`,
          2: `Complete`,
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
        orderRequestSelect += `<select class="changeOrderRequestStatus" field="status" model="${model}" model_title="${modelTitle}" model_id="${orderCancellationRequest.id}" style="background: ${orderRequestStatus[orderCancellationRequest.status].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
        for (let status in orderRequestStatus) {
          orderRequestSelect += `<option value="${status}" ${status == orderCancellationRequest.status ? 'selected' : ''} style="background: ${orderRequestStatus[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${orderRequestStatus[status].value}</option>`;
        }
        orderRequestSelect += `</select>`;

        return Object.values({
          sno: parseInt(start) + parseInt(index) + 1,
          seller: `Name: ${orderCancellationRequest.order.vendor.vendorDetail.name}<br/>
                            Email: ${orderCancellationRequest.order.vendor.email}<br/>`,
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
          // action
        });
      });

      // console.log(data, '=======================>data');
      // console.log(recordsTotal, '=======================>recordsTotal');

      responseData = {
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: listing.count,
        data
      }

      return res.send(responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  addUpdateUser: async (req, res) => {
    try {
      const required = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };
      const nonRequired = {
        id: req.body.id,
        password: req.body.password,
        image: req.files && req.files.image
        // countryCode: req.body.countryCode,
        // phone: req.body.phone,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      // requestData.countryCodePhone = `${requestData.countryCode}${requestData.phone}`;

      if (requestData.hasOwnProperty('password') && requestData.password) {
        requestData.password = helper.bcryptHash(requestData.password);
      }

      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, 'users');
      }


      const userId = await helper.save(models[model], requestData);
      const user = await module.exports.findOneUser(userId);

      user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      requestData.userId = user.id;

      await helper.save(models[userRoleModels[user.role]], requestData);

      let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? 'Updated' : 'Added'} Successfully.`;

      req.flash('flashMessage', {
        color: 'success',
        message
      });
      res.redirect('/admin/user/listing');
      // return helper.success(res, message, user);    
    } catch (err) {
      return helper.error(res, err);
    }
  },
  searchUsersListing: async (req, res) => {
    try {
      const required = {
        securitykey: req.headers.securitykey,
        search: req.body.search,
        limit: req.body.limit,
        page: req.body.page,
        linksLength: req.body.linksLength || 7
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired);

      const limit = parseInt(requestData.limit);
      const offset = (parseInt(requestData.page) - 1) * limit;
      const getUsers = await User.findAndCountAll({
        where: {
          role: 1,
          [Op.or]: [{
            name: {
              [Op.like]: `%${requestData.search}%`
            }
          },
          {
            email: {
              [Op.like]: `%${requestData.search}%`
            }
          },
          {
            phone: {
              [Op.like]: `%${requestData.search}%`
            }
          },
          ]
        },
        attributes: [
          'id',
          'role',
          'status',
          'name',
          'email',
          'password',
          'image',
          'countryCode',
          'phone',
          'countryCodePhone',
          'address',
          'latitude',
          'longitude',
          sequelize.literal(`IF (image='', '', CONCAT("${req.protocol}://${req.get('host')}/uploads/users/",image)) as image`),
          'createdAt',
          'updatedAt',
        ],
        limit: limit,
        offset: offset,
        order: [
          ['id', 'DESC']
        ],
        raw: true
      });

      // Arguments are `per_page` and `length`. `per_page` changes the number of
      // results per page, `length` changes the number of links displayed.
      const paginator = new Paginator(limit, requestData.linksLength);

      // Arguments are `total_results` and `current_page`. 
      const pagination = paginator.build(getUsers.count, requestData.page);

      const responseData = {
        ...getUsers,
        pagination
      };
      return helper.success(res, 'User listing Searched Successfully.', responseData);
    } catch (err) {
      return helper.error(res, err);
    }
  },
  findOneOrder: async (id) => {
    return await models['order'].findOne({
      attributes: {
        include: [
          [sequelize.literal('ifnull((SELECT productId FROM orderItem WHERE orderId = order.id limit 1),0)'), 'productId']
        ]
      },
      where: {
        id
      },
      include: [{

        model: models['user'],
        as: 'customer',
        required: true,
        include: [{
          model: models['userDetail'],
          attributes: {
            include: [
              [sequelize.literal(`(IF (\`customer->userDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`customer->userDetail\`.\`image\`)) )`), 'image']
            ]
          }
        },]
      },
      {

        model: models['user'],
        as: 'vendor',
        required: true,
        include: [{
          model: models['vendorDetail'],
          attributes: {
            include: [
              [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
            ]
          }
        },]
      },
      ],
      raw: true,
      nest: true,
    });
  },
  orderDetailView: async function (req, res) {
    try {
      //console.log(req.params,"req.params.id");return
      let getOrderDetail = await models['order'].findOne({
        attributes: ['orderNo', 'orderJson'],
        where: {
          id: req.params.id
        },
        raw: true
      });
      if (getOrderDetail) {

        var dataNew = JSON.parse(getOrderDetail.orderJson)
      } else {
        var dataNew = ''
      }
      // console.log(JSON.parse(getOrderDetail.orderJson),"JSON.parse(getOrderDetail.orderJson)");return
      return res.render('admin/order/orderDetail', {
        response: dataNew,
        orderNo: getOrderDetail.orderNo
      });
    } catch (error) {
      console.log(error)
    }
  },
  edit_order: async (req, res) => {
    try {
      global.currentModule = 'Order';
      global.currentSubModuleSidebar = 'View';
      var order_detail = await module.exports.findOneOrder(req.params.id);
      console.log(order_detail, '=======================orderDetail================r');
      // return res.json(order_detail)
      res.render('admin/order/add_tracker', {
        order_detail
      });
    } catch (error) {
      return helper.error(res, error)
    }
  },
  update_order: async (req, res) => {
    try {
      console.log(req.body, '=======================herer');
      let upadate_order = await models['order'].update({
        order_tracking_id: req.body.order_tracking_id,
        order_tracking_url: req.body.order_tracking_url
      }, {
        where: {
          id: req.body.id
        }
      })
      req.flash('flashMessage', {
        color: 'success',
        message:"Order tracker url and id added to the order"
      });
      res.redirect('/admin/order/customerOrders');
    } catch (error) {
      return helper.error(res, error)
    }
  }
}