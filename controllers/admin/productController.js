const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const { EDESTADDRREQ } = require('constants');
const { Op } = sequelize;
// const User = models.product;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

const model = "product";
global.modelTitle = "Product";
global.modelDataTable = "productDataTable";
const UserModel = "user";

module.exports = {
  approvalRequests: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModule = 'Approval Requests';
      global.currentSubModuleSidebar = 'approvalRequests';
      const modelTitle = 'Product';

      const listing = await models[model].findAndCountAll({
        where: {
          isApproved: 0
        },
        include: [
          {

            model: models['user'],
            as: 'vendor',
            include: [
              {
                model: models['vendorDetail'],
                attributes: {
                  include: [
                    [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/product/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                  ]
                }
              },
            ]
          },
        ],
        attributes: {
          include: [
            [sequelize.literal(`(IF (\`product\`.\`image\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`image\`)) )`), 'image']
          ]
        },
        order: [['id', 'DESC']],
        raw: true,
        nest: true
      });
      console.log(JSON.stringify(listing, null, 2), '===========================================>listing');



      const categories = await module.exports.getParent();
      // console.log(categories)
      // return

      const categoryObj = {};

      if (categories.length > 0) {
        categories.forEach(child => {
          categoryObj[child.value] = child.label;
        });
      }


      const data = listing.rows.map((product, index) => {
        console.log(product.reviews, '-------------------------------------reviews')


        const statusButton = {
          0: `<button model_id="${product.id}" model="${model}" status="${product.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
          1: `<button model_id="${product.id}" model="${model}" status="${product.status}" class="btn btn-outline-success status_btn" >Active</button>`,
        }
        const isApprovedButton = {
          0: `<button model_id="${product.id}" model="${model}" status="${product.isApproved}" class="btn btn-outline-danger approved_btn" >Pending</button>`,
          1: `<button model_id="${product.id}" model="${model}" status="${product.isApproved}" class="btn btn-outline-success approved_btn" >Approved</button>`,
        }
        // const updateButton={
        // 1:`<button model_id="${product.id}" model="${model}" update="${product.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
        // }

        // let retailPrice = '';



        const viewButton = `<a href="/admin/product/view/${product.id}" class="btn btn-outline-info" >View</a>`;
        const editButton = `<a href="/admin/product/edit/${product.id}" class="btn btn-outline-warning" >Edit</a>`;
        const deleteButton = `<button model_id="${product.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;



        // let update='';
        // update+=updateButton;
        // update+='$nbsp';

        let action = '';
        action += viewButton;
        action += '&nbsp;'
        action += deleteButton;
        action += '&nbsp;'



        console.log(product, "==product");
        // return;
        return Object.values({
          sno: parseInt(index) + 1,
          // image: `<img alt="" src="${product.image}" class="datatable_list_image" data-toggle="tooltip" />`,
          isApproved: isApprovedButton[product.isApproved],
          name: product.name,
          category: categoryObj[product.categoryId],
          // description: (product.description).substring(0,20) + ((product.description).length > 20 ? "..." : ""),
          description: product.description,
          username: product.vendor.username,
          email: product.vendor.email,

          brandName: product.brandName,
          mrp: product.mrp,


          // percentageDiscount: product.percentageDiscount,
          dateCreated: moment(product.createdAt).format('dddd, MMMM Do YYYY'),

          action,
          // changePrice
        });
      });

      const headerColumns = Object.values({

        sno: 'S.No.',

        // image: 'Image',
        isApproved: 'Approved Status',
        name: 'Product Name',
        category: 'Category',
        description: 'Description',
        username: "Seller Name",
        email: "Seller Email",
        // reviews:'Reviews',
        // shippingInformation: 'Shipping Information',
        brandName: 'Brand Name',
        mrp: 'Seller Price',

        // percentageDiscount: 'Percentage Discount',
        dateCreated: 'Date Created',

        action: 'Action',
        // changePrice:"changePrice",
        // deleteData:"Select ALL" 


      });

      return res.render('admin/product/approved', { headerColumns, data });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  listing: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';
      const modelTitle = 'Product';

      // console.log('------------------model--',model);
      const listing = await models[model].findAndCountAll({
        where: {
          isApproved: 1
        },
        include: [
          {
            model: models['user'],
            as: 'vendor',
            include: [
              {
                model: models['vendorDetail'],
                attributes: {
                  include: [
                    [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/product/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                  ]
                }
              },
            ],
            // where: {
            //   role: 3,

            // },
            required: true
          },
          // {
          // model: module['user']
          // }
        ],
        attributes: {
          include: [
            [sequelize.literal(`(IF (\`product\`.\`image\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`image\`)) )`), 'image']
          ]
        },
        order: [['id', 'DESC']],
        raw: true,
        nest: true,
        //  limit:2
      });
      //  console.log(listing, '===========================================>listing');return
      // res.json(listing)
      // return


      const categories = await module.exports.getParent();
      // console.log(categories)
      // return

      const categoryObj = {};

      if (categories.length > 0) {
        categories.forEach(child => {
          categoryObj[child.value] = child.label;
        });
      }


      const data = listing.rows.map((product, index) => {
        console.log(product.reviews, '-------------------------------------reviews')


        const statusButton = {
          0: `<button model_id="${product.id}" model="${model}" status="${product.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
          1: `<button model_id="${product.id}" model="${model}" status="${product.status}" class="btn btn-outline-success status_btn" >Active</button>`,
        }

        const featuredButton = {
          0: `<button model_id="${product.id}" model="${model}" is_featured="${product.is_featured}" class="btn btn-outline-danger featured_btn" >Non Featured</button>`,
          1: `<button model_id="${product.id}" model="${model}" is_featured="${product.is_featured}" class="btn btn-outline-success featured_btn" >Featured</button>`,
        }

        // const updateButton={
        // 1:`<button model_id="${product.id}" model="${model}" update="${product.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
        // }

        // let retailPrice = '';



        const viewButton = `<a href="/admin/product/view/${product.id}" class="btn btn-outline-info" >View</a>`;
        if (product.addedBy == 1) {
          var editButton = `<a href="/admin/product/edit/${product.id}" class="btn btn-outline-warning" >Edit</a>`;
        }
        const deleteButton = `<button model_id="${product.id}" model="${model}" model_title="${modelTitle}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;



        // let update='';
        // update+=updateButton;
        // update+='$nbsp';

        let action = '';
        action += viewButton;
        action += '&nbsp;';
        if (product.addedBy == 1) {
          action += editButton;
          action += '&nbsp;';
        }
        action += deleteButton;
        let changePrice = ''
        RetailPrice = `<button class="btn btn-primary realPrice" newId=${product.id} id="retailPrice" >Enter Admin Price</button>`;

        let deleteData = ''
        deleteData += ` <label><input type="checkbox" name=dcheckboxitem class="dcheckboxitem" id="deleteAll" deleteId=${product.id} name="deleteData" value=${product.id}></label>`


        console.log(product, "==product");
        // return;
        return Object.values({
          // sno: parseInt(index) + 1,
          deleteData,
          name: product.name,
          category: categoryObj[product.categoryId],
          // description: (product.description).substring(0,20) + ((product.description).length > 20 ? "..." : ""),
          description: product.description,
          username: product.vendor.username,
          email: product.vendor.email,
          // reviews:product.reviews,
          // shippingInformation: product.shippingInformation,
          brandName: product.brandName,
          mrp: product.mrp,
          UpdatedRetailPrice: RetailPrice,
          RetailPrice: product.retailPrice,
          // percentageDiscount: product.percentageDiscount,
          dateCreated: moment(product.createdAt).format('dddd, MMMM Do YYYY'),
          status: statusButton[product.status],
          featured: featuredButton[product.is_featured],
          action,

        });
      });

      const headerColumns = Object.values({
        deleteData: `Select All<br><input type="checkbox" id="select_all" />`,
        name: 'Product Name',
        category: 'Category',
        description: 'Description',
        username: "Seller Name",
        email: "Seller Email",
        // reviews:'Reviews',
        // shippingInformation: 'Shipping Information',
        brandName: 'Brand Name',
        mrp: 'Seller Price',
        UpdatedRetailPrice: 'Update Retail Price',
        RetailPrice: 'Retail Price',
        // percentageDiscount: 'Percentage Discount',
        dateCreated: 'Date Created',
        status: 'Status',
        featured: 'Featured',
        action: 'Action',
      });

      return res.render('admin/product/listing', { headerColumns, data });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  add: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      const taxCategories = await models['taxCategory'].findAll({
        where: {
          // vendorId: adminData.id
        }
      });

      const rootBrand = await models['brand'].findAll({
        raw: true
      });
      // console.log(rootBrand,"=============>RootBrand");
      // return

      const rootCategories = await models['category'].findAll({
        where: {
          status: 1,
          parentId: null
        },
        raw: true
      });
      // console.log(rootCategories, '========================>rootCategories');
      // return;


      let categories = await module.exports.getParent();
      if (categories.length > 0) {
        categories = categories.map(category => ({
          id: category.value,
          name: category.label
        }));
      }

      // const categories = await models['category'].findAll({
      //     order: [['name', 'ASC']]
      // });

      // const subCategories = await models['subCategory'].findAll({
      //     include: [
      //         {
      //             model: models['category'],
      //             required: true
      //         }
      //     ],
      //     order: [['name', 'ASC']]
      // });

      return res.render('admin/product/add', { taxCategories, categories, rootCategories, rootBrand });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  edit: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = 'listing';

      let product = await module.exports.findOneProduct(req.params.id);
      // console.log(product, '===================herer'); return
      global.currentSubModule = `Edit`;

      const taxCategories = await models['taxCategory'].findAll({
        where: {
          // vendorId: adminData.id
        }
      });

      const productTags = await models['productTag'].findAll({
        where: {
          productId: product.id
        }
      });

      const productColors = await models['color'].findAll({
        where: {
          prod_id: product.id
        },
        raw: true
      });
      // console.log(productColors,"=====================>>>>>>>>>>>>>>>")
      // return
      const productImages = await models['images'].findAll({
        attributes: {
          include: [
            [sequelize.literal(`(IF (\`images\`.\`images\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/products/', \`images\`.\`images\`)) )`), 'image']
          ]
        },
        where: {
          prod_id: product.id
        },
        raw: true
      });

      // const categories = await models['category'].findAll({
      //     order: [['name', 'ASC']]
      // });

      let categories = await module.exports.getParent();
      if (categories.length > 0) {
        categories = categories.map(category => ({
          id: category.value,
          name: category.label
        }));
      }

      // const subCategories = await models['subCategory'].findAll({
      //     include: [
      //         {
      //             model: models['category'],
      //             required: true
      //         }
      //     ],
      //     order: [['name', 'ASC']]
      // });

      const productSpecifications = await models['productSpecification'].findAll({
        where: {
          productId: product.id,
        },
        raw: true
      });

      let productSpecificationsHTML = ``;


      if (productSpecifications.length > 1) {
        for (i = 1; i < productSpecifications.length; i++) {
          productSpecificationsHTML += `
                    <div class="row single_row_container">
                        <div class="col-5 col-md-5 col-lg-5">
                            <div class="form-group"> 
                            <label>&nbsp;</label>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fas fa-signature"></i>
                                </div>
                                </div>
                                <input type="text" class="form-control" name="specificationName"
                                value="${productSpecifications[i].name}"
                                required>
                            </div>
                            </div>
                        </div>
                        <div class="col-5 col-md-5 col-lg-5">
                            <label>&nbsp;</label>
                            <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <i class="fas fa-signature"></i>
                                </div>
                                </div>
                                <input type="text" class="form-control" name="speecificationValue"
                                value="${productSpecifications[i].value}"
                                required>
                            </div>
                            </div>
                        </div>
                        <div class="col-2 col-md-2 col-lg-2">
                            <label>&nbsp;</label>
                            <div class="form-group">
                                <input type="hidden" class="form-control" name="speecificationId" value="${productSpecifications[i]['id']}" required>
                                <a href="javascript:void(0)" class="btn btn-icon btn-danger delete_product_specification_row"><i class="fas fa-times"></i></a>
                            </div>
                        </div>
                        </div>
                    `;
        }
      }

      return res.render('admin/product/edit', { product, taxCategories, productTags, productColors, productImages, categories, productSpecifications, productSpecificationsHTML });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  view: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = 'listing';

      const product = await module.exports.findOneProduct(req.params.id);
      global.currentSubModule = `View`;

      const taxCategories = await models['taxCategory'].findAll({
        where: {
          vendorId: adminData.id
        }
      });

      // const productImages = await models['images'].findAll({
      //   where: {
      //     id: images.id
      //   }
      // });

      // const productTags = await models['productTag'].findAll({
      //   where: {
      //     prod_id: product.id
      //   },
      //   raw:true
      // });

      const productColors = await models['color'].findAll({
        where: {
          prod_id: product.id
        },
        raw: true
      });

      const productImages = await models['images'].findAll({
        attributes: {
          include: [
            [sequelize.literal(`(IF (\`images\`.\`images\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/products/', \`images\`.\`images\`)) )`), 'image']
          ]
        },
        where: {
          prod_id: product.id
        },
        raw: true
      });

      //    console.log(productImages,"productImages");return
      let categories = await module.exports.getParent();
      if (categories.length > 0) {
        categories = categories.map(category => ({
          id: category.value,
          name: category.label
        }));
      }

      const subCategories = [];
      // const subCategories = await models['subCategory'].findAll({
      //     include: [
      //         {
      //             model: models['category'],
      //             required: true
      //         }
      //     ],
      //     order: [['name', 'ASC']]
      // });

      return res.render('admin/product/view', { product, taxCategories, categories, subCategories, productColors, productImages });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  importExport: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = 'importExport';



      return res.render('admin/product/importExport', {});
    } catch (err) {
      return helper.error(res, err);
    }
  },

  priceUpdate: async (req, res) => {
    console.log(req.body.id, '==============================>>>>>>>>>>>>>>>AnshumanSingh');
    console.log(req.body.retailPrice, "===========================>>>>>>>>>>Prakhar singh");

    try {
      let save = await models[model].update({

        retailPrice: req.body.retailPrice,
      }, {
        where: {
          id: req.body.id
        }
      })
      res.json(1)
    } catch (err) {
      return helper.error(res, err);
    }


  },
  addUpdateProduct: async (req, res) => {
    try {
      const required = {
        vendorId: adminData.id,
        name: req.body.name,
        description: req.body.description,
        brandName:req.body.brandName,
        mrp: req.body.mrp,
        status: req.body.status,
        categoryId: req.body.categoryId,
      };
      const nonRequired = {
        id: req.body.id,
        tags: req.body.tags,
        barcode: req.body.barcode,
        sku: req.body.sku,
        retailPrice: req.body.retailPrice,
        percentageDiscount: req.body.percentageDiscount,
        quantity: req.body.quantity,
        images: req.files && req.files.images,
        shippingInformation: req.body.shippingInformation,
        return_price: req.body.return_price,
        shipping_price: req.body.shipping_price,
        specificationName: req.body.specificationName,
        speecificationValue: req.body.speecificationValue,

      };

      let requestData = await helper.vaildObject(required, nonRequired);
      console.log(requestData, '==================herer');
      // return

      if (requestData.hasOwnProperty('barcode')) {
        requestData.barcodeImage = await helper.generateBarcode(requestData.barcode, 'product');
      }

      if (requestData.hasOwnProperty('sku')) {
        requestData.skuImage = await helper.generateBarcode(requestData.sku, 'product');
      }

      // console.log(requestData, '=========>requestData');

      if (requestData.hasOwnProperty('imageSystemInventory')) {
        const imageSystemInventoryArray = requestData.imageSystemInventory.split('/');
        console.log(imageSystemInventoryArray, '=========>imageSystemInventoryArray');
        console.log(imageSystemInventoryArray[imageSystemInventoryArray.length - 1], '=========>imageSystemInventoryArray[imageSystemInventoryArray.length-1]');
        requestData.image = imageSystemInventoryArray[imageSystemInventoryArray.length - 1];
        console.log(requestData.image, '=========>requestData.image');
      }
      requestData.addedBy = 1
      if (!requestData.hasOwnProperty('id')) {
        requestData.status = 1;
        // requestData.isApproved = 1;
      }

      console.log(JSON.stringify(requestData, null, 2), '=====================>requestData');

      const productId = await helper.save(models[model], requestData, true);
      // console.log(productId.id,'==================herer');return

      if (!requestData.hasOwnProperty('id')) {

        Id = productId.id,
          console.log(req.body.color, '=>>>>>>>>>>>>>...Color +++++++++++++');

        // return
        if (!Array.isArray(req.files.images)) req.files.images = [req.files.images];
        let ImageArray = [];

        if (req.files && req.files.images && req.files.images.length > 0) {
          for (var imgkey in req.files.images) {

            var imgpath = await helper.imageUpload(req.files.images[imgkey], 'products')

            ImageArray.push({
              prod_id: Id,
              images: imgpath
            });

          }
        }

        await models['images'].bulkCreate(ImageArray);


      }

      if (req.body.hasOwnProperty('color')) {
        if (!Array.isArray(req.body.color)) req.body.color = [req.body.color];

        const addColor = [];
        if (req.body.color.length > 0) {
          for (let i in req.body.color) {
            addColor.push({
              prod_id: Id,
              color: req.body.color[i],
            });

          }
          console.log(addColor, '=================>addColor');
          // return
          await models['color'].bulkCreate(addColor);
        }
      }



      if (requestData.tags && requestData.tags.length > 0) {
        if (!Array.isArray(requestData.tags) && typeof requestData.tags == 'string') requestData.tags = [requestData.tags];

        await models['productTag'].destroy({
          where: {
            productId
          }
        });

        let addTagsObj = requestData.tags.map(tag => ({
          productId,
          tag
        }));



        await models['productTag'].bulkCreate(addTagsObj);
      }

      if (requestData.hasOwnProperty('specificationName')) {
        if (!Array.isArray(requestData.specificationName)) requestData.specificationName = [requestData.specificationName];
        let product_id = productId.id
        // console.log(product_id,requestData.specificationName, requestData.speecificationValue, '========######################################################################=========>requestData.specificationName');return
        if (requestData.specificationName.length > 0) {
          await models['productSpecification'].destroy(
            {
              where: {
                productId: product_id
              },
            }
          );

          const addProductSpecification = [];

          // for (let i in requestData.specificationName) {
          addProductSpecification.push({
            productId: product_id,
            name: requestData.specificationName,
            value: requestData.speecificationValue,
            // ...(requestData.hasOwnProperty('speecificationId') && requestData.speecificationId.length > i ? { id: requestData.speecificationId[i] } : {})
          });
          // }

          console.log(addProductSpecification, '=================>addProductSpecification');

          for (let i in addProductSpecification) {
            for (let j in addProductSpecification[i].name && addProductSpecification[i].value) {
              let createSpecification = await models['productSpecification'].create({
                productId: addProductSpecification[i].productId,
                name: addProductSpecification[i].name[j],
                value: addProductSpecification[i].value[j],
              });
            }
          }
          // await models['productSpecification'].bulkCreate(addProductSpecification, { updateOnDuplicate: ['productId','name', 'value'] });

        }
      }



      const product = await module.exports.findOneProduct(productId);
      console.log(product, '=================================================>product');

      let message = `Product ${requestData.hasOwnProperty('id') ? `Updated` : 'Added'} Successfully.`;

      req.flash('flashMessage', { color: 'success', message });

      res.redirect('/admin/product/listing');
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  findOneProduct: async (id) => {
    return await models.product.findOne({
      where: {
        id
      },
      include: [
        {
          model: models['user'],
          as: 'vendor',
          include: [
            {
              model: models['vendorDetail'],
              attributes: {
                include: [
                  [sequelize.literal(`(IF (\`vendor->vendorDetail\`.\`image\`='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/product/', \`vendor->vendorDetail\`.\`image\`)) )`), 'image']
                ]
              }
            },
          ]
        },
        {
          model: models['taxCategory'],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal(`(IF (\`product\`.\`image\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`image\`)) )`), 'image'],
          [sequelize.literal(`(IF (\`product\`.\`barcodeImage\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`barcodeImage\`)) )`), 'barcodeImage'],
          [sequelize.literal(`(IF (\`product\`.\`skuImage\`='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/product/', \`product\`.\`skuImage\`)) )`), 'skuImage'],
        ]
      },
      raw: true,
      nest: true
    });
  },

  productCategorySelect: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = '';

      const required = {
        categoryId: req.body.categoryId,
      };
      const nonRequired = {
      };

      console.log(required, '========.required');

      let requestData = await helper.vaildObject(required, nonRequired);

      const subCategories = await models['subCategory'].findAll({
        where: {
          categoryId: requestData.categoryId
        }
      });

      let html = ``;


      html += `
                <div class="subCategoryContainer">
                  <div class="form-group">
                    <label> Sub Category</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="fas fa-list"></i>
                        </div>
                      </div>
                    <select name="subCategoryId" class="form-control select2" required>`;
      if (subCategories.length > 0) {
        html += `<option value="">Select Sub Category</option>`;
        subCategories.forEach(subCategory => {
          html += `<option value="${subCategory.id}">
                                                    ${subCategory.name}
                                                </option>`;
        });
      } else {
        html += `<option value="">No Sub Category Found</option>`;
      }
      html += `</select>  
                        </div>
                        </div>
                    </div>
              `;

      return helper.success(res, `Sub Category Fetched for product successfully`, html);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },

  getParent: async (id = undefined) => {
    const categories = await models['category'].findAll({
      where: {
        status: 1
      },
      order: [['id', 'DESC']],
      // hierarchy: true,
      raw: true,
    });

    console.log(JSON.stringify(categories, null, 2), '===============>categories');

    let parent = [];

    const checkChildren = (children, hierarchyArray) => {
      if (children.length == 0) return;

      children.forEach(child => {
        if (id && child.id == id) return;

        console.log(child.name, '================>child.name');
        const newHierarchyArray = JSON.parse(JSON.stringify(hierarchyArray));
        newHierarchyArray.push(child.name);
        parent.push({
          value: child.id,
          label: newHierarchyArray.join(' > ')
        });

        if (child.hasOwnProperty('children') && child.children.length > 0) {
          checkChildren(child.children, newHierarchyArray);
        }
      });
    }

    if (categories.length > 0) {
      categories.forEach(category => {
        parent.push({
          value: category.id,
          label: category.name
        });

        if (category.hasOwnProperty('children') && category.children.length > 0) {
          const hierarchyArray = [];
          hierarchyArray.push(category.name);
          checkChildren(category.children, hierarchyArray);
        }
      });
    }

    console.log(JSON.stringify(parent, null, 2), '===================>data');
    // return;

    // parent.unshift({
    //     value: null,
    //     label: 'Root'
    // });

    return parent;
  },
  productListingExport: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = '';

      const required = {
        vendorId: req.body.vendorId,
      };
      const nonRequired = {
      };


      let requestData = await helper.vaildObject(required, nonRequired);
      console.log(requestData, '========.requestData');

      const listing = await models[model].findAll({
        where: {
          vendorId: requestData.vendorId
        },
        order: [['id', 'DESC']]
      });

      return helper.success(res, `Product list exported successfully`, listing);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  productListingImport: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = '';

      const required = {
        file: req.files && req.files.file,
      };
      const nonRequired = {
      };


      let requestData = await helper.vaildObject(required, nonRequired);
      console.log(requestData, '========.requestData');


      // fs.createReadStream('data.csv')
      fs.createReadStream(requestData.file.tempFilePath)
        .pipe(csv())
        .on('data', async (row) => {
          // console.log(row, '===================>row');

          row = JSON.parse(JSON.stringify(row));
          // return;
          console.log(row[`categoryId`], '============>categoryId');

          if (row.hasOwnProperty('categoryId') && row.categoryId == '' || row.hasOwnProperty('name') && row.name == '') {
            return;
          }

          if (row.hasOwnProperty('barcode') && row.barcode != '') {
            row.barcodeImage = await helper.generateBarcode(row.barcode, 'product');
          }

          row.isApproved = 1;

          console.log(row, '==================>row after')

          await helper.save(models[model], row)

        })
        .on('end', () => {
          console.log('CSV file successfully processed');
        });

      return helper.success(res, `Product list imported successfully`, {});
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  importProductImages: async (req, res) => {
    try {
      global.currentModule = 'Product';
      global.currentSubModuleSidebar = '';

      const required = {
        images: req.files && req.files.images,
      };
      const nonRequired = {
      };

      let requestData = await helper.vaildObject(required, nonRequired);
      console.log(requestData, '========.requestData');

      if (!Array.isArray(requestData.images)) requestData.images = [requestData.images];

      if (Array.isArray(requestData.images) && requestData.images.length > 0) {

        requestData.images.forEach(image => {
          helper.imageUploadWithRealName(image, 'product');
        });

      }

      return helper.success(res, `Product images imported successfully`, {});
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },


  bulkDelete: async function (req, res) {
    try {
      console.log(JSON.parse(req.body.Id));
      // const id = await models[model].findAll({
      //   where:{
      //     id:JSON.parse(req.body.Id)

      //   },
      //   raw:true
      // });
      await models[model].destroy({
        where: {
          id: JSON.parse(req.body.Id)
        }

      })
      res.json(1)
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }

  },


  changePriceMultiple: async function (req, res) {
    try {
      //console.log(req.body.pricePerctange,"==================");return

      let getProductsDetails = await models[model].findAll({
        where: {
          id: JSON.parse(req.body.productIds)
        },
        raw: true
      });
      // console.log(getProductsDetails,"getProductsDetails");
      for (var i in getProductsDetails) {
        var percentagePrice = (parseInt(getProductsDetails[i].mrp) * parseInt(req.body.pricePerctange) / 100).toFixed(2);
        //   var addToRetailPrice=parseInt(getProductsDetails[i].retailPrice)+parseInt(percentagePrice)
        //console.log(percentagePrice,"percentagePrice");return
        var addedPrice = parseInt(percentagePrice) + parseInt(getProductsDetails[i].mrp)
        await models[model].update({
          retailPrice: addedPrice
        }, {
          where: {
            id: getProductsDetails[i].id
          }
        })
      }
      //console.log(IDsArray,priceArray);returna
      res.json(1)
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  updatedImages: async function (req, res) {
    try {
      //  console.log("hello");return

      let getImageData = await models['images'].findOne({
        attributes: {
          include: [
            [sequelize.literal(`(IF (images.images='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/products/', images.images)) )`), 'images']
          ]
        },
        where: {
          id: req.query.id
        },
        raw: true
      });
      // console.log(getImageData,"getImageData");return

      return res.render('admin/product/editImages', { response: getImageData });
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  editImages: async function (req, res) {
    try {
      //console.log("hello");return

      let getLastImage = await models['images'].findOne({
        // attributes: {
        //   // include: [
        //   //   [sequelize.literal(`(IF (images.images='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/products/', images.images)) )`), 'image']
        //   // ]
        // },
        where: {
          id: req.body.id
        },
        raw: true
      });
      if (req.files && req.files.images) {
        req.files.images = [req.files.images];



        req.files.images.forEach(image => {
          getImage = helper.imageUpload(image, 'products');
        });
      } else {
        getImage = getLastImage.images
      }

      await models['images'].update({
        images: getImage

      }, {
        where: {
          id: req.body.id
        }
      })

      // console.log(getImage,"getImage");return
      res.redirect(`/admin/product/edit/${getLastImage.prod_id}`)
      // return res.render('admin/product/editImages', { response:getImageData });
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  deleteImage: async function (req, res) {
    try {
      //  console.log(req.body,"hello");return

      await models['images'].destroy({
        where: {
          id: req.body.id
        }
      });
      res.send({ isTrue: 1 })
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  featured_product: async (req, res) => {
    try {
      // console.log('========================herer')
      let products = await models['product'].findAll({
        where: {
          isApproved: 1,
          is_featured: 0

        },
      }).map(data => data.toJSON())
      // console.log(findBadges, '===================findBadges'); 
      // console.log(products, '===================products'); 
      // return;

      return res.render(`admin/product/featured_product`, { products });
    } catch (error) {
      return helper.error(res, error)
    }
  },
  asign: async (req, res) => {
    try {
      console.log(req.body, '================================here');
      if (!Array.isArray(req.body.parentId)) {
        req.body.parentId = [req.body.parentId]
      }
      let addBadges = await models['product'].update({
        is_featured: 1,

      }, {
        where: {
          id: { [Op.in]: req.body.parentId }
        }
      })
      let message = "featured assigned successfully"
      req.flash('flashMessage', { color: 'success', message });
      res.redirect('/admin/product/listing')
    } catch (error) {
      return helper.error(res, error)
    }
  },
}

