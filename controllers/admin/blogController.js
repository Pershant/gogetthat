const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;

const prefixBaseName = "admin";
const modelBaseName = 'blog';
const model = "blog";
const modelTitle = 'Blog';
const modelImageFolder = 'blog'
const blog_category = models.blog_category
global.modelDataTable = "blog";

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
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/blog/', image)) )`), 'image'],
            [
              sequelize.literal(
                "(SELECT name from blog_category WHERE blog_category.id = blog.blog_category_id)"
              ),
              "cat_name",
            ],

          ]
        },
        order: [['id', 'DESC']],
        raw: true,
      });
      // console.log(listing,'==================hwewe');return
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
          Srno: parseInt(index) + 1,
          name: row.name,
          category:row.cat_name,
          image: `<img alt="image" src="${row && row.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${row && row.name}">`,
          description: row.description,
          action,
          dateCreated: moment(row.createdAt).format('dddd, MMMM Do YYYY'),


        });
      }));

      // console.log(data,"====================>>data");return
      const headerColumns = Object.values({
        Srno: 'Sr.No',
        name: 'Title',
        category:'Category',
        image: 'Image',
        description: 'Desciption',
        action: 'Action',
        DateCreated: 'Date Created',
      });
      // console.log(headerColumns,"====================>>Prakhr");return

      return res.render(`${prefixBaseName}/${modelBaseName}/blogList`, { headerColumns, data });
    } catch (err) {
      return helper.error(res, err);
    }
  },

  add: async (req, res) => {
    try {
      global.currentModule = 'blog';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';
      let getBlogCat = await blog_category.findAll({
        where:{
          status:1
        },
        raw: true
      })
      // console.log(getBlogCat, '=================hwerw'); return

      return res.render(`${prefixBaseName}/${modelBaseName}/blogAdd`, { row: undefined, prefixBaseName, modelBaseName,getBlogCat });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  findOne: async (id) => {
    return await models[model].findOne({
      where: { id },
      attributes: {
        include: [
          [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/category/', image)) )`), 'image']
        ]
      },
      raw: true
    });
  },
  addUpdate: async (req, res) => {
    try {
// console.log(req.body,'=================herer');return
      const required = {
        //id: req.body.id,
        // image: req.files && req.files.image,
        // parentId: req.body.parentId,
      };

      const nonRequired = {
        id: req.body.id,
        image: req.files && req.files.image,
        blog_category_id: req.body.blog_category_id,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      console.log(requestData, '====================>requestData');

      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, modelImageFolder);
      }

      requestData.name = req.body.name;
      requestData.description = req.body.description;

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
  view: async function (req, res) {
    try {

      //let getBlog= await 
      global.currentModule = modelTitle;
      global.currentSubModuleSidebar = 'listing';

      const getBlog = await models[model].findOne({
        attributes: {
          include: [
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/blog/', image)) )`), 'image'],

          ]
        },
        where: {
          id: req.params.id
        },
        raw: true,
      });

      //  console.log(getBlog,"getBlog");return
      return res.render(`${prefixBaseName}/${modelBaseName}/view`, { type: "view", row: getBlog, prefixBaseName, modelBaseName });
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  edit: async function (req, res) {
    try {

      //let getBlog= await 
      global.currentModule = modelTitle;
      global.currentSubModuleSidebar = 'listing';
      let getBlogCat = await blog_category.findAll({
        where:{
          status:1
        },
        raw: true
      })
      const getBlog = await models[model].findOne({
        attributes: {
          include: [
            [sequelize.literal(`(IF (image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/blog/', image)) )`), 'image'],

          ]
        },
        where: {
          id: req.params.id
        },
        raw: true,
      });

      //  console.log(getBlog,"getBlog");return
      return res.render(`${prefixBaseName}/${modelBaseName}/blogAdd`, { row: getBlog, prefixBaseName, modelBaseName ,getBlogCat});
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  }
}


