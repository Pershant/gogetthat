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

    const adminAuthController = require('../controllers/sellerAdmin/adminAuthController');
    const adminController = require('../controllers/sellerAdmin/adminController');
    const userController = require('../controllers/sellerAdmin/userController');
    const productController = require('../controllers/sellerAdmin/productController');
    const orderController = require('../controllers/sellerAdmin/orderController');
    const reportController = require('../controllers/sellerAdmin/reportController');
    const settingController = require('../controllers/sellerAdmin/settingController');
    const taxCategoryController = require('../controllers/sellerAdmin/taxCategoryController');
    const categoryController = require('../controllers/sellerAdmin/categoryController');
    const subCategoryController = require('../controllers/sellerAdmin/subCategoryController');
    const walletController = require('../controllers/sellerAdmin/walletController');
    const bankController = require('../controllers/sellerAdmin/bankController');

    // const pageController = require('../controllers/sellerAdmin/pageController');
    
/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Auth Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/', adminAuthController.loginPage);
    router.get('/login', adminAuthController.loginPage);
    router.post('/loginSubmit', adminAuthController.loginSubmit);
    router.get('/logout', adminAuthController.logout);



    /*
|----------------------------------------------------------------------------------------------------------------
|   Seller Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/sellerSignUpForm', adminController.signUpForm);
router.post('/sellerSignup', adminController.signUp);
router.get('/login', adminAuthController.loginPage);
router.post('/loginSubmit', adminAuthController.loginSubmit);
router.get('/logout', adminAuthController.logout);

/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Related Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/dashboard', adminController.dashboard);
    // router.get('/dashboardCounts', adminController.dashboardCounts);
    router.put('/updateStatus', adminController.updateStatus);
    router.delete('/delete', adminController.delete);
    router.post('/disable', adminController.disable);
    router.put('/changeField', adminController.changeField);

/*
|----------------------------------------------------------------------------------------------------------------
|   User Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/manageShop', userController.manageShop);
    router.post('/user/updateUser', userController.updateUser);
    router.post('/user/updateVendorDeliveryOptionDays', userController.updateVendorDeliveryOptionDays);
    router.post('/user/updateVendorDeliveryCharges', userController.updateVendorDeliveryCharges);
    router.post('/user/changePasswordSetting', userController.changePasswordSetting);
    router.post('/user/changeEmailSetting', userController.changeEmailSetting);
    

/*
|----------------------------------------------------------------------------------------------------------------
|   Staff Management Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/staffManagement', userController.staffManagementListing);
    router.get('/staffManagement/listing', userController.staffManagementListing);
    router.get('/staffManagement/add', userController.staffManagementAddEditView('add'));
    router.get('/staffManagement/edit/:id', userController.staffManagementAddEditView('edit'));
    router.get('/staffManagement/view/:id', userController.staffManagementAddEditView('view'));
    
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
|   Tax Category Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/taxCategory', taxCategoryController.listing);
    router.get('/taxCategory/listing', taxCategoryController.listing);
    router.get('/taxCategory/add', taxCategoryController.add);
    router.get('/taxCategory/edit/:id', taxCategoryController.edit);
    router.get('/taxCategory/view/:id', taxCategoryController.view);
    router.post('/taxCategory/addUpdateTaxCategory', taxCategoryController.addUpdateTaxCategory);

/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/product', productController.listing);
    router.get('/product/listing', productController.listing);
    router.get('/product/add', productController.add);
    router.get('/product/edit/:id', productController.edit);
    router.get('/product/imageListing/', productController.imageListing);
    router.get('/product/addToMyInventory/:id', productController.addToMyInventory);
    router.get('/product/view/:id', productController.view);
    router.post('/product/addUpdateProduct', productController.addUpdateProduct);
    router.post('/product/productCategorySelect', productController.productCategorySelect);
    router.get('/product/updatedImages', productController.updatedImages);
    router.post('/product/editImages', productController.editImages);
    router.delete('/product/deleteImage', productController.deleteImage);


/*
|----------------------------------------------------------------------------------------------------------------
|   Order Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/orders', orderController.orders);
    router.get('/order/listing', orderController.listing);
    router.get('/cancellationRequests', orderController.cancellationRequests);
    router.get('/orderReturnRequests', orderController.orderReturnRequests);
    router.get('/order/view/:id', orderController.view);
    router.get('/order/refundRequests', orderController.refundRequests);
    router.get('/order/customerOrders', orderController.customerOrders);
    router.get('/order/withdrawalRequests', orderController.withdrawalRequests);
    
//     router.get('/order/customerOrders', orderController.customerOrders);
//     router.get('/order/sellerOrders', orderController.sellerOrders);
//     router.get('/order/withdrawalRequests', orderController.withdrawalRequests);
//     router.get('/order/refundRequests', orderController.refundRequests);
//     router.get('/order/customerOrderDataTable', orderController.customerOrderDataTable);
//     router.get('/order/sellerOrderDataTable', orderController.sellerOrderDataTable);
//     router.get('/order/cancellationRequestsDataTable', orderController.cancellationRequestsDataTable);
//     router.get('/order/withdrawalRequestsDataTable', orderController.withdrawalRequestsDataTable);
//     router.get('/order/refundRequestsDataTable', orderController.refundRequestsDataTable);
    
/*
|----------------------------------------------------------------------------------------------------------------
|   Withdrawl Routes
|----------------------------------------------------------------------------------------------------------------
*/

    router.get('/widhdrawl' ,orderController.withdrawalRequests);




/*
|----------------------------------------------------------------------------------------------------------------
|   Order Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/earnings', orderController.earnings);
router.get('/earnings/withdraw/:id', orderController.withdraw_earnings);
// router.get('/order/listing', orderController.listing);
// router.get('/cancellationRequests', orderController.cancellationRequests);
// router.get('/orderReturnRequests', orderController.orderReturnRequests);
// router.get('/order/view/:id', orderController.view);

/*
|----------------------------------------------------------------------------------------------------------------
|   Report Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/report', reportController.salesReport);
    router.get('/report/salesReport', reportController.salesReport);
    router.get('/report/taxReport', reportController.taxReport);
    router.get('/report/totalIncomeReport', reportController.totalIncomeReport);
//     router.get('/report/userReport', reportController.userReport);
//     router.get('/report/sellerReport', reportController.sellerReport);
//     router.get('/report/commissionReport', reportController.commissionReport);
//     router.get('/report/revenueReport', reportController.revenueReport);
//     router.get('/report/salesReportDataTable', reportController.salesReportDataTable);
//     router.get('/report/userReportDataTable', reportController.userReportDataTable);
//     router.get('/report/sellerReportDataTable', reportController.sellerReportDataTable);
//     router.get('/report/taxReportDataTable', reportController.taxReportDataTable);
//     router.get('/report/commissionReportDataTable', reportController.commissionReportDataTable);

/*
|----------------------------------------------------------------------------------------------------------------
|   Setting Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/setting', settingController.setting);
    router.put('/setting/updateSettings', settingController.updateSettings);

    router.post('/setting/myCredit', settingController.withdrawMyCredit);


 /*
|----------------------------------------------------------------------------------------------------------------
|  Wallet Routes
|----------------------------------------------------------------------------------------------------------------
*/
    router.get('/wallet',walletController.listing);

/*
// |----------------------------------------------------------------------------------------------------------------
// |   Bank Routes
// |----------------------------------------------------------------------------------------------------------------
// */


router.get('/bank/listing',bankController.listing);
router.post('/bank/addUpdate',bankController.addUpdate);
router.get('/bank/view/:id',bankController.view);
router.get('/bank/add',bankController.add);
router.get('/bank/edit/:id',bankController.edit);
router.delete('/bank/edit/:id',bankController.delete);



module.exports = router;
