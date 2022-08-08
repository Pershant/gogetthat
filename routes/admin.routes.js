/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Routes File
|----------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();

/*
|----------------------------------------------------------------------------------------------------------------
|   Calling Controllers 
|----------------------------------------------------------------------------------------------------------------
*/

const adminAuthController = require('../controllers/admin/adminAuthController');
const adminController = require('../controllers/admin/adminController');
const userController = require('../controllers/admin/userController');
const pageController = require('../controllers/admin/pageController');
const orderController = require('../controllers/admin/orderController');
const reportController = require('../controllers/admin/reportController');
const feedbackController = require('../controllers/admin/feedbackController');
const settingController = require('../controllers/admin/settingController');
const shopCategoryController = require('../controllers/admin/shopCategoryController');
const categoryController = require('../controllers/admin/categoryController');
const subCategoryController = require('../controllers/admin/subCategoryController');
const productController = require('../controllers/admin/productController');
const pushNotificationController = require('../controllers/admin/pushNotificationController');
const taxCategoryController = require('../controllers/admin/taxCategoryController');
const paymentController = require('../controllers/admin/paymentController');
const blogController = require('../controllers/admin/blogController');
const faqController = require('../controllers/admin/faqController');

const chatController = require('../controllers/admin/chatController');
const brandController = require('../controllers/admin/brandController');
const bannerController = require('../controllers/admin/bannerController');
const blogCategoryController = require('../controllers/admin/blogCategoryController');

/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Auth Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/', adminAuthController.loginPage);
router.get('/login', adminAuthController.loginPage);
router.post('/loginSubmit', adminAuthController.loginSubmit);
router.get('/logout', adminAuthController.logout);


/////////////// chat routes//////////////////////////////////////

router.get('/chatList', chatController.chatList);
router.get('/showchat', chatController.showchat);
router.post('/sendmessage', chatController.sendmessage)

/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Related Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/dashboard', adminController.dashboard);
// router.get('/dashboardCounts', adminController.dashboardCounts);
router.put('/updateStatus', adminController.updateStatus);
router.put('/updateFeature', adminController.updateFeature);
router.delete('/delete', adminController.delete);

router.put('/changeField', adminController.changeField);

/*
|----------------------------------------------------------------------------------------------------------------
|   User Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/user', userController.listing);
router.get('/user/listing', userController.listing);
router.get('/user/add', userController.add);
router.get('/user/edit/:id', userController.edit);
router.get('/user/view/:id', userController.view);
router.get('/user/datatable', userController.datatable);
router.post('/user/checkEmail', userController.checkEmail);
router.post('/user/checkPhone', userController.checkPhone);
router.post('/user/addUpdateUser', userController.addUpdateUser);
router.post('/user/updateUser', userController.updateUser);
router.get('/user/addDeliveryAddress/:userId', userController.addDeliveryAddress);
router.get('/user/editDeliveryAddress/:userId/:id', userController.editDeliveryAddress);
router.get('/user/viewDeliveryAddress/:userId/:id', userController.viewDeliveryAddress);
router.post('/user/addUpdateUserDeliveryAddress', userController.addUpdateUserDeliveryAddress);
// router.post('/searchUsersListing', userController.searchUsersListing);

/*
|----------------------------------------------------------------------------------------------------------------
|   Vendor Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/vendor', userController.vendorListing);
router.get('/vendor/listing', userController.vendorListing);
router.get('/vendor/add', userController.vendorAdd);
router.get('/vendor/edit/:id', userController.vendorEdit);
router.get('/vendor/view/:id', userController.vendorView);
router.post('/user/updateVendorDeliveryOptionDays', userController.updateVendorDeliveryOptionDays);
router.post('/user/updateVendorDeliveryCharges', userController.updateVendorDeliveryCharges);
// -------------- Staff Routes ----------------
router.get('/vendor/addStaff/:vendorId', userController.addStaff);
router.get('/vendor/editStaff/:vendorId/:id', userController.editStaff);
router.get('/vendor/viewStaff/:vendorId/:id', userController.viewStaff);
router.post('/vendor/addUpdateUserDeliveryAddress', userController.addUpdateUserDeliveryAddress);
/*
|----------------------------------------------------------------------------------------------------------------
|   shopCategory Routes
|----------------------------------------------------------------------------------------------------------------
*/
// router.get('/shopCategory', shopCategoryController.listing);
// router.get('/shopCategory/listing', shopCategoryController.listing);
// router.get('/shopCategory/add', shopCategoryController.add);
// router.get('/shopCategory/edit/:id', shopCategoryController.edit);
// router.get('/shopCategory/view/:id', shopCategoryController.view);
// router.post('/shopCategory/addUpdate', shopCategoryController.addUpdate);

/*
|----------------------------------------------------------------------------------------------------------------
|   Category Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/category', categoryController.listing);
router.get('/category/listing', categoryController.listing);
router.get('/category/add', categoryController.add);
router.get('/category/edit/:id', categoryController.edit);
router.get('/category/view/:id', categoryController.view);
router.post('/category/addUpdate', categoryController.addUpdate);
router.post('/category/categoryBasedChildCategories', categoryController.categoryBasedChildCategories);
/*
|----------------------------------------------------------------------------------------------------------------
|   blog_category Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/blog_category', blogCategoryController.listing);
router.get('/blog_category/listing', blogCategoryController.listing);
router.get('/blog_category/add', blogCategoryController.add);
router.get('/blog_category/edit/:id', blogCategoryController.edit);
router.get('/blog_category/view/:id', blogCategoryController.view);
router.post('/blog_category/addUpdate', blogCategoryController.addUpdate);
router.post('/blog_category/categoryBasedChildCategories', blogCategoryController.categoryBasedChildCategories);

/*
|----------------------------------------------------------------------------------------------------------------
|   Sub Category Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/subCategory', subCategoryController.listing);
router.get('/subCategory/listing', subCategoryController.listing);
router.get('/subCategory/add', subCategoryController.add);
router.get('/subCategory/edit/:id', subCategoryController.edit);
router.get('/subCategory/view/:id', subCategoryController.view);
router.post('/subCategory/addUpdate', subCategoryController.addUpdate);



/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/product', productController.listing);
router.get('/product/approvalRequests', productController.approvalRequests);
router.get('/product/listing', productController.listing);
router.get('/product/add', productController.add);
router.get('/product/edit/:id', productController.edit);
router.get('/product/view/:id', productController.view);
router.get('/product/importExport', productController.importExport);
router.post('/product/addUpdateProduct', productController.addUpdateProduct);
router.post('/product/priceUpdate', productController.priceUpdate);
router.post('/product/productCategorySelect', productController.productCategorySelect);
router.post('/product/productListingExport', productController.productListingExport);
router.post('/product/productListingImport', productController.productListingImport);
router.post('/product/importProductImages', productController.importProductImages);
router.post('/product/changePriceMultiple', productController.changePriceMultiple);
router.post('/product/bulkDelete', productController.bulkDelete);
router.get('/product/updatedImages', productController.updatedImages);
router.post('/product/editImages', productController.editImages);
router.delete('/product/deleteImage', productController.deleteImage);
router.get('/product/featured_product', productController.featured_product);
router.post('/product/asign', productController.asign);




/*
|----------------------------------------------------------------------------------------------------------------
|   Order Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/order', orderController.customerOrders);
router.get('/order/view/:id', orderController.view);
router.get('/order/listing', orderController.listing);
router.get('/order/customerOrders', orderController.customerOrders);
router.get('/order/sellerOrders', orderController.sellerOrders);
router.get('/order/cancellationRequests', orderController.cancellationRequests);
router.get('/order/withdrawalRequests', orderController.withdrawalRequests);
router.put('/order/approvalStatus', orderController.approvalStatus);
router.get('/order/refundRequests', orderController.refundRequests);
router.get('/order/customerOrderDataTable', orderController.customerOrderDataTable);
router.get('/order/sellerOrderDataTable', orderController.sellerOrderDataTable);
router.get('/order/cancellationRequestsDataTable', orderController.cancellationRequestsDataTable);
router.get('/order/withdrawalRequestsDataTable', orderController.withdrawalRequestsDataTable);
router.get('/order/refundRequestsDataTable', orderController.refundRequestsDataTable);
router.get('/orderDetail/view/:id', orderController.orderDetailView);
router.get('/order/edit/:id', orderController.edit_order);
router.post('/order/add_tracker/:id', orderController.update_order);


/*
|----------------------------------------------------------------------------------------------------------------
|   Report Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/report', reportController.salesReport);
router.get('/report/salesReport', reportController.salesReport);
router.get('/report/userReport', reportController.userReport);
router.get('/report/sellerReport', reportController.sellerReport);
router.get('/report/taxReport', reportController.taxReport);
router.get('/report/commissionReport', reportController.commissionReport);
router.get('/report/revenueReport', reportController.revenueReport);
router.get('/report/salesReportDataTable', reportController.salesReportDataTable);
router.get('/report/userReportDataTable', reportController.userReportDataTable);
router.get('/report/sellerReportDataTable', reportController.sellerReportDataTable);
router.get('/report/taxReportDataTable', reportController.taxReportDataTable);
router.get('/report/commissionReportDataTable', reportController.commissionReportDataTable);

/*
|----------------------------------------------------------------------------------------------------------------
|   Feedback Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/feedback', feedbackController.listing);

/*
|----------------------------------------------------------------------------------------------------------------
|   pushNotification Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/pushNotification', pushNotificationController.add);
router.post('/pushNotification/addUpdate', pushNotificationController.addUpdate);


/*
|----------------------------------------------------------------------------------------------------------------
|   Tax Category Routes
|----------------------------------------------------------------------------------------------------------------
*/
// router.get('/taxCategory', taxCategoryController.listing);
// router.get('/taxCategory/listing', taxCategoryController.listing);
router.get('/taxCategory/add', taxCategoryController.add);
router.get('/taxCategory/edit/:id', taxCategoryController.edit);
router.get('/taxCategory/view/:id', taxCategoryController.view);
router.post('/taxCategory/addUpdateTaxCategory', taxCategoryController.addUpdateTaxCategory);

/*
|----------------------------------------------------------------------------------------------------------------
|   Setting Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/setting', settingController.setting);
router.post('/setting/updateSettings', settingController.updateSettings);
router.put('/setting/updateSiteComission', settingController.updateSiteComission);
/*
|----------------------------------------------------------------------------------------------------------------
|   Page Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/page/aboutUs', pageController.getPage('aboutUs'));
router.get('/page/termsAndConditions', pageController.getPage('termsAndConditions'));
router.get('/page/privacyPolicy', pageController.getPage('privacyPolicy'));
router.get('/page/shippingInformation', pageController.getPage('shippingInformation'));
router.get('/page/returnandexchange', pageController.getPage('returnandexchange'));
router.get('/page/freeShippingAndReturn', pageController.getPage('freeShippingAndReturn'));
router.get('/page/loyalityProgram', pageController.getPage('loyalityProgram'));
router.get('/page/copyrightPolicy', pageController.getPage('copyrightPolicy'));
router.get('/page/safetyAndSecurity', pageController.getPage('safetyAndSecurity'));




router.put('/page/updatePage', pageController.updatePage);


/* 
|----------------------------------------------------------------------------------------------------------------
|   payment Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.get('/payment/listing', paymentController.listing);

/*
|----------------------------------------------------------------------------------------------------------------
|   Blog Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.get('/blog/listing', blogController.listing);
router.post('/blog/addUpdate', blogController.addUpdate);
router.get('/blog/add', blogController.add);
router.get('/blog/view/:id', blogController.view);
router.get('/blog/edit/:id', blogController.edit);

/*
|----------------------------------------------------------------------------------------------------------------
|   faq Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.get('/faq/listing', faqController.listing);
router.post('/faq/addUpdate', faqController.addUpdate);
router.get('/faq/add', faqController.add);
router.get('/faq/view/:id', faqController.view);
router.get('/faq/edit/:id', faqController.edit);

/*
|----------------------------------------------------------------------------------------------------------------
|   brand Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/brand/listing', brandController.listing);
router.get('/brand/add', brandController.add);
router.post('/brand/addUpdate', brandController.addUpdate);
router.get('/brand/view/:id', brandController.view);
router.get('/brand/edit/:id', brandController.edit);

/*
|----------------------------------------------------------------------------------------------------------------
|   banner Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/banner/listing', bannerController.listing);
router.get('/banner/add', bannerController.add);
router.post('/banner/addUpdate', bannerController.addUpdate);
router.get('/banner/view/:id', bannerController.view);
router.get('/banner/edit/:id', bannerController.edit);
module.exports = router;

