const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;
 const User = models.user;
 const chat = models.messages;
 const chatConstant = models.chatConstants;
// const DriverDetail = models.driverDetail;

global.model = "chat";
global.modelTitle = "Chat";
global.modelDataTable = "orderDataTable";
chatConstant.belongsTo(User, {foreignKey: 'userid'})
chat.belongsTo(User, {foreignKey: 'receiverId'})
module.exports = {
  chatList: async (req, res) => {
    try {
      global.currentModule = 'Chat';
      //global.currentSubModuleSidebar = 'View';
      const admin = req.session.admin;
//console.log( global.adminData.id,'================================================');return
      const chatconstant = await chatConstant.findAll({
        attributes:[`id`, `senderId`, `receiverId`, `groupId`, `lastMessageId`, `deletedId`, `created`, `updated`],
        where:{
          [Op.or]:[
            {senderId:global.adminData.id},
            {receiverId:global.adminData.id}
          ],
          //deletedId:{[Op.ne]:global.adminData.id}
        }
      });
      //console.log(chatconstant);return
      var users_data =  await chatConstant.findAll({
        attributes:['id','senderId','receiverId',[sequelize.literal('(SELECT name FROM userDetail WHERE userDetail.userId=chatConstants.senderId)'), 'userByname'],[sequelize.literal('(SELECT message FROM  messages WHERE chatConstants.lastMessageId = messages.id)'), 'lastMsg'],[sequelize.literal('(SELECT email FROM user WHERE user.id=chatConstants.senderId)'), 'mail']],
           order: [
             ['id', 'DESC'],
         ],   
         where:{
          [Op.or]:[
            {senderId:global.adminData.id},
            {receiverId:global.adminData.id}
          ],
        }
        });
        users_data = users_data.map(value => {
             return value.toJSON();
         });

   //  console.log(users_data);return

      return res.render('admin/chat/chatlist', { response:users_data });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  showchat:async function (req, res) {
    try{
    global.currentModule = 'Chat';
    //global.currentSubModuleSidebar = 'View';
    const admin = req.session.admin;
           var users_data2 = await chat.findAll({
            // attributes:['id','user2Id','userid','message','constantid','createdAt'], 
             include:[{
               model:User,
               required:false,
               attributes:['id','email']
              }],
             where: {
              chatConstantId:req.query.id,
               //userid:req.query.user2id
             },
           });
           let SeconduserMsg= users_data2.map(users_data2=>{return users_data2.toJSON()});
         //console.log(SeconduserMsg,"=========SeconduserMsg");return
       //
       res.render('admin/chat/showchat',
           {
           //  FirstuserMsg:FirstuserMsg,
             SeconduserMsg:SeconduserMsg,
            //  msg: req.flash('msg'),
            //  sessiondata: req.session,
            //  title: 'chat'
           });
          }catch (err) {
            return helper.error(res, err);
          }
   },
   sendmessage: async function (req, res) {
    //console.log(req.body, 'yioiutr===='); return
     try {
      //  var find=await chat.findOne({
      //    where:{
      //   chatConstantId:req.body.constid,
      //    }
      //  })
      //    const adduser= await chat.create({
      //      message:req.body.message,
      //      senderId:req.body.user2id, 
      //      chatConstantId:req.body.constid,
      //      receiverId:req.body.user1id,
      //      created: Math.round(new Date().getTime() / 1000),
      //      orderId:find.orderId
      //   });
      //   const updated= await chatConstant.update({
      //     lastMessageId:adduser.id,
      //   },{
      //     where:{
      //       id:req.body.constid,
      //     }
      //  });
        //console.log(adduser, 'yioiutr===='); return
        var users_data2 = await chat.findAll({
        // attributes:['id','user2Id','userid','message','constantid','createdAt'], 
         include:[{
           model:User,
           required:false,
           attributes:['id','email']
          }],
         where: {
          chatConstantId:req.body.constid,
           //userid:req.query.user2id
         },
       });
      //  const findUser = await models.user.findOne({
      //    where:{
      //      id:req.body.user1id
      //    }
      //  })
      //  const payload = {
      //   message: req.body.message,
      //   type: 4
      // };
      
      //  var notificationCr = await models['notification'].create({
      //     user_by: req.body.user2id,
      //     user_to: req.body.user1id,
      //     type: 4,
      //     description: req.body.message
      //   })
      //   if (findUser.is_notification == 1) {
      //     await helper.sendPushNotification(findUser.device_token, payload);
      //   }
      
       let SeconduserMsg= users_data2.map(users_data2=>{return users_data2.toJSON()});
       res.render('admin/chat/showchat',
       {
         SeconduserMsg:SeconduserMsg,
        
       });
      }catch (err) {
        return helper.error(res, err);
      }
 
   },
 
 
}