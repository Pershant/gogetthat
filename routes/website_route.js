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

const web_home = require('../controllers/website/webHomeController');

/*
|----------------------------------------------------------------------------------------------------------------
|   WEB HOME Routes
|----------------------------------------------------------------------------------------------------------------
*/
router.get('/', web_home.index);
router.get('/home', web_home.index);
router.post('/check_email_exists', web_home.check_email_exists)
router.post('/check_phone_exists', web_home.check_phone_exists)
router.post('/sign_up', web_home.sign_up);
router.post('/log_in', web_home.log_in);
router.get('/log_out', web_home.log_out);
router.get('/blog', web_home.blog);
router.get('/about', web_home.about);
router.get('/contact_us', web_home.contact_us);
router.post('/add_contact_us', web_home.add_contact_us);
router.get('/term', web_home.term);
router.get('/privacy', web_home.privacy);
router.get('/get_profile', web_home.get_profile);
router.post('/update_profile', web_home.update_profile);
router.post('/check_old_password_exists', web_home.check_old_password_exists);
router.post('/update_password', web_home.update_password);
router.get('/address', web_home.address);
router.post('/add_address', web_home.add_address);
router.get('/faq', web_home.faq);
router.get('/return', web_home.return);
router.get('/shipping_info', web_home.shipping_info);
router.get('/product_detail', web_home.product_detail);
router.get('/category_product', web_home.category_product);
router.post("/forgotPassword", web_home.forgotPassword);
router.get("/forgot_url/:hash", web_home.forgotUrl);
router.post("/reset_password", web_home.resetPassword);
router.get('/shipping_and_return', web_home.shipping_and_return);
router.get('/loyality_program', web_home.loyality_program);
router.post('/add_to_cart', web_home.add_to_cart);
router.get('/get_cart', web_home.get_cart);
router.get('/getCart', web_home.getCart);
router.post('/del_cart_item', web_home.del_cart_item);
router.post('/update_cart', web_home.update_cart);
router.get('/checkout', web_home.checkout);
router.post('/del_address', web_home.del_address);
router.post('/add_to_wishlist', web_home.add_to_wishlist);
router.get('/store_locator', web_home.store_locator);
router.post('/del_wishlist', web_home.del_wishlist);
router.get('/sitemap', web_home.sitemap);
router.get('/blog_detail', web_home.blog_detail);
router.get('/category_blog', web_home.category_blog);
router.post('/add_blog_comment', web_home.add_blog_comment);
router.get('/review_order', web_home.review_order);
router.get('/search_product', web_home.search_product);
router.get('/product_review', web_home.product_review);
router.get('/add_review', web_home.add_review);
router.post('/post_review', web_home.post_review);
router.get('/order_history', web_home.order_history);
router.get('/order_detail', web_home.order_detail);
router.get('/brand', web_home.brand);
router.get('/brand_product', web_home.brand_product)
////////////strip payment////////////>.>.>.>.>.>.>.>.>................>>>>>>>>>>>>
router.post('/add_card', web_home.add_card);
router.post('/add_order', web_home.add_order);
router.post('/re_order', web_home.re_order);
router.get('/save_to_later', web_home.save_to_later);
router.get('/saved_order', web_home.saved_order);
router.post('/updateToken', web_home.updateToken);
router.post('/add_to_compare', web_home.add_to_compare);
router.get('/comparison', web_home.comparison);
router.get('/copyright', web_home.copyright);
router.post('/del_comparison', web_home.del_comparison);
router.post('/del_card', web_home.del_card);
router.get('/search_blog', web_home.search_blog);
router.get('/safety_and_security', web_home.safety_and_security);

module.exports = router;

