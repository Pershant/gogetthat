/*
|----------------------------------------------------------------------------------------------------------------
|   Router File
|----------------------------------------------------------------------------------------------------------------
|   All routers called in this file.
|
*/
const adminRouter = require('./admin.routes');
const sellerAdminRouter = require('./sellerAdmin.routes');
const apiRouter = require('./api.routes');
const webRouter = require('./website_route');
/*
|----------------------------------------------------------------------------------------------------------------
|   Middlewares
|----------------------------------------------------------------------------------------------------------------
*/
const adminAuthentication = require('../middlewares/adminAuthentication');
const sellerAdminAuthentication = require('../middlewares/sellerAdminAuthentication');

/*
|----------------------------------------------------------------------------------------------------------------
|   Route Files called with middlewares
|----------------------------------------------------------------------------------------------------------------
*/
module.exports = (app) => {

    app.use('/admin/', adminAuthentication, adminRouter);
    app.use('/sellerAdmin/', sellerAdminAuthentication, sellerAdminRouter);
    app.use('/api/', apiRouter);
    app.use('/', webRouter);
}