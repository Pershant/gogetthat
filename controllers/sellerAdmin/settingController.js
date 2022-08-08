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

const model = "setting";
global.modelTitle = "Setting"

module.exports = {
    setting: async (req, res) => {
        try {
            global.currentModule = 'Setting';
            global.currentSubModuleSidebar = '';

            const admin = req.session.admin;

            const settingData = await models[model].findAll({
                raw: true
            });

            const rootBank = await models['bank'].findAll({

                where: {
                    userId: req.session.admin.id,
                    isDeleted: 0
                },
                raw: true
            });



            const rootWallet = await models['user'].findOne({
                where: {
                    id: req.session.admin.id,
                },
                raw: true
            })
            console.log(rootWallet, '================>Anshuman');
            //    return


            const settings = {};
            settingData.forEach(setting => {
                settings[setting.name] = setting.value;
            });
            console.log(settings, '===============>settings');

            return res.render('sellerAdmin/setting/index', {
                admin,
                settingData,
                rootBank,
                rootWallet,
                settings
            });
        } catch (err) {
            return helper.error(res, err);
        }
    },
    updateSettings: async (req, res) => {
        try {
            global.currentModule = 'Setting';
            global.currentSubModuleSidebar = '';

            const requestData = helper.clone(req.body);
            console.log(requestData, '=============>requestData');

            const {
                moduleName
            } = requestData;
            delete requestData.moduleName;

            const settingData = await models[model].findAll({
                raw: true
            });
            const settingsIds = {};
            settingData.forEach(setting => {
                settingsIds[setting['name']] = setting.id;
            });

            let updateArray = [];
            for (let i in requestData) {
                updateArray.push({
                    id: settingsIds[i],
                    name: i,
                    value: requestData[i]
                });
            }
            console.log(updateArray, '=============================>updateArray');

            await models[model].bulkCreate(updateArray, {
                updateOnDuplicate: ["value"]
            });

            return helper.success(res, `${moduleName} updated successfully`, {});
        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },

    withdrawMyCredit: async (req, res) => {
        try {


           
            if (parseFloat(req.body.amount) > parseFloat(req.body.wAmount)) {
                // console.log("innnnnnnnnnnnn");
                //  req.flash('flashMessage', { color: 'danger',message: "YOu do not have enough balance to withdraw!"})
                req.flash('flashMessage', {
                    color: 'error',
                    message: 'YOu do not have enough balance to withdraw!'
                });

                res.redirect(`/sellerAdmin/setting#myCredit`);
                return
            } else {

                //    let updateSuccess = await models['wallet'].update(
                //     { balance: sequelize.literal(`balance - ${req.body.amount}`) },
                //     {withdraw_amount: sequelize.literal(`${req.body.amount}`)},

                //     { where: {  vendorId: req.session.admin.id } },

                //   );


                //   let updateSuccess = await models['wallet'].update({
                //     withdraw_amount:req.body.amount,
                //     balance:parseFloat(vendor.balance)-parseFloat(req.body.amount)
                //   },{
                //       where:{
                //         vendorId: req.session.admin.id
                //       }
                //   }
                //   );

                //   console.log('updateSuccess',updateSuccess);
                var abc = parseFloat(req.body.wAmount) - parseFloat(req.body.amount);
                

                let updateSuccess = await models['user'].update({
                    walletAmount: abc,
                }, {
                    where: {
                        id: req.session.admin.id
                    },

                });
                let create_data = await models['wallet'].create({
                    vendorId: req.session.admin.id,
                    withdraw_amount: req.body.amount,
                    bankId: req.body.BankId
                    
                    // balance:parseFloat(vendor.balance)-parseFloat(req.body.amount)
                });
                return res.redirect('/sellerAdmin/wallet');


            }

        } catch (err) {
            err.code = 200;
            return helper.error(res, err);
        }
    },




}