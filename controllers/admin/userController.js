const models = require('../../models');
const helper = require('../../helpers/helper');
const Paginator = require("paginator");
const sequelize = require("sequelize");
const { request } = require('express');
const { Op } = sequelize;
// const User = models.user;
// const UserDetail = models.userDetail;
// const DriverDetail = models.driverDetail;

const model = "user";
global.modelTitle = "User";
global.modelDataTable = "userDataTable";

const roleTypes = {
  0: 'Admin',
  1: 'User',
  2: 'Driver',
  3: 'Vendor',
  4: 'Employee',
  5: 'Manager',
}
const userRoleModels = {
  0: 'adminDetail',
  1: 'userDetail',
  2: 'driverDetail',
  3: 'vendorDetail',
  4: 'vendorStaffDetail',
  5: 'vendorStaffDetail',
}

const approvalStatusObj = {
  0: {
    value: `Pending`,
    backgroundCssColor: `red`,
  },
  1: {
    value: `Pending More Info`,
    backgroundCssColor: `#ffc107`,
  },
  2: {
    value: `Approve`,
    backgroundCssColor: `green`,
  },
  3: {
    value: `Suspend`,
    backgroundCssColor: `orange`,
  },
  4: {
    value: `Decline`,
    backgroundCssColor: `red`,
  },
}

module.exports = {
  listing: async (req, res) => {
    try {
      global.currentModule = 'User';
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';

      return res.render('admin/user/listing');
    } catch (err) {
      return helper.error(res, err);
    }
  },
  add: async (req, res) => {
    try {
      global.currentModule = 'User';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      return res.render('admin/user/add');
    } catch (err) {
      return helper.error(res, err);
    }
  },
  edit: async (req, res) => {
    try {
      global.currentModule = 'User';
      global.currentSubModuleSidebar = 'listing';

      const user = await module.exports.findOneUser(req.params.id);
      global.currentSubModule = `Edit ${roleTypes[user.role]}`;

      return res.render('admin/user/edit', { type: "edit", user });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  view: async (req, res) => {
    try {
      global.currentModule = 'User';
      global.currentSubModuleSidebar = 'listing';

      const user = await module.exports.findOneUser(req.params.id);
      global.currentSubModule = `View ${roleTypes[user.role]}`;

      return res.render('admin/user/view', { type: "view", user });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  addDeliveryAddress: async (req, res) => {
    try {
      global.currentModule = 'User Delivery Address';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      const userId = req.params.userId;

      return res.render('admin/user/addEditViewDeliveryAddress', { type: 'add', deliveryAddress: undefined, userId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  editDeliveryAddress: async (req, res) => {
    try {
      global.currentModule = 'User Delivery Address';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      const userId = req.params.userId;

      console.log(req.params.id, '=======>req.params.id');
      const deliveryAddress = await models['userDeliveryAddress'].findOne({
        where: {
          id: req.params.id,
        }
      });

      if (!deliveryAddress) {
        req.flash('flashMessage', { color: 'danger', message: 'Invalid ID.' });
        res.redirect('/admin/user');
      }

      return res.render('admin/user/addEditViewDeliveryAddress', { type: 'edit', deliveryAddress, userId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  viewDeliveryAddress: async (req, res) => {
    try {
      global.currentModule = 'User Delivery Address';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      const userId = req.params.userId;
      console.log(req.params.id, '=======>req.params.id');

      const deliveryAddress = await models['userDeliveryAddress'].findOne({
        where: {
          id: req.params.id,
        }
      });

      if (!deliveryAddress) {
        req.flash('flashMessage', { color: 'danger', message: 'Invalid ID.' });
        res.redirect('/admin/user');
      }

      return res.render('admin/user/addEditViewDeliveryAddress', { type: 'view', deliveryAddress, userId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  addUpdateUserDeliveryAddress: async (req, res) => {
    try {
      const required = {
        // name: req.body.name,
        // email: req.body.email,
        // role: req.body.role,
      };
      const nonRequired = {
        id: req.body.id,
        ...req.body,
        // countryCode: req.body.countryCode,
        // phone: req.body.phone,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      if (!requestData.hasOwnProperty('id') && !requestData.id) delete requestData.id;

      console.log(requestData, '=====================>requestData');

      const addedId = await helper.save(models['userDeliveryAddress'], requestData);
      console.log(addedId, '==========>addedId');
      // return;

      let message = `Delivery Address ${requestData.hasOwnProperty('id') && requestData.id ? `Updated` : 'Added'} Successfully.`;

      req.flash('flashMessage', { color: 'success', message });


      res.redirect(`/admin/user/view/${requestData.userId}#deliveryAddresses`);

      // return helper.success(res, message, user);    
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  vendorListing: async (req, res) => {
    try {
      global.currentModule = 'Vendor';
      global.currentSubModule = 'Listing';
      global.currentSubModuleSidebar = 'listing';

      return res.render('admin/vendor/listing');
    } catch (err) {
      return helper.error(res, err);
    }
  },
  vendorAdd: async (req, res) => {
    try {
      global.currentModule = 'Vendor';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      return res.render('admin/vendor/add', { type: "add" });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  vendorEdit: async (req, res) => {
    try {
      global.currentModule = 'Vendor';
      global.currentSubModuleSidebar = 'listing';

      console.log(req.params.id, '=======>req.params.id');
      const user = await module.exports.findOneUser(req.params.id);
      console.log(req.params.id, '=======>req.params.id');
      global.currentSubModule = `Edit ${roleTypes[user.role]}`;

      const vendorStaff = await module.exports.getAllVendorStaff(req.params.id);

      user.vendorStaff = vendorStaff;

      return res.render('admin/vendor/edit', { type: "edit", user, approvalStatusObj });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  vendorView: async (req, res) => {
    try {
      global.currentModule = 'Vendor';
      global.currentSubModuleSidebar = 'listing';

      console.log(req.params.id, '======>req.params.id');

      const user = await module.exports.findOneUser(req.params.id);
      console.log(user, '====>user');
      // return;
      global.currentSubModule = `View ${roleTypes[user.role]}`;

      const vendorStaff = await module.exports.getAllVendorStaff(req.params.id);

      user.vendorStaff = vendorStaff;

      // return res.json(user)

      return res.render('admin/vendor/view', { type: "view", user, approvalStatusObj });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  addStaff: async (req, res) => {
    try {
      global.currentModule = 'Vendor Staff';
      global.currentSubModule = 'Add';
      global.currentSubModuleSidebar = 'add';

      const vendorId = req.params.vendorId;

      return res.render('admin/vendor/addEditViewStaff', { type: 'add', staffMember: undefined, vendorId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  editStaff: async (req, res) => {
    try {
      global.currentModule = 'Vendor Staff';
      global.currentSubModule = 'Edit';
      global.currentSubModuleSidebar = 'edit';

      const vendorId = req.params.vendorId;

      console.log(req.params.id, '=======>req.params.id');
      const staffMember = await module.exports.findOneUser(req.params.id);
      console.log(staffMember, '========================>staffMember');
      // return;

      if (!staffMember) {
        req.flash('flashMessage', { color: 'danger', message: 'Invalid ID.' });
        res.redirect('/admin/user');
      }

      return res.render('admin/vendor/addEditViewStaff', { type: 'edit', staffMember, vendorId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  viewStaff: async (req, res) => {
    try {
      global.currentModule = 'Vendor Staff';
      global.currentSubModule = 'View';
      global.currentSubModuleSidebar = 'view';

      const vendorId = req.params.vendorId;
      console.log(req.params.id, '=======>req.params.id');

      const staffMember = await module.exports.findOneUser(req.params.id);

      if (!staffMember) {
        req.flash('flashMessage', { color: 'danger', message: 'Invalid ID.' });
        res.redirect('/admin/user');
      }

      return res.render('admin/vendor/addEditViewStaff', { type: 'view', staffMember, vendorId });
    } catch (err) {
      return helper.error(res, err);
    }
  },
  datatable: async (req, res) => {
    try {
      const queryParameters = req.query;
      const { draw, search, start, length, role } = queryParameters;
      console.log(queryParameters, '======================>queryParameters');

      const recordsTotal = await models[model].count({
        where: {
          role: {
            [Op.notIn]: [0],
            [Op.in]: role
          },
        }
      });
      const listing = await models[model].findAndCountAll({
        where: {
          role: {
            [Op.notIn]: [0],
            [Op.in]: role
          },
          [Op.and]: [
            sequelize.literal(`user.email LIKE '%${search.value}%' || userDetail.name LIKE '%${search.value}%' || driverDetail.name LIKE '%${search.value}%'`)
          ]
        },
        include: [
          {

            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (userDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', userDetail.image)) )`), 'image']
              ]
            }
          },
          {
            model: models['driverDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (driverDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', driverDetail.image)) )`), 'image']
              ]
            }
          },
          {
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image']
              ]
            }
          },
          
        ],
        attributes: {
          include: [
            [sequelize.literal(`(IF (user.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', user.image)) )`), 'image']
          ]
        },
        order: [['id', 'DESC']],
        offset: parseInt(start),
        limit: parseInt(length),
        raw: true,
        nest: true
      });
      // console.log(listing, '===========================================>listing');

      let responseData = [];
      const data = listing.rows.map((user, index) => {
        console.log('USER ',user);
        const roleBasedColumnDetail = {
          1: {
            image: `<img alt="image" src="${user && user.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.userDetail && user.userDetail.name}">`,
            user: `Name: ${user.userDetail && user.userDetail.name}<br/>
                               Email: ${user.email}`,
        //    role: '<div class="badge badge-info">User</div>',
            modelTitle: 'User',
            editButtonUrl: '/admin/user/edit',
            viewButonUrl: '/admin/user/view',
          },
          2: {
            image: `<img alt="image" src="${user.driverDetail && user.driverDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.driverDetail && user.driverDetail.name}">`,
            user: `Name: ${user.driverDetail && user.driverDetail.name}<br/>
                               Email: ${user.email}`,
         //   role: '<div class="badge badge-danger">Driver</div>',
            modelTitle: 'Driver',
            editButtonUrl: '/admin/user/edit',
            viewButonUrl: '/admin/user/view',
          },
          3: {
            image: `<img alt="image" src="${user && user.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.vendorDetail && user.vendorDetail.name}">`,
            user: `Name: ${user.name}<br/>
                               Email: ${user.email}`,
          //  role: '<div class="badge badge-dark">Vendor</div>',
            modelTitle: 'Vendor',
            editButtonUrl: '/admin/vendor/edit',
            viewButonUrl: '/admin/vendor/view',
          }
        }

        const statusButton = {
          0: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
          1: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-success status_btn" >Active</button>`,
        }

        const approvalStatusObj = {
          0: {
            value: `Pending`,
            backgroundCssColor: `red`,
          },
          1: {
            value: `Pending More Info`,
            backgroundCssColor: `#ffc107`,
          },
          2: {
            value: `Approve`,
            backgroundCssColor: `green`,
          },
          3: {
            value: `Suspend`,
            backgroundCssColor: `orange`,
          },
          4: {
            value: `Decline`,
            backgroundCssColor: `red`,
          },
        }

        // console.log(user.id, '======================>user.id');
        // console.log(user.vendorDetail.approvalStatus, '======================>user.vendorDetail.approvalStatus');
        // return;

        let approvalStatusSelect = ``;
        if (user.role == 3) {
          approvalStatusSelect += `<select class="changeVendorApprovalStatus" model="vendorDetail" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" model_id="${user.id}" model_detail_id="${user.vendorDetail && user.vendorDetail.id}" field="approvalStatus" current_value="${user.vendorDetail && user.vendorDetail.approvalStatus}" style="background: ${approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus] && approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
          for (let status in approvalStatusObj) {
            // console.log(approvalStatusObj, '=================-=================>approvalStatusObj');
            // console.log(approvalStatusObj[status], `=================-=================>approvalStatusObj[${status}]`);

            approvalStatusSelect += `<option value="${status}" ${status == user.vendorDetail.approvalStatus ? 'selected' : ''} style="background: ${approvalStatusObj[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${approvalStatusObj[status].value}</option>`;
          }
          approvalStatusSelect += `</select>`;
        }


        const verifiedButton = {
          0: `<div class="badge badge-warning">Unverified</div>`,
          1: `<div class="badge badge-success">Verified</div>`,
        }

        const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}/${user.id}" class="btn btn-outline-info" >View</a>`;
        // const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}/${user.id}" class="btn btn-outline-warning" >Edit</a>`;
        const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

        let action = '';
        action += viewButton;
        action += '&nbsp;';
      //  action += editButton;
        action += '&nbsp;';
        action += deleteButton;


        return Object.values({
          sno: parseInt(start) + parseInt(index) + 1,
          image: roleBasedColumnDetail[user.role].image,
          user: roleBasedColumnDetail[user.role].user,
      //    role: roleBasedColumnDetail[user.role].role,
          regDate: moment(user.createdAt).format('dddd, MMMM Do YYYY'),
          status: statusButton[user.status],
          ...(
            user.role == 3
              ? { approvalStatus: approvalStatusSelect }
              : {}
          ),
          verified: verifiedButton[user.verified],
          action
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
  checkEmail: async (req, res) => {
    try {
      const { email, id, role } = { ...req.body };
      let valid = true;

      let existingEmail = await models[model].findAll({
        where: {
          id: {
            [Op.ne]: id
          },
          email,
          ...(
            role ? { role } : {}
          )
        },
        include: [
          {

            model: models['userDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (userDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', userDetail.image)) )`), 'image']
              ]
            }
          },
          {
            model: models['driverDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (driverDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', driverDetail.image)) )`), 'image']
              ]
            }
          },
          {
            model: models['vendorDetail'],
            attributes: {
              include: [
                [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image']
              ]
            }
          },
        ],
        attributes: [
          'id',
          'role',
          'email',
        ]
      });

      // if (existingEmail.length > 0) valid = false;
      // res.send(valid);

      let message = '';
      if (existingEmail.length > 0) {
        valid = false;
        let namesArray = [];
        existingEmail.forEach(user => {
          user = user.toJSON();
          console.log(userRoleModels, '========>userRoleModels')
          console.log(user, '========>user in the ajax')
          namesArray.push(user[userRoleModels[user.role]]['name']);
        });
        let text = "";
        if (namesArray.length > 0) {
          text = ` of ${namesArray.join(', ')}`;
        }
        message = `An account${text} with this email already exists, Kindly use another.`;
      }

      if (!role) {
        valid = false;
        message = 'Please select role first.';
      }

      res.json({
        valid,
        message
      });
      // return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  checkPhone: async (req, res) => {
    try {
      const { phone, id, role } = { ...req.body };
      let valid = true;


      if (!role) {
        valid = false;
        message = 'Please select role first.';
        return res.json({
          valid,
          message
        });
      }

      let existingPhone = await models[userRoleModels[role]].findAll({
        where: {
          userId: {
            [Op.ne]: id
          },
          phone,
        },
        attributes: [
          'id',
          'name',
          'phone',
        ]
      });

      // if (existingEmail.length > 0) valid = false;
      // res.send(valid);

      let message = '';
      if (existingPhone.length > 0) {
        valid = false;
        let namesArray = [];
        existingPhone.forEach(user => {
          user = user.toJSON();
          console.log(userRoleModels, '========>userRoleModels')
          console.log(user, '========>user in the ajax')
          namesArray.push(user['name']);
        });
        let text = "";
        if (namesArray.length > 0) {
          text = ` of ${namesArray.join(', ')}`;
        }
        message = `An account${text} with this phone already exists, Kindly use another.`;
      }

      res.json({
        valid,
        message
      });
      // return helper.success(res, 'Status Updated Successfully.', updatedItem);
    } catch (err) {
      err.code = 200;
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
        image: req.files && req.files.image,
        status: req.body.status,
        phone: req.body.phone,
        ...req.body,
        // countryCode: req.body.countryCode,
        // phone: req.body.phone,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      // console.log(requestData, '================>requestDAta');
      // console.log(requestData['module.product'], '================>requestDAta');
      // return;
      // requestData.countryCodePhone = `${requestData.countryCode}${requestData.phone}`;

      if (requestData.hasOwnProperty('password') && requestData.password) {
        requestData.password = helper.bcryptHash(requestData.password);
      }

      // const imageFolders = {
      //     0: 'admin',
      //     1: 'user',
      //     2: 'user',
      //     3: 'user',
      // }

      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, 'user');
      }

      const userId = await helper.save(models[model], requestData);
      const user = await module.exports.findOneUser(userId);

      console.log(user, '=================================================>user');
      console.log(requestData, '=============================>requestData');

      if (user.role == 3 && !(requestData.hasOwnProperty('id') && requestData.id)) {
        const days = {
          1: 'sun',
          2: 'mon',
          3: 'tue',
          4: 'wed',
          5: 'thu',
          6: 'fri',
          7: 'sat'
        }

        let vendorDeliveryOptionsArray = [];
        for (let i = 1; i <= 7; i++) {
          const vendorDeliveryOption = {
            vendorId: user.id,
            sortOrder: i,
            day: days[i],
          };
          vendorDeliveryOptionsArray.push(vendorDeliveryOption)
          // console.log(vendorDeliveryOption, `=========================>vendorDeliveryOption${i}`)
        }
        // console.log(vendorDeliveryOptionsArray, '=============================>vendorDeliveryOptionsArray');
        await models['vendorDeliveryOptions'].bulkCreate(vendorDeliveryOptionsArray);

        let vendorDeliveryChargesArray = [];
        for (let i = 0; i < 50; i += 5) {
          const vendorDeliveryCharge = {
            vendorId: user.id,
            minDistance: i,
            maxDistance: i + 5,
          };
          vendorDeliveryChargesArray.push(vendorDeliveryCharge)
          // console.log(vendorDeliveryOption, `=========================>vendorDeliveryOption${i}`)
        }
        // console.log(vendorDeliveryOptionsArray, '=============================>vendorDeliveryOptionsArray');
        await models['vendorDeliveryCharges'].bulkCreate(vendorDeliveryChargesArray);


      } else if ([4, 5].includes(user.role)) {
        const permissions = {};
        for (let i in modules.sellerAdmin) {
          const moduleItem = modules['sellerAdmin'][i];
          if (moduleItem.hasOwnProperty('permissions') && Array.isArray(moduleItem.permissions) && moduleItem.permissions.length > 0) {
            if (requestData.hasOwnProperty(`module.${i}`)) {
              permissions[i] = Array.isArray(requestData[`module.${i}`]) ? requestData[`module.${i}`] : [requestData[`module.${i}`]];

              if (permissions[i].length > 0 && !(permissions[i].includes('view'))) {
                permissions[i].push('view');
              }
              permissions[i].sort();
            } else {
              permissions[i] = [];
            }
          }
        }

        console.log(permissions, '====================================>permissions');
        requestData.permissions = permissions;
        // return;
      }

      user[userRoleModels[user.role]] && user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      requestData.userId = user.id;
      await helper.save(models[userRoleModels[user.role]], requestData);


      let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') && requestData.id ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;
      req.flash('flashMessage', { color: 'success', message });

      if (user.role == 0) {
        return helper.success(res, message, user);
      } else if ([4, 5].includes(parseInt(user.role))) {
        let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') && requestData.id ? `Updated` : 'Added'} Successfully.`;
        req.flash('flashMessage', { color: 'success', message });

        res.redirect(`/admin/vendor/edit/${requestData.vendorId}#staffManagement`);
      }

      res.redirect(`/admin/${requestData.role == 3 ? 'vendor' : 'user'}/listing`);

      // return helper.success(res, message, user);    
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const required = {
        id: req.body.id,
      };
      const nonRequired = {
        name: req.body.name,
        email: req.body.email,
        // role: req.body.role,
        password: req.body.password,
        image: req.files && req.files.image,
        username: req.body.username,
        phone: req.body.phone,
        shopName: req.body.shopName,
        abn: req.body.abn,
        buildingNumber: req.body.buildingNumber,
        streetNumber: req.body.streetNumber,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postalCode: req.body.postalCode,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        geoLocation: req.body.geoLocation,
        shopAddress: req.body.shopAddress,
        shopDescription: req.body.shopDescription,
        paymentPolicy: req.body.paymentPolicy,
        deliveryPolicy: req.body.deliveryPolicy,
        sellerInformation: req.body.sellerInformation,
        taxInPercent: req.body.taxInPercent,
        taxValue: req.body.taxValue,
        bankName: req.body.bankName,
        bankBranch: req.body.bankBranch,
        accountHolderName: req.body.accountHolderName,
        accountNumber: req.body.accountNumber,
        bsbNumber: req.body.bsbNumber,
        ifscSwiftCode: req.body.ifscSwiftCode,
        bankAddress: req.body.bankAddress,
        shopLogo: req.body.shopLogo,
        // countryCode: req.body.countryCode,
        // phone: req.body.phone,
        redirectUrl: req.body.redirectUrl,
        ...req.body,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      // requestData.countryCodePhone = `${requestData.countryCode}${requestData.phone}`;

      if (requestData.hasOwnProperty('password') && requestData.password) {
        requestData.password = helper.bcryptHash(requestData.password);
      }

      // const imageFolders = {
      //     0: 'admin',
      //     1: 'user',
      //     2: 'user',
      //     3: 'user',
      // }

      if (req.files && req.files.image) {
        requestData.image = helper.imageUpload(req.files.image, 'user');
      }

      if (req.files && req.files.shopLogo) {
        requestData.shopLogo = helper.imageUpload(req.files.shopLogo, 'user');
      }

      // console.log(requestData, '==========>requestData;')
      // return;

      const userId = await helper.save(models[model], requestData);
      const user = await module.exports.findOneUser(userId);
      console.log(user, '=================================================>user');

      user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      requestData.userId = user.id;

      console.log(requestData, `==========>requestData for model ${models[userRoleModels[user.role]]}`);
      // return;
      await helper.save(models[userRoleModels[user.role]], requestData);

      // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

      const messageModule = {
        '/admin/manageShop': 'Shop Detail',
        '/admin/taxCategory': 'Tax Category',
        '/admin/setting': 'Setting',
      };

      let message = `${requestData.redirectUrl.includes('/vendor/') ? 'Vendor' : messageModule[requestData.redirectUrl]} Updated Successfully.`;

      req.flash('flashMessage', { color: 'success', message });

      if (messageModule[requestData.redirectUrl] == 'Setting') {
        return helper.success(res, message, user);
      }

      console.log(requestData.redirectUrl, '======>requestData.redirectUrl');
      // return;
      res.redirect(requestData.redirectUrl);

      // return helper.success(res, message, user);    
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  updateVendorDeliveryOptionDays: async (req, res) => {
    try {
      const required = {
        vendorId: req.body.vendorId,
      };
      const nonRequired = {
        day: req.body.day,
        deliveryTimeFrom: req.body.deliveryTimeFrom,
        deliveryTimeTo: req.body.deliveryTimeTo,
        noDelivery: req.body.noDelivery,
        redirectUrl: req.body.redirectUrl,
        ...req.body,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      console.log(requestData, '==========>requestData;')



      for (let i = 1; i <= 7; i++) {
        if (requestData.hasOwnProperty(`id${i}`)) {
          const updateVendorDeliveryOption = {
            id: requestData[`id${i}`],
            ...(requestData.hasOwnProperty(`day${i}`) ? { day: requestData[`day${i}`] } : {}),
            ...(requestData.hasOwnProperty(`deliveryTimeFrom${i}`) ? { deliveryTimeFrom: requestData[`deliveryTimeFrom${i}`] } : {}),
            ...(requestData.hasOwnProperty(`deliveryTimeTo${i}`) ? { deliveryTimeTo: requestData[`deliveryTimeTo${i}`] } : {}),
            noDelivery: requestData.hasOwnProperty(`noDelivery${i}`) && requestData[`noDelivery${i}`] == 'on' ? 1 : 0,
          };
          helper.save(models['vendorDeliveryOptions'], updateVendorDeliveryOption);
          console.log(updateVendorDeliveryOption, `=========================>updateVendorDeliveryOption${i}`)
        }
      }

      // return;

      // const userId = await helper.save(models[model], requestData);
      // const user = await module.exports.findOneUser(userId);
      // console.log(user, '=================================================>user');

      // user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      // requestData.userId = user.id;

      // console.log(requestData, `==========>requestData for model ${models[userRoleModels[user.role]]}`);
      // // return;
      // await helper.save(models[userRoleModels[user.role]], requestData);

      // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

      let message = `Vendor Updated Successfully.`;

      req.flash('flashMessage', { color: 'success', message });

      console.log(requestData.redirectUrl, '======>requestData.redirectUrl');
      // return;
      res.redirect(requestData.redirectUrl);

      // return helper.success(res, message, user);    
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  updateVendorDeliveryCharges: async (req, res) => {
    try {
      const required = {
        vendorId: req.body.vendorId,
      };
      const nonRequired = {
        price: req.body.price,
        noDelivery: req.body.noDelivery,
        freeDelivery: req.body.freeDelivery,
        redirectUrl: req.body.redirectUrl,
        ...req.body,
      };

      let requestData = await helper.vaildObject(required, nonRequired);

      console.log(requestData, '==========>requestData;')

      const getHighestMinDistanceValue = await models['vendorDeliveryCharges'].findOne({
        where: {
          vendorId: requestData.vendorId,
        },
        raw: true,
        order: [['minDistance', 'DESC']],
      });

      if (!getHighestMinDistanceValue) throw "Delivery Charges do not exist.";

      console.log(getHighestMinDistanceValue.minDistance, '=======================>getHighestMinDistanceValue.minDistance');

      for (let i = 0; i <= getHighestMinDistanceValue.minDistance; i += 5) {
        if (requestData.hasOwnProperty(`id${i}`)) {
          const updateVendorDeliveryCharge = {
            id: requestData[`id${i}`],
            ...(requestData.hasOwnProperty(`price${i}`) ? { price: requestData[`price${i}`] } : {}),
            noDelivery: requestData.hasOwnProperty(`noDelivery${i}`) && requestData[`noDelivery${i}`] == 'on' ? 1 : 0,
            freeDelivery: requestData.hasOwnProperty(`freeDelivery${i}`) && requestData[`freeDelivery${i}`] == 'on' ? 1 : 0,
          };
          helper.save(models['vendorDeliveryCharges'], updateVendorDeliveryCharge);
          console.log(updateVendorDeliveryCharge, `=========================>updateVendorDeliveryCharge${i}`)
        }
      }
      // return;


      // const userId = await helper.save(models[model], requestData);
      // const user = await module.exports.findOneUser(userId);
      // console.log(user, '=================================================>user');

      // user[userRoleModels[user.role]].id ? requestData.id = user[userRoleModels[user.role]].id : delete requestData.id;
      // requestData.userId = user.id;

      // console.log(requestData, `==========>requestData for model ${models[userRoleModels[user.role]]}`);
      // // return;
      // await helper.save(models[userRoleModels[user.role]], requestData);

      // let message = `${roleTypes[user.role]} ${requestData.hasOwnProperty('id') ? `${req.session.admin.id == user.id ? 'Profile ' : ''}Updated` : 'Added'} Successfully.`;

      let message = `Vendor Updated Successfully.`;

      req.flash('flashMessage', { color: 'success', message });

      console.log(requestData.redirectUrl, '======>requestData.redirectUrl');
      // return;
      res.redirect(requestData.redirectUrl);

      // return helper.success(res, message, user);    
    } catch (err) {
      err.code = 200;
      return helper.error(res, err);
    }
  },
  findOneUser: async (id) => {
    let data = await models[model].findOne({
      where: {
        id
      },
      attributes: {
        include: [
          [sequelize.literal(`(IF (user.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', user.image)) )`), 'image']
        ]
      },
      include: [
        {

          model: models['adminDetail'],
          required: false,
          attributes: {
            include: [
              [sequelize.literal(`(IF (adminDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', adminDetail.image)) )`), 'image']
            ]
          }
        },
        {
          model: models['userDetail'],
          required: false,
          attributes: {
            include: [
              [sequelize.literal(`(IF (userDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', userDetail.image)) )`), 'image']
            ]
          }
        },
        {
          model: models['userDeliveryAddress'],
          required: false,
        },
        {
          model: models['driverDetail'],
          required: false,
          attributes: {
            include: [
              [sequelize.literal(`(IF (driverDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', driverDetail.image)) )`), 'image']
            ]
          }
        },
        {
          model: models['vendorDetail'],
          required: false,
          attributes: {
            include: [
              [sequelize.literal(`(IF (vendorDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorDetail.image)) )`), 'image'],
              [sequelize.literal(`(IF (vendorDetail.shopLogo='', '${baseUrl}/uploads/default/default_image.jpg', CONCAT('${baseUrl}/uploads/user/', vendorDetail.shopLogo)) )`), 'shopLogo'],
            ]
          }
        },
        {
          model: models['vendorStaffDetail'],
          required: false,
          attributes: {
            include: [
              [sequelize.literal(`(IF (vendorStaffDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorStaffDetail.image)) )`), 'image'],

            ]
          }
        },
        // {
        //     model: models['vendorDeliveryOptions'],
        //     required: false,
        // },
      ],
      // raw: true,
      // nest: true,
    });

    if (data) data = data.toJSON();

    console.log("DATA");

    if (data && data.role == 3) {
      const vendorDeliveryOptions = await models['vendorDeliveryOptions'].findAll({
        where: {
          vendorId: data.id
        },
        order: [['sortOrder', 'ASC']]
      }).map(vendorDeliveryOption => vendorDeliveryOption.toJSON());
      data.vendorDeliveryOptions = vendorDeliveryOptions;

      const vendorDeliveryCharges = await models['vendorDeliveryCharges'].findAll({
        where: {
          vendorId: data.id
        },
        order: [['minDistance', 'ASC']]
      }).map(deliveryCharge => deliveryCharge.toJSON());
      data.vendorDeliveryCharges = vendorDeliveryCharges;
    }
    return data;
  },
  getAllVendorStaff: async (vendorId) => {
    const vendorStaff = await models['user'].findAll({
      include: [
        {
          model: models['vendorStaffDetail'],
          required: true,
          where: {
            vendorId,
          },
          attributes: {
            include: [
              [sequelize.literal(`(IF (vendorStaffDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/user/', vendorStaffDetail.image)) )`), 'image'],

            ]
          }
        }
      ]
    });


    const data = vendorStaff.map((user, index) => {
      const roleBasedColumnDetail = {
        4: {
          image: `<img alt="image" src="${user.vendorStaffDetail && user.vendorStaffDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.vendorStaffDetail && user.vendorStaffDetail.name}">`,
          user: `Name: ${user.vendorStaffDetail && user.vendorStaffDetail.name}<br/>
                           Email: ${user.email}<br/>
                        `,
          role: '<div class="badge badge-dark">Employee</div>',
          modelTitle: 'Employee',
          editButtonUrl: `/admin/vendor/editStaff/${vendorId}/${user.id}`,
          viewButonUrl: `/admin/vendor/viewStaff/${vendorId}/${user.id}`,
        },
        5: {
          image: `<img alt="image" src="${user.vendorStaffDetail && user.vendorStaffDetail.image}" class="rounded-circle" width="50" data-toggle="tooltip" title="${user.vendorStaffDetail && user.vendorStaffDetail.name}">`,
          user: `Name: ${user.vendorStaffDetail && user.vendorStaffDetail.name}<br/>
                           Email: ${user.email}<br/>
                        `,
          role: '<div class="badge badge-dark">Manager</div>',
          modelTitle: 'Manager',
          editButtonUrl: `/admin/vendor/editStaff/${vendorId}/${user.id}`,
          viewButonUrl: `/admin/vendor/viewStaff/${vendorId}/${user.id}`,
        },
      }

      const statusButton = {
        0: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-danger status_btn" >Inactive</button>`,
        1: `<button model_id="${user.id}" model="${model}" status="${user.status}" class="btn btn-outline-success status_btn" >Active</button>`,
      }

      const approvalStatusObj = {
        0: {
          value: `Pending`,
          backgroundCssColor: `red`,
        },
        1: {
          value: `Pending More Info`,
          backgroundCssColor: `#ffc107`,
        },
        2: {
          value: `Approve`,
          backgroundCssColor: `green`,
        },
        3: {
          value: `Suspend`,
          backgroundCssColor: `orange`,
        },
        4: {
          value: `Decline`,
          backgroundCssColor: `red`,
        },
      }

      // console.log(user.id, '======================>user.id');
      // console.log(user.vendorDetail.approvalStatus, '======================>user.vendorDetail.approvalStatus');
      // return;

      let approvalStatusSelect = ``;
      // if (user.role == 3) {
      //     approvalStatusSelect += `<select class="changeVendorApprovalStatus" model="vendorDetail" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" model_id="${user.id}" model_detail_id="${user.vendorDetail && user.vendorDetail.id}" field="approvalStatus" current_value="${user.vendorDetail && user.vendorDetail.approvalStatus}" style="background: ${approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus] && approvalStatusObj[user.vendorDetail && user.vendorDetail.approvalStatus].backgroundCssColor}; color: #fff; font-weight: 600;" >`;
      //     for (let status in approvalStatusObj) {
      //         // console.log(approvalStatusObj, '=================-=================>approvalStatusObj');
      //         // console.log(approvalStatusObj[status], `=================-=================>approvalStatusObj[${status}]`);

      //         approvalStatusSelect += `<option value="${status}" ${status == user.vendorDetail.approvalStatus ? 'selected' : ''} style="background: ${approvalStatusObj[status].backgroundCssColor}; color: #fff; font-weight: 600;" >${approvalStatusObj[status].value}</option>`;
      //     }
      //     approvalStatusSelect += `</select>`;
      // }


      const verifiedButton = {
        0: `<div class="badge badge-warning">Unverified</div>`,
        1: `<div class="badge badge-success">Verified</div>`,
      }

      const viewButton = `<a href="${roleBasedColumnDetail[user.role]['viewButonUrl']}" class="btn btn-outline-info" >View</a>`;
      const editButton = `<a href="${roleBasedColumnDetail[user.role]['editButtonUrl']}" class="btn btn-outline-warning" >Edit</a>`;
      const deleteButton = `<button model_id="${user.id}" model="${model}" model_title="${roleBasedColumnDetail[user.role]['modelTitle']}" datatable="${modelDataTable}" class="btn btn-outline-danger delete_btn" >Delete</button>`;

      let action = '';
      action += viewButton;
      // action += '&nbsp;';
      // action += editButton;
      // action += '&nbsp;';
      // action += deleteButton;


      return Object.values({
        sno: parseInt(index) + 1,
        image: roleBasedColumnDetail[user.role].image,
        user: roleBasedColumnDetail[user.role].user,
        role: roleBasedColumnDetail[user.role].role,
        // regDate: moment(user.createdAt).format('dddd, MMMM Do YYYY'),
        status: statusButton[user.status],
        // ...(
        //     user.role == 3
        //         ? { approvalStatus: approvalStatusSelect }
        //         : {}
        // ),
        // verified: verifiedButton[user.verified],
        action
      });
    });

    const headerColumns = Object.values({
      sno: '#',
      image: 'Image',
      User: 'User',
      role: 'Role',
      // regDate: 'Reg. Date',
      status: 'status',
      action: 'Action',
    });

    return {
      headerColumns,
      data,
    }
  }
}