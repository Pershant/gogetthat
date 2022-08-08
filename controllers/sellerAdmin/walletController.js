const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const {
  request
} = require('express');
const {
  uploadImage
} = require('../../helpers/helper');
const {
  Op
} = sequelize;

const prefixBaseName = "sellerAdmin";
const modelBaseName = "wallet";
const model = "wallet";
global.modelTitle = "Withdraw Requests";
global.modelDataTable = "walletDataTable";

const approvalStatusObj = {
  0: {
    value: `Pending`,
    backgroundCssColor: `red`,
  },
  1: {
    value: `Approval`,
    backgroundCssColor: `#0ede07`,
  },
}

module.exports = {
  listing: async (req, res) => {
    try {
      global.currentModule = modelTitle;
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';



      const listing = await models[model].findAndCountAll({
        order: [['id', 'DESC']],
        where: {
          vendorId: req.session.admin.id
        },

        include: [{
            model: models['user'],
            as: 'vendor',
            include: [{
              model: models['vendorDetail'],

            }, ],

            required: true
          },
          {
            model: models['bank'],
            required: true
          }

        ],

      });



      let dataArr = listing.rows


      const data = await Promise.all(dataArr.map(async (row, index) => {
        row = row.toJSON()
        console.log(row)
        const statusButton = {
          0: `<div class="badge badge-warning">Pending</div>`,
          1: `<div class="badge badge-success">Approved</div>`,
        }








        return Object.values({
          // username: row.vendor.username,
          email: row.vendor.email,
          bankName: row.bank.bankName,
          bsb: row.bank.bsb,

          withdrawAmount: row.withdraw_amount,
          status: statusButton[row.status]
        });
      }));


      const headerColumns = Object.values({
        // username: "Seller Name",
        email: "Seller Email",
        bankName: 'Bank name',
        bsb: 'BSB',
        // balance:"Current Balance",
        withdrawAmount: 'Withdraw Amount',
        status: "Status",

      });

      return res.render(`${prefixBaseName}/${modelBaseName}/listing`, {
        headerColumns,
        data
      });
    } catch (err) {
      return helper.error(res, err);
    }
  },
}