const models = require('../../models');
const helper = require('../../helpers/helper');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt');
const { makeImageUrlSql } = require('../../helpers/helper');
const { json } = require('sequelize');
const countryCodes = require('country-codes-list');
const stripe = require('stripe')('sk_test_pciIAynild7VofmBr89ZTX6T');
const secretKey = jwtSecretKey;
const Op = sequelize.Op;
const user = models.user
const userDetail = models.userDetail
const adminDetail = models.adminDetail
const blog = models.blog
const page = models.page
const contact_us = models.contact_us
const userDeliveryAddress = models.userDeliveryAddress
const faq = models.faq
const category = models.category
const product = models.product
const images = models.images
const color = models.color
const cart = models.cart
const setting = models.setting
const wishlist = models.wishlist
const banner = models.banner
const blog_category = models.blog_category
const blog_comment = models.blog_comment
const cards = models.card
const order = models.order
const save_to_later = models.save_to_later
const add_to_compare = models.add_to_compare
const productSpecification = models.productSpecification
const reviews = models.reviews
const brand = models.brand

var atob = require('atob');

module.exports = {
  index: async (req, res) => {
    try {
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      // console.log(countryCodesList,'===============herer');return
      let get_blog = await blog.findAll({
        attributes: [`id`, `name`, helper.makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`],
        raw: true,
        limit: 2,
        order: [["id", "desc"]]
      })
      let get_banner = await banner.findAll({
        attributes: [`id`, 'title', `link`, helper.makeImageUrlSql('banner', 'image', 'banner'), `createdAt`],
        raw: true,
        order: [["id", "desc"]]
      })
      // console.log(get_banner,'=========================vget_banner');return
      let get_category = await module.exports.get_category(
        where = {
          parentId: null,
          discount: {
            [Op.gt]: 0,
          }
        },
      )
      let get_store_location = await module.exports.get_store_location(req, res)
      // console.log(get_store_location,'===============herer');return
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      var get_product = await module.exports.get_product(req, res)

      if (req.session.user) {
        let order = [["id", "desc"]]
        let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
        var get_product = await product.findAll({
          where: {
            isApproved: 1,
            status: 1
          },
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, 'is_featured', `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'], [sequelize.literal('(SELECT avg(rating) FROM reviews where reviews.product_id = product.id )'), 'avg_rating'],
            [sequelize.literal('(SELECT count(id) FROM reviews where reviews.product_id = product.id )'), 'total_reviews'],
            [sequelize.literal('(SELECT count(id) FROM cart where cart.productId = product.id and cart.userId=' + req.session.user.id + ' )'), 'alreadyInCart'],
          ],
          include: [
            {
              attributes: [`id`, `prod_id`, helper.makeImageUrlSql('images', 'images', 'products'), `createdAt`, `updatedAt`],
              model: images,
            },
            {
              model: color
            },
            {
              model: productSpecification
            }
          ],
          order: order,
        }).map(data => data.toJSON())
        console.log(get_product, '====================herer');
      }
      let get_admin = await module.exports.get_admin(req, res);
      res.render("website/index", {
        session: req.session,
        countryCodesList,
        get_blog,
        get_category,
        get_product,
        get_nav_category,
        get_banner,
        get_admin,
        location_arr: get_store_location,
        search: "",

      }
      )
      console.log(req.session, '----------------------------------session'); return
    } catch (error) {
      return helper.error(res, error)
    }
  },
  check_email_exists: async (req, res) => {
    try {
      if (req.body.email) {
        if (req.session.user) {
          var getCount = await user.count({
            where: {
              email: req.body.email,
              id: {
                [Op.ne]: req.session.user.id
              },
            }
          })
        } else {
          var getCount = await user.count({
            where: {
              email: req.body.email,
            }
          })
        }
        if (getCount > 0) {
          res.send(false)
        }
        else {
          res.send(true)
        }
      }
      if (req.body.forgot_email) {
        let getCount = await user.count({
          where: {
            email: req.body.forgot_email
          }
        })
        if (getCount > 0) {
          res.send(true)
        }
        else {
          res.send(false)
        }
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  check_phone_exists: async (req, res) => {
    try {
      if (req.session.user) {
        var getCount_phone = await userDetail.count({
          where: {
            phone: req.body.phone,
            id: {
              [Op.ne]: req.session.user.id
            },
          }
        })
      }
      else {
        var getCount_phone = await userDetail.count({
          where: {
            phone: req.body.phone,
          }
        })
      }
      if (getCount_phone > 0) {
        res.send(false)
      }
      else {
        res.send(true)
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  sign_up: async (req, res) => {
    try {
      let getCount = await user.count({
        where: {
          email: req.body.email
        }
      })
      if (getCount > 0) {
        return
      }

      let getCount_phone = await userDetail.count({
        where: {
          phone: req.body.phone
        }
      })
      if (getCount_phone > 0) {
        return
      }
      let customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.first_name,
      });
      // console.log(customer,'=========================herer');return
      var addUser = await user.create({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        countryCode: req.body.country_code,
        stripe_customer_id: customer.id,
        password: helper.bcryptHash(req.body.password)
      })
      if (addUser) {
        let addDetaail = await userDetail.create({
          name: req.body.name,
          phone: req.body.phone,
          userId: addUser.id
          // country_code:req.body.
        })
        if (addDetaail) {
          let findUser = await user.findOne({
            attributes: [`id`, `role`, `name`, `stripe_customer_id`, `verified`, `status`, `username`, `email`, `password`, `image`, `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `googleId`, `otp`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('ifNull((SELECT count(id) FROM cart where user.id = cart.userId),0)'), 'cart_count'], [sequelize.literal('ifNull((SELECT count(id) FROM add_to_compare where user.id = add_to_compare.user_id),0)'), 'compare_count']],
            where: {
              id: addUser.id
            },
            raw: true
          })

          let userData = {
            id: findUser.id,
            email: findUser.email,
            password: findUser.password,
          }

          var token = jwt.sign({
            data: userData
          }, secretKey);

          findUser.token = token;
          req.session.user = findUser;
          req.session.authenticated_web = true;
          res.send(
            {
              msg: "Signup successfully",
              status: true,
              session: req.session
            }
          )
        } else {
          res.send(
            {
              msg: "user detail not created",
              status: false
            }
          )
        }
      } else {
        res.send(
          {
            msg: "user not created",
            status: false
          }
        )
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  log_in: async (req, res) => {
    try {
      var findUser = await user.findOne({
        where: {
          email: req.body.email
        },
        raw: true
      })
      if (!findUser) {
        res.send(
          {
            msg: "User does not exist",
            status: false
          }
        )
        return
      }
      if (findUser.status == 0) {
        res.send(
          {
            msg: "you are inactive by admin",
            status: false
          }
        )
        // return
      }
      let comparePassword = await helper.comparePass(req.body.password, findUser.password)
      if (!comparePassword) {
        res.send(
          {
            msg: "Incorrect password",
            status: false
          }
        )
      }
      var getUser = await user.findOne({
        attributes: [`id`, `role`, `name`, `verified`, `stripe_customer_id`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `loyality_points`, `forgotPasswordHash`, `facebookId`, `googleId`, `otp`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('ifNull((SELECT count(id) FROM cart where user.id = cart.userId),0)'), 'cart_count'],
          [sequelize.literal('ifNull((SELECT count(id) FROM add_to_compare where user.id = add_to_compare.user_id),0)'), 'compare_count']],
        where: {
          id: findUser.id
        },
        raw: true
      })
      let userData = {
        id: getUser.id,
        email: getUser.email,
        password: getUser.password,
      }

      var token = jwt.sign({
        data: userData
      }, secretKey);

      getUser.token = token;
      req.session.user = getUser;
      req.session.authenticated_web = true;
      // console.log(req.session,'================herer');return
      res.send(
        {
          msg: "login successfully",
          status: true,
          session: req.session
        }
      )
    } catch (error) {
      return helper.error(res, error)
    }
  },
  log_out: async (req, res) => {
    try {
      req.session.authenticated_web = false;
      delete req.session.user;
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);

      req.flash('flashMessage', { color: 'success', message: 'Logged out Successfully.', get_category, get_product, get_admin });
      res.redirect('/home');
    } catch (error) {
      return helper.error(res, error)
    }
  },
  blog: async (req, res) => {
    try {
      let get_blog = await blog.findAll({
        attributes: [`id`, `name`, helper.makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`,
        ],
        raw: true,
        order: [["id", "desc"]]
      })

      let get_popular_blog = await module.exports.get_popular_blog(req, res)

      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_blog_category = await module.exports.get_blog_category(req, res)

      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      let url = `${req.protocol}://${req.get('host')}` + req.url;

      res.render("website/blog", {
        session: req.session, blogs: get_blog, get_category, get_nav_category, get_product, get_admin, countryCodesList, get_blog_category, get_popular_blog, location_arr: get_store_location, searh: "", url: url,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  about: async (req, res) => {
    try {
      let about_us = await page.findOne({
        where: {
          id: 1
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/about_us", {
        session: req.session, about_us: about_us, get_category, get_product, get_nav_category, countryCodesList, get_admin, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  contact_us: async (req, res) => {
    try {
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_store_location = await module.exports.get_store_location(req, res)

      let get_admin = await module.exports.get_admin(req, res);
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/contact_us", {
        session: req.session, get_category, get_product, get_nav_category, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_contact_us: async (req, res) => {
    try {
      let add_contact = await contact_us.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
      })
      if (add_contact) {
        res.send({
          msg: "Message sent successfully",
          status: true,
        })
      } else {
        res.send({
          msg: "something went wrong",
          status: false,
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  term: async (req, res) => {
    try {
      let get_terms = await page.findOne({
        where: {
          id: 2
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      res.render("website/terms", {
        session: req.session, get_nav_category, get_terms: get_terms, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  privacy: async (req, res) => {
    try {
      let get_privacy = await page.findOne({
        where: {
          id: 3
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/privacy", {
        session: req.session, get_nav_category, get_privacy: get_privacy, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  get_profile: async (req, res) => {
    try {
      let get_user = await user.findOne({
        attributes: [`id`, `role`, `name`, `verified`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `googleId`, `otp`, `created`, `updated`, `createdAt`, `updatedAt`],
        where: {
          id: req.session.user.id
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_wishlist = await module.exports.get_wishlist(req, res, where = { user_id: get_user.id })
      // console.log(get_wishlist, '===================herer'); return
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');


      res.render("website/account", {
        session: req.session, get_nav_category, get_user: get_user, get_category, get_product, get_wishlist, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  update_profile: async (req, res) => {
    try {

      if (req.files && req.files.image && req.files != null) {
        var image = await helper.imageUpload(req.files.image, 'user');
      } else {
        var image = req.session.user.image
      }
      let update_profile = await user.update({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        countryCode: req.body.country_code,
        image: image
      }, {
        where: {
          id: req.session.user.id
        }
      })
      if (update_profile) {
        let findUser = await user.findOne({
          attributes: [`id`, `role`, `name`, `verified`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `googleId`, `otp`, `created`, `updated`, `createdAt`, `updatedAt`],
          where: {
            id: req.session.user.id
          },
          raw: true
        })
        let userData = {
          id: findUser.id,
          email: findUser.email,
          password: findUser.password,
        }
        var token = jwt.sign({
          data: userData
        }, secretKey);
        findUser.token = token;
        req.session.user = findUser;
        req.session.authenticated_web = true;
        res.send(
          {
            msg: "profile update successfully",
            status: true,
            session: req.session
          }
        )
      }
      else {
        res.send(
          {
            msg: "something went wrong",
            status: false,
          }
        )
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  check_old_password_exists: async (req, res) => {
    try {
      var user_old_password = req.session.user.password
      var comparePassword = await helper.comparePass(req.body.old_password, user_old_password)
      if (comparePassword == true) {
        res.send(true)
      }
      else {
        res.send(false)
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  update_password: async (req, res) => {
    try {
      let upodate_pass = await user.update({
        password: helper.bcryptHash(req.body.confirm_password)
      }, {
        where: {
          id: req.session.user.id
        }
      })
      if (upodate_pass) {
        let findUser = await user.findOne({
          where: {
            id: req.session.user.id
          },
          raw: true
        })
        let userData = {
          id: findUser.id,
          email: findUser.email,
          password: findUser.password,
        }
        var token = jwt.sign({
          data: userData
        }, secretKey);

        findUser.token = token;
        req.session.user = findUser;
        req.session.authenticated_web = true;
        res.send(
          {
            msg: "password updated successfully",
            status: true,
            session: req.session
          }
        )
      }
      else {
        res.send(
          {
            msg: "something went wrong",
            status: false,
          }
        )
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  address: async (req, res) => {
    try {
      let find_address = await userDeliveryAddress.findAll({
        where: {
          userId: req.session.user.id,
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');


      res.render("website/address", {
        session: req.session, get_nav_category, find_address, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      res.redirect("/home");
      return helper.error(res, error)
    }
  },
  add_address: async (req, res) => {
    try {
      let add_address = await userDeliveryAddress.create({
        name: req.body.first_name,
        last_name: req.body.last_name,
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip_code: req.body.zip_code,
        userId: req.session.user.id,
        type: req.body.type
      })
      if (add_address) {
        res.send({
          msg: "address added successfully",
          status: true,
          session: req.session
        })
      }
      else {
        res.send({
          msg: "something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  faq: async (req, res) => {
    try {
      let get_faq = await faq.findAll({ raw: true })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/faq", {
        session: req.session, get_nav_category, get_faq, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })

    } catch (error) {
      return helper.error(res, error)
    }
  },
  return: async (req, res) => {
    try {
      let get_return_info = await page.findOne({
        where: {
          id: 5
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/return", {
        session: req.session, get_nav_category, get_return_info: get_return_info, get_category, get_product, countryCodesList, get_admin, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  shipping_info: async (req, res) => {
    try {
      let get_shipping_info = await page.findOne({
        where: {
          id: 4
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/shipping_info", {
        session: req.session, get_shipping_info: get_shipping_info, get_nav_category, get_category, countryCodesList, get_product, get_admin, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  product_detail: async (req, res) => {
    try {
      if (req.session.user) {
        var getCart = await module.exports.get_all_cart(req, res,
          where = {
            userId: req.session.user.id
          }
        )
        var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
        var alreadyInCart = getCart.find((cart => cart.productId == decodedData));
      }
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      var get_product = await module.exports.get_product(req, res)
      get_product.forEach(product => {
        if (product.id == decodedData) {
          get_product.product_detail = product
        }
        return get_product
      });
      if (!get_product.product_detail && get_product.product_detail == undefined) {
        res.redirect("/home");
      }
      var product_detail = get_product.product_detail
      var result = product_detail.productSpecifications.reduce((acc, val) => {
        if (acc[val.name]) {
          acc[val.name] = [...acc[val.name], val]
        } else {
          acc[val.name] = [val]
        }
        return acc
      }, {});

      product_detail.specification = {
        ...result
      }
      console.log(product_detail, '====================herer');
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      let url = `${req.protocol}://${req.get('host')}` + req.url;
      // console.log( get_product.product_detail,'================= get_product.product_detail');return
      if (req.session.user) {
        let order = [["id", "desc"]]
        let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
        var get_product = await product.findAll({
          where: {
            isApproved: 1,
            status: 1
          },
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, 'is_featured', `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'], [sequelize.literal('(SELECT avg(rating) FROM reviews where reviews.product_id = product.id )'), 'avg_rating'],
            [sequelize.literal('(SELECT count(id) FROM reviews where reviews.product_id = product.id )'), 'total_reviews'],
            [sequelize.literal('(SELECT count(id) FROM cart where cart.productId = product.id and cart.userId=' + req.session.user.id + ' )'), 'alreadyInCart'],
          ],
          include: [
            {
              attributes: [`id`, `prod_id`, helper.makeImageUrlSql('images', 'images', 'products'), `createdAt`, `updatedAt`],
              model: images,
            },
            {
              model: color
            },
            {
              model: productSpecification
            }
          ],
          order: order,
        }).map(data => data.toJSON())
        console.log(get_product, '====================herer');
        get_product.forEach(product => {
          if (product.id == decodedData) {
            get_product.product_detail = product
          }
          return get_product
        });

        var product_detail = get_product.product_detail
        var result = product_detail.productSpecifications.reduce((acc, val) => {
          if (acc[val.name]) {
            acc[val.name] = [...acc[val.name], val]
          } else {
            acc[val.name] = [val]
          }
          return acc
        }, {});
        product_detail.specification = {
          ...result
        }
        var user_detail = await module.exports.get_user_detail(req.session.user.id)
        req.session.user = user_detail;
        req.session.authenticated_web = true;
      }
      res.render("website/product_detail", {
        session: req.session,
        get_category,
        get_product,
        get_nav_category,
        countryCodesList,
        get_admin,
        product_detail: product_detail,
        location_arr: get_store_location,
        url: url,
        search: "",
        alreadyInCart
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  category_product: async (req, res) => {
    try {
      console.log(req.query, '-====================ere');
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      var get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      if (req.query.order) {
        var sort = 0
        if (req.query.order == 1) {
          sort = 1
        } else {
          sort = 2
        }
      }

      (req.query.rangeOne > req.query.rangeTwo || req.query.rangeTwo < req.query.rangeOne) && ([req.query.rangeOne, req.query.rangeTwo] = [req.query.rangeTwo, req.query.rangeOne])



      // console.log(sort,'==============================sort');return
      var get_product = await module.exports.get_product(req, res, sort)
      get_product = get_product.filter(get_product => get_product.categoryId == decodedData);
      get_nav_category.forEach(category_dateil => {
        if (category_dateil.id == decodedData) {
          get_nav_category.category_dateil = category_dateil
        }
        // return get_category
      })
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      // console.log(get_category.category_dateil,'====================herer');return
      res.render("website/category_product", {
        session: req.session, get_product, get_admin,
        category_dateil: get_nav_category.category_dateil, get_nav_category, location_arr: get_store_location, key: req.query.key, rangeOne: req.query.rangeOne ? req.query.rangeOne : 0, rangeTwo: req.query.rangeTwo ? req.query.rangeTwo : 500, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  forgotPassword: async (req, res) => {
    try {
      var email = req.body.forgot_email
      // console.log(email,'=====================here');return
      let existingUser = await models['user'].findOne({
        where: {
          email: email
        },
        raw: true
      });
      existingUser.forgotPasswordHash = helper.createSHA1();
      let html = `<a href="${req.protocol}://${req.get('host')}/api/forgot_url/${existingUser.forgotPasswordHash}"> Click</a> here to change your password `;
      let emailData = {
        to: email,
        subject: `${appName} Forgot Password`,
        html: html
      };
      await helper.sendEmail(emailData);
      // return
      const user = await helper.save(models['user'], existingUser, true);
      res.send(
        {
          msg: "Email sent successfully",
          status: true,
          session: req.session
        }
      )
    } catch (err) {
      return helper.error(res, err);
    }
  },
  forgotUrl: async (req, res) => {
    try {
      let user = await models['user'].findOne({
        where: {
          forgotPasswordHash: req.params.hash
        }
      });

      if (user) {
        res.render("admin/reset_password", {
          title: appName,
          response: user,
          //   message: req.flash('message'),
          hash: req.params.hash
        });
      } else {
        const html = `
            <br/>
            <br/>
            <br/>
            <div style="font-size: 50px;" >
                <b><center>Link has been expired!</center><p>
            </div>
          `;
        res.status(403).send(html);
      }
    } catch (err) {
      throw err;
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, forgotPasswordHash } = { ...req.body };

      const user = await models['user'].findOne({
        where: {
          forgotPasswordHash
        },
        raw: true
      });
      if (!user) throw "Something went wrong.";

      const updateObj = {};
      updateObj.password = await helper.bcryptHash(password);
      updateObj.forgotPasswordHash = '';
      updateObj.id = user.id;

      const updatedUser = await helper.save(models['user'], updateObj);

      if (updatedUser) {
        return helper.success(res, 'Password updated successfully.', {});
      } else {
        throw "Invalid User.";
      }

    } catch (err) {
      return helper.error(res, err);
    }
  },
  shipping_and_return: async (req, res) => {
    try {
      let get_shipping_info = await page.findOne({
        where: {
          id: 6
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/shipping_return", {
        session: req.session, get_shipping_info: get_shipping_info, get_nav_category, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  loyality_program: async (req, res) => {
    try {
      let get_loyality_info = await page.findOne({
        where: {
          id: 7
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/loyality_program", {
        session: req.session, get_admin, get_loyality_info: get_loyality_info, get_nav_category, get_category, get_product, location_arr: get_store_location, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_to_cart: async (req, res) => {
    // console.log(req.body, '=======================herer');
    let get_product = await module.exports.get_product(req, res)
    get_product.forEach(product => {
      if (product.id == req.body.pid) {
        get_product.product_detail = product
      }
      return get_product
    });
    let product = get_product.product_detail
    let qty = req.body.qty ? req.body.qty : 1
    if (req.session && req.session.user == undefined && !req.session.user) {
      let cart = []
      let cart_product = {}
      console.log(req.body, '===================herer')
      cart_product = {
        ...req.body,
        vendorId: product.vendorId,
        total_price: product.retailPrice
      }
      cart.push(cart_product)
      req.session.cart = [
        ...cart
      ]
    }
    // console.log(req.session, '===================herer');return
    let userId = req.session.user ? req.session.user.id : res.send({
      msg: "WithoutLogin",
      status: true,
      session: req.session,
    })
    let get_count = await cart.count({
      where: {
        userId: userId,
        productId: req.body.pid,
      }
    })
    if (product.quantity < qty) {
      res.send({
        msg: "selected quantity is more than stock",
        status: false,
        session: req.session,
      })
    }
    get_count > 0 ? res.send({
      msg: "item already added to cart",
      status: false,
      session: req.session,
    }) : addCart = await cart.create({
      userId: userId,
      productId: req.body.pid,
      qty: qty,
      color: req.body.sc,
      specifications: req.body.product_specifications,
      vendorId: product.vendorId,
      total_price: product.retailPrice
    })
    let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
    let getCart = await cart.findOne({
      attributes: [`id`, `userId`, `productId`, `vendorId`, `qty`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT sum(total_price) FROM cart)'), 'sub_total']],
      where: {
        id: addCart.id
      },
      include: [
        {
          model: models.product,
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'],
          ],
        }
      ]
    }).then(data => data.toJSON())
    // console.log(getCart,'====================getCart')
    let get_full_Cart = await cart.findAll({
      where: {
        userId: userId
      },
      include: [
        {
          model: models.product,
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'],
          ],
        }
      ]
    }).map(data => data.toJSON())
    var user_detail = await module.exports.get_user_detail(userId)
    req.session.user = user_detail;
    req.session.authenticated_web = true;
    var sum = get_full_Cart.reduce((sum, cart) => sum + cart.total_price, 0)
    let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
    var shipping = get_full_Cart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
    get_full_Cart.sum = sum
    getCart.shipping = shipping

    get_full_Cart.tax = getTax.value
    let taxPer = (sum * (parseInt(getTax.value) / 100))
    let total_price = sum + taxPer + shipping
    getCart.total = total_price

    // console.log(get_full_Cart.shipping, '=============get_full_Cart======req.session'); return
    if (addCart) {
      res.send({
        msg: "item added to cart successfully",
        status: true,
        session: req.session,
        getCart: getCart,
        get_full_Cart: get_full_Cart,
        getTax

      })
    }
    else {
      res.send({
        msg: "something went wrong",
        status: false,
        session: req.session
      })
    }
  },
  get_cart: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

      !req.query.key ? req.query.key = '' : req.query.key
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      // console.log(decodedData, '===================herer'); return
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)


      let getCart = await cart.findAll({
        where: {
          userId: decodedData
        },
        include: [
          {
            model: product,
            attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'],
            ],
          }
        ]
      }).map(async data => {
        data = data.toJSON()
        let total_price_product = data.product.retailPrice * data.qty
        let updatecart = await cart.update({
          total_price: total_price_product
        }, {
          where: {
            id: data.id
          }
        })
        data.total_price = total_price_product
        data.specifications = JSON.parse(data.specifications);
        return data
      })
      var user_detail = await module.exports.get_user_detail(decodedData)
      var sum = getCart.reduce((sum, cart) => sum + cart.total_price, 0);
      // console.log(typeof(sum));return
      let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
      var shipping = getCart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
      getCart.sum = sum
      getCart.shipping = shipping

      getCart.tax = getTax.value
      let taxPer = (sum * (parseInt(getTax.value) / 100))
      let total_price = sum + taxPer + shipping
      getCart.total = total_price

      // return;
      req.session.user = user_detail;
      req.session.authenticated_web = true;
      // return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/cart", {
        session: req.session, getCart, get_nav_category, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: "",
        isLogin:true
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  getCart: async (req, res) => {
    try {
      let { Ids } = req.query

      let ids = atob(Ids)
      ids = JSON.parse(ids)
      // console.log(ids);return
      let id_array=[]
      let qty = {}
      let productIds = ids.forEach((val) => {
        let key = Object.keys(val)
        let vals = Object.values(val)
        id_array.push((key[0]))
        
        let quality ={
          [key[0]]:{
            'quantity':vals[0]
          }
        }
        if(qty.hasOwnProperty(key[0])){
          console.log('am here')
        }else{
          qty[key[0]] = vals[0]
        }

      })
      let getCart = await product.findAll({
        where: {
          id: id_array
        }
      }).map(async (data,i) => {
        data = data.toJSON();
        let qq = qty[data.id]; 
        let total_price_product = data.retailPrice * qq
        data.total_price = total_price_product
        data.qty = qty[data.id]; 
        // data.specifications = JSON.parse(data.specifications);
        let final = {'product':data}
        return final
      });
      console.log(getCart)
      return
      // let getCart = [{
      //   'cart':getCart__
      // }
      // ]
   
      
      let get_admin = await module.exports.get_admin(req, res);
      res.render("website/cart", {
        session: req.session, getCart, get_nav_category:[], get_category:{}, get_product:[], get_admin, countryCodesList:[], location_arr:[],
        search: "",
        isLogin:false
      })


    } catch (err) {
      return helper.error(res, err)
    }
  },

  del_cart_item: async (req, res) => {
    try {
      // console.log(req.body,'=====================herer');return
      let delcart = await cart.destroy({
        where: {
          id: req.body.piid
        }
      })
      if (delcart) {
        res.send({
          msg: "item deleted from cart successfully",
          status: true,
          session: req.session
        })
      }
      else {
        res.send({
          msg: "something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  update_cart: async (req, res) => {
    try {
      var getCart = await cart.findOne({
        attributes: [`id`, `userId`, `productId`, `vendorId`, `qty`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT retailPrice FROM product where productId = product.id order by id asc limit 1)'), 'productPrice']],
        where: {
          id: req.body.cart_id
        },
        raw: true
      })
      // console.log(getCart,'===========================herer');return
      var qty = getCart.qty
      if (req.body.type == 1) {
        var qty = qty + 1
      }
      if (req.body.type == 2) {
        var qty = qty - 1
      }
      // console.log(qty, '======================='); return
      if (qty < 1) {
        res.send({
          msg: "Cart quantity cannot be zero",
          status: false,
          session: req.session
        })
      } else {
        let final_price = getCart.productPrice * qty

        let updateQty = await cart.update({
          total_price: final_price,
          qty: qty
        }, {
          where: {
            id: req.body.cart_id
          }
        })
        let new_cart = await cart.findAll({
          attributes: [`id`, `userId`, `productId`, 'total_price', `vendorId`, `qty`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT shipping_price FROM product where productId = product.id )'), 'shipping_price']],
          where: {
            userId: getCart.userId
          },
          raw: true
        })
        // console.log(new_cart,'==================hrerer');return

        let sum = new_cart.reduce((sum, cart) => sum + cart.total_price, 0)
        let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
        var shipping = new_cart.reduce((sum, cart) => sum + cart.shipping_price, 0)
        let taxPer = (sum * (parseInt(getTax.value) / 100))
        let total_price = sum + taxPer + shipping
        // console.log(sum, parseInt(getTax.value), shipping,total_price, '=================sum,getTax,shipping'); return
        if (updateQty) {
          res.send({
            // msg: "cart updated successfully",
            status: true,
            // session: req.session
            price: final_price,
            qty: qty,
            subtotal: sum,
            total: total_price
          })
        }
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  checkout: async (req, res) => {
    // console.log(req,'===================baseUrl');return
    let get_category = await module.exports.get_category()
    let get_product = await module.exports.get_product(req, res)
    let get_nav_category = await module.exports.get_category(
      where = {
        parentId: null,
      },
    )
    let get_address = await userDeliveryAddress.findAll({ where: { userId: req.session.user.id }, raw: true })
    let getCart = await module.exports.get_all_cart(req, res,
      where = {
        userId: req.session.user.id
      }
    )
    let get_card = await module.exports.get_card(req, res, where = { userId: req.session.user.id });
    // console.log(get_card,'======================herer');return
    let get_admin = await module.exports.get_admin(req, res);
    let get_store_location = await module.exports.get_store_location(req, res)

    let sum = getCart.reduce((sum, cart) => sum + cart.total_price, 0)
    let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
    var shipping = getCart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
    let taxPer = (sum * (parseInt(getTax.value) / 100))
    let total_price = sum + taxPer + shipping
    getCart.sum = sum
    getCart.shipping = shipping
    getCart.tax = getTax.value
    getCart.total = total_price
    //console.log(getCart, '===================================getCart');return
    let getdataCart = JSON.stringify(getCart);
    let getAddress = JSON.stringify(get_address);
    const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

    // console.log(getCart,"cart=====================");return

    res.render("website/checkout", {
      getdataCart, getAddress, session: req.session, getCart, get_address, get_nav_category, get_category, get_product, get_admin, get_card, location_arr: get_store_location, countryCodesList,
      search: ""
    })
  },
  del_address: async (req, res) => {
    try {
      console.log(req.body, '======================herer')
      let delAddres = await userDeliveryAddress.destroy({
        where: {
          id: req.body.address_id
        }
      })
      if (delAddres) {
        res.send({
          msg: "address deleted successfully",
          status: true,
          session: req.session
        })
      } else {
        res.send({
          msg: "something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_to_wishlist: async (req, res) => {
    try {

      let get_count = await wishlist.count({
        where: {
          product_id: req.body.pid,
          user_id: req.session.user.id
        }
      })
      get_count > 0 ? res.send({
        msg: "Product already added to wishlist",
        status: false,
        session: req.session
      }) : add_toWishlist = await wishlist.create({
        product_id: req.body.pid,
        user_id: req.session.user.id
      })
      if (add_toWishlist) {
        res.send({
          msg: "Product added to wishlist successfully",
          status: true,
          session: req.session
        })
      } else {
        res.send({
          msg: "Something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  store_locator: async (req, res) => {
    try {
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let getVendor = await user.findAll({
        attributes: [`id`, `role`, `name`, `stripe_customer_id`, `verified`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `loyality_points`, `googleId`, 'lat', 'long', `otp`, `created`, `updated`, `createdAt`, `updatedAt`],
        where: {
          role: 3
        },
        raw: true
      })
      var location_arr = []
      for (var i = 0; i < getVendor.length; i++) {
        var newArr = []
        newArr.push(getVendor[i].name)
        newArr.push(getVendor[i].image)
        newArr.push(getVendor[i].lat)
        newArr.push(getVendor[i].long)
        newArr.push(i + 1)
        location_arr.push(newArr)
      }

      console.log(location_arr)
      // return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/store_locator", {
        get_admin, session: req.session, get_nav_category, get_category, get_product, getVendor, countryCodesList, location_arr: JSON.stringify(location_arr),
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  del_wishlist: async (req, res) => {
    try {
      console.log(req.body, '=============================')
      let del_wish = await wishlist.destroy({
        where: {
          id: req.body.wish_id
        }
      })
      if (del_wish) {
        res.send({
          msg: "Product deleted from wishlist successfully",
          status: true,
          session: req.session
        })
      } else {
        res.send({
          msg: "Something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },

  sitemap: async (req, res) => {
    try {
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      // console.log('=================herer')
      res.render("website/sitemap", {
        get_admin, session: req.session, get_nav_category, get_category, get_product, location_arr: get_store_location, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  blog_detail: async (req, res) => {
    var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
    let get_category = await module.exports.get_category()
    let get_product = await module.exports.get_product(req, res)
    let get_nav_category = await module.exports.get_category(
      where = {
        parentId: null,
      },
    )
    let get_admin = await module.exports.get_admin(req, res);
    let get_popular_blog = await module.exports.get_popular_blog(req, res)
    let get_store_location = await module.exports.get_store_location(req, res)

    let get_blog = await blog.findOne({
      attributes: [`id`, `name`, makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`, [sequelize.literal('(SELECT count(id) FROM blog_comment where blog_comment.blog_id = blog.id )'), 'total_comment'],],
      where: {
        id: decodedData
      },
      include: [
        {
          model: blog_comment
        }
      ]
    }).then(data => data.toJSON())
    let get_blog_category = await module.exports.get_blog_category(req, res)
    const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

    // console.log(get_blog, '=================herer'); return
    res.render("website/blog_detail", {
      get_blog_category, get_blog, get_admin, session: req.session, get_nav_category, get_category, get_product, get_popular_blog, location_arr: get_store_location, countryCodesList,
      search: ""
    })
  },
  category_blog: async (req, res) => {
    try {
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      // console.log(decodedData,'====================herer');return
      let get_blog = await blog.findAll({
        attributes: [`id`, `name`, helper.makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`],
        where: {
          blog_category_id: decodedData
        },
        raw: true,
        order: [["id", "desc"]]
      })
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_store_location = await module.exports.get_store_location(req, res)

      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      let url = `${req.protocol}://${req.get('host')}` + req.url;

      // console.log(get_blog_category,'===============hrer');return
      res.render("website/blog", {
        session: req.session, blogs: get_blog, get_category, get_nav_category, get_product, get_admin, get_blog_category, get_popular_blog, location_arr: get_store_location, countryCodesList,
        search: "", searh: "", url: url
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_blog_comment: async (req, res) => {
    try {
      let add_comment = await blog_comment.create({
        name: req.body.name,
        subject: req.body.subject,
        email: req.body.email,
        comment: req.body.comment,
        blog_id: req.body.pid,
      })
      let find_comment = await blog_comment.findOne({
        where: {
          id: add_comment.id
        },
        raw: true
      })
      let find_all_comment = await blog_comment.findAll({
        where: {
          id: req.body.pid,
        },
        raw: true
      })
      if (add_comment) {
        res.send({
          msg: "Comment added successfully",
          status: true,
          session: req.session,
          find_comment: find_comment,
          find_all_comment: find_all_comment
        })
      }
      else {
        res.send({
          msg: "Something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  review_order: async (req, res) => {
    try {
      // console.log(req.query,'===================herer');return
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let getCart = await module.exports.get_all_cart(req, res,
        where = {
          userId: req.session.user.id
        }
      )
      let get_billing_address = await userDeliveryAddress.findOne({
        where: {
          id: req.query.billing_address
        },
        raw: true
      })
      let get_shiping_address = await userDeliveryAddress.findOne({
        where: {
          id: req.query.shiping_address
        },
        raw: true
      })
      let getCard = await cards.findOne({
        where: {
          id: req.query.card_id
        },
        raw: true
      })
      // console.log(get_shiping_address, get_billing_address, getCard, '======================herer'); return
      let sum = getCart.reduce((sum, cart) => sum + cart.total_price, 0)
      let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
      var shipping = getCart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
      let taxPer = (sum * (parseInt(getTax.value) / 100))
      let total_price = sum + taxPer + shipping
      getCart.sum = sum
      getCart.shipping = shipping
      getCart.tax = getTax.value
      getCart.total = total_price
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/review_and_order", {
        session: req.session, getCart, get_category, get_nav_category, get_product, get_admin, get_blog_category, get_popular_blog, get_billing_address, get_shiping_address, getCard, location_arr: get_store_location, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  search_product: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
      console.log(req.query, '=========================req.query');
      var get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_store_location = await module.exports.get_store_location(req, res);
      (req.query.rangeOne > req.query.rangeTwo || req.query.rangeTwo < req.query.rangeOne) && ([req.query.rangeOne, req.query.rangeTwo] = [req.query.rangeTwo, req.query.rangeOne])
      let get_product = await product.findAll({
        attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, 'is_featured', `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage']],
        where: (req.query.rangeOne && req.query.rangeTwo ? {
          retailPrice: {
            [Op.between]: [req.query.rangeOne, req.query.rangeTwo]
          },
          name: {
            [Op.like]: `${req.query.search}%`,
          }
        } : {
          name: {
            [Op.like]: `${req.query.search}%`,
          }
        }),
        include: [
          {
            attributes: [`id`, `prod_id`, helper.makeImageUrlSql('images', 'images', 'products'), `createdAt`, `updatedAt`],
            model: images,
          },
          {
            model: color
          }
        ],
        order: [["id", "desc"]],
      }).map(data => data.toJSON())
      console.log(get_product, '====================zdsdgsdfgsdfgb snasdf asdfas dfherer')
      console.log('====================zdsdgsdfgsdfgb snasdf asdfas dfherer')
      let get_admin = await module.exports.get_admin(req, res);
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/search_product", {
        session: req.session, get_product, get_admin, get_nav_category, location_arr: get_store_location,
        search: req.query.search, rangeOne: req.query.rangeOne ? req.query.rangeOne : 0, rangeTwo: req.query.rangeTwo ? req.query.rangeTwo : 900, countryCodesList, search: req.query.search
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  product_review: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
      let baseUrlUser = `${req.protocol}://${req.get('host')}` + "/uploads/user/";
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      console.log(req.body, req.query, decodedData, '======================herer');
      let productDetail = await product.findOne({
        attributes: [`id`, `isApproved`, `is_featured`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `return_price`, `shipping_price`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, `createdAt`, `updatedAt`,
          [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where images.prod_id = product.id order by id asc limit 1)'), 'productImage'], [sequelize.literal('(SELECT avg(rating) FROM reviews where reviews.product_id = product.id )'), 'avg_rating'],
          [sequelize.literal('(SELECT count(*) FROM reviews where reviews.product_id = product.id and rating=5 )'), 'avg_rating5'],
          [sequelize.literal('(SELECT count(*) FROM reviews where reviews.product_id = product.id and rating=4 )'), 'avg_rating4'],
          [sequelize.literal('(SELECT count(*) FROM reviews where reviews.product_id = product.id and rating=3 )'), 'avg_rating3'],
          [sequelize.literal('(SELECT count(*) FROM reviews where reviews.product_id = product.id and rating=2)'), 'avg_rating2'],
          [sequelize.literal('(SELECT count(*) FROM reviews where reviews.product_id = product.id and rating=1 )'), 'avg_rating1'],
          [sequelize.literal('(SELECT sum(rating) FROM reviews where reviews.product_id = product.id  )'), 'total_rating'],],
        where: {
          id: decodedData
        },
        include: [
          {
            attributes: [`id`, `userId`, `toUserId`, `product_id`, `rating`, `review`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT  image FROM user where findReview.userId = user.id )'), 'userImage'],
              [sequelize.literal('(SELECT name FROM user where findReview.userId = user.id )'), 'userName']],
            model: reviews,
            order: [['id', 'Desc']],
            as: 'findReview'
          }
        ]
      }).then(data => data.toJSON())
      console.log(productDetail, '==================ehrer');
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/product_review", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, findReview: productDetail.findReview, productDetail, countryCodesList,
        search: ""
      })

    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_review: async (req, res) => {
    try {
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      console.log(decodedData, '===============herer');
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      get_product.forEach(product => {
        if (product.id == decodedData) {
          get_product.product_detail = product
          console.log(product, '======================here');
        }
        return get_product
      });
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      // console.log(get_product.product_detail,'=============herer');return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/add_review", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, product_detail: get_product.product_detail, countryCodesList,
        key: req.query.key,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  post_review: async (req, res) => {
    try {
      console.log(req.session, '====================herer');
      let userId = req.session.user ? req.session.user.id : res.send({
        msg: "Please Login First",
        status: false,
        session: req.session,
      })
      req.body.rating = parseInt(req.body.rating)
      let add_rating = await reviews.create({
        userId: userId,
        product_id: req.body.pid,
        rating: req.body.rating,
        review: req.body.review
      })
      // console.log(add_rating,'=================');return
      if (add_rating) {
        // console.log(req.body.pid,'==============herer');
        res.send({
          msg: "Rating added successfully",
          status: true,
          session: req.session,
          productId: req.body.pid,
          key: req.body.key
        })

      }
      else {
        res.send({
          msg: "Something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  order_history: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let get_order = await order.findAll({
        attributes: [`id`, `orderNo`, `product_id`, 'color', 'specifications', 'size', `orderStatus`, `isSelfpickup`, `customerId`, `vendorId`, `employeeId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `billing_address_id`, `shiping_address_id`, `address`, `addressLine2`, `city`, `state`, `country`, `zipCode`, `adminCommission`, `subTotal`, `discount`, `shipping`, `tax`, `total`, `paymentMethod`, `deliveryDate`, `deliverySlot`, `is_withdrawn_by_vendor`, `orderJson`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where images.prod_id = order.product_id order by id asc limit 1)'), 'productImage'],],
        where: {
          customerId: req.session.user.id
        },
        include: [
          {
            model: product,
            required: true
          },
          {
            model: userDeliveryAddress,
            as: "billing_address",
            required: true
          },
          {
            model: userDeliveryAddress,
            as: "shipping_address",
            required: true
          }
        ]
      }).map(async data => {
        data = data.toJSON()
        data.specifications = JSON.parse(data.specifications);
        return data
      })
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/order_history", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, get_popular_blog, get_order, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  order_detail: async (req, res) => {
    try {
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

      let get_order = await order.findOne({
        attributes: [`id`, `orderNo`, `product_id`, 'specifications', 'color', 'size', 'order_tracking_url', 'order_tracking_id', `orderStatus`, `isSelfpickup`, `customerId`, `vendorId`, `employeeId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `billing_address_id`, `shiping_address_id`, `address`, `addressLine2`, `city`, `state`, `country`, `zipCode`, `adminCommission`, `subTotal`, `discount`, `shipping`, `tax`, `total`, `paymentMethod`, `deliveryDate`, `deliverySlot`, `is_withdrawn_by_vendor`, `orderJson`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where images.prod_id = order.product_id order by id asc limit 1)'), 'productImage'],],
        where: {
          id: decodedData
        },
        include: [
          {
            model: product,

          },
          {
            model: userDeliveryAddress,
            as: "billing_address"
          },
          {
            model: userDeliveryAddress,
            as: "shipping_address"
          },
          {
            model: cards
          }
        ]
      }).then(async data => {
        data = data.toJSON()
        data.specifications = JSON.parse(data.specifications);
        return data
      })
      // console.log(get_order,'================================get_order');return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/order_detail", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, get_popular_blog, get_order, key: req.query.key, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  brand: async (req, res) => {
    try {
      let getBrand = await brand.findAll({
        attributes: [`id`, helper.makeImageUrlSql('brand', 'image', 'brand'), `brandName`, `updatedAt`, `createdAt`,],
        raw: true
      })
      console.log(req.query, '-====================ere')
      var get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      console.log(getBrand, '---------------------------egrer');
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/brand", {
        session: req.session, getBrand, get_admin, get_nav_category, location_arr: get_store_location, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  brand_product: async (req, res) => {
    try {
      var decodedData = Buffer.from(req.query.key, 'base64').toString('binary')

      // console.log(req.url,'=================hrtrt');return
      let getBrand = await brand.findOne({
        where: {
          brandName: decodedData
        },
        raw: true
      })
      // console.log(getBrand, '-====================ere'); return
      var get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      if (req.query.order) {
        var sort = 0
        if (req.query.order == 1) {
          sort = 1
        } else {
          sort = 2
        }
      }
      var get_product = await module.exports.get_product(req, res, sort)
      get_product = get_product.filter(get_product => get_product.brandName == decodedData);
      // console.log(get_product,'==============================get_product');return
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/brand_product", {
        session: req.session, get_product, get_admin, get_nav_category, location_arr: get_store_location, getBrand, get_category, key: req.query.key, rangeOne: req.query.rangeOne ? req.query.rangeOne : 0, rangeTwo: req.query.rangeTwo ? req.query.rangeTwo : 500, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  //////////////////////////stripe//////////////////////
  /////.....
  ////////////////////////////stripe///...............................
  ///.........
  /////////////////////////////////////////
  add_card: async (req, res) => {
    try {
      // console.log(req.body,'======================herer');return
      await stripe.tokens.create({
        card: {
          name: req.body.name,
          number: req.body.card_number,
          exp_month: req.body.exp_month,
          exp_year: req.body.exp_year,
          cvc: req.body.cvv
        },
      }, async (err, token) => {
        if (err) {
          res.send({
            msg: err.raw.message,
            status: false,
            session: req.session
          })
          return helper.error(res, err.raw.message)
        } else {
          await stripe.customers.createSource(
            req.session.user.stripe_customer_id,
            { source: token.id }, async (err, card) => {
              if (err) {
                console.log(err, '==================herer')
                res.send({
                  msg: err,
                  status: false,
                  session: req.session
                })
              } else {
                await cards.create({
                  stripe_card_id: card.id,
                  name: req.body.name,
                  cardNumber: req.body.card_number,
                  month: req.body.exp_month,
                  year: req.body.exp_year,
                  userId: req.session.user.id
                })
                res.send({
                  msg: "Card added successfully",
                  status: true,
                  session: req.session,
                })
              }
            }
          );
        }
      });
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_order: async (req, res) => {
    try {
      // console.log(req.body,'==================jerer');return
      let getCart = await module.exports.get_all_cart(req, res,
        where = {
          userId: req.session.user.id
        }
      )
      var getCard = await cards.findOne({
        where: {
          id: req.body.card_id
        },
        raw: true
      })
      console.log(getCard, '===========getCard')
      let sum = getCart.reduce((sum, cart) => sum + cart.total_price, 0)
      let getTax = await setting.findOne({ where: { id: 22 }, raw: true })
      var shipping = getCart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
      var taxPer = (sum * (parseInt(getTax.value) / 100))
      let total_price = sum + taxPer + shipping
      let loyality_point = req.session.user.loyality_points
      let wallet = req.session.user.walletAmount
      if (loyality_point >= 10000) {
        let update_loyaliPoint = await user.update({
          walletAmount: wallet + 50
        }, {
          where: {
            id: req.session.user.id
          }
        })
      }
      // console.log(wallet,req.session, '==================herer');return
      let update_loyaliPoint = await user.update({
        loyality_points: loyality_point + total_price
      }, {
        where: {
          id: req.session.user.id
        }
      })
      // console.log(orderNo,'==================herer');return
      for (let prod of getCart) {
        prod.specifications = JSON.stringify(prod.specifications)
        let orderNo = Math.floor(Math.random() * 90000) + 10000;
        let addOrder = await order.create({
          orderNo: orderNo,
          customerId: prod.userId,
          vendorId: prod.vendorId,
          qty: prod.qty,
          card_id: req.body.card_id,
          netAmount: prod.total_price,
          product_id: prod.productId,
          color: prod.color,
          size: prod.size,
          taxCharged: taxPer,
          specifications: prod.specifications,
          shippingCharges: prod.shipping_price,
          shiping_address_id: req.body.shiping_address,
          billing_address_id: req.body.billing_address,
        })
      }
      const charge = await stripe.charges.create({
        amount: total_price * 100,
        currency: 'USD',
        source: getCard.stripe_card_id,
        customer: req.session.user.stripe_customer_id
      }, async (err, charge) => {
        if (err) {
          res.send({
            msg: "Something went wrong",
            status: false,
            session: req.session
          })
        } else {
          await cart.destroy({
            where: {
              userId: req.session.user.id
            }
          })
          var user_detail = await module.exports.get_user_detail(req.session.user.id)
          req.session.user = user_detail;
          req.session.authenticated_web = true;
          res.send({
            msg: "payment done successfully",
            status: true,
            session: req.session,
          })
        }
      });
    } catch (error) {
      return helper.error(res, error)
    }
  },
  re_order: async (req, res) => {
    try {
      // console.log(req.body, '=================hrer'); return
      if (req.body.order_id) {
        var getOrder = await save_to_later.findOne({
          where: {
            id: req.body.order_id
          },
          raw: true
        })
      }
      if (req.body.pid) {
        var getOrder = await order.findOne({
          where: {
            id: req.body.pid
          },
          raw: true
        })
      }
      delete getOrder.id;
      delete getOrder.created;
      delete getOrder.updated;
      delete getOrder.createdAt;
      delete getOrder.updatedAt
      delete getOrder.orderNo
      delete getOrder.orderStatus
      let getCard = await cards.findOne({
        where: {
          id: getOrder.card_id
        },
        raw: true
      })
      var orderNo = Math.floor(Math.random() * 90000) + 10000;

      // console.log(getOrder, '======================herer'); return
      let addOrder = await order.create({
        orderNo: orderNo,
        orderStatus: 0,
        ...getOrder
      })
      var total_price = parseInt(getOrder.netAmount)
      const charge = await stripe.charges.create({
        amount: total_price * 100,
        currency: 'USD',
        source: getCard.stripe_card_id,
        customer: req.session.user.stripe_customer_id
      }, async (err, charge) => {
        if (err) {
          res.send({
            msg: "Something went wrong",
            status: false,
            session: req.session
          })
        } else {
          // console.log('===========================resolev')
          if (req.body.order_id) {
            var delOrder = await save_to_later.destroy({
              where: {
                id: req.body.order_id
              },
            })
          }
          var user_detail = await module.exports.get_user_detail(req.session.user.id)
          req.session.user = user_detail;
          req.session.authenticated_web = true;
          res.send({
            msg: "payment done successfully",
            status: true,
            session: req.session,
          })
        }
      });
    } catch (error) {
      return helper.error(res, error)
    }
  },
  save_to_later: async (req, res) => {
    try {
      console.log(req.query, '=================herer')

      let getCart_item = await module.exports.get_all_cart(req, res,
        where = {
          userId: req.session.user.id
        }
      )
      var sum = getCart_item.reduce((sum, cart) => sum + cart.total_price, 0)
      var getTax = await setting.findOne({ where: { id: 22 }, raw: true })
      var shipping = getCart_item.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
      var taxPer = (sum * (parseInt(getTax.value) / 100))
      var total_price = sum + taxPer + shipping

      // console.log(getCart,'===================herer');return
      for (let prod of getCart_item) {
        let orderNo = Math.floor(Math.random() * 90000) + 10000;
        let addOrder = await save_to_later.create({
          orderNo: orderNo,
          customerId: prod.userId,
          vendorId: prod.vendorId,
          qty: prod.qty,
          card_id: req.query.card_id,
          netAmount: prod.total_price,
          product_id: prod.productId,
          taxCharged: taxPer,
          shippingCharges: prod.shipping_price,
          shiping_address_id: req.query.shiping_address,
          billing_address_id: req.query.billing_address,
        })
      }
      let delcart = await cart.destroy({
        where: {
          userId: req.session.user.id
        }
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_address = await userDeliveryAddress.findAll({ where: { userId: req.session.user.id }, raw: true })
      let getCart = await module.exports.get_all_cart(req, res,
        where = {
          userId: req.session.user.id
        }
      )
      let get_card = await module.exports.get_card(req, res, where = { userId: req.session.user.id });

      // console.log(get_card,'======================herer');return
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)

      var sum = getCart.reduce((sum, cart) => sum + cart.total_price, 0)
      var getTax = await setting.findOne({ where: { id: 22 }, raw: true })
      var shipping = getCart.reduce((sum, cart) => sum + cart.product.shipping_price, 0)
      var taxPer = (sum * (parseInt(getTax.value) / 100))
      var total_price = sum + taxPer + shipping
      getCart.sum = sum
      getCart.shipping = shipping
      getCart.tax = getTax.value
      getCart.total = total_price
      //console.log(getCart, '===================================getCart');return
      let getdataCart = JSON.stringify(getCart);
      let getAddress = JSON.stringify(get_address);

      // console.log(getAddress,"getAddress=====================");return
      var user_detail = await module.exports.get_user_detail(req.session.user.id)
      req.session.user = user_detail;
      req.session.authenticated_web = true;
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      req.flash('flashMessage', { color: 'success', message: 'order saved to later Successfully.' });
      res.render("website/checkout", {
        getdataCart, getAddress, session: req.session, getCart, get_address, get_nav_category, get_category, get_product, get_admin, get_card, location_arr: get_store_location, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  saved_order: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

      // console.log(decodedData,'===============herer');return
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)

      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let get_order = await save_to_later.findAll({
        attributes: [`id`, `orderNo`, `product_id`, `orderStatus`, `isSelfpickup`, `customerId`, `vendorId`, `employeeId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `billing_address_id`, `shiping_address_id`, `address`, `addressLine2`, `city`, `state`, `country`, `zipCode`, `adminCommission`, `subTotal`, `discount`, `shipping`, `tax`, `total`, `paymentMethod`, `deliveryDate`, `deliverySlot`, `is_withdrawn_by_vendor`, `orderJson`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where images.prod_id = save_to_later.product_id order by id asc limit 1)'), 'productImage'],],
        where: {
          customerId: req.session.user.id
        },
        include: [
          {
            model: product,
            required: true
          },
          {
            model: userDeliveryAddress,
            as: "billing_address",
            required: true
          },
          {
            model: userDeliveryAddress,
            as: "shipping_address",
            required: true
          }
        ]
      }).map(data => data.toJSON())
      // console.log(get_order, '================herer');return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/saved_order", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, get_popular_blog, get_order, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  updateToken: async (req, res) => {
    try {
      console.log(req.body, '===============herer')
      let update_token = await user.update({
        web_token: req.body.token
      }, {
        where: {
          id: req.body.GetSessionUserId
        }
      })
      if (update_token) {
        var user_detail = await module.exports.get_user_detail(req.session.user.id)
        req.session.user = user_detail;
        req.session.authenticated_web = true;
        res.send({
          status: true,
          session: req.session,
        })
      }
      else {
        res.send({
          status: false,
          session: req.session,
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  add_to_compare: async (req, res) => {
    try {
      console.log(req.body, '====================herer');
      let userId = req.session.user ? req.session.user.id : res.send({
        msg: "Please Login First",
        status: false,
        session: req.session,
      })
      let get_count = await add_to_compare.count({
        where: {
          user_id: userId,
          product_id: req.body.pid,
        }
      })
      get_count > 0 ? res.send({
        msg: "item already added to comparison",
        status: false,
        session: req.session,
      }) : addCart = await add_to_compare.create({
        user_id: userId,
        product_id: req.body.pid,
      })
      if (addCart) {
        res.send({
          msg: "item added to comparison successfully",
          status: true,
          session: req.session,
        })
      }
      else {
        res.send({
          msg: "something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  comparison: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

      // console.log(decodedData,'===============herer');return
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)

      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let get_order = await add_to_compare.findAll({
        attributes: [`id`, `user_id`, `product_id`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where images.prod_id = add_to_compare.product_id order by id asc limit 1)'), 'productImage'],
          [sequelize.literal('ifNull((SELECT avg(rating) FROM reviews where add_to_compare.product_id = reviews.product_id ),0)'), 'avg_rating'],
          [sequelize.literal('ifNull((SELECT count(id) FROM reviews where add_to_compare.product_id = reviews.product_id ),0)'), 'total_reviews'],],
        where: {
          user_id: req.session.user.id
        },
        include: [
          {
            model: product,
            required: true,
            include: [
              {
                model: color,
              }
            ]
          },
        ]
      }).map(data => data.toJSON())
      // console.log(get_order,'=====================herer');return
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');
      var user_detail = await module.exports.get_user_detail(req.session.user.id)
      req.session.user = user_detail;
      req.session.authenticated_web = true;
      res.render("website/comparison", {
        session: req.session
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, get_popular_blog, get_order, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  del_comparison: async (req, res) => {
    try {
      let del_compare = await add_to_compare.destroy({
        where: {
          id: req.body.piid
        }
      })
      var user_detail = await module.exports.get_user_detail(req.session.user.id)
      req.session.user = user_detail;
      req.session.authenticated_web = true;
      if (del_compare) {
        res.send({
          msg: "item deleted successfully",
          status: true,
          session: req.session,
        })
      }
      else {
        res.send({
          msg: "something went wrong",
          status: false,
          session: req.session
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  copyright: async (req, res) => {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

      // console.log(decodedData,'===============herer');return
      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(where = { parentId: null, },)
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)

      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      let get_popular_blog = await module.exports.get_popular_blog(req, res)
      let get_copyright_info = await page.findOne({
        where: {
          id: 8
        },
        raw: true
      })
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/copy_right", {
        session: req.session, get_copyright_info
        , get_product, get_admin, get_nav_category, location_arr: get_store_location, get_category, get_blog_category, get_popular_blog, countryCodesList,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  del_card: async (req, res) => {
    try {
      let delCard = await cards.update({
        is_deleted: 1
      }, {
        where: {
          id: req.body.card_id
        }
      })
      if (delCard) {
        res.send({
          msg: "card deleted successfully",
          status: true,
          session: req.session,
        })
      } else {
        res.send({
          msg: "item deleted successfully",
          status: false,
          session: req.session,
        })
      }
    } catch (error) {
      return helper.error(res, error)
    }
  },
  search_blog: async (req, res) => {
    try {
      let get_blog = await blog.findAll({
        attributes: [`id`, `name`, helper.makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`,
        ],
        where: {
          name: {
            [Op.like]: `${req.query.search}%`,
          }
        },
        raw: true,
        order: [["id", "desc"]]
      })

      let get_popular_blog = await module.exports.get_popular_blog(req, res)

      let get_category = await module.exports.get_category()
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_blog_category = await module.exports.get_blog_category(req, res)
      let get_product = await module.exports.get_product(req, res)
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/blog", {
        session: req.session, blogs: get_blog, get_category, get_nav_category, get_product, get_admin, countryCodesList, get_blog_category, get_popular_blog, location_arr: get_store_location, searh: req.query.search,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },
  safety_and_security: async (req, res) => {
    try {
      let get_privacy = await page.findOne({
        where: {
          id: 9
        },
        raw: true
      })
      let get_category = await module.exports.get_category()
      let get_product = await module.exports.get_product(req, res)
      let get_nav_category = await module.exports.get_category(
        where = {
          parentId: null,
        },
      )
      let get_admin = await module.exports.get_admin(req, res);
      let get_store_location = await module.exports.get_store_location(req, res)
      const countryCodesList = countryCodes.customList('countryNameEn', '+{countryCallingCode}');

      res.render("website/safety_and_security", {
        session: req.session, get_nav_category, get_privacy: get_privacy, get_category, get_product, get_admin, countryCodesList, location_arr: get_store_location,
        search: ""
      })
    } catch (error) {
      return helper.error(res, error)
    }
  },


  ////////////////////common functions/////////////////////


  // COMMON Functions


  ////////////////////////////////////////////
  get_category: async (where) => {
    let get_category = await category.findAll({
      attributes: [`id`, `name`, 'discount', 'description', helper.makeImageUrlSql('category', 'image', 'category'), `updatedAt`, `createdAt`],
      where: {
        ...where,
        status: 1
      },
      order: [["id", "desc"]],
      raw: true
    })
    return get_category
  },
  get_product: async (req, res, sort) => {
    let order = [["id", "desc"]]
    if (sort == 1) {
      order = [["retailPrice", "asc"]]
    }
    else {
      order = [["name", "asc"]]

    }



    let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
    let get_product = await product.findAll({
      where: (req.query.rangeOne && req.query.rangeTwo ? {
        retailPrice: {

          [Op.between]: [req.query.rangeOne, req.query.rangeTwo]
        }
      } : {
        isApproved: 1,
        status: 1
      }),
      attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, 'is_featured', `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage'], [sequelize.literal('(SELECT avg(rating) FROM reviews where reviews.product_id = product.id )'), 'avg_rating'],
        [sequelize.literal('(SELECT count(id) FROM reviews where reviews.product_id = product.id )'), 'total_reviews']
      ],
      include: [
        {
          attributes: [`id`, `prod_id`, helper.makeImageUrlSql('images', 'images', 'products'), `createdAt`, `updatedAt`],
          model: images,
        },
        {
          model: color
        },
        {
          model: productSpecification
        }
      ],
      order: order,
    }).map(data => data.toJSON())
    return get_product
  },
  get_user_detail: async (user_id) => {
    var getUser = await user.findOne({
      attributes: [`id`, `role`, `name`, `stripe_customer_id`, `verified`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `loyality_points`, `googleId`, `otp`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('ifNull((SELECT count(id) FROM cart where user.id = cart.userId),0)'), 'cart_count'], [sequelize.literal('ifNull((SELECT count(id) FROM add_to_compare where user.id = add_to_compare.user_id),0)'), 'compare_count']],
      where: {
        id: user_id
      },
      raw: true
    })
    let userData = {
      id: getUser.id,
      email: getUser.email,
      password: getUser.password,
    }

    var token = jwt.sign({
      data: userData
    }, secretKey);

    getUser.token = token;
    return getUser
  },
  /////////////////////////////////////allllll///////////////////////////////
  get_all_cart: async (req, res, where) => {
    // console,log(req,'========================here')
    let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

    let getCart = await cart.findAll({
      attributes: [`id`, `userId`, `productId`, `vendorId`, `qty`, `specifications`, `color`, `size`, `total_price`, `save_to_later`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT shipping_price FROM product where productId = product.id )'), 'shipping_price']],
      where: where,
      include: [
        {
          model: product,
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage']
          ],
        }
      ]
    }).map(async data => {
      data = data.toJSON()
      data.specifications = JSON.parse(data.specifications);
      return data
    })
    return getCart
  },
  get_cart_detail: async (req, res, id) => {
    let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";

    let getCart = await cart.findOne({
      attributes: [`id`, `userId`, `productId`, `vendorId`, `qty`, `created`, `updated`, `createdAt`, `updatedAt`, [sequelize.literal('(SELECT sum(total_price) FROM cart)'), 'sub_total']],
      where: {
        id: id
      },
      include: [
        {
          model: models.product,
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage']
          ],
        }
      ]
    }).then(data => data.toJSON())
    return getCart
  },
  get_wishlist: async (req, res, where) => {
    let baseUrl = `${req.protocol}://${req.get('host')}` + "/uploads/products/";
    let getwishlist = await wishlist.findAll({
      where: where,
      include: [
        {
          model: models.product,
          attributes: [`id`, `isApproved`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, 'return_price', 'shipping_price', [sequelize.literal('(SELECT  concat("' + baseUrl + '",`images`) FROM images where prod_id = product.id order by id asc limit 1)'), 'productImage']
          ],
        }
      ]
    }).map(data => data.toJSON())
    return getwishlist
  },
  get_admin: async (req, res) => {
    let get_admin = await user.findOne({
      where: {
        id: 1
      },
      include: [
        {
          model: adminDetail
        }
      ]
    }).then(data => data.toJSON())
    return get_admin
  },
  get_blog_category: async (req, res) => {
    let getCat = await blog_category.findAll({
      order: [["id", "DESC"]],
      where: { status: 1, },
      raw: true
    })
    return getCat
  },
  get_popular_blog: async (req, res) => {
    let get_popular_blog = await blog.findAll({
      attributes: [`id`, `name`, helper.makeImageUrlSql('blog', 'image', 'blog'), `description`, `updatedAt`, `createdAt`,
        [sequelize.literal('(SELECT count(id) FROM blog_comment where blog.id = blog_comment.blog_id)'), 'comment_count']
      ],
      raw: true,
      order: [
        [sequelize.col('comment_count'), 'DESC'],
      ]
    })
    return get_popular_blog
  },
  get_card: async (req, res, where) => {
    let getCat = await cards.findAll({
      where: {
        ...where,
        is_deleted: 0
      },
      order: [["id", "DESC"]],
      raw: true
    })
    return getCat
  },
  get_store_location: async (req, res) => {
    let getVendor = await user.findAll({
      attributes: [`id`, `role`, `name`, `stripe_customer_id`, `verified`, `status`, `username`, `email`, `password`, helper.makeImageUrlSql('user', 'image', 'user'), `company`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `loyality_points`, `googleId`, 'lat', 'long', `otp`, `created`, `updated`, `createdAt`, `updatedAt`],
      where: {
        role: 3
      },
      raw: true
    })
    var location_arr = []
    for (var i = 0; i < getVendor.length; i++) {
      var newArr = []
      newArr.push(getVendor[i].name)
      newArr.push(getVendor[i].image)
      newArr.push(getVendor[i].lat)
      newArr.push(getVendor[i].long)
      newArr.push(i + 1)

      location_arr.push(newArr)
      // console.log(newArr)
    }
    console.log(location_arr)
    return JSON.stringify(location_arr)
  }
}


