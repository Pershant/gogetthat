/*
|----------------------------------------------------------------------------------------------------------------
|   Admin Routes File
|----------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const router = express.Router();
const requireUserAuthentication = require('../passport').authenticateUser;

/*
|----------------------------------------------------------------------------------------------------------------
|   Calling Controllers 
|----------------------------------------------------------------------------------------------------------------
*/
const authController = require('../controllers/api/authController');
const userController = require('../controllers/api/userController');
const vendorController = require('../controllers/api/vendorController');
const categoryController = require('../controllers/api/categoryController');
const userAddressController = require('../controllers/api/userAddressController');
const cardController = require('../controllers/api/cardController');
const cartController = require('../controllers/api/cartController');
const orderController = require('../controllers/api/orderController');
// const cardController = require('../controllers/api/cardController');
// const userDeliveryAddressController = require('../controllers/api/userDeliveryAddressController');
// const faqController = require('../controllers/api/faqController');
// const notificationController = require('../controllers/api/notificationController');
// const postController = require('../controllers/api/postController');
// const restaurantController = require('../controllers/api/restaurantController');
// const carRentalController = require('../controllers/api/carRentalController');
// const carRentalBookingController = require('../controllers/api/carRentalBookingController');
// const carRentalReviewController = require('../controllers/api/carRentalReviewController');
// const onDemandController = require('../controllers/api/onDemandController');
// const onDemandReviewController = require('../controllers/api/onDemandReviewController');
// const onDemandBookingController = require('../controllers/api/onDemandBookingController');
// const ecommerceController = require('../controllers/api/ecommerceController');
const pageController = require('../controllers/api/pageController');
// const followerController = require('../controllers/api/followerController');
// const groupController = require('../controllers/api/groupController');
// const contentController = require('../controllers/api/contentController');
// const communityController = require('../controllers/api/communityController');
// const postController = require('../controllers/api/postController');
const productController = require('../controllers/api/productController');
const subscriptionController = require('../controllers/api/subscriptionController');
const favouriteController = require('../controllers/api/favouriteController');



/*
|----------------------------------------------------------------------------------------------------------------
|   Auth Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/socialLogin', authController.socialLogin);
// router.get('/getOtp', requireUserAuthentication, authController.getOtp);
router.put('/verifyOtp', requireUserAuthentication, authController.verifyOtp);
router.put('/resendOtp', requireUserAuthentication, authController.resendOtp);
router.put('/logout', requireUserAuthentication, authController.logout);


/*
|----------------------------------------------------------------------------------------------------------------
|   Order Routes
|----------------------------------------------------------------------------------------------------------------
*/
// router.get('/orderListing', requireUserAuthentication, orderController.orderListing);
router.get('/orderDetail', requireUserAuthentication, orderController.orderDetail);
router.post('/addOrder', requireUserAuthentication, orderController.addOrder);


/*
|----------------------------------------------------------------------------------------------------------------
|   User Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.post('/getOtherUserProfile', requireUserAuthentication, userController.getOtherUserProfile);
router.get('/getProfile', requireUserAuthentication, userController.getProfile);
router.put('/editProfile', requireUserAuthentication, userController.editProfile);
router.put('/changePassword', requireUserAuthentication, userController.changePassword);
router.put("/forgotPassword", userController.forgotPassword);
router.get("/forgot_url/:hash", userController.forgotUrl);
router.post("/reset_password", userController.resetPassword);
router.post('/my_order', requireUserAuthentication, userController.my_order);
router.get('/notification_listing', requireUserAuthentication, userController.notification);

router.get('/all_reviews', requireUserAuthentication, userController.all_reviews);
router.post('/add_review', requireUserAuthentication, userController.add_review);


/*
|----------------------------------------------------------------------------------------------------------------
|   Home Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.post('/homeListing', requireUserAuthentication, userController.homeListing);


/*
|----------------------------------------------------------------------------------------------------------------
|   Cart Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/cart_listing', requireUserAuthentication, cartController.cartItemsListing);
router.post('/add_to_cart', requireUserAuthentication, cartController.addCartItem);
router.put('/update_cart_item', requireUserAuthentication, cartController.updateCartItem);
router.delete('/delete_item_cart', requireUserAuthentication, cartController.deleteCartItem);
router.delete('/empty_cart', requireUserAuthentication, cartController.emptyCart);



/*
|----------------------------------------------------------------------------------------------------------------
|   Vendor Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.post('/productFav', requireUserAuthentication, favouriteController.productFav);
router.post('/fav_product_list', requireUserAuthentication, favouriteController.fav_product_list);
router.post('/nearbyVendors', requireUserAuthentication, vendorController.nearbyVendors);
router.post('/deleteAccount', requireUserAuthentication, vendorController.deleteAccount);
router.post('/ordersList', requireUserAuthentication, vendorController.ordersList);
router.post('/ordersItems', requireUserAuthentication, vendorController.ordersItems);
router.post('/finishPacking', requireUserAuthentication, vendorController.finishPacking);
router.get('/notification', requireUserAuthentication, vendorController.notification);
router.post('/salesDetails', requireUserAuthentication, vendorController.salesDetails);
router.post('/checkBarcode', requireUserAuthentication, vendorController.checkBarcode);
router.post('/getProductbarcode', requireUserAuthentication, vendorController.getProductbarcode);
router.get('/getProductlist', requireUserAuthentication, vendorController.getProductlist);
router.post('/buySubscription', requireUserAuthentication, vendorController.buySubscription);
router.post('/completeOrder', requireUserAuthentication, vendorController.completeOrder);
router.post('/pastorders', requireUserAuthentication, vendorController.pastorders);
router.post('/acceptorder', requireUserAuthentication, vendorController.acceptorder);
router.post('/shippedOrder', requireUserAuthentication, vendorController.shippedOrder);
router.post('/isSelfpickupOrders', requireUserAuthentication, vendorController.isSelfpickupOrders);
router.post('/graphDetail', requireUserAuthentication, vendorController.graphDetail);

///////////////////////////////////////EmployeOrder/////////////////////////////////////
router.post('/getordersList', requireUserAuthentication, vendorController.getordersList);
router.post('/get_shop_by_category_id', requireUserAuthentication, vendorController.get_shop_category_id);
router.get('/get_delivery_options', requireUserAuthentication, vendorController.get_delivery_options);

/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/
// router.post('/subCategoryProductListing', requireUserAuthentication, productController.subCategoryProductListing);
// router.post('/changeAvailability', requireUserAuthentication, productController.changeAvailability);
// router.post('/addproduct', requireUserAuthentication, productController.addproduct);
// router.delete('/deleteProduct', requireUserAuthentication, productController.deleteProduct);
router.post('/homeListingproduct', requireUserAuthentication, productController.homeListingproduct);
router.post('/productListUser', requireUserAuthentication, productController.productListUser);
router.post('/product_detail', requireUserAuthentication, productController.product_detail);
router.post('/get_product_by_shop_id', requireUserAuthentication, productController.get_product_by_shop_id);

/*
|----------------------------------------------------------------------------------------------------------------
|   Subscription Routes
|----------------------------------------------------------------------------------------------------------------
*/


router.get('/getSubscriptions', requireUserAuthentication, subscriptionController.getSubscriptions);


/*
|----------------------------------------------------------------------------------------------------------------
|   Category Routes
|----------------------------------------------------------------------------------------------------------------
*/

/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.post('/subCategoryProductListing', requireUserAuthentication, productController.subCategoryProductListing);
router.post('/changeAvailability', requireUserAuthentication, productController.changeAvailability);
router.post('/addproduct', requireUserAuthentication, productController.addproduct);
router.delete('/deleteProduct', requireUserAuthentication, productController.deleteProduct);
router.post('/editPrice', requireUserAuthentication, productController.editPrice);

/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/

router.get('/getSubscriptions', requireUserAuthentication, subscriptionController.getSubscriptions);

/*
|----------------------------------------------------------------------------------------------------------------
|   Product Routes
|----------------------------------------------------------------------------------------------------------------
*/




router.post('/categoryFormattedListing', requireUserAuthentication, categoryController.categoryFormattedListing);
router.post('/categoryListing', requireUserAuthentication, categoryController.categoryListing);
router.get('/category_list', requireUserAuthentication, categoryController.category_list);
router.get('/shop_categories', requireUserAuthentication, categoryController.shop_categories);


/*
|----------------------------------------------------------------------------------------------------------------
|   Card Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/allCards', requireUserAuthentication, cardController.allCards);
router.post('/addCard', requireUserAuthentication, cardController.addCard);
router.put('/updateCard', requireUserAuthentication, cardController.updateCard);
router.delete('/deleteCard', requireUserAuthentication, cardController.deleteCard);
router.put('/setDefaultCard', requireUserAuthentication, cardController.setDefaultCard);

/*
|----------------------------------------------------------------------------------------------------------------
|   User Address Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/userAddressListing', requireUserAuthentication, userAddressController.userAddressListing);
router.post('/addUserAddress', requireUserAuthentication, userAddressController.addUserAddress);
router.put('/updateUserAddress', requireUserAuthentication, userAddressController.updateUserAddress);
router.delete('/deleteUserAddress', requireUserAuthentication, userAddressController.deleteUserAddress);
router.put('/setDefaultUserAddress', requireUserAuthentication, userAddressController.setDefaultUserAddress);



// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Category Routes
// |----------------------------------------------------------------------------------------------------------------
// */

//   router.get('/homeCategories', requireUserAuthentication, categoryController.homeCategories);
//   router.post('/homeCategoryBasedSubCategories', requireUserAuthentication, categoryController.homeCategoryBasedSubCategories);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Post Routes
// |----------------------------------------------------------------------------------------------------------------
// */

//   router.get('/myPostListing', requireUserAuthentication, postController.myPostListing);
//   router.post('/addPost', requireUserAuthentication, postController.addPost);
//   router.put('/updatePost', requireUserAuthentication, postController.updatePost);
//   router.delete('/deletePost', requireUserAuthentication, postController.deletePost);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   FAQ Routes
// |----------------------------------------------------------------------------------------------------------------
// */

//   router.get('/faqListing', requireUserAuthentication, faqController.faqListing);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Card Routes
// |----------------------------------------------------------------------------------------------------------------
// */
//   router.get('/allCards', requireUserAuthentication, cardController.allCards);
//   router.post('/addCard', requireUserAuthentication, cardController.addCard);
//   router.delete('/deleteCard', requireUserAuthentication, cardController.deleteCard);
//   router.put('/changeDefaulCard', requireUserAuthentication, cardController.changeDefaulCard);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   User Address Routes
// |----------------------------------------------------------------------------------------------------------------
// */
//   router.get('/userDeliveryAddressListing', requireUserAuthentication, userDeliveryAddressController.userDeliveryAddressListing);
//   router.post('/addUserDeliveryAddress', requireUserAuthentication, userDeliveryAddressController.addUserDeliveryAddress);
//   router.put('/updateUserDeliveryAddress', requireUserAuthentication, userDeliveryAddressController.updateUserDeliveryAddress);
//   router.delete('/deleteUserDeliveryAddress', requireUserAuthentication, userDeliveryAddressController.deleteUserDeliveryAddress);
//   router.put('/setDefaultUserDeliveryAddress', requireUserAuthentication, userDeliveryAddressController.setDefaultUserDeliveryAddress);



// /*
// |----------------------------------------------------------------------------------------------------------------
// |    Notification Routes
// |----------------------------------------------------------------------------------------------------------------
// */
//   router.get('/notificationListing', requireUserAuthentication, notificationController.notificationListing);
//   router.post('/notificationOnOff', requireUserAuthentication, notificationController.notificationOnOff);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Restaurant Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.get('/foodTypesListing', restaurantController.foodTypesListing);
// router.get('/restaurantTypesListing', restaurantController.restaurantTypesListing);
// router.post('/restaurantListing', restaurantController.restaurantListing);
// router.post('/restaurantDetail', restaurantController.restaurantDetail);
// router.get('/getMyRestaurantReview', requireUserAuthentication, restaurantController.getMyRestaurantReview);
// router.post('/getAllRestaurantReview', restaurantController.getAllRestaurantReview);
// router.post('/addRestaurantReview', requireUserAuthentication, restaurantController.addRestaurantReview);
// // router.post('/editRestaurantReview', requireUserAuthentication, restaurantController.editRestaurantReview);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Car Rental Dealer Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.get('/carRentalDealerListing', carRentalController.carRentalDealerListing);
// router.post('/carRentalBrandsListing', carRentalController.carRentalBrandsListing);
// router.post('/carRentalBrandCarsListing', carRentalController.carRentalBrandCarsListing);
// router.post('/carRentalBrandCarDetail', carRentalController.carRentalBrandCarDetail);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Car Rental Booking Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.post('/carRentalBooking', requireUserAuthentication, carRentalBookingController.carRentalBooking);
// router.post('/carRentalBookingDetail', requireUserAuthentication, carRentalBookingController.carRentalBookingDetail);
// router.post('/getMyCarRentalBookings', requireUserAuthentication, carRentalBookingController.getMyCarRentalBookings);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   Car Rental Review Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.post('/carRentalAddReview', requireUserAuthentication, carRentalReviewController.carRentalAddReview);
// router.post('/carRentalDealerReviewListing', carRentalReviewController.carRentalDealerReviewListing);



// /* 
// |----------------------------------------------------------------------------------------------------------------
// |   On Demand Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.get('/onDemandUserCategoryListing', onDemandController.onDemandUserCategoryListing);
// router.post('/onDemandUserListing', onDemandController.onDemandUserListing);
// router.post('/onDemandUserDetail', onDemandController.onDemandUserDetail);

// /*
// |----------------------------------------------------------------------------------------------------------------
// |   On Demand Review Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.post('/onDemandAddReview', requireUserAuthentication, onDemandReviewController.onDemandAddReview);
// router.post('/onDemandUserReviewListing', onDemandReviewController.onDemandUserReviewListing);


// /*
// |----------------------------------------------------------------------------------------------------------------
// |   On Demand Booking Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.post('/onDemandBooking', requireUserAuthentication, onDemandBookingController.onDemandBooking);
// router.post('/onDemandBookingDetail', requireUserAuthentication, onDemandBookingController.onDemandBookingDetail);
// // router.post('/getMyCarRentalBookings', requireUserAuthentication, onDemandBookingController.getMyCarRentalBookings);


// /*
// |----------------------------------------------------------------------------------------------------------------
// |   On Ecommerce Routes
// |----------------------------------------------------------------------------------------------------------------
// */
// router.get('/ecommerceHomeListing', ecommerceController.ecommerceHomeListing);
// router.post('/ecommerceSubCategoryListing', ecommerceController.ecommerceSubCategoryListing);
// router.post('/ecommerceProductByCategoryListing', ecommerceController.ecommerceProductByCategoryListing);
// router.post('/ecommerceProductDetail', ecommerceController.ecommerceProductDetail);


/*
|----------------------------------------------------------------------------------------------------------------
|   Page Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/aboutUs', pageController.getPage('aboutUs'));
router.get('/termsAndConditions', pageController.getPage('termsAndConditions'));
router.get('/privacyPolicy', pageController.getPage('privacyPolicy'));

/*
|----------------------------------------------------------------------------------------------------------------
|   Exporting Module
|----------------------------------------------------------------------------------------------------------------
*/
module.exports = router;