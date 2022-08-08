const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;

const prefixBaseName = "admin";
const modelBaseName = 'faq';
const model = "faq";
const modelTitle = 'Faq';
const modelImageFolder = 'faq'

global.modelDataTable = "faq";

module.exports = {
  listing: async (req, res) => {
    try {

      global.currentModule = modelTitle;
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';
      console.log('-----------------------------------------chgnsadsa', global.currentSubModule);

      const listing = await models[model].findAll({        
        order: [['id', 'DESC']],
        // hierarchy: true,
        raw: true,
      });
      // console.log(listing,'==================listing');return
      const data = await Promise.all(listing.map(async (row, index) => {
        const viewButton = `<a href="/${prefixBaseName}/${modelBaseName}/view/${row.id}" class="btn btn-outline-info" >View</a>`;
        const editButton = `<a href="/${prefixBaseName}/${modelBaseName}/edit/${row.id}" class="btn btn-outline-warning" >Edit</a>`;
        // const deleteButton = `<button model_id="${row.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;
        const deleteButton = `<button model_id="${row.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        action += viewButton;
        action += '&nbsp;';
        action += editButton;
        action += '&nbsp;';
        action += deleteButton;



        console.log(row, "row.name")

        return Object.values({
          Srno:  parseInt(index) + 1,
          question: row.question,
          answer: row.answer,
          action,
          dateCreated: moment(row.createdAt).format('dddd, MMMM Do YYYY'),


        });
      }));

      // console.log(data,"====================>>data");return
      const headerColumns = Object.values({
        Srno: 'Sr.No',
        question: 'Question',
        answer: 'Answer',
        action: 'Action',
        DateCreated: 'Date Created',
      });
      // console.log(headerColumns,"====================>>Prakhr");return

      return res.render(`${prefixBaseName}/${modelBaseName}/faqList`, { headerColumns, data });
    } catch (err) {
      return helper.error(res, err);
    }
  },

  add: async (req, res) => {
    try {
      global.currentModule = 'faq';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';



      return res.render(`${prefixBaseName}/${modelBaseName}/faqAdd`, { row: undefined, prefixBaseName, modelBaseName });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  findOne: async (id) => {
    return await models[model].findOne({
      where: { id },
      raw: true
    });
  },
  addUpdate: async (req, res) => {
    try {

      const required = {
        //id: req.body.id,
        // image: req.files && req.files.image,
        // parentId: req.body.parentId,
      };

      const nonRequired = {
        id: req.body.id,
      };
      let requestData = await helper.vaildObject(required, nonRequired);  
      requestData.question = req.body.question;
      requestData.answer = req.body.answer;

      // if (requestData.parentId == 'null') requestData.parentId = null;

      console.log(requestData, '===============>requestData after');

      const rowId = await helper.save(models[model], requestData);
      const row = await module.exports.findOne(rowId);
      console.log(row, '=================================================>row');

      let message = `${modelTitle} ${requestData.hasOwnProperty('id') ? `Updated` : 'Added'} Successfully.`;

      req.flash('flashMessage', { color: 'success', message });

      res.redirect(`/${prefixBaseName}/${modelBaseName}/listing`);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  view:async function(req,res){
    try{

      //let getBlog= await 
      global.currentModule = modelTitle;
      global.currentSubModuleSidebar = 'listing';
      
      const getBlog = await models[model].findOne({
        where:{
          id:req.params.id
        },
        raw: true,
      });

    //  console.log(getBlog,"getBlog");return
    return res.render(`${prefixBaseName}/${modelBaseName}/view`, { type:"view", row:getBlog,prefixBaseName,modelBaseName });
    }catch(err){
      err.code = 200;
      return helper.error(res, err);
    }
  },
  edit:async function(req,res){
    try{

      //let getBlog= await 
      global.currentModule = modelTitle;
      global.currentSubModuleSidebar = 'listing';
      
      const getBlog = await models[model].findOne({
        where:{
          id:req.params.id
        },
        raw: true,
      });

    //  console.log(getBlog,"getBlog");return
    return res.render(`${prefixBaseName}/${modelBaseName}/faqAdd`, { row:getBlog,prefixBaseName,modelBaseName });
    }catch(err){
      err.code = 200;
      return helper.error(res, err);
    }
  }
}


