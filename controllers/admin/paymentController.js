const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const payments = require('../../models/payments');
const { Op } = sequelize;

const prefixBaseName = 'admin';
const model = 'payment';
const modelBaseName = 'payment';
const modelTitle = 'payment';

const modelDataTable = '';

module.exports = {
    listing: async (req, res) => {
        try {
            global.currentModule = modelTitle;
            global.currentSubModule = 'Listing';
            global.currentSubModuleSidebar = 'listing';

            const listing = await models[model].findAll({
                attributes: {
                 
                },
                order: [['id', 'DESC']],
                // hierarchy: true,
                raw: true,
            });

            //console.log(JSON.stringify(listing, null, 2), '===============>listing');
            //return;


            // console.log(JSON.stringify(listing, null, 2), '======================================>listing');
            // return;
            // const parent = await module.exports.getParent();

            // const parentCategoryObj = {};
            
            // if (parent.length > 0) {
            //     parent.forEach(child => {
            //         parentCategoryObj[child.value] = child.label;
            //     });
            // }

            const data = await Promise.all(listing.map(async (row, index) => {
                const statusButton = {
                    0: `<button model_id="${row.id}" model="${model}" status="${row.status}" class="btn btn-outline-danger status_btn" >Unsuccessful</button>`,
                    1: `<button model_id="${row.id}" model="${model}" status="${row.status}" class="btn btn-outline-success status_btn" >Successful</button>`,
                    2: `<button model_id="${row.id}" model="${model}" status="${row.status}" class="btn btn-outline-dark status_btn" >Pending</button>`,
                }


                // const viewButton = `<a href="/${prefixBaseName}/${modelBaseName}/view/${row.id}" class="btn btn-outline-info" >View</a>`;
                // const editButton = `<a href="/${prefixBaseName}/${modelBaseName}/edit/${row.id}" class="btn btn-outline-warning" >Edit</a>`;
                // const deleteButton = `<button model_id="${row.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

           

                return Object.values({

                    userId:row.userId,
                    sellerId:row.sellerId,
                    bookingId:row.bookingId,
                    transactionid:row.transactionId,
                    sellerName:row.sellerName,
                    userName:row.userName,
                    amount:row.amount,
                    status:row.status,
                    status: statusButton[row.status],
                    dateCreated: moment(row.createdAt).format('dddd, MMMM Do YYYY'),
               
                });
            }));
            

            const headerColumns = Object.values({
                userId:'userId',
                sellerId:'sellerId',
                bookingId:'bookingId',
                transactionId:'transactionId',
                sellerName:'sellerName',
                userName:'userName',
                amount:'amount',
                status:'status',
                DateCreated:'dateCreated'
            });

            return res.render(`${prefixBaseName}/${modelBaseName}/listing`, { headerColumns, data });
        } catch (err) {
            return helper.error(res, err);
        }
    },
}