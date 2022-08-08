const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;

const prefixBaseName = "admin";
const modelBaseName = 'banner';
const model = "banner";
const modelTitle = 'Banner';
const modelImageFolder = 'banner'

global.modelDataTable = "banner";

module.exports = {


  listing: async (req, res) => {

    try {

      global.currentModule = modelTitle;
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';
      console.log('-----------------------------------------chgnsadsa', global.currentSubModule);

      const listing = await models[model].findAll({
        attributes: {
          include: [
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/banner/', image)) )`), 'image'],

          ]
        },
        order: [['id', 'DESC']],
        // hierarchy: true,
        raw: true,
      });
      const data = await Promise.all(listing.map(async (row, index) => {
        const viewButton = `<a href="/${prefixBaseName}/${modelBaseName}/view/${row.id}" class="btn btn-outline-info" >View</a>`;
        const editButton = `<a href="/${prefixBaseName}/${modelBaseName}/edit/${row.id}" class="btn btn-outline-warning" >Edit</a>`;
        const deleteButton = `<button model_id="${row.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        action += viewButton;
        action += '&nbsp;';
        action += editButton;
        action += '&nbsp;';
        action += deleteButton;



        console.log(row, "row.name")

        return Object.values({
          Srno:   parseInt(index) + 1,
          name: row.title,
          link: row.link,
          image: `<img alt="image" src="${row && row.image}" class="rounded-circle" height="80"width="80" data-toggle="tooltip" title="${row && row.name}">`,
          action,
          dateCreated: moment(row.createdAt).format('dddd, MMMM Do YYYY'),
        });
      }));

      // console.log(data,"====================>>data");return
      const headerColumns = Object.values({
        Srno: 'Sr.No',
        name: 'Name',
        link: 'link',
        image: 'Image',
        action: 'Action',
        DateCreated: 'Date Created',
      });
      // console.log(headerColumns,"====================>>Prakhr");return

      return res.render(`${prefixBaseName}/${modelBaseName}/bannerList`, { headerColumns, data });
    } catch (err) {
      return helper.error(res, err);
    }
  },


  add: async (req, res) => {
    try {
      global.currentModule = 'banner';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      return res.render(`${prefixBaseName}/${modelBaseName}/bannerAdd`, { row: undefined, prefixBaseName, modelBaseName });
    } catch (err) {
      return helper.error(res, err);
    }
  },

  addUpdate: async (req, res) => {
    try {

      const required = {
        //id: req.body.id,
        // image: req.files && req.files.image,
        // parentId: req.body.parentId,
        title: req.body.title,
        link: req.body.link

      };

      const nonRequired = {
        id: req.body.id,
        image: req.files && req.files.image,
        // parentId: req.body.parentId,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      // console.log(requestData, '====================>requestData');return

      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, modelImageFolder);
      }

      // requestData.brandName=req.body.brandName;


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

  findOne: async (id) => {
    return await models[model].findOne({
      where: { id },
      attributes: {
        include: [
          [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/banner/', image)) )`), 'image']
        ]
      },
      raw: true
    });
  },
  view: async function (req, res) {
    try {
      let getDataBrand = await models[model].findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          include: [
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/banner/', image)) )`), 'image']
          ]
        },
        raw: true
      });
      // console.log(getDataBrand,'=======================');return
      return res.render(`${prefixBaseName}/${modelBaseName}/view`, { row: getDataBrand, prefixBaseName, modelBaseName });
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  edit: async (req, res) => {
    try {
      global.currentModule = 'banner';
      global.currentSubModule = 'Edit';
      global.currentSubModuleSidebar = 'edit';
      let getDataBrand = await models[model].findOne({
        where: {
          id: req.params.id
        },
        attributes: {
          include: [
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/banner/', image)) )`), 'image']
          ]
        },
        raw: true
      });

      return res.render(`${prefixBaseName}/${modelBaseName}/bannerAdd`, { row: getDataBrand, prefixBaseName, modelBaseName });
    } catch (err) {
      return helper.error(res, err);
    }
  },


}
