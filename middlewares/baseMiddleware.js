module.exports = async (req, res, next) => {

    if (req.session.hasOwnProperty('admin')) {
        global.adminData = req.session.admin;
    }

    if (req.hasOwnProperty('body') && req.body) {
        req.body = JSON.parse(JSON.stringify(req.body));
    }

    global.baseUrl = `${req.protocol}://${req.get('host')}`;

    global.PLACEHOLDER_IMAGE = `${baseUrl}/uploads/default/default_image.jpg`;
    global.PLACEHOLDER_IMAGE_USER = `${baseUrl}/uploads/default/avatar-1.png`;
    
    global.flashMessage = req.flash('flashMessage');

    return next();
}